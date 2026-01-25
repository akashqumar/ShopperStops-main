import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import logo from "../assets/images/logo.svg";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  Squares2X2Icon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "text-brand-600 bg-brand-50" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex items-center min-w-0">
          <NavLink to="/" className="flex shrink-0 items-center max-w-[140px] sm:max-w-[160px]">
            <img src={logo} className="h-8 w-auto" alt="ShopperStops" />
          </NavLink>
        </div>

        {/* Center: Search (hidden on small) */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <SearchInput />
        </div>

        {/* Right: Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>
            <HomeIcon className="h-4 w-4" /> Home
          </NavLink>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Squares2X2Icon className="h-4 w-4" /> Categories
              <ChevronDownIcon className="h-3.5 w-3.5" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-xl bg-white shadow-card-hover border border-slate-200/80 py-2 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/category"
                      className={`block px-4 py-2.5 text-sm ${active ? "bg-slate-50" : ""} text-slate-700 hover:text-brand-600`}
                    >
                      All Categories
                    </Link>
                  )}
                </Menu.Item>
                {categories?.map((c) => (
                  <Menu.Item key={c.slug}>
                    {({ active }) => (
                      <Link
                        to={`/category/${c.slug}`}
                        className={`block px-4 py-2.5 text-sm ${active ? "bg-slate-50" : ""} text-slate-700 hover:text-brand-600`}
                      >
                        {c.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <NavLink to="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <ShoppingCartIcon className="h-5 w-5" />
            Cart
            {cart?.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent-500 px-1.5 text-xs font-bold text-white">
                {cart.length}
              </span>
            )}
          </NavLink>

          {!auth?.user ? (
            <>
              <NavLink to="/register" className="btn-ghost">
                Register
              </NavLink>
              <NavLink to="/login" className="btn-primary ml-1">
                Login
              </NavLink>
            </>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                <UserCircleIcon className="h-5 w-5" />
                {auth?.user?.name}
                <ChevronDownIcon className="h-3.5 w-3.5" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-card-hover border border-slate-200/80 py-2 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className={`block px-4 py-2.5 text-sm ${active ? "bg-slate-50" : ""} text-slate-700`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 ${active ? "bg-red-50" : ""}`}
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>

        {/* Mobile: Search (optional) + Cart + Menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <NavLink to="/cart" className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100">
            <ShoppingCartIcon className="h-6 w-6" />
            {cart?.length > 0 && (
              <span className="absolute top-0.5 right-0.5 h-4 min-w-[1rem] flex items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </NavLink>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <SearchInput />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            <HomeIcon className="h-4 w-4" /> Home
          </NavLink>
          <Link to="/category" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
            <Squares2X2Icon className="h-4 w-4" /> All Categories
          </Link>
          {categories?.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 pl-8"
              onClick={() => setMobileOpen(false)}
            >
              {c.name}
            </Link>
          ))}
          {!auth?.user ? (
            <div className="flex gap-2 pt-2">
              <NavLink to="/register" className="btn-ghost flex-1" onClick={() => setMobileOpen(false)}>Register</NavLink>
              <NavLink to="/login" className="btn-primary flex-1" onClick={() => setMobileOpen(false)}>Login</NavLink>
            </div>
          ) : (
            <>
              <Link
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircleIcon className="h-4 w-4" /> Dashboard
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
                <ArrowRightOnRectangleIcon className="h-4 w-4" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
