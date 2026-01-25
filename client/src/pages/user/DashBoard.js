import React from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Dashboard - ShopperStops">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-64 shrink-0">
            <UserMenu />
          </div>
          <div className="flex-1">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <UserCircleIcon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-900">{auth?.user?.name}</h3>
                  <p className="text-slate-600">{auth?.user?.email}</p>
                </div>
              </div>
              {auth?.user?.address && (
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">Address</p>
                  <p className="text-slate-800">{auth.user.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
