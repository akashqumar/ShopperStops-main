// import React from "react";
// import Layout from "./../../components/Layouts/Layout";
// import { useAuth } from "../../context/auth";
// import AdminMenu from "../../components/Layouts/AdminMenu";
// const AdminDashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3> Admin Name : {auth?.user?.name}</h3>
//               <h3> Admin Email : {auth?.user?.email}</h3>
//               <h3> Admin Contact : {auth?.user?.phone}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React from "react";
import Layout from "./../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layouts/AdminMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow-md rounded-md p-6">
              <h2 className=" text-2xl font-extrabold   font-bold mb-4">Admin Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Admin Name :</h3>
                  <p>{auth?.user?.name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Admin Email :</h3>
                  <p>{auth?.user?.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Admin contact number :</h3>
                  <p>{auth?.user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
