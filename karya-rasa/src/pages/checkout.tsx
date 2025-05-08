import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";
import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';
import { FaTrash } from "react-icons/fa";

type Product = {
  id: number;
  sellerName: string;
  name: string;
  type: string;
  price: string;
  quantity: number;
};

const CheckoutPage = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [voucherCode, setVoucherCode] = useState('');

  const router = useRouter();

  const handleAddAddress = () => {
    router.push('/address-list');
  };
  
  // Sample state for checkout items
  const checkoutItems = [
    {
      id: 1,
      sellerName: "Seller 1",
      name: "Product 1",
      type: "Type A",
      price: "Rp. 100.000",
      quantity: 1,
    },
    {
      id: 2,
      sellerName: "Seller 2",
      name: "Product 2",
      type: "Type B",
      price: "Rp.200.000",
      quantity: 3,
    }
  ];


  /* Calculate total price of all items in the cart */
  const totalPrice = checkoutItems.reduce((item) => {
    const itemPrice = Object.values(item.price)[0]; // Get the first value of the price object
    return
    item.price * item.quantity;
  }, 
);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-5 p-6 bg-white rounded shadow-md">
        <h1 className="flex text-2xl font-bold mb-6 pl-5 text-center">Checkout</h1>

      {/* Cart Items */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-black-200 bg-gray-200 rounded-lg overflow-auto shadow-lg mt-6 mb-4 col-span-2">
            {checkoutItems.map(item => (
              <React.Fragment key={item.id}>
                {/* Seller's name top */}
                <div className="flex px-4 py-2 border-b border-gray-200">
                  <div className="text-sm text-gray-700">{item.sellerName}</div>
                </div>
                
                {/* Product Row */}
                <div className="flex items-center px-4 py-4">
                  {/* Product Image */}
                  <div className="sw-24 h-24 bg-gray-200 flex items-center justify-center text-center text-xs ml-5 mr-10">
                    <div className="text-center">
                      <div>Product</div>
                      <div>Img</div>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-grow">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500 mb-4">{item.type}</div>
                    
                    {/* Quantity */}
                    <div className="inline-block relative">
                      qty : {item.quantity}
                    </div>
                  </div>
                  {/* Price and Remove Icon */}
                  <div className="flex flex-col items-end">
                    <div className="text-right font-medium mb-6">{item.total}</div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaTrash style={{ fontSize: 20 }} />
                    </button>
                  </div>
                </div>
                {/* Divider */}
              </React.Fragment>
            ))}
          </div>

        {/*Delivery Address Section */}
        <div className='col-span-1'>
          <div className="border rounded-xl border-black bg-gray-200 p-4 rounded">
            <h2 className="text-lg font-bold mb-0">Delivery Address</h2>
              <div className='flex flex-nowrap justify-between items-center content-center my-5'>
                <svg className="h-4 w-4 color-white translate(-100%,0%)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
                    <Dropdown label="Select Address" inline={false} dismissOnClick={true} floatingArrow={true}  arrowIcon={false} className="w-max block pointer-events-auto bg-black border border-gray-400 px-4 py-1 pr-8 rounded text-sm"
                      defaultValue=""
                      onChange={e => setAddress((e.target as HTMLSelectElement).value)}
                    >
                      <DropdownItem value="" disabled>Select Address</DropdownItem>
                      {[].map(string => (
                        <DropdownItem key={string} value={string}>{string}</DropdownItem>
                      ))}
                    </Dropdown>
                <button id='addAddressButton' 
                className="bg-blue-600 text-white rounded my-2 px-4 py-2"
                onClick={handleAddAddress}>
                  Add Address List
                </button>
            </div>
            <input 
              type="text" 
              className="my-2 w-full p-2 border rounded" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
            />
            <input 
              type="text" 
              className="my-2 w-full p-2 border rounded" 
              placeholder="Address" 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
            />
            <input 
              type="text" 
              className="my-2 w-full p-2 border rounded" 
              placeholder="City" 
              value={city} 
              onChange={e => setCity(e.target.value)} 
            />
          </div>
          </div>

          {/* Payment Method Section */}
          <div className="border rounded-xl border-black bg-gray-200 py-4 rounded">
            <h2 className="text-lg font-bold mb-5 px-4">Payment Method</h2>
            <div className="inline-block relative mb-5 px-4">
            <Dropdown label="Select" inline={false} dismissOnClick={true} floatingArrow={true} arrowIcon={false} className='block pointer-events-auto bg-white border align-center border-gray-300 px-5 py-1 pr-8 rounded text-sm ml-5 my-2'>
              <DropdownItem value="credit card" className='z-10 focus:outline-none transition-opacity duration-100 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white w-max block pointer-events-auto bg-black border border-gray-400 mb-2 px-4 py-1 pr-8 rounded text-sm'>Credit Card</DropdownItem>
              <DropdownItem value="debit card" className='z-10 focus:outline-none transition-opacity duration-100 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white w-max block pointer-events-auto bg-black border border-gray-400 mb-2 px-4 py-1 pr-8 rounded text-sm'>Debit Card</DropdownItem>
              <DropdownItem value="qris" className='z-10 focus:outline-none transition-opacity duration-100 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white w-max block pointer-events-auto bg-black border border-gray-400 mb-2 px-4 py-1 pr-8 rounded text-sm'>QRIS</DropdownItem>
            </Dropdown>
            <div className="absolute inset-y-0 right-0 flex items-center px-5">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
            </div>
            {/* Voucher Input Section */}
            <div className="w-full mb-4">
            <hr className='w-full border-top-3 border-gray-900 mt-10'></hr>
              <div className="flex space-x-5 justify-between items-center px-4 mb-4">
                <input 
                  type="text" 
                  className="border border-gray-300 rounded-half px-1 py-2 mt-10 text-sm flex-grow" 
                  placeholder="Add voucher code here..." 
                  value={voucherCode} 
                  onChange={e => setVoucherCode(e.target.value)} 
                />
                <button className="bg-blue-600 text-white rounded-full px-4 py-2 mt-10 text-sm">
                  Use Voucher
                </button>
              </div>
              <hr className='w-full border-top-3 border-gray-900 mt-10'></hr>
                    
            {/* Shopping Summary Section */}
            <div className="border p-4 rounded">
              <h2 className="text-lg font-bold mb-4">Shopping Summary</h2>
              {checkoutItems.map(item => (
                <div className="flex justify-between items-center border-b py-2" key={item.id}>
                  <span>{item.sellerName}</span>
                  <span>{item.productName} ({item.productType})</span>
                  <span>{item.quantity}</span>
                  <span>{item.price}</span>

                </div>
              ))}
              <div className="flex justify-between items-center font-bold mt-4">
                <span>Shopping Total</span>
                <span>Rp. xxx.xxx</span>
              </div>
              <button className="bg-blue-600 text-white rounded px-8 py-2 mt-4">Buy</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;