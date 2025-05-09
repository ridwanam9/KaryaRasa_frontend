import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar"; // Asumsi path yang benar

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
      alert("Anda harus login terlebih dahulu.");
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

        // Cek apakah user punya role yang diizinkan (bukan admin)
        if (data.role !== "user") {
          alert("Anda tidak diizinkan mengakses halaman ini.");
          router.push("/"); // Redirect ke homepage atau halaman lain
          return;
        }

        setFormData((prev) => ({
          ...prev,
          email: data.email,
        }));
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
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
      alert("Tidak terautentikasi");
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
        alert(`Gagal mengubah peran: ${err.message}`);
        return;
      }

      alert("Akun penjual berhasil dibuat!");
      router.push("/seller/products");
    } catch (err) {
      console.error("Kesalahan saat submit:", err);
      alert("Kesalahan jaringan saat mengirim informasi penjual.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto pt-40 py-10 px-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          

          <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
            Mari mulai membuat toko Anda
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                readOnly // Karena email sudah diisi otomatis
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Nomor Telepon *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            

            <div className="mb-4">
              <label htmlFor="bank_name" className="block text-gray-700 text-sm font-bold mb-2">
                Nama Bank *
              </label>
              <input
                type="text"
                id="bank_name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="account_number" className="block text-gray-700 text-sm font-bold mb-2">
                Nomor Rekening *
              </label>
              <input
                type="text"
                id="account_number"
                name="account_number"
                value={formData.account_number}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Untuk keperluan pajak, jenis penjual apakah Anda?
              </p>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="individual"
                  name="seller_type"
                  value="Individual"
                  checked={formData.seller_type === "Individual"}
                  disabled
                  className="mr-2"
                />
                <label htmlFor="individual" className="text-gray-700 text-sm">
                  Individual
                </label>
              </div>
              <div className="flex items-start mb-2">
                <input
                  type="radio"
                  id="business"
                  name="seller_type"
                  value="Business"
                  disabled
                  className="mr-2 mt-1"
                />
                <label htmlFor="business" className="text-gray-700 text-sm">
                  <span className="font-medium">Badan Usaha atau Perorangan</span>
                  <p className="text-gray-500 text-xs mt-1">
                    Apakah rekening bank Anda terdaftar atas nama badan usaha/perdagangan? Anda harus memilih badan usaha sebagai jenis penjual Anda.
                  </p>
                </label>
              </div>
            </div>

            <div className="col-span-2 flex justify-end mt-8">
              <button
                type="submit"
                className="bg-indigo-300 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className="bg-gray-100 text-center text-gray-600 py-4">
        © 2025 Karya Rasa. All Rights Reserved.
      </footer>
    </div>
  );
};

export default CreateSeller;