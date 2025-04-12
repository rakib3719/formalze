import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET || 'ksdjnvhrkjnvkljfdkljkfdk',

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        user_id: { type: "text" },
        token: { type: "text" }
      },

      async authorize(credentials) {
        try {
          // Direct authentication with existing token
          if (credentials.user_id && credentials.token) {
            return {
              id: credentials.user_id,
              token: credentials.token,
              email: '',
              username: '',
              phone: '',
              address: '',
              healthCareName: ''
            };
          }

          // Username/password authentication
          if (!credentials.username || !credentials.password) {
            throw new Error("Username and password are required");
          }

          const { user, token } = await getUserWithToken(credentials.username, credentials.password);
          
          if (!user || !token) {
            throw new Error("Invalid credentials");
          }

          return {
            ...user,
            token: token
          };

        } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error(JSON.stringify({
            error: error.message || "Login failed",
            status: error.response?.status || 401
          }));
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Persist user data to token
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          address: user.address,
          healthCareName: user.healthCareName,
          token: user.token
        };
      }
      return token;
    },

    async session({ session, token }) {
      // Send user properties to the client
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },

  pages: {
    signIn: '/sign-in',
    error: '/sign-in?error='
  },

  debug: process.env.NODE_ENV === 'development'
});

export { handler as GET, handler as POST };

// Enhanced helper function
const getUserWithToken = async (username, password) => {
  try {
    // Step 1: Login to get token
    const loginRes = await axios.post(
      'https://formlyze.mrshakil.com/api/users/login/', 
      { username, password }
    );

    if (!loginRes?.data?.token || !loginRes?.data?.user_id) {
      throw new Error("Invalid login response");
    }

    const { token, user_id } = loginRes.data;

    // Step 2: Get user details with the token
    const userInfoRes = await axios.get(
      `https://formlyze.mrshakil.com/api/users/list/${user_id}/`,
      {
        headers: {
          'Authorization': `Token ${token}`
        }
      }
    );

    if (!userInfoRes?.data) {
      throw new Error("Failed to fetch user info");
    }

    return {
      user: {
        id: user_id,
        email: userInfoRes.data.email || '',
        username: userInfoRes.data.username || '',
        phone: userInfoRes.data.phone || '',
        address: userInfoRes.data.address || '',
        healthCareName: userInfoRes.data.healthCareName || ''
      },
      token: token
    };

  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};