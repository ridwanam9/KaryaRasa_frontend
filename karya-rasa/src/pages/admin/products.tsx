import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
};

const PRODUCTS_PER_PAGE = 5;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/products/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed Load Products");
        return res.json();
      })
      .then((json) => {
        if (json && Array.isArray(json.data)) {
          setProducts(json.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const scrollByWidth = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (loading) return <p className="text-gray-600 text-sm">Loading products...</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (products.length === 0) return <p className="text-gray-600 text-sm">No products found.</p>;

  return (
    <div>
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={() => scrollByWidth(-240)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10 shadow"
        >
          <i className="fas fa-chevron-left text-gray-700"></i>
        </button>
        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
          style={{ scrollPaddingLeft: "1rem" }}
        >
          {paginatedProducts.map((product) => {
            const priceFormatted = product.price
              ? `Rp ${product.price.toLocaleString("id-ID")}`
              : "N/A";
            const imgSrc =
              product.image_url && product.image_url.startsWith("http")
                ? product.image_url
                : "https://placehold.co/200x150?text=No+Image";
            return (
              <div
                key={product.id}
                className="flex-none w-56 bg-white border border-gray-300 rounded-lg shadow-sm p-4 mr-4 last:mr-0 snap-start"
              >
                <Image
                src={
                    product.image_url && product.image_url.startsWith("http")
                    ? product.image_url
                    : "https://placehold.co/200x150?text=No+Image"
                }
                alt={product.name}
                width={200}
                height={150}
                className="rounded mb-3 object-cover"
                />

                <h3
                  className="text-gray-900 font-semibold text-md mb-1 truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs mb-1 truncate" title={product.category}>
                  {product.category}
                </p>
                <p className="text-orange-700 font-semibold text-sm mb-1">{priceFormatted}</p>
                <p className="text-gray-500 text-xs">Stock: {product.stock}</p>
              </div>
            );
          })}
        </div>
        <button
          aria-label="Next"
          onClick={() => scrollByWidth(240)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10 shadow"
        >
          <i className="fas fa-chevron-right text-gray-700"></i>
        </button>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-orange-700 text-white border-orange-700"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}