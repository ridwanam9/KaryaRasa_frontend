"use client";

import Image from "next/image";
import Link from "next/link";
import LoginPage from "@/pages/login";
import { useState } from "react";
import { 
    FaHeart, 
    FaBell, 
    FaShoppingCart, 
    FaQuestionCircle, 
    FaUser, 
    FaBars, 
    FaSearch 
} from "react-icons/fa";

const Navbar = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    return (
        <nav>
            <div className="logo">
                <Image src="/KR.png" alt="Karya Rasa Logo" width={100} height={100} />
            </div>

            <div className="search-bar">
                <FaBars className="mr-2" />
                <input 
                type="text" 
                placeholder="Search for anything"
                className="flex-1 bg-transparent focus:outline-none text-gray-700"
                />
                <FaSearch className="ml-2" />
            </div>

            <div className="icon-group">
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

            {showNotification &&(
                <div className="notification-popup">
                    <h3>Notifikasi</h3>
                    <p>Tidak ada transaksi baru.</p>
                </div>
            )}

            {showLogin && (
                <div className="login-popup">
                    <LoginPage />
                </div>
            )}
        </nav>
    );
};

export default Navbar;