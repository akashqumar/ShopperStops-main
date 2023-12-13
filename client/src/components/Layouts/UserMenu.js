import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center m-6">
      <div className="bg-gray-100 rounded-lg p-4">
      <NavLink
            to="/dashboard/user"
            // activeClassName="bg-blue-500 text-white"
          >
        <h4 className="text-lg font-semibold mb-4 ">Dashboard</h4>
        </NavLink>
        <nav>
          <NavLink
            to="/dashboard/user/profile"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md mb-2"
            activeClassName="bg-blue-500 text-white"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md mb-2"
            activeClassName="bg-blue-500 text-white"
          >
            Orders
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default UserMenu;
