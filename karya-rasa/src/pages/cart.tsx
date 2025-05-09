// src/pages/cart.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

const ShoppingCartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const productIds = [1, 2, 3]; // Example product IDs

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          productIds.map(id => 
            axios.get(`https://dying-helli-ridwanam9-4b98d171.koyeb.app/products/${id}`)
          )
        );
        const fetchedProducts = responses.map(res => ({
          id: res.data.data.id,
          name: res.data.data.name,
          price: res.data.data.price,
          image_url: res.data.data.image_url,
          quantity: 1, // Default quantity
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products", error);
        setError("failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productIds]);

  const handleRemove = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  const [voucherCode, setVoucherCode] = useState('');
  const [isGift, setIsGift] = useState(false);
  const giftWrapPrice = 50000;
  const discountCode = 'Karyarasa20'; // Example discount code
  const discountPercentage = 0.2; // Example discount percentage
  const [voucherError, setVoucherError] = useState<string | null>(null);


  const calculateItemTotal = () => {
      return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  };

  const applyVoucher = () => {
    if (voucherCode === discountCode) {
      setVoucherError(null); // Clear any previous error
    } else {
      setVoucherError("Voucher is invalid");
    }
  };

  const discount = voucherCode === discountCode ? calculateItemTotal() * discountPercentage : 0; // Apply discount if voucher is present
  const itemTotal = calculateItemTotal();
  const subTotal = itemTotal - discount + (isGift ? giftWrapPrice : 0);

  const clearVoucherCode = () => {
        setVoucherCode('');
        setVoucherError(null); // Clear any previous error
    };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>; // Display error

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto w-full pt-5">
        <div className="border border-black-200 bg-gray-200 rounded-lg overflow-hidden shadow-lg mt-6 mb-4 max-w-6xl mx-auto">
          {products.map(item => (
            <React.Fragment key={item.id}>
              {/* Seller's name top */}
              <div className="flex px-4 py-2 border-b border-gray-200">
                <div className="text-sm text-gray-700">{item.name}</div>
              </div>
              
              {/* Product Row */}
              <div className="flex items-center px-4 py-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-center text-xs ml-5 mr-10">
                  <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
                </div>
                
                {/* Product Info */}
                <div className="flex-grow">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500 mb-4">Price: Rp {item.price.toLocaleString("id-ID")}</div>
                  <div className="font-medium">Quantity: {item.quantity}</div>
                </div>
                
                {/* Price and Remove Icon */}
                <div className="flex flex-col items-end">
                  <div className="text-right font-medium mb-6">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash style={{ fontSize: 20 }} />
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {/* Checkout Summary */}
        <div className="mt-4 mb-6 bg-gray-200 rounded-lg border border-grey-200 p-6">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            {/* Voucher Input */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add voucher code here..."
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm flex-grow"
                />
                {voucherCode && (
                        <button
                            onClick={clearVoucherCode}  
                            className="text-gray-600 hover:text-gray-800"
                            title="Clear Voucher Code"
                        >
                            <IoIosClose style={{ fontSize: 20 }} />
                        </button>
                    )}
                <button 
                onClick={applyVoucher}
                className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm">
                  Use Voucher
                </button>
              </div>
              {voucherError && <div className="text-red-500 text-sm mt-2">{voucherError}</div>}
              {voucherCode && !voucherError && (
                <div className="text-green-500 text-sm mt-2">Voucher applied successfully!</div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="w-full md:w-1/2 flex flex-col items-end">
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="gift"
                  checked={isGift}
                  onChange={() => setIsGift(!isGift)}
                  className="mr-2"
                />
                <label htmlFor="gift" className="text-sm">Mark order as a gift (Rp {giftWrapPrice.toLocaleString("id-ID")})</label>
              </div>
              <div className="text-right">
                <div className="text-sm">Item's total : Rp.{itemTotal.toLocaleString("id-ID")}</div>
                <div className="text-sm">Discount : Rp.{discount.toLocaleString("id-ID")}</div>
                <div className="text-sm font-semibold">Sub total : Rp.{subTotal.toLocaleString("id-ID")}</div>
              </div>
              <button 
                className="bg-blue-600 text-white rounded-full px-8 py-2 mt-2"
                onClick={() =>{alert('Proceeding to Checkout Page');
                router.push("/checkout")}}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
  </div>
  </>
  );
};

export default ShoppingCartPage;
