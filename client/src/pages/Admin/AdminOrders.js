// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminMenu from "../../components/Layouts/AdminMenu";
// import Layout from "../../components/Layouts/Layout";
// import { useAuth } from "../../context/auth";
// import moment from "moment";
// import { Select } from "antd";
// const { Option } = Select;

// const AdminOrders = () => {
//   const [status, setStatus] = useState([
//     "Not Process",
//     "Processing",
//     "Shipped",
//     "deliverd",
//     "cancel",
//   ]);
//   const [orders, setOrders] = useState([]);
//   const [auth] = useAuth();
//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   const handleChange = async (orderId, value) => {
//     try {
//       const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
//         status: value,
//       });
//       getOrders();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout title={"All Orders Data"}>
//       <div className="row dashboard">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Orders</h1>
//           {orders?.map((o, i) => {
//             return (
//               <div className="border shadow">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Status</th>
//                       <th scope="col">Buyer</th>
//                       <th scope="col"> date</th>
//                       <th scope="col">Payment</th>
//                       <th scope="col">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>
//                         <Select
//                           bordered={false}
//                           onChange={(value) => handleChange(o._id, value)}
//                           defaultValue={o?.status}
//                         >
//                           {status.map((s, i) => (
//                             <Option key={i} value={s}>
//                               {s}
//                             </Option>
//                           ))}
//                         </Select>
//                       </td>
//                       <td>{o?.buyer?.name}</td>
//                       <td>{moment(o?.createAt).format("LLLL")}</td>
//                       <td>{o?.payment.success ? "Success" : "Failed"}</td>
//                       <td>{o?.products?.length}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="container">
//                   {o?.products?.map((p, i) => (
//                     <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                       <div className="col-md-4">
//                         <img
//                           src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                           className="card-img-top"
//                           alt={p.name}
//                           width="100px"
//                           height={"100px"}
//                         />
//                       </div>
//                       <div className="col-md-8">
//                         <p>{p.name}</p>
//                         <p>{p.description.substring(0, 30)}</p>
//                         <p>Price : {p.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminOrders;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="flex space-x-4 items-start justify-center w-full">
        <AdminMenu />

        <div className="w-3/4">
          <h1 className="text-center text-3xl font-semibold mb-6">All Orders</h1>

          {orders?.map((order, index) => (
            <div
              className="border p-4 rounded-md shadow-md mb-6"
              key={order._id}
            >
              <table className="w-full table-auto mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Order #</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Buyer</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(order._id, value)}
                        defaultValue={order?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="px-4 py-2">{order?.buyer?.name}</td>
                    <td className="px-4 py-2">
                      {moment(order?.createAt).format("LLLL")}
                    </td>
                    <td className="px-4 py-2">
                      {order?.payment.success ? "Success" : "Failed"}
                    </td>
                    <td className="px-4 py-2">{order?.products?.length}</td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-2 gap-6">
                {order?.products?.map((product) => (
                  <div
                    className="border p-4 rounded-md flex space-x-4 items-center"
                    key={product._id}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        {product.description.substring(0, 30)}
                      </p>
                      <p className="text-sm font-semibold">Price: {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
