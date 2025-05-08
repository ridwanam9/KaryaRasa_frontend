import React, { useState, useEffect } from "react";
import AdminLayout from "../../pages/layouts/AdminLayout";                                                                                    
import Users from "../../pages/admin/users";
import Sellers from "../../pages/admin/sellers";
import Products from "../../pages/admin/products";

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<"users" | "sellers" | "products">("users");
  const loggedInUsername = "AdminUser";

  // State to hold users and sellers separated by role
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((json) => {
        if (json && Array.isArray(json.data)) {
          const allUsers = json.data;
          setUsers(allUsers.filter((u) => u.role.toLowerCase() === "user"));
          setSellers(allUsers.filter((u) => u.role.toLowerCase() === "seller"));
        } else {
          setUsers([]);
          setSellers([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout currentTab={currentTab} setCurrentTab={setCurrentTab} username={loggedInUsername}>
      <h1 className="text-gray-900 font-semibold text-lg mb-1">
        {currentTab === "users"
          ? `Data User untuk ${loggedInUsername}`
          : currentTab === "sellers"
          ? `Data Seller untuk ${loggedInUsername}`
          : `Data Produk untuk ${loggedInUsername}`}
      </h1>
      <p className="text-gray-600 text-sm mb-4">
        {currentTab === "users"
          ? "Semua Data User."
          : currentTab === "sellers"
          ? "Semua Data Seller."
          : "Semua Data Produk."}
      </p>
      <div className="flex-grow border border-gray-200 rounded p-4 overflow-auto">
        {loading && <p className="text-gray-600 text-sm">Loading data...</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {!loading && !error && currentTab === "users" && <Users users={users} />}
        {!loading && !error && currentTab === "sellers" && <Sellers sellers={sellers} />}
        {!loading && !error && currentTab === "products" && <Products />}
      </div>
    </AdminLayout>
  );
}