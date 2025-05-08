import React, { ReactNode, useRef } from "react";


type Props = {
  children: ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  username: string;
};

export default function AdminLayout({ children, currentTab, setCurrentTab, username }: Props) {
  const usernameInitial = username.charAt(0).toUpperCase();

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 flex flex-col p-6 min-h-screen">
        <div className="flex mb-10 space-x-3">
          <img
            alt="Admin logo"
            className="w-8 h-8"
            src="\KR.png"
            width={32}
            height={32}
          />
          <span className="font-semibold text-orange-700 text-lg">Dashboard</span>
        </div>
        <nav className="flex flex-col space-y-6 text-gray-600 text-sm">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("users");
            }}
            className={`flex space-x-3 cursor-pointer ${
              currentTab === "users" ? "text-orange-700 font-semibold" : "text-gray-600"
            }`}
          >
            <i className="fas fa-users"></i>
            <span>Data User</span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("sellers");
            }}
            className={`flex space-x-3 cursor-pointer ${
              currentTab === "sellers" ? "text-orange-700 font-semibold" : "text-gray-600"
            }`}
          >
            <i className="fas fa-store"></i>
            <span>Data Seller</span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab("products");
            }}
            className={`flex items-left space-x-3 cursor-pointer ${
              currentTab === "products" ? "text-orange-700 font-semibold" : "text-gray-600"
            }`}
          >
            <i className="fas fa-box"></i>
            <span>Produk</span>
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col p-6 overflow-auto">
        <header className="mb-6 flex justify-between items-center text-sm text-gray-500">
          <div></div>
          <div className="flex items-center space-x-6">
            <button onClick={() => window.print()} className="flex items-center space-x-1 hover:text-gray-700 transition-colors duration-200">
              <i className="fas fa-print"></i>
              <span>Print</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none">
              {usernameInitial}
            </div>
          </div>
        </header>

        <section
            // id="print-area"
            ref={printRef}
            className="flex-1 flex flex-col overflow-auto print:overflow-visible print:h-auto"
            >
            {children}
        </section>



        <footer className="mt-6 text-center text-gray-400 text-xs select-none">
          Karya Rasa, All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}