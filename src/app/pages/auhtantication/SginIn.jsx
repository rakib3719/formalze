import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import bg from "@/assets/images/auth/bg-1.png";
import bg2 from "@/assets/images/auth/bg-2.png";
import logo from "@/assets/images/logo/formlazy logo.png";

const SignIn = () => {
  return (
    <div className=" mt-8 flex justify-center">
      <Image src={logo} alt="logo" height={180} width={180} className="absolute top-4 left-4" />
      <Image alt="bg" src={bg} className="absolute top-0 right-0 h-[60%]" />
      <Image alt="bg" src={bg2} className="absolute -left-32 -bottom-24 h-[60%]" />

      <div className="rounded-xl bg-[#F1F1F1] p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">Sign in</h2>

        <form className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <label className="text-gray-600 block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <FaCircleCheck className="h-5 w-5 text-gray-400 absolute right-3 top-11" />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="text-gray-600 block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <FaCircleCheck className="h-5 w-5 text-gray-400 absolute right-3 top-11" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 btn-auth text-white font-bold rounded-lg hover:opacity-90 transition"
          >
            Sign in
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-700 mt-6">
          You have an account? <a href="#" className="text-purple-900 font-bold">Sign up Now</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
