'use client'
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import bg from "@/assets/images/auth/bg-1.png";
import bg2 from "@/assets/images/auth/bg-2.png";
import logo from "@/assets/images/logo/formlazy logo.png";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: ""
  });
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

        <div>
          <Image src={logo} alt="logo" height={180} width={180} className="absolute top-4 left-4" />
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
