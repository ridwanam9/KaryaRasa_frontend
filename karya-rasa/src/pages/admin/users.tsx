import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  bank_account: string | null;
  birth_date: string | null;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        // Filter users based on the role "admin"
        const adminData = data.filter((user: User) => user.role === "admin");
        setUsers(adminData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-600 text-sm">Loading users...</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (users.length === 0) return <p className="text-gray-600 text-sm">No admin users found.</p>;

  return (
    <table className="min-w-full border border-gray-300 rounded overflow-hidden">
      <thead className="bg-gray-100 text-gray-700 text-left text-sm">
        <tr>
          <th className="px-4 py-2 border-r border-gray-300">ID</th>
          <th className="px-4 py-2 border-r border-gray-300">Name</th>
          <th className="px-4 py-2 border-r border-gray-300">Email</th>
          <th className="px-4 py-2 border-r border-gray-300">Phone</th>
          <th className="px-4 py-2 border-r border-gray-300">Address</th>
          <th className="px-4 py-2 border-r border-gray-300">Bank Account</th>
          <th className="px-4 py-2 border-r border-gray-300">Birth Date</th>
          <th className="px-4 py-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email, role, phone, address, bank_account, birth_date }) => (
          <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-4 py-2 text-sm text-gray-700">{id}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{name}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{email}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{phone || "N/A"}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{address || "N/A"}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{bank_account || "N/A"}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{birth_date || "N/A"}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
