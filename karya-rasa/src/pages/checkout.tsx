import React, { useState } from 'react';
import Navbar from "@/components/Navbar"; // Assuming Navbar is in the components folder

const CheckoutPage = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  
  // Sample state for checkout items
  const checkoutItems = [
    {
      id: 1,
      sellerName: "Seller 1",
      productName: "Product 1",
      productType: "Type A",
      price: "Rp. 100.000",
    },
    {
      id: 2,
      sellerName: "Seller 2",
      productName: "Product 2",
      productType: "Type B",
      price: "Rp. 200.000",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-12 p-6 bg-white rounded shadow-md pt-40">
        <h1 className="flex text-2xl font-bold mb-6 pl-5 text-center">Checkout</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border rounded-xl border-black-400 bg-gray-200 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
            <div className="inline-block relative">
                    <select 
                      className="block appearance-none pointer-events-auto bg-white border border-gray-300 px-4 py-1 pr-8 rounded text-sm"
                      defaultValue=""
                      onChange={e => setAddress(e.target.value)}
                    >
                      <option value="" disabled>Select Address</option>
                      {[].map(string => (
                        <option key={string} value={string}>{string}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Address" 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="City" 
              value={city} 
              onChange={e => setCity(e.target.value)} 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Province" 
              value={province} 
              onChange={e => setProvince(e.target.value)} 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Postal Code" 
              value={postalCode} 
              onChange={e => setPostalCode(e.target.value)} 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Phone Number" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
            />
            <button className="bg-blue-500 text-white rounded px-4 py-2">Add to Address List</button>
          </div>
          
          <div className="border p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Credit Card" 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="Debit Card" 
            />
            <input 
              type="text" 
              className="mb-2 w-full p-2 border rounded" 
              placeholder="QRis" 
            />
            <div className="mb-4">
                <hr className='w-full border-top-3 border-gray-900 mt-10'>
                </hr>
                <input 
                    type="text" 
                    className="mt-10 mx-10 w-50 p-4 border rounded" 
                    placeholder="Add voucher code here..." 
                    value={voucherCode} 
                    onChange={e => setVoucherCode(e.target.value)} 
                />
              <button className="bg-blue-500 text-white rounded px-4 py-2 mt-2">Use Voucher</button>
              <hr className='w-full border-top-3 border-gray-900 mt-10'>
                </hr>
            </div>
          </div>
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Shopping Summary</h2>
          {checkoutItems.map(item => (
            <div className="flex justify-between items-center border-b py-2" key={item.id}>
              <span>{item.sellerName}</span>
              <span>{item.productName} ({item.productType})</span>
              <span>{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between items-center font-bold mt-4">
            <span>Shopping Total</span>
            <span>Rp. xxx.xxx</span>
          </div>
          <button className="bg-blue-500 text-white rounded px-8 py-2 mt-4">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;