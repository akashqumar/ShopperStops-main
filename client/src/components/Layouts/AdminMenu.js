import React from "react";
import { NavLink } from "react-router-dom";
import {
  PlusCircleIcon,
  Square3Stack3DIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
    isActive ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
  }`;

const AdminMenu = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
      <h4 className="font-display text-lg font-semibold text-slate-900 mb-4">Admin Panel</h4>
      <nav className="space-y-1">
        <NavLink to="/dashboard/admin/create-category" className={linkClass}>
          <PlusCircleIcon className="h-5 w-5" />
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className={linkClass}>
          <PlusCircleIcon className="h-5 w-5" />
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className={linkClass}>
          <Square3Stack3DIcon className="h-5 w-5" />
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className={linkClass}>
          <ClipboardDocumentListIcon className="h-5 w-5" />
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;
