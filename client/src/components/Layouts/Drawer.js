import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Prices } from "../Prices";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

export function DrawerDefault() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilter = (value, id) => {
    setChecked((prev) => (value ? [...prev, id] : prev.filter((c) => c !== id)));
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleReset = () => {
    setChecked([]);
    setRadio([]);
    window.location.reload();
  };

  const goCategory = (slug) => {
    closeDrawer();
    navigate(slug ? `/category/${slug}` : "/category");
  };

  return (
    <>
      <button
        onClick={openDrawer}
        className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        aria-label="Open menu"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      <div
        role="presentation"
        onClick={closeDrawer}
        className={`fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      />

      {/* Full-height drawer panel */}
      <aside
        aria-hidden={!open}
        className={`fixed top-0 left-0 z-[9999] flex h-screen w-[300px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${!open ? "pointer-events-none" : ""}`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4">
          <h3 className="font-display text-lg font-semibold text-slate-900">Menu</h3>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content - flex-1 + min-h-0 allows it to take remaining space and scroll */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <section className="space-y-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Category</h4>
              <div className="space-y-1">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={checked.length === 0 && !radio.length}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-700" onClick={() => goCategory()}>
                    All
                  </span>
                </label>
                {categories?.map((c) => (
                  <label
                    key={c._id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-slate-700" onClick={() => goCategory(c.slug)}>
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-800">Price</h4>
              <div className="space-y-1">
                {Prices?.map((p) => (
                  <label
                    key={p._id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={Array.isArray(radio) && radio[0] === p.array[0]}
                      onChange={() => setRadio(p.array)}
                      className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-slate-700">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer - reset button */}
        <div className="shrink-0 border-t border-slate-200 p-4">
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Reset filters
          </button>
        </div>
      </aside>
    </>
  );
}
