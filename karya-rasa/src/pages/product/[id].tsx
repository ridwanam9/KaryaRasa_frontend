import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useCart } from "@/pages/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
  stock: number;
  reviews?: {
    id: number;
    rating: number;
    review: string;
    user: {
      name: string;
    };
  }[];
}

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dying-helli-ridwanam9-4b98d171.koyeb.app/products/${id}`)
        .then((res) => setProduct(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({ id: product.id, quantity, note, });
    }
  };

  if (!product)
    return <div className="text-center mt-10">Loading product...</div>;

  const subtotal = quantity * product.price;

  return (
    <>
      <Navbar />
      <div className="bg-[#ffffff] min-h-screen text-black pt-40 px-6">
        <div className="bg-white max-w-6xl mx-auto rounded-md shadow p-6">
          <h1 className="text-lg text-gray-700 font-semibold mb-4">
            Product detail
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img
                src={product.image_url}
                alt={product.name}
                className="rounded w-full object-cover"
              />
            </div>

            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <div className="text-sm text-gray-500 mt-1">⭐ 4.9</div>

                <p className="text-lg font-semibold text-black mt-2">
                  Rp. {product.price.toLocaleString("id-ID")}
                </p>

                <div className="mt-4">
                  <h3 className="text-green-600 font-semibold">Detail</h3>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 border rounded-md p-4 shadow-sm">
                <h4 className="font-semibold text-base mb-4">
                  Atur jumlah dan catatan
                </h4>

                {/* Quantity control & stock */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center border rounded px-2 py-1">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-2 text-xl"
                    >
                      −
                    </button>
                    <span className="px-4 text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-2 text-xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm">
                    Stok:{" "}
                    <span className="font-bold">
                      {product.stock.toLocaleString("id-ID")}
                    </span>
                  </span>
                </div>

                {/* Catatan */}
                <textarea
                  placeholder="Catatan tambahan (opsional)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm resize-none mb-4"
                  rows={3}
                />

                {/* Subtotal */}
                <div className="mb-4">
                  <span className="text-gray-500">Subtotal</span>
                  <div className="text-lg font-bold">
                    Rp{subtotal.toLocaleString("id-ID")}
                  </div>
                </div>

                {/* Tombol aksi */}
                <div className="flex flex-col gap-2">
                  <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                  onClick={handleAddToCart}
                  >
                    + Keranjang
                  </button>
                  <button className="border border-green-600 text-green-600 font-semibold py-2 rounded hover:bg-green-50">
                    Beli Langsung
                  </button>
                </div>

                {/* Buyer Reviews */}
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-2">Buyer reviews</h3>

                  {/* Rating Summary */}
                  <div className="flex items-center gap-2 text-yellow-600 text-xl font-semibold">
                    ⭐ {product.rating?.toFixed(1) ?? "0"}/5,0
                    <span className="text-sm text-gray-600 font-normal">
                      {product.reviews?.length ?? 0} ratings •{" "}
                      {product.reviews?.length ?? 0} reviews
                    </span>
                  </div>

                  {/* Rating Breakdown (dummy) */}
                  <div className="mt-4 space-y-1 text-sm text-gray-600">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="w-6">{star}★</span>
                        <div className="bg-gray-200 rounded w-full h-2 relative">
                          <div
                            className="bg-yellow-400 h-2 rounded absolute"
                            style={{ width: `${Math.random() * 100}%` }} // Ganti dengan logic asli nanti
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-10">
                  <h4 className="text-base font-bold mb-4">Comment</h4>

                  {product.reviews?.map((review) => (
                    <div key={review.id} className="mb-4 border-b pb-4">
                      <div className="flex items-center gap-2 text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      <div className="text-sm font-semibold mt-1">
                        {review.user.name}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {review.review}
                      </p>
                    </div>
                  ))}

                  {product.reviews?.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      Belum ada komentar.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 mt-10 border-t pt-6">
            © 2025 Karya Rasa. All Right Reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
