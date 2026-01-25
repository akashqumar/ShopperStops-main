import React from "react";
import Layout from "../components/Layouts/Layout";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const Policy = () => {
  const sections = [
    { title: "Information we collect", text: "We collect information you provide when you register, place an order, or contact us. This may include your name, email, address, and payment details." },
    { title: "How we use it", text: "We use your information to process orders, improve our services, send updates, and respond to your requests." },
    { title: "Data security", text: "We take reasonable steps to protect your personal data using industry-standard security practices." },
    { title: "Your rights", text: "You can request access to, correction of, or deletion of your personal data by contacting us." },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <ShieldCheckIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-2 text-slate-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
          <p className="text-sm text-slate-500 pt-4">
            For questions about this policy, please contact us via the Contact page.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
