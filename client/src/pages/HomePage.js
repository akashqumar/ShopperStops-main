import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import axios from "axios";
import Layout from "../components/Layouts/Layout";
import { Spinner } from "@material-tailwind/react";
import Banner from "./Banner";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product, navigate }) => (
  <div
    className="card-product group cursor-pointer"
    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/product/${product.slug}`);
    }}
  >
    <div className="aspect-[4/5] overflow-hidden bg-slate-100">
      <img
        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
        alt={product.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/60 to-transparent">
        <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 backdrop-blur-sm">
          View
        </span>
      </div>
    </div>
    <div className="p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-brand-600">{product?.category?.name}</p>
      <h3 className="mt-1 font-display font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900">${product.price}</span>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setProducts(data?.products || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total || 0);
    } catch (e) {
      console.log(e);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setProducts((prev) => [...prev, ...(data?.products || [])]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
      setProducts(data?.products || []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilter = (value, id) => {
    setChecked((prev) => (value ? [...prev, id] : prev.filter((c) => c !== id)));
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    else filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  return (
    <Layout title="All Products - Best offers">
      <Banner />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-800">Category</h4>
              <div className="space-y-2">
                {categories?.map((c) => (
                  <label key={c._id} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-slate-700">{c.name}</span>
                  </label>
                ))}
              </div>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-800 pt-4 border-t border-slate-100">Price</h4>
              <div className="space-y-2">
                {Prices?.map((p) => (
                  <label key={p._id} className="flex cursor-pointer items-center gap-3">
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
              <button
                onClick={() => window.location.reload()}
                className="w-full btn-ghost text-sm"
              >
                Reset filters
              </button>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-slate-900">Customers also purchased</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} navigate={navigate} />
              ))}
            </div>

            {products.length < total && total > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-500 bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition-all hover:bg-brand-50 disabled:opacity-60"
                >
                  {loading ? (
                    <Spinner className="h-5 w-5" />
                  ) : (
                    <>
                      Load more
                      <ChevronDownIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
