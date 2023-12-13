import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mx-auto mt-6 p-3">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-4">{auth?.user?.name}</h3>
              <div className="mb-4">
                <p className="text-lg">{auth?.user?.email}</p>
              </div>
              <div>
                <p className="text-lg">{auth?.user?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
