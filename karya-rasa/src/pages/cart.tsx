// import { useState, FormEvent } from "react";

// type Props = {
//   onSwitch: () => void;
// };

// function LoginPage({ onSwitch }: Props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [staySignedIn, setStaySignedIn] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(`✅ ${data.message}`);
//         // TODO: Redirect to dashboard
//       } else {
//         setMessage(`❌ ${data.message}`);
//       }
//     } catch (err) {
//       setMessage("⚠️ Gagal terhubung ke server.");
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-8 border rounded-xl shadow-md bg-white">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Sign In</h1>
//         <button
//           type="button"
//           onClick={onSwitch}
//           className="border px-3 py-1 border-gray-600 rounded-full text-gray-800 hover:bg-gray-100"
//         >
//           Register
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <label className="flex items-center text-gray-700">
//             <input
//               type="checkbox"
//               checked={staySignedIn}
//               onChange={(e) => setStaySignedIn(e.target.checked)}
//               className="mr-2"
//             />
//             Stay signed in
//           </label>
//           <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
//             Forgot your password?
//           </a>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-900 transition-colors"
//         >
//           Sign in
//         </button>
//       </form>

//       {message && (
//         <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
//       )}

//       <div className="flex items-center my-6">
//         <div className="flex-1 border-t border-gray-300" />
//         <span className="mx-4 text-gray-500 font-medium">OR</span>
//         <div className="flex-1 border-t border-gray-300" />
//       </div>

//       <div className="space-y-4">
//         <button className="w-full border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50">
//           Continue with Google
//         </button>
//         <button className="w-full border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50">
//           Continue with Facebook
//         </button>
//         <button className="w-full border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50">
//           Continue with Apple
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;