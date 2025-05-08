import React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  seller: string;
  price: number;
  image_url: string;
}
  

const ShoppingCartPage = () => {
  const [cartItems] = useState([
    {
      id: 1,
      sellerName: "Seller name's",
      productName: "Product's Name",
      productType: "Type,etc.",
      price: "Price",
      quantity: 1
    },
    {
      id: 2,
      sellerName: "Seller name's",
      productName: "Product's Name",
      productType: "Type,etc.",
      price: "Price",
      quantity: 1
    }
  ]);

  const [checked, setChecked] = React.useState(false);
    const handleCheckboxChange = () => {
        setChecked(!checked);
    };
  
  return (
    <>
    <Navbar />

{/* Cart Container - Without extra space */}
  <div className="max-w-7xl mx-auto w-full pt-40">
        {/* Cart Items */}
        <div className="border border-black-200 bg-gray-200 rounded-lg overflow-hidden shadow-lg mt-6 mb-4 max-w-6xl mx-auto">
          {cartItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Seller's name top */}
              <div className="flex px-4 py-2 border-b border-gray-200">
                <input type='checkbox' className="mr-2" onChange={handleCheckboxChange} />
                <div className="text-sm text-gray-700">{item.sellerName}</div>
              </div>
              
              {/* Product Row */}
              <div className="flex items-center px-4 py-4">
                <div>
                    <input type='checkbox' className="mr-2" />
                </div>
                {/* Product Image */}
                <div className="sw-24 h-24 bg-gray-200 flex items-center justify-center text-center text-xs ml-5 mr-10">
                  <div className="text-center">
                    <div>Product</div>
                    <div>Img</div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="flex-grow">
                  <div className="font-medium">{item.productName}</div>
                  <div className="text-sm text-gray-500 mb-4">{item.productType}</div>
                  
                  {/* Quantity Dropdown */}
                  <div className="inline-block relative">
                    <select 
                      className="block appearance-none bg-white border border-gray-300 px-4 py-1 pr-8 rounded text-sm"
                      defaultValue={1}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Price and Remove Icon */}
                <div className="flex flex-col items-end">
                  <div className="text-right font-medium mb-6">{item.price}</div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaTrash style={{ fontSize: 20 }} />
                  </button>
                </div>
              </div>
                  {/* Divider */}
                </React.Fragment>
              ))}
        </div>
        
        {/* Checkout Summary */}
        <div className="mt-4 mb-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-wrap md:flex-nowrap justify-between">
            {/* Voucher Input */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add voucher code here..."
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm flex-grow"
                />
                <button className="bg-blue-400 text-white rounded-full px-4 py-2 text-sm">
                  Use Voucher
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="w-full md:w-1/2 flex flex-col items-end">
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="gift"
                  className="mr-2"
                />
                <label htmlFor="gift" className="text-sm">Mark order as a gift (Rp.xxx.xxx)</label>
              </div>
              <div className="text-right">
                <div className="text-sm">Discount code : Rp.xxx.xxx</div>
                <div className="text-sm">Item's total : Rp.xxx.xxx</div>
                <div className="text-sm font-semibold">Sub total : Rp.xxx.xxx</div>
              </div>
              <button className="bg-blue-400 text-white rounded-full px-8 py-2 mt-2">
                Buy
              </button>
            </div>
          </div>
        </div>
  </div>
  </>
  );
};

export default ShoppingCartPage;