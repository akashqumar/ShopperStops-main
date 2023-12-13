import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const cartItem = cart.find((item) => item._id === product._id);
  // const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // setQuantity(quantity + 1);
  };

  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // setQuantity(quantity - 1);
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "Error calculating total price";
    }
  };
  
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className=" cart-page">
        <div className="mx-6 bg-gray-200 py-4 mb-4 text-center rounded-full">
          <h1 className="max-w-7xl mx-auto font-extrabold text-lg rounded-full">
            {!auth?.user
              ? "Hello Guest"
              : `Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <p className="max-w-7xl mx-auto text-sm font-extrabold">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : "Your Cart Is Empty"}
          </p>
        </div>

        <div className="container ">
          <div className="row ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-0 m-0">
              {cart?.map((p) => (
                <div
                  className="flex bg-white rounded-md shadow-lg p-4 mb-4"
                  key={p._id}
                >
                  <div className="flex flex-col justify-between w-1/3 mr-5">
                    {/* Increase quantity button */}
                    <button
                      className="px-3 py-1 mb-2 text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600"
                      onClick={() => increaseQuantity(p._id)}
                    >
                      +
                    </button>
                    {/* Quantity display */}
                    <span className="px-3 py-1 mb-2 text-black bg-text-black rounded-lg shadow-sm self-center">
                      {p.quantity}
                    </span>
                    {/* Decrease quantity button */}
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600"
                      onClick={() => decreaseQuantity(p._id)}
                    >
                      -
                    </button>
                  </div>
                  {/* Product image */}
                  <div className="w-1/3 ">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="w-full "
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  {/* Product details */}
                  <div className="flex flex-col justify-between w-2/3 px-4">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        {p.name.substring(0, 30)}
                      </h2>
                      <p className="text-sm mb-2">
                        {p.description.substring(0, 30)}
                      </p>
                      <p className="text-sm">Price: {p.price}</p>
                    </div>
                    {/* Remove button */}
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded-md shadow-sm self-end hover:bg-red-600"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
