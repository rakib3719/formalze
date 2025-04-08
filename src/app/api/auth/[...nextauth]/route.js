import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  
  secret: 'ksdjnvhrkjnvkljfdkljkfdk',  // This is your JWT secret, keep it secure

  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
        user_id: {},
        token: {}
      },

      async authorize(credentials) {
        // Capture user_id and token from credentials (URL params)
        const { user_id, token } = credentials;

        if (user_id && token) {
          // If user_id and token are present, directly return the user data

          console.log(user_id, token,'akhane jeheto asca');
          return {
            email: '',
            username: '',
            id: user_id,
            phone: '',
            address: '',
            healthCareName: '',
            token: token,
          };
        }

        // Handle case where user_id or token is missing
        if (!credentials.username || !credentials.password) {
          throw new Error(JSON.stringify({ error: "Username and password are required." }));
        }

        const user = await getUserInfo(credentials.username, credentials.password);

        if (!user) {
          throw new Error(JSON.stringify({ error: "Invalid credentials." }));
        }

        // If successful, return the user info to be saved in JWT
        return {
          email: user.email,
          username: user.username,
          id: user.id,
          phone: user.phone || '',
          address: user?.address || '',
          healthCareName: user?.healthCareName || '',
          token: user.token
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Save user data in JWT
        token.email = user.email;
        token.username = user.username;
        token.id = user.id;
        token.phone = user.phone;
        token.address = user?.address || '';
        token.healthCareName = user?.healthCareName || '';
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Attach the JWT token info to the session object
        session.user = {
          email: token.email,
          username: token.username,
          id: token.id,
          phone: token.phone,
          address: token?.address || '',
          healthCareName: token?.healthCareName || '',
          token: token.token
        };
      }
      return session;
    }
  },

  pages: {
    signIn: 'sign-in'
  }
});

export { handler as GET, handler as POST };

// Helper function
const getUserInfo = async (username, password) => {
  try {
    const user = { username, password };

    const loginRes = await axios.post('https://formlyze.mrshakil.com/api/users/login/', user);
    console.log(loginRes, 'loginres');

    if (loginRes?.data) {
      const userId = loginRes.data.user_id;
      const userInfo = await axios.get(`https://formlyze.mrshakil.com/api/users/list/${userId}/`, {
       
      });

      console.log(userInfo, 'okk vai');
      return userInfo.data;
    }

    return null;

  } catch (error) {
    console.error("Login error:", error.message);
    return null;
  }
};
