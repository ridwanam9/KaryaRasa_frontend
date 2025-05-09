import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';
import { FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

interface Product {
  id: number;
  name: string;
  sellerName: string;
  type: string;
  price: number;
  image_url: string;
  quantity: 1; // Default quantity
}

interface Address {
  title: string;
  fullName: string;
  details: string;
  city: string,
  isDefault?: boolean; // Added isDefault property
}

const CheckoutPage = () => {
  const [addressDetails, setAddressDetails] = useState<Address[]>([
    {title: 'Home', fullName:'xx', details: '123 Main Street, Apt 4B', city: 'San Francisco', isDefault: true },
  ]);

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  const productIds = [1, 2, 3]; // Example product IDs

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
          sellerName: res.data.data.sellerName || 'Unknown Seller', // Default value if missing
          type: res.data.data.type || 'Unknown Type', // Default value if missing
          price: res.data.data.price,
          image_url: res.data.data.image_url,
          quantity: res.data.data.quantity,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productIds]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const responses = await Promise.all(
          addressDetails.map(id =>
            axios.get(`https://dying-helli-ridwanam9-4b98d171.koyeb.app/products/${id}`)
          )
        );
        const fetchedAddress = responses.map(res => ({
          id: res.data.data.id,
          title: res.data.data.title || 'Untitled', // Default value if missing
          fullName: res.data.data.name,
          details: res.data.data.details,
          city: res.data.data.city,
          isDefault: res.data.data.isDefault || false, // Default value if missing
        }));
        setAddressDetails(fetchedAddress);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [addressDetails]);


  const handleAddAddress = () => {
    router.push('/address-list');
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

  const discount = voucherCode === discountCode ? calculateItemTotal() * discountPercentage : 0;
  const itemTotal = calculateItemTotal();
  const subTotal = itemTotal - discount + (isGift ? giftWrapPrice : 0);
  const serviceCharge = 0.07 * subTotal; // service charge percentage
  const taxCharge = 0.1 * subTotal; // tax charge percentage
  const ShoppingTotal= subTotal - discount + serviceCharge + taxCharge; // total amount after applying discount and adding service and tax charges
  
  const clearVoucherCode = () => {
    setVoucherCode('');
    setVoucherError(null); // Clear any previous error
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error loading products</div>;


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-5 p-6 bg-white rounded shadow-md">
        <h1 className="flex text-2xl font-bold mb-6 pl-5 text-center">Checkout</h1>

        {/* Cart Items */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-black-200 bg-gray-200 rounded-lg overflow-auto shadow-lg mt-6 mb-4 col-span-2">
            {products.map(item => (
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
                    <div className="text-right font-medium mb-6">{`Rp. ${item.price * item.quantity}`}</div>
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
            <div className="border rounded-xl border-black bg-gray-200 p-4">
              <h2 className="text-lg font-bold mb-0">Delivery Address</h2>
              
              {/* Fixed Address Dropdown Section */}
              <div className='flex justify-between items-center my-5'>
                <div className="relative flex-grow mr-2">
                  <Dropdown 
                    label="Select Address" 
                    inline={false} 
                    dismissOnClick={true} 
                    floatingArrow={true} 
                    arrowIcon={true}
                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 text-sm"
                  >
                    <DropdownItem value="" disabled>Select Address</DropdownItem>
                    {addressDetails.map(address => (
                      <React.Fragment key={address.title}>
                        <DropdownItem value={address.title}>{address.title}</DropdownItem>
                        <DropdownDivider />
                      </React.Fragment>
                    ))}
                  </Dropdown>
                </div>
                
                <button 
                  id='addAddressButton'
                  className="bg-blue-600 text-white rounded px-4 py-2 text-sm whitespace-nowrap"
                  onClick={handleAddAddress}
                >
                  Add Address List
                </button>
              </div>
              
              <hr className='w-full border-top-3 border-gray-900 mt-10'></hr>
              
              {/* Address Details */}
              {addressDetails.map(address => (
              <React.Fragment key={address.title}>
              <div>
                <h2 className="text-sm font-medium mb-0 pl-3">Full Name</h2>
              <input
                type="text"
                className="my-2 w-full p-2 border-gray-500 rounded shadow-lg"
                placeholder="Full Name"
                value={address.fullName}
                disabled={true}
              />
              </div>
              <div>
                <h2 className="text-sm font-medium mb-0 pl-3">Address</h2>
              <input
                type="text"
                className="my-2 w-full p-2 border-gray-500 rounded shadow-lg"
                placeholder="Address"
                value={address.details}
                disabled={true}
              />
              </div>
              <div>
                <h2 className="text-sm font-medium mb-0 pl-3">City</h2>
              <input
                type="text"
                className="my-2 w-full p-2 border-gray-500 rounded shadow-lg"
                placeholder="City"
                value={address.city}
                disabled={true}
              />
              </div>
              </React.Fragment>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="border rounded-xl border-black bg-gray-200 py-4">
            <h2 className="text-lg font-bold mb-5 px-4">Payment Method</h2>
            <div className="relative mb-5 px-4">
              <Dropdown 
                label="Select" 
                inline={false} 
                dismissOnClick={true} 
                floatingArrow={true} 
                arrowIcon={true}
                className="bg-white border border-gray-300 px-4 py-2 rounded text-sm"
              >
                <DropdownItem value="credit card">Credit Card</DropdownItem>
                <DropdownItem value="debit card">Debit Card</DropdownItem>
                <DropdownItem value="qris">QRIS</DropdownItem>
              </Dropdown>
            </div>
            
            {/* Voucher Input Section */}
            <div className="w-full mb-4">
              <hr className='w-full border-top-3 border-gray-900 mt-10'></hr>
              <div className="flex space-x-2 justify-between items-center px-4 mb-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 mt-10 text-sm flex-grow"
                  placeholder="Add voucher code here..."
                  value={voucherCode}
                  onChange={e => setVoucherCode(e.target.value)}
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
                className="bg-blue-600 text-white rounded-full px-4 py-2 mt-10 text-sm whitespace-nowrap">
                  Use Voucher
                </button>
                {voucherError && <div className="text-red-500 text-sm mt-2">{voucherError}</div>}
                {voucherCode && !voucherError && (
                  <div className="text-green-500 text-sm mt-2">Voucher applied successfully!</div>
                )}                  
              </div>

              <hr className='w-full border-top-3 border-gray-900 mt-10'></hr>
                   
              {/* Shopping Summary Section */}
              <div className="border p-4 rounded mt-4 mx-4">
                <h2 className="text-lg font-bold mb-4">Shopping Summary</h2>
                  <div className="text-right">
                  <div className="text-sm">Subtotal : Rp.{subTotal.toLocaleString("id-ID")}</div>
                  <div className="text-sm">Service Charge : Rp.{serviceCharge.toLocaleString("id-ID")}</div>
                  <div className="text-sm">TAX : Rp.{taxCharge.toLocaleString("id-ID")}</div>
                  <div className="text-sm font-semibold">Grand Total : Rp.{ShoppingTotal.toLocaleString("id-ID")}</div>
                </div>
                <button 
                  className="bg-blue-600 text-white rounded-full px-8 py-2 mt-2"
                  onClick={() =>{alert('Successfully purchased!');
                  router.push("/#")}}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;