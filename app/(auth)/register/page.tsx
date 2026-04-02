

// const RegisterPage = () => {
//     return (
//         <div>
//             <h1>This is Registration page</h1>
//         </div>
//     );
// };

// export default RegisterPage;

// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">

//       {/* LEFT SIDE */}
//       <div className="hidden md:flex w-1/2 relative">
//         <Image
//           src="/images/login-bg.jpg"
//           alt="bg"
//           fill
//           className="object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40" />

//         <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full">
//           <div className="flex items-center gap-2">
//             <Image src="/images/logo.png" width={28} height={28} alt="logo" />
//             <span className="font-semibold text-lg">Mein HerzGeschenk</span>
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold mb-2">
//               Start creating your personal gift.
//             </h2>
//             <p className="text-sm text-gray-200">
//               Sign up to begin your journey.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex w-full md:w-1/2 items-center justify-center bg-[#F3F4F6] px-6 py-10">
//         <div className="w-full max-w-md">

//           <p className="text-sm text-[#7A1E3A] mb-2">✦ Create account</p>

//           <h1 className="text-2xl font-bold text-gray-900 mb-1">
//             Sign up
//           </h1>
//           <p className="text-sm text-gray-500 mb-6">
//             Create your account to continue
//           </p>

//           <form className="space-y-4">

//             {/* Full Name */}
//             <div>
//               <label className="text-sm text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm text-gray-700">Email</label>
//               <input
//                 type="email"
//                 placeholder="jane@example.com"
//                 className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm text-gray-700">Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="w-full mt-2 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
//             >
//               Sign Up →
//             </button>

//             {/* Login Link */}
//             <p className="text-center text-xs text-gray-500 mt-4">
//               Already have an account?{' '}
//               <Link href="/login" className="text-[#7A1E3A] font-medium">
//                 Log in
//               </Link>
//             </p>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/login.jpg"
          alt="bg"
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          {/* Bottom Text */}
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-2">
              Create a personal gift made together.
            </h2>
            <p className="text-sm text-gray-200 max-w-sm">
              Join thousands of people who’ve turned their favorite moments into beautiful printed books.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#F3F4F6] px-6 py-10">

        <div className="w-full max-w-md">

          {/* Header */}
          <p className="text-sm text-[#7A1E3A] mb-2">
            ✦ Create Amazing Memory Book
          </p>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Start creating memory books in minutes
          </p>

          {/* Form */}
          <form className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              Sign Up →
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                Google
              </button>
              <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                Apple
              </button>
            </div>

            {/* Login */}
            <p className="text-center text-xs text-gray-500 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-[#7A1E3A] font-medium">
                Log in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}