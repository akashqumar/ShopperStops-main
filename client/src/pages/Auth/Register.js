import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import Layout from "../../components/Layouts/Layout";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    // <Layout title="Register - Ecommer App">
    //   <div className="form-container ">
    //     <form onSubmit={handleSubmit}>
    //       <h4 className="title">REGISTER FORM</h4>
    //       <div className="mb-3">
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           placeholder="Enter Your Name"
    //           required
    //           autoFocus
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           placeholder="Enter Your Email "
    //           required
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="form-control"
    //           id="exampleInputPassword1"
    //           placeholder="Enter Your Password"
    //           required
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <input
    //           type="text"
    //           value={phone}
    //           onChange={(e) => setPhone(e.target.value)}
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           placeholder="Enter Your Phone"
    //           required
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <input
    //           type="text"
    //           value={address}
    //           onChange={(e) => setAddress(e.target.value)}
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           placeholder="Enter Your Address"
    //           required
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <input
    //           type="text"
    //           value={answer}
    //           onChange={(e) => setAnswer(e.target.value)}
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           placeholder="Enter Your First School Name"
    //           required
    //         />
    //       </div>
    //       <button type="submit" className="btn btn-primary">
    //         REGISTER
    //       </button>
    //     </form>
    //   </div>
    // </Layout>


    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contact Number
            </label>
            <div className="mt-2">
              <input
                type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your First School Name
            </label>
            <div className="mt-2">
              <input
                type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              // className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your First School Name"
              required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>




          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a User?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start your leftover shopping 😍
          </a>
        </p>
      </div>
    </div>
  </>








 

  );
};

export default Register;