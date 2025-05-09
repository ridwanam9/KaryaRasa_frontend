"use client";

import Image from "next/image";
import Link from "next/link";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    FaHeart,
    FaBell,
    FaShoppingCart,
    FaQuestionCircle,
    FaUser,
    FaBars,
    FaSearch
} from "react-icons/fa";

interface UserData {
    name: string;
    // Sesuaikan dengan struktur data user dari API
}


const Navbar = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCategories, setshowCategories] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    
    const toggleNotification = () => {
        setShowNotification(!showNotification);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const toggleCategories = () => {
        setshowCategories(!showCategories);
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };

    // Fetch user jika token tersedia
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Unauthorized");
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch user:", err);
                    setUser(null);
                });
        }
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
            await fetch("https://dying-helli-ridwanam9-4b98d171.koyeb.app/users/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
            setShowUserDropdown(false);
        }
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
                href="https://wa.me/6289505024216?text=Halo%20Admin%2C%20ada%20sedikit%20pertanyaan%20yang%20perlu%20disampaikan."
                target="_blank"
                rel="noopener noreferrer"
                >
                    <FaQuestionCircle />
                </a>

                {user ? (
                    <div className="relative">
                    <button
                        className="text-sm font-semibold"
                        onClick={toggleUserDropdown}
                    >
                        Selamat datang, {user.name}
                    </button>
                    {showUserDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Purchase and Review
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Messages
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Create Your Shop
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Account Setting
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                ) : (
                    <button onClick={toggleLogin}>
                        <FaUser />
                    </button>
                )}
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
                            <li><Link href={{ pathname: "/product/product-list", query: { category: "Accessories"} }}>Accessories</Link></li>
                            <li><Link href={{ pathname: "/product/product-list", query: { category: "Art&Collectibles"} }}>Art & Collectibles</Link></li>
                            <li><Link href={{ pathname: "/product/product-list", query: { category: "Clothing"} }}>Clothing</Link></li>
                            <li><Link href={{ pathname: "/product/product-list", query: { category: "Jewelery"} }}>Jewelry</Link></li>
                            <li><Link href={{ pathname: "/product/product-list", query: { category: "Craft-Suplies&Tools"} }}>Craft Supplies & Tools</Link></li>
                            <li><Link href={{ pathname: "/product/product-list", query: { category: "Toys&Games"} }}>Toys & Games</Link></li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;