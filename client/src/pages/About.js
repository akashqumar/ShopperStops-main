import React from "react";
import Layout from "../components/Layouts/Layout";

const About = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/about.jpeg"
              alt="About ShopperStops"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">About ShopperStops</h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We’re built on a simple idea: shopping should be easy, reliable, and enjoyable. 
              Our team works to bring you a wide range of quality products, fast delivery, and support you can count on.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              From day one, we’ve focused on clarity and customer trust. Whether you’re stocking up at home 
              or searching for something special, we’re here to help you find it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="btn-primary">Get in touch</a>
              <a href="/category" className="btn-ghost">Browse products</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
