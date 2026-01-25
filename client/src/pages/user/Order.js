import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container mx-auto mt-6 p-3">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-center text-2xl font-semibold mb-4">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="border shadow-md mb-4" key={i}>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Buyer</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Payment</th>
                      <th className="px-4 py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{o?.status}</td>
                      <td className="px-4 py-2">{o?.buyer?.name}</td>
                      <td className="px-4 py-2">{moment(o?.createAt).format("LLLL")}</td>
                      <td className="px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="px-4 py-2">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {o?.products?.map((p, index) => (
                    <div className="flex border rounded-md shadow-md p-4" key={index}>
                      <div className="w-1/3">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-full h-auto"
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="w-2/3 px-4">
                        <p className="text-lg font-semibold">{p.name}</p>
                        <p className="text-sm">{p.description.substring(0, 30)}</p>
                        <p className="text-sm">Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
