"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import pec from "./pec-logo.png";
import { redirect, usePathname } from "next/navigation";
import Cookies from "js-cookie";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const path = usePathname();
  const user = Cookies.get("username");

  useEffect(() => {
    if (!user) {
      return;
    }
  }, [path]);

  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("username");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div>
      <nav className="bg-gray-100 shadow-l">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <a
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <Image src={pec} height="45" className="mr-10" />
                  <span className="font-bold">Exam Registration</span>
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/"
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  Home
                </a>
                <a
                  href="/Exams"
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  Exams
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {user ? (
                <>
                  <span className="py-5 text-black px-3">Hello , {user}</span>
                  <button
                    onClick={handleSignOut}
                    className="py-2 px-3 bg-red-400 hover:bg-red-300 text-red-900 hover:text-red-800 rounded transition duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a href="/Login" className="py-5 text-black px-3">
                    Login
                  </a>
                  <a
                    href="/SignUp"
                    className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                  >
                    Signup
                  </a>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                className="mobile-menu-button text-black"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "" : "hidden"}`}>
          <a
            href="/"
            className="block py-2 text-black px-4 text-sm hover:bg-gray-200"
          >
            Home
          </a>
          <a
            href="/Exams"
            className="block py-2 px-4 text-black text-sm hover:bg-gray-200"
          >
            Exams
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
