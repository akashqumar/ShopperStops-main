import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiShare2 } from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BiMinus, BiPlus } from "react-icons/bi";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Load product details
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product || {});
      if (data?.product?._id && data?.product?.category?._id) {
        getSimilarProduct(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart = [];

    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      toast.success("Item quantity increased in cart");
    } else {
      updatedCart = [...cart, { ...product, quantity }];
      toast.success("Item added to cart");
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleImageZoom = (e) => {
    if (!isZoomed) return;
    const image = e.currentTarget;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <Layout>
      <section className="text-slate-700 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-4/5 mx-auto flex flex-wrap bg-white rounded-2xl shadow-card-hover border border-slate-200/60 p-6 sm:p-8"
          >
            <div className="lg:w-1/2 w-full relative">
              <motion.div
                className="relative aspect-square overflow-hidden rounded-xl"
                onHoverStart={() => setIsZoomed(true)}
                onHoverEnd={() => setIsZoomed(false)}
              >
                <img
                  alt={product.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  onMouseMove={handleImageZoom}
                />
              </motion.div>
            </div>

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full tracking-wider font-semibold">
                    {product?.category?.name}
                  </h2>
                  <button className="text-slate-500 hover:text-brand-600 transition-colors p-1.5 rounded-lg hover:bg-brand-50">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>

                <h1 className="font-display text-slate-900 text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400 mr-2">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                  </div>
                  <span className="text-slate-600">(4.5) · 128 Reviews</span>
                </div>

                <div className="border-t border-b border-slate-200 py-6 mb-6">
                  <p className="leading-relaxed text-slate-700">{product.description}</p>
                </div>

                <div className="flex items-center mb-6">
                  <span className="font-display font-bold text-3xl text-slate-900">
                    ${product.price}
                  </span>
                  <span className="text-brand-600 ml-4 text-sm font-medium">In Stock</span>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="p-2.5 hover:bg-slate-50 text-slate-600"
                    >
                      <BiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-2.5 hover:bg-slate-50 text-slate-600"
                    >
                      <BiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addToCart}
                    className="flex-1 btn-accent py-3 px-6 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <FiHeart className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">You May Also Like</h2>
            <p className="text-slate-600 mb-8">Based on your shopping preferences</p>

            {relatedProducts.length < 1 ? (
              <div className="text-center py-12 rounded-2xl border border-slate-200 bg-white">
                <p className="text-slate-500">No similar products found</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <motion.div
                    key={p._id}
                    whileHover={{ y: -4 }}
                    className="card-product group cursor-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-semibold text-slate-900 truncate">{p.name}</h3>
                        <span className="text-brand-600 font-bold">${p.price}</span>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2">{p.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
