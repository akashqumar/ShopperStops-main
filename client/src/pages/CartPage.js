import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  MapPinIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const increaseQuantity = (pid) => {
    const updated = cart.map((item) =>
      item._id === pid ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQuantity = (pid) => {
    const updated = cart.map((item) =>
      item._id === pid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeCartItem = (pid) => {
    const updated = cart.filter((item) => item._id !== pid);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Item removed from cart");
  };

  const totalPrice = () => {
    try {
      const total = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
      return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    } catch {
      return "$0.00";
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken || "");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  const showPayment = clientToken && auth?.token && cart?.length > 0;

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-1 text-slate-600">
            {!auth?.user
              ? "Hello, Guest"
              : `Hello, ${auth?.user?.name}`}
            {" · "}
            {cart?.length
              ? `${cart.length} item${cart.length !== 1 ? "s" : ""} in your cart${!auth?.token ? " — please sign in to checkout" : ""}`
              : "Your cart is empty"}
          </p>
        </div>

        {!cart?.length ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-slate-500 mb-4">No items in your cart yet.</p>
            <button onClick={() => navigate("/category")} className="btn-primary">
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((p) => (
                <div
                  key={p._id}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-display font-semibold text-slate-900 truncate">{p.name}</h3>
                      <p className="text-sm text-slate-500 truncate">{p.description}</p>
                      <p className="mt-1 text-brand-600 font-semibold">${p.price} × {p.quantity}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-slate-200">
                        <button
                          onClick={() => decreaseQuantity(p._id)}
                          className="p-1.5 hover:bg-slate-50 text-slate-600"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{p.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(p._id)}
                          className="p-1.5 hover:bg-slate-50 text-slate-600"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeCartItem(p._id)}
                        className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary & payment */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card space-y-6">
                <h3 className="font-display text-lg font-semibold text-slate-900">Order summary</h3>
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{totalPrice()}</span>
                </div>

                {auth?.user?.address ? (
                  <div className="rounded-xl bg-brand-50/50 border border-brand-200/60 p-4">
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="h-5 w-5 shrink-0 text-brand-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Delivery address</p>
                        <p className="text-sm text-slate-600 mt-1">{auth.user.address}</p>
                        <button
                          onClick={() => navigate("/dashboard/user/profile")}
                          className="mt-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          Update address
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                    <p className="text-sm text-slate-700">Add a delivery address to checkout.</p>
                    {auth?.token ? (
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="mt-2 btn-primary text-sm py-2"
                      >
                        Add address
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/login", { state: "/cart" })}
                        className="mt-2 btn-primary text-sm py-2"
                      >
                        Sign in to checkout
                      </button>
                    )}
                  </div>
                )}

                {showPayment && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CreditCardIcon className="h-5 w-5" />
                      <span className="font-medium">Payment</span>
                    </div>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(inst) => setInstance(inst)}
                    />
                    <button
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                      className="w-full btn-accent py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Processing…" : `Pay ${totalPrice()}`}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
