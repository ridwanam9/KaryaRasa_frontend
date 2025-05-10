"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountLayout from "@/components/AccountLayout";

interface UserData {
  name: string;
  email: string;
  phone?: string;
}

const Personal = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // agar tidak langsung render sebelum pengecekan selesai

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/"); // redirect ke beranda (jika ingin redirect ke modal login, bisa buat state global)
      return;
    }

    fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token");
        router.push("/"); // redirect ke beranda jika gagal ambil user
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return null; // karena sudah redirect

  return (
    <AccountLayout>
      <div className="personal-data">
        <div className="profile-section">
          <img src="../pp.jpeg" alt="Profile" className="profile-photo" />
          <button className="btn-secondary">Select a photo</button>
          <button className="btn-secondary">Change password</button>
        </div>
        <div className="data-section">
          <h3>Change Personal Data</h3>
          <div className="data-row">
            <span>Nama</span>
            <span>{user.name} <a href="#">Change</a></span>
          </div>
          <div className="data-row">
            <span>Email</span>
            <span>{user.email} <span className="verified">Verified</span> <a href="#">Change</a></span>
          </div>
          <div className="data-row">
            <span>Phone Number</span>
            <span>{user.phone ?? "Not set"} <a href="#">Change</a></span>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Personal;
