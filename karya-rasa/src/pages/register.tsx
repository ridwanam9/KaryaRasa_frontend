import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        // TODO: redirect to login page or dashboard
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("⚠️ Gagal terhubung ke server.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="border border-gray-300 rounded-full text-gray-800 hover:bg-gray-100"
          >
            Login
          </button>
        </div>

        <p className="text-gray-600 mb-6">Registration is easy</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 font-medium"
            >
              Email address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 mb-2 font-medium"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2 font-medium"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="text-sm text-gray-600 mb-6">
            By clicking Register or Continue with Google, Facebook, or Apple,
            you agree to Karya Rasa’s{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-900 transition-colors"
          >
            Register
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

export default RegisterPage;
