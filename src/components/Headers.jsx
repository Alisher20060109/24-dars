import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Link o'rniga NavLink ishlatamiz
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuShoppingCart, LuMenu, LuX } from "react-icons/lu";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Aktiv linklar uchun umumiy stil funksiyasi
  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-black font-bold underline underline-offset-4"
      : "text-gray-700 hover:text-black transition-colors";

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        {/* Top promo bar */}
        <div className="bg-black text-white">
          <div className="relative mx-auto flex h-10 max-w-7xl items-center justify-center px-4">
            <p className="text-center text-xs sm:text-sm">
              Sign up and get 20% off to your first order.{" "}
              <NavLink to="/auth" className="underline underline-offset-2 font-semibold">
                Sign Up Now
              </NavLink>
            </p>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded p-1 text-white/80 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        {/* Main navbar */}
        <div className="border-b bg-white">
          <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-4 sm:gap-6">
            {/* Mobile: hamburger */}
            <button
              className="rounded p-2 text-gray-900 hover:bg-gray-100 md:hidden"
              onClick={() => setOpen(true)}
            >
              <LuMenu className="h-6 w-6" />
            </button>

            {/* Logo - Bosh sahifaga */}
            <NavLink to="/" className="text-2xl font-black tracking-tight">
              SHOP.CO
            </NavLink>

            {/* Nav links (Desktop) */}
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <NavLink to="/" className={activeStyle}>
                Home <span className="text-gray-400">▾</span>
              </NavLink>
              <NavLink to="/filter" className={activeStyle}>
                filter
              </NavLink>
              <NavLink to="/cart" className={activeStyle}>
                Cart
              </NavLink>
              <NavLink to="/product/:id" className={activeStyle}>
                Singl
              </NavLink>
            </nav>

            {/* Search (Desktop) */}
            <div className="hidden flex-1 items-center md:flex">
              <div className="relative w-full max-w-2xl">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <CiSearch className="h-6 w-6" />
                </span>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="h-12 w-full rounded-full bg-gray-100 pl-11 pr-4 text-sm outline-none"
                />
              </div>
            </div>

            {/* Right icons */}
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              <button className="rounded p-2 text-gray-900 hover:bg-gray-100 md:hidden">
                <CiSearch className="h-6 w-6" />
              </button>

              <NavLink to="/cart" className={activeStyle}>
                <LuShoppingCart className="h-6 w-6 text-gray-900" />
              </NavLink>

              <NavLink to="/profile" className={activeStyle}>
                <FaRegCircleUser className="h-6 w-6 text-gray-900" />
              </NavLink>
            </div>
          </div>

          {/* Mobile menu (Sidebar) */}
          <div className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
            <div
              onClick={() => setOpen(false)}
              className={`fixed inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
            />
            <div className={`fixed left-0 top-0 h-full w-80 bg-white p-4 shadow-xl transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black">SHOP.CO</span>
                <button className="rounded p-2" onClick={() => setOpen(false)}>
                  <LuX className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-4 text-lg font-medium">
                <NavLink to="/" onClick={() => setOpen(false)} className={activeStyle}>Home</NavLink>
                <NavLink to="/filter" onClick={() => setOpen(false)} className={activeStyle}>Filter</NavLink>
                <NavLink to="/cart" onClick={() => setOpen(false)} className={activeStyle}>Cart</NavLink>
                <NavLink to="/product/:id" onClick={() => setOpen(false)} className={activeStyle}>Brands</NavLink>
                <hr className="my-2" />
                <NavLink to="/cart" onClick={() => setOpen(false)} className={activeStyle}>My Cart</NavLink>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="pt-30" />
    </>
  );
}