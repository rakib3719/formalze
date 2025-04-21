'use client'
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import bg from "@/assets/images/auth/bg-1.png";
import bg2 from "@/assets/images/auth/bg-2.png";
import logo from "@/assets/images/logo/formlazy logo.png";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import usePublicAxios from "@/hooks/usePublicAxios";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: ""
  });
  const publicAxios = usePublicAxios()
  const [error, setError] = useState("");
  // const logout = ()=>{
  //   signOut()
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const googleLogin= async ()=>{
     const response =await publicAxios.get('/google/oauth/config/');
 
     const googleClientId = response.data.google_client_id;
     const googleCallbackUri = response.data.google_callback_uri; 
 
     console.log(googleCallbackUri, googleClientId);
 
     if(googleCallbackUri, googleClientId){
       redirect(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`)
     }
     console.log(googleCallbackUri, googleClientId);
 
   
     
 // https://formlyze.mrshakil.com/api/v1/auth/google/callback/?code=4%2F0Ab_5qlmxErtmY4i2GzFCG4-K6KGhzpWfIS5yeHwVW5pHGCLUrBuqWcgB42_2niKVIKddtw&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
   }
  const session = useSession();
  console.log(session, 'session');

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      username: credentials.emailOrUsername,
      password: credentials.password,
      redirect: false,
    });

    if(res){
      setLoading(false)
    }

    if (res?.error) {
      try {
        const errorObj = JSON.parse(res.error);
        setError(errorObj.error || "Login failed.");
        setLoading(false)
      } catch {
        setError("Login failed.");
      }
    } else {
      router.push("/"); 
    }
  };

  return (
    <div className="h-full overflow-hidden relative bg-white no-scrollbar">
      <div className="mt-28 overflow-y-hidden flex justify-center items-center">

{/* <button onClick={logout} className="text-2xl border-2  border-red-800">
  log out
</button> */}

        <div >
      <Link href={'/'} className="cursor-pointer
      ">
      <Image src={logo} alt="logo" height={180} width={180} className="absolute top-4 left-4" /></Link>
          <Image alt="bg" src={bg} className="absolute top-0 right-0 h-[60%]" />
          <Image alt="bg" src={bg2} className="absolute -left-32 -bottom-56 h-[60%]" />
        </div>

        <div className="rounded-xl bg-[#F1F1F1] p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="text-gray-600 block mb-1"> Username</label>
              <input
                type="text"
                name="emailOrUsername"
                value={credentials.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your  username"
                className="w-full text-black p-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <FaCircleCheck className="h-5 w-5 text-gray-400 absolute right-3 top-11" />
            </div>

            <div className="relative">
              <label className="text-gray-600 block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full text-black p-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <FaCircleCheck className="h-5 w-5 text-gray-400 absolute right-3 top-11" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 btn-auth text-white font-bold rounded-lg cursor-pointer hover:opacity-90 transition"
            >
          { loading ? "Loading..." :   "Sign in"}
            </button>

            <button 
             onClick={googleLogin}
              type="button"
              className="flex items-center justify-center cursor-pointer gap-2 text-[#000000] bg-[#E4E4E4] py-2 px-4 rounded-lg w-full"
            >
<FaGoogle /> Use a Google account

            </button>
          </form>

          <p className="text-center text-gray-700 mt-6">
            Don't have an account? <Link href="/sign-up" className="text-purple-900 font-bold">Sign up Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
