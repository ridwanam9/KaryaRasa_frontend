import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

const categories = [
  { id: 1, name: "Accessories" },
  { id: 2, name: "Art & Collectibles" },
  { id: 3, name: "Clothing" },
  { id: 4, name: "Jewelry" },
  { id: 5, name: "Craft Supplies & Tools" },
  { id: 6, name: "Toys & Games" },
];

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState<number | string>(""); // Use category ID instead of name
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !stock || !category || !imageFile) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category_id", String(category)); // Send category ID
    formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added successfully!");
        router.push("/seller/products");
      } else {
        alert("Failed to add product: " + data.message); // Adjusted error handling
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the product.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in first.");
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
          alert("You are not authorized to access this page.");
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white border rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow"
        >
          {/* Left: Basic Info */}
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-4">Basic Information</h2>
            <label className="block mb-2">Input your product name</label>
            <input
              className="border rounded-full px-4 py-1 mb-4 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="block mb-2">Input your description here</label>
            <textarea
              className="border rounded-lg px-4 py-2 mb-4 w-full"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                  Rp.
                </span>
                <input
                  type="number"
                  className="border rounded px-3 py-1 w-32"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Stock</label>
              <input
                type="number"
                className="border rounded px-3 py-1 w-24"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min={0}
                required
              />
            </div>
          </div>

          {/* Right: Image & Category */}
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-4">Product image</h2>
            <div className="flex items-center gap-4 mb-6">
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg w-24 h-24 cursor-pointer hover:border-blue-400">
                <span className="text-2xl text-gray-400">+</span>
                <span className="text-xs text-gray-500">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
            <h2 className="font-bold text-lg mb-2">Category</h2>
            <label className="block mb-2">Product category</label>
            <select
              className="border rounded-full px-4 py-2 w-full mb-8"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-[#a0aee4] text-white px-6 py-2 rounded font-semibold hover:bg-[#8899dd] w-full"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
