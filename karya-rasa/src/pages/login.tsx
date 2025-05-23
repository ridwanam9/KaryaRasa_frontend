import { useState, FormEvent } from "react";
import RegisterPage from "@/pages/register";
import { useRouter } from "next/router"; // pastikan ini di-import



type Props = {
  onSwitch: () => void;
};


function LoginPage({ onSwitch }: Props) {
  // di dalam komponen LoginPage
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [message, setMessage] = useState("");

  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.data.name);

        setMessage(`✅ ${data.message}`);
        // TODO: redirect to dashboard or set token
        // const userRole = data.user?.role;

        // ✅ Tampilkan alert
        alert(`Selamat datang, ${data.data.name}!`);


        if (data.role === "seller") {
          router.push("/seller/products");
        } else if (data.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/"); // default redirect untuk user biasa
        }

      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("⚠️ Gagal terhubung ke server.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-2">
        <div className="flex flex-col end mb-2">
        </div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <button
            type="button"
            onClick={onSwitch}
            className="border px-2 py-1 border-gray-600 rounded-full text-gray-800 hover:bg-gray-100"
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="align-left block text-gray-700 mb-2 font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="staySignedIn"
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)}
                  className="w-5 h-5 opacity-0 absolute"
                />
                <div
                  className={`w-5 h-5 border border-gray-500 rounded flex items-center justify-center ${
                    staySignedIn ? "bg-black" : "bg-white"
                  }`}
                >
                  {staySignedIn && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                <label htmlFor="staySignedIn" className="ml-2 text-gray-700">
                  Stay signed in
                </label>
              </div>
            </div>
            <a href="#" className="ml-10 text-gray-600 hover:text-gray-800">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-900 transition-colors"
          >
            Sign in
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 font-medium">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="space-y-4">
          <button className="w-full border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50">
            Continue with Google
          </button>
          <button className="w-full border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50">
            Continue with Facebook
          </button>
          <button className="w-full border border-gray-300 rounded-full py-3 font-medium hover:bg-gray-50">
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
