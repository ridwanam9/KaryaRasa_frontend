import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

const categories = [
  "Accessories",
  "Art & Collectibles",
  "Clothing",
  "Jewelry",
  "Craft Supplies & Tools",
  "Toys & Games",
];

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !stock || !category || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    // Simpan produk ke localStorage
    const newProduct = {
      id: Date.now().toString(),
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      image,
      rating: 4.9,
    };

    const existing = localStorage.getItem("seller_products");
    const products = existing ? JSON.parse(existing) : [];
    products.push(newProduct);
    localStorage.setItem("seller_products", JSON.stringify(products));

    // Redirect ke catalog
    router.push("/seller/products");
  };

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
              <label className="block mb-2">Stok</label>
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
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
