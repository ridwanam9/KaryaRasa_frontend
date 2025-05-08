import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';


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
          <div className="border rounded-xl border-black bg-gray-200 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
            <div className="inline-block relative mb-5">
              <div className="absolute inset-y-0 right-0 z-50 flex items-center px-2">
                <svg className="h-4 w-4 color-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
                    <Dropdown label="Select Address" inline={false} dismissOnClick={true} floatingArrow={true}  arrowIcon={false} className="w-max block pointer-events-auto bg-black border border-gray-400 px-4 py-1 pr-8 rounded text-sm"
                      defaultValue=""
                      onChange={e => setAddress((e.target as HTMLSelectElement).value)}
                    >
                      <DropdownItem value="" disabled>Select Address</DropdownItem>
                      {[].map(string => (
                        <DropdownItem key={string} value={string}>{string}</DropdownItem>
                      ))}
                    </Dropdown>
                    
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
            <input 
              type="text" 
              className="my-2 w-full p-2 border rounded" 
              placeholder="Province" 
              value={province} 
              onChange={e => setProvince(e.target.value)} 
            />
            <input 
              type="text" 
              className="my-2 w-full p-2 border rounded" 
              placeholder="Postal Code" 
              value={postalCode} 
              onChange={e => setPostalCode(e.target.value)} 
            />
            <input 
              type="text" 
              className="my-2 w-full p-2 border rounded" 
              placeholder="Phone Number" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
            />
            <button className="bg-blue-600 text-white rounded my-2 px-4 py-2">Add to Address List</button>
          </div>
          <div className="border rounded-xl border-black bg-gray-200 p-4 rounded height-50">
            <h2 className="text-lg font-bold mb-5">Payment Method</h2>
            <div className="inline-block relative mb-5">
            <Dropdown label="Select" inline={false} dismissOnClick={true} floatingArrow={true} arrowIcon={false} className='block pointer-events-auto bg-white border align-center border-gray-300 px-4 py-1 pr-8 rounded text-sm'>
              <DropdownItem value="credit card" className='z-10 focus:outline-none transition-opacity duration-100 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white w-max block pointer-events-auto bg-black border border-gray-400 mb-2 px-4 py-1 pr-8 rounded text-sm'>Credit Card</DropdownItem>
              <DropdownItem value="debit card" className='z-10 focus:outline-none transition-opacity duration-100 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white w-max block pointer-events-auto bg-black border border-gray-400 mb-2 px-4 py-1 pr-8 rounded text-sm'>Debit Card</DropdownItem>
              <DropdownItem value="qris" className='z-10 focus:outline-none transition-opacity duration-100 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white w-max block pointer-events-auto bg-black border border-gray-400 mb-2 px-4 py-1 pr-8 rounded text-sm'>QRIS</DropdownItem>
            </Dropdown>
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
            </div>
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
              <button className="bg-blue-600 text-white rounded px-4 py-2 mt-2">Use Voucher</button>
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
          <button className="bg-blue-600 text-white rounded px-8 py-2 mt-4">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;