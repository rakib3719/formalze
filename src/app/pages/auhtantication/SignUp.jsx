import React from "react";
import {  FaGoogle, FaApple } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import bg from "@/assets/images/auth/bg-1.png";
import bg2 from "@/assets/images/auth/bg-2.png";
import logo from "@/assets/images/logo/formlazy logo.png";
import { FaRegCircleCheck } from "react-icons/fa6";

const SignUp = () => {
  return (
<div>
<div className="flex justify-center mt-8 ">
      <Image src={logo} alt="logo" height={180} width={180} className="absolute top-4 left-4" />
      <Image alt="bg" src={bg} className="absolute top-0 right-0 h-[60%]" />
      <Image alt="bg" src={bg2} className="absolute -left-32 -bottom-24 h-[60%]" />

      <div className="rounded-xl bg-[#F1F1F1] p-8 max-w-[600px] w-full h-full">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">Sign up</h2>

        {/* Social Login Buttons */}
        <div className="flex justify-between mb-6">
          <button className="flex items-center justify-center gap-2 bg-[#E4E4E4] py-2 px-4 rounded-lg  w-[48%]">
            <FaGoogle className="text-gray-700" /> Use a Google account
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#E4E4E4] py-2 px-4 rounded-lg  w-[48%]">
            <FaApple className="text-gray-700" /> Use an Apple account
          </button>
        </div>

        <form className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <h4 className="text-gray-500 mb-2">Email</h4>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 relative"
            />
            <FaCircleCheck className="h-5 w-5 text-gray-400 absolute right-3 top-12" />
          </div>

          {/* Password Field */}
          <div className="relative">

          <h4 className="text-gray-500 mb-2 ">Create a Password</h4>
            <input
              type="password"
              placeholder="Create Password"
              className="w-full p-3 pr-10 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 relative"
            />
       <FaCircleCheck className="h-5 w-5 text-gray-400 absolute right-3 top-12" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r btn-auth text-white font-bold rounded-lg hover:opacity-90 transition"
          >
            Sign up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-700 mt-6">
          Already have an account? <a href="#" className="text-purple-900 font-bold">Sign in Now</a>
        </p>
      </div>
 
    </div>

</div>
  );
};

export default SignUp;