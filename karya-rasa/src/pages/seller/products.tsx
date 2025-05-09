import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { products as initialProducts } from "@/data/products";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";


const sidebarTabs = [
  { key: "orders", label: "Orders" },
  { key: "catalog", label: "Catalog" },
];

export default function SellerProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("catalog");
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
        const res = await fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        if (data.role !== "seller") {
          alert("Anda tidak diizinkan mengakses halaman ini.");
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  // Ambil data dari localStorage saat mount
  useEffect(() => {
    const local = localStorage.getItem("seller_products");
    if (local) {
      // Gabungkan produk dari localStorage dan initialProducts tanpa duplikasi id
      const localProducts = JSON.parse(local);
      const merged = [
        ...localProducts,
        ...initialProducts.filter(
          (p) => !localProducts.some((lp: any) => lp.id === p.id)
        ),
      ];
      setProducts(merged);
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Hapus produk dari state & localStorage
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);

      // Update localStorage juga
      const local = localStorage.getItem("seller_products");
      if (local) {
        const localProducts = JSON.parse(local);
        const updatedLocal = localProducts.filter((p: any) => p.id !== id);
        localStorage.setItem("seller_products", JSON.stringify(updatedLocal));
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-8">
        {/* Sidebar */}
        <aside className="w-56 min-h-full border-r bg-[#f7f7f7] flex flex-col py-8 px-4">
          <nav className="flex flex-col gap-2">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.key}
                className={`text-left px-2 py-2 rounded font-medium ${
                  activeTab === tab.key
                    ? "text-[#2b4c6f] border-l-4 border-[#2b4c6f] bg-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4 items-center">
                <h2 className="text-lg font-semibold text-gray-700">Catalog</h2>
              </div>
              <button
                className="bg-[#a0aee4] text-white px-4 py-2 rounded font-medium hover:bg-[#8899dd]"
                onClick={() => router.push("/seller/add-product")}
              >
                Add new product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 w-10">
                      <input type="checkbox" disabled />
                    </th>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 text-center">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2 font-medium">{product.name}</td>
                      <td className="px-4 py-2">Rp. {product.price.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(product.id)}
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-400">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

