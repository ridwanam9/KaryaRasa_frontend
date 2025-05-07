import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CreateSeller = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    bank_name: "",
    account_number: "",
    seller_type: "Individual", // Display only
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in first.");
      router.push("/login");
      return;
    }
  
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
  
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          email: data.email,
        }));
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      }
    };
  
    fetchUser();
  }, [router]);
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      const res = await fetch(
        "https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/role/switch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            bank_name: formData.bank_name,
            account_number: formData.account_number,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(`Failed to switch role: ${err.message}`);
        return;
      }

      alert("Seller account created!");
      router.push("/products");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error while submitting seller info.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <div className="flex items-center mb-6">
        <img
          src="/logo-karya-rasa.png"
          alt="Karya Rasa Logo"
          className="h-16 mr-4"
        />
        <h1 className="text-xl font-semibold">Seller Page (Make Shop)</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-lg font-semibold mb-6">
          Let’s start creating your shop
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />

            <label className="mt-4">Phone Number *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />

            <label className="mt-4 font-medium">
              Name of the account holder
            </label>

            <label className="mt-2">Bank Name *</label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />

            <label className="mt-4">Account Number *</label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <p className="font-medium mb-2">
              For tax purpose, what type of seller are you?
            </p>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="seller_type"
                value="Individual"
                checked={formData.seller_type === "Individual"}
                disabled
              />
              <span>Individual</span>
            </label>
            <label className="flex items-start space-x-2 mt-2">
              <input
                type="radio"
                name="seller_type"
                value="Business"
                disabled
              />
              <span>
                <span>Business or Sole Proprietor</span>
                <p className="text-sm text-gray-500 mt-1">
                  Is your bank account registered in a business/trade name?
                  You must choose business as your seller type.
                </p>
              </span>
            </label>
          </div>

          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-indigo-300 hover:bg-indigo-400 text-white px-6 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>

        <footer className="text-center text-sm text-gray-600 mt-12 border-t pt-4">
          © 2025 Karya Rasa. All Right Reserved.
        </footer>
      </div>
    </div>
  );
};

export default CreateSeller;
