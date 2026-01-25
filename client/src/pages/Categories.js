import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layouts/Layout";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-slate-900">All Categories</h1>
          <p className="mt-2 text-slate-600">Browse our collections</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories?.map((c) => (
            <Link
              to={`/category/${c.slug}`}
              key={c._id}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:border-brand-200 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
                <Squares2X2Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-900 group-hover:text-brand-700">{c.name}</h3>
                <span className="text-sm text-slate-500 group-hover:text-brand-600">View products →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
