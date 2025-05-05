// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import LoginPage from "@/pages/login";
// import RegisterPage from "@/pages/register";
// import { useState } from "react";
// import {
//     FaHeart,
//     FaBell,
//     FaShoppingCart,
//     FaQuestionCircle,
//     FaUser,
//     FaBars,
//     FaSearch
// } from "react-icons/fa";

// const Navbar = () => {
//     const [showNotification, setShowNotification] = useState(false);
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);

//     const toggleNotification = () => {
//         setShowNotification(!showNotification);
//     };

//     const toggleLogin = () => {
//         setShowLogin(!showLogin);
//     };

//     return (
//         <nav>
//             <div className="logo">
//                 <Image src="/KR.png" alt="Karya Rasa Logo" width={100} height={100} />
//             </div>

//             <div className="search-bar">
//                 <FaBars className="mr-2" />
//                 <input
//                 type="text"
//                 placeholder="Search for anything"
//                 className="flex-1 bg-transparent focus:outline-none text-gray-700"
//                 />
//                 <FaSearch className="ml-2" />
//             </div>

//             <div className="icon-group">
//                 <Link href="/favorite">
//                     <FaHeart />
//                 </Link>

//                 <button onClick={toggleNotification}>
//                     <FaBell />
//                 </button>

//                 <Link href="/cart">
//                     <FaShoppingCart />
//                 </Link>

//                 <a
//                 href="https://www.instagram.com/rrewsgi_18/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 >
//                     <FaQuestionCircle />
//                 </a>

//                 <button onClick={toggleLogin}>
//                     <FaUser />
//                 </button>
//             </div>

//             {showNotification &&(
//                 <div className="notification-popup">
//                     <h3>Notifikasi</h3>
//                     <p>Tidak ada transaksi baru.</p>
//                 </div>
//             )}

//             {showLogin && (
//                 <div>
//                 <LoginPage onSwitch={() => {
//                   setShowLogin(false);
//                   setShowRegister(true);
//                 }} />
//               </div>
//             )}

//             {showRegister && (
//                 <div>
//                 <RegisterPage onSwitch={() => {
//                   setShowLogin(true);
//                   setShowRegister(false);
//                 }} />
//               </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;

"use client";

import Image from "next/image";
import Link from "next/link";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import { useState } from "react";
import {
  FaHeart,
  FaBell,
  FaShoppingCart,
  FaQuestionCircle,
  FaUser,
  FaBars,
  FaSearch,
} from "react-icons/fa";

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      {/* Navbar Section */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="logo">
          <Image src="/KR.png" alt="Karya Rasa Logo" width={100} height={100} />
        </div>

        <div className="search-bar flex items-center border rounded px-2 py-1 w-1/2">
          <FaBars className="mr-2" />
          <input
            type="text"
            placeholder="Search for anything"
            className="flex-1 bg-transparent focus:outline-none text-gray-700"
          />
          <FaSearch className="ml-2" />
        </div>

        <div className="icon-group flex space-x-4 items-center text-xl">
          <Link href="/favorite">
            <FaHeart />
          </Link>
          <button onClick={toggleNotification}>
            <FaBell />
          </button>
          <Link href="/cart">
            <FaShoppingCart />
          </Link>
          <a
            href="https://www.instagram.com/rrewsgi_18/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaQuestionCircle />
          </a>
          <button onClick={toggleLogin}>
            <FaUser />
          </button>
        </div>
      </nav>

      {/* Notification Popup */}
      {showNotification && (
        <div className="absolute top-20 right-10 bg-white border p-4 rounded shadow-md z-40">
          <h3 className="font-bold text-lg">Notifikasi</h3>
          <p className="text-sm">Tidak ada transaksi baru.</p>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white p-6 top-10 bottom-5 rounded shadow-lg w-full max-w-md relative max-h-screen overflow-y-auto scrollbar-width-none ::-webkit-scrollbar-none">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-lg font-medium hover:text-lg hover:font-bold"
            >
              ✕
            </button>
            <LoginPage
              onSwitch={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-hidden">
          <div className="bg-white p-6 top-10 rounded shadow-lg w-full max-w-md relative max-h-screen overflow-y-auto scrollbar-width-none">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-2 text-lg font-medium hover:text-lg hover:font-bold"
            >
              ✕
            </button>
            <RegisterPage
              onSwitch={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
