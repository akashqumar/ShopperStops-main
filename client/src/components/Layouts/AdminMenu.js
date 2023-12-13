// import React from "react";
// import { NavLink } from "react-router-dom";
// const AdminMenu = () => {
//   return (
//     <>
//       <div className="text-center">
//         <div className="list-group">
//           <h4>Admin Panel</h4>
//           <NavLink
//             to="/dashboard/admin/create-category"
//             className="list-group-item list-group-item-action"
//           >
//             Create Category
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/create-product"
//             className="list-group-item list-group-item-action"
//           >
//             Create Product
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/products"
//             className="list-group-item list-group-item-action"
//           >
//             Product
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/orders"
//             className="list-group-item list-group-item-action"
//           >
//             Orders
//           </NavLink>
//           {/* <NavLink
//             to="/dashboard/admin/users"
//             className="list-group-item list-group-item-action"
//           >
//             Users
//           </NavLink> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminMenu;

import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="bg-white shadow-md p-4 rounded-md md:w-64">
        <h4 className="text-lg font-semibold mb-4">Admin Panel</h4>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/admin/create-category"
            className="block px-4 py-2 rounded-md text-indigo-600 hover:bg-indigo-100 transition duration-300"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="block px-4 py-2 rounded-md text-indigo-600 hover:bg-indigo-100 transition duration-300"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="block px-4 py-2 rounded-md text-indigo-600 hover:bg-indigo-100 transition duration-300"
          >
            Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="block px-4 py-2 rounded-md text-indigo-600 hover:bg-indigo-100 transition duration-300"
          >
            Orders
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="block px-4 py-2 rounded-md text-indigo-600 hover:bg-indigo-100 transition duration-300"
          >
            Users
          </NavLink> */}
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
