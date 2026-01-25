import React from "react";
import Layout from "../components/Layouts/Layout";
import { EnvelopeIcon, PhoneIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  const items = [
    { Icon: EnvelopeIcon, label: "Email", value: "help@shopperstops.com" },
    { Icon: PhoneIcon, label: "Phone", value: "012-3456789" },
    { Icon: ChatBubbleBottomCenterTextIcon, label: "Support", value: "1800-0000-0000 (toll free)" },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/contactus.jpeg"
              alt="Contact us"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">Contact us</h1>
            <p className="mt-4 text-slate-600">
              Questions about products, orders, or shipping? We’re here to help. Reach out anytime—we aim to reply within 24 hours.
            </p>
            <div className="mt-8 space-y-4">
              {items.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="font-medium text-slate-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
