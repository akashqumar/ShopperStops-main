import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layouts/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">All Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div
              className="border border-gray-200 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
              key={c._id}
            >
              <Link
                to={`/category/${c.slug}`}
                className="block text-center text-lg font-semibold text-blue-600 hover:text-blue-800"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
