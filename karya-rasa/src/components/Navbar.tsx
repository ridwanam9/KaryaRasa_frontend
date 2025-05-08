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
    FaSearch
} from "react-icons/fa";

const Navbar = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCategories, setshowCategories] = useState(false);

    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const toggleCategories = () => {
        setshowCategories(!showCategories);
    };

    return (
        <nav>
            <div className="logo">
                <img src="/KR.png" alt="Karya Rasa Logo" width={100} height={100} />
            </div>

            <div className="search-bar">
                <button onClick={toggleCategories}>
                    <FaBars className="mr-2" />
                </button>
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
                <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <LoginPage
                            onSwitch={() => {
                                setShowLogin(false);
                                setShowRegister(true);
                            }}
                        />
                    </div>
                </div>
            )}

            {showRegister && (
                <div className="modal-overlay" onClick={() => setShowRegister(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <RegisterPage
                            onSwitch={() => {
                                setShowRegister(false);
                                setShowLogin(true);
                            }}
                        />
                    </div>
                </div>
            )}

            {showCategories && (
                <div className="modal-overlay" onClick={() => setshowCategories(false)}>
                    <div className="modal-content w-64" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold mb-4">Category</h3>
                        <ul className="space-y-2">
                            <li><Link href="/category/accessories">Accessories</Link></li>
                            <li><Link href="/category/art&collectibles">Art & Collectibles</Link></li>
                            <li><Link href="/category/clothing">Clothing</Link></li>
                            <li><Link href="/category/jewelry">Jewelry</Link></li>
                            <li><Link href="/category/craft-suplies&tools">Craft Supplies & Tools</Link></li>
                            <li><Link href="/category/toys&games">Toys & Games</Link></li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;