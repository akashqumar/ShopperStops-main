import React from "react";
import { NavLink } from "react-router-dom";
import { UserCircleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
    isActive ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
  }`;

const UserMenu = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
      <h4 className="font-display text-lg font-semibold text-slate-900 mb-4">Account</h4>
      <nav className="space-y-1">
        <NavLink to="/dashboard/user" className={linkClass} end>
          <UserCircleIcon className="h-5 w-5" />
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/user/profile" className={linkClass}>
          <UserCircleIcon className="h-5 w-5" />
          Profile
        </NavLink>
        <NavLink to="/dashboard/user/orders" className={linkClass}>
          <ClipboardDocumentListIcon className="h-5 w-5" />
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default UserMenu;
