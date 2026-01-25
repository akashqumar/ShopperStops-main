import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const links = {
    shop: [
      { name: "All Categories", href: "/category" },
      { name: "Cart", href: "/cart" },
      { name: "Search", href: "/search" },
    ],
    account: [
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/policy" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-2xl font-bold text-white">
              ShopperStops
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6">
              Your one-stop destination for quality products. Fast delivery, great prices, and exceptional customer service.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href="mailto:help@shopperstops.com" className="flex items-center gap-2 text-sm hover:text-brand-400 transition-colors">
                <EnvelopeIcon className="h-4 w-4" />
                help@shopperstops.com
              </a>
              <a href="tel:18000000000" className="flex items-center gap-2 text-sm hover:text-brand-400 transition-colors">
                <PhoneIcon className="h-4 w-4" />
                1800-0000-0000 (toll free)
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="mt-4 space-y-3">
              {links.shop.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="flex items-center gap-1 text-sm hover:text-brand-400 transition-colors group">
                    <ChevronRightIcon className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Account</h3>
            <ul className="mt-4 space-y-3">
              {links.account.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="flex items-center gap-1 text-sm hover:text-brand-400 transition-colors group">
                    <ChevronRightIcon className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-3">
              {links.company.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="flex items-center gap-1 text-sm hover:text-brand-400 transition-colors group">
                    <ChevronRightIcon className="h-4 w-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} ShopperStops. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
