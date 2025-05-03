import { useState } from "react";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

type AuthType = "login" | "register";

export default function AuthModal() {
  const [authType, setAuthType] = useState<AuthType>("login");

  const switchToLogin = () => setAuthType("login");
  const switchToRegister = () => setAuthType("register");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={switchToLogin}
        >
          ×
        </button>

        {authType === "login" ? (
          <LoginPage onSwitch={switchToRegister} />
        ) : (
          <RegisterPage onSwitch={switchToLogin} />
        )}
      </div>
    </div>
  );
}
