import React from "react";
import Layout from "../components/Layouts/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
        <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 backdrop-blur-sm">View</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900">${product.price}</span>
      </div>
    </div>
  </div>
);

const Search = () => {
  const navigate = useNavigate();
  const [values] = useSearch();
  const results = values?.results || [];
  const count = Array.isArray(results) ? results.length : 0;

  return (
    <Layout title="Search results">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Search results</h1>
            <p className="text-slate-600">
              {count < 1 ? "No products found" : `${count} product${count !== 1 ? "s" : ""} found`}
            </p>
          </div>
        </div>

        {count < 1 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-500">Try a different search term or browse categories.</p>
            <button onClick={() => navigate("/category")} className="mt-4 btn-primary">Browse categories</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p._id} product={p} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
