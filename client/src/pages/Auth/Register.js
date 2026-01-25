import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name, email, password, phone, address, answer,
      });
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const fields = [
    { id: "name", label: "Full name", value: name, set: setName, type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email", value: email, set: setEmail, type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", value: password, set: setPassword, type: "password", placeholder: "••••••••" },
    { id: "phone", label: "Phone", value: phone, set: setPhone, type: "text", placeholder: "+1 234 567 890" },
    { id: "address", label: "Address", value: address, set: setAddress, type: "text", placeholder: "123 Main St" },
    { id: "answer", label: "First school name (security)", value: answer, set: setAnswer, type: "text", placeholder: "Security answer" },
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
          <h2 className="font-display text-2xl font-bold text-slate-900">Create account</h2>
          <p className="mt-1 text-slate-600">Join ShopperStops and start shopping</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {fields.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-sm font-medium text-slate-700">{f.label}</label>
                <input
                  id={f.id}
                  type={f.type}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  required
                  className="input-base mt-1.5"
                />
              </div>
            ))}
            <button type="submit" className="w-full btn-primary py-3 mt-6">
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
