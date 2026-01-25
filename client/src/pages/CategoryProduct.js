import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-slate-900">Category — {category?.name}</h1>
          <p className="mt-1 text-slate-600">{products?.length} product{products?.length !== 1 ? "s" : ""} found</p>
        </div>

        {products?.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-500">No products in this category yet.</p>
            <button onClick={() => navigate("/category")} className="mt-4 btn-primary">Browse categories</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
