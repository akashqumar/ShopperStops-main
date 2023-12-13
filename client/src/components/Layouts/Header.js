import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { Badge, Dropdown } from "rsuite";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import logo from "../assets/images/logo.svg";
import shortlogo from "../assets/images/shortlogo.svg";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import { Fragment } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';

import { Button } from "@material-tailwind/react";

import { DrawerDefault } from "./Drawer";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();

  console.log(cart, "cart");

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <nav className="sticky top-0 z-10 bg-indigo-50 h-15 flex items-center justify-between px-6">
        <div className="flex items-center justify-between">
          <DrawerDefault />
          <NavLink to="/" className="navbar-brand">
            <div>
              <img src={logo} className="h-19 w-40 " alt="Logo" />
            </div>
            <div className="hidden">
              <img src={shortlogo} className="h-13 w-25" alt="Logo" />
            </div>
          </NavLink>
        </div>

        <div>
          <SearchInput />
        </div>
        <ul className="md:flex hidden items-center gap-4 pt-2.5">
        <li style={{ textAlign: "center" }}>
          <NavLink
            style={{ fontWeight: "bold", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
            to="/"
          >
            <HomeIcon style={{ marginRight: "4px" }} />
            HOME
          </NavLink>
        </li>

          <li>
          <Dropdown
            title={
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: "bold" }}>
                <CategoryIcon style={{ marginRight: '4px' }} />
                CATEGORIES
              </span>
            }
          >
            <Dropdown.Item>
              <Link to={`/category`} className="dropdown-item">
                All Category
              </Link>
            </Dropdown.Item>
            {categories?.map((c) => (
              <Dropdown.Item key={c.slug}>
                <Link to={`/category/${c.slug}`} className="dropdown-item">
                  {c.name}
                </Link>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </li>

          <li>
          <NavLink
            style={{ fontWeight: "bold", textDecoration: "none", position: "relative", display: "flex", alignItems: "center" }}
            to="/cart"
          >
            <ShoppingCartIcon style={{ marginRight: "4px" }} />
            CART {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "4px",
                  fontSize: "12px",
                }}
              >
                {cart.length}
              </span>
            )}
          </NavLink>
        </li>

          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink
                  style={{ fontWeight: "bold", textDecoration: "none" }}
                  to="/register"
                >
                  REGISTER
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={{ fontWeight: "bold", textDecoration: "none" }}
                  to="/login"
                >
                  LOGIN
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <Dropdown
                title={
                  <span style={{ fontWeight: "bold" }}>{auth?.user?.name}</span>
                }
              >
                <Dropdown.Item>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </Dropdown.Item>
              </Dropdown>
            </>
          )}
        </ul>
        <div className="md:hidden">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <>
                        <Dropdown
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                          title={"Category"}
                        >
                          <Dropdown.Item>
                            <Link to={`/category`} className="dropdown-item">
                              All Category
                            </Link>
                          </Dropdown.Item>
                          {categories?.map((c) => (
                            <Dropdown.Item>
                              <Link
                                to={`/category/${c.slug}`}
                                className="dropdown-item"
                              >
                                {c.name}
                              </Link>
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        to="/cart"
                      >
                        Cart
                      </NavLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <>
                        {!auth?.user ? (
                          <>
                            <NavLink to="/register">
                              <button
                                type="submit"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm"
                                )}
                              >
                                Register
                              </button>
                            </NavLink>
                            <NavLink to="/login">
                              <button
                                type="submit"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block w-full px-4 py-2 text-left text-sm"
                                )}
                              >
                                Login
                              </button>
                            </NavLink>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to={`/dashboard/${
                                    auth?.user?.role === 1 ? "admin" : "user"
                                  }`}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Dashboard
                                </NavLink>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  onClick={handleLogout}
                                  to="/login"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Logout
                                </NavLink>
                              )}
                            </Menu.Item>
                          </>
                        )}
                      </>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Header;
