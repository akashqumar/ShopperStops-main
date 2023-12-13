import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import Layout from "../../components/Layouts/Layout";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
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
    // <Layout title={"Forgot Password - Ecommerce APP"}>
    //   <div className="form-container ">
    //     <form onSubmit={handleSubmit}>
    //       <h4 className="title">RESET PASSWORD</h4>

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
    //           type="text"
    //           value={answer}
    //           onChange={(e) => setAnswer(e.target.value)}
    //           className="form-control"
    //           id="exampleInputEmail1"
    //           placeholder="Enter Your Answer "
    //           required
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <input
    //           type="password"
    //           value={newPassword}
    //           onChange={(e) => setNewPassword(e.target.value)}
    //           className="form-control"
    //           id="exampleInputPassword1"
    //           placeholder="Enter New Password"
    //           required
    //         />
    //       </div>

    //       <button type="submit" className="btn btn-primary">
    //         RESET
    //       </button>
    //     </form>
    //   </div>
    // </Layout>

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password 😍
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                Enter the answer of your security question
              </label>
              <div className="mt-2">
                <input
                  type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter Your Answer "
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
                Enter your new password
              </label>
              <div className="mt-2">
                <input
                  type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                  requiredid="outlined-basic"
                  label="Enter Your Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Go back ?{" "}
            <a
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Click here
            </a>
            
          </p>

          <p className="mt-10 text-center text-sm text-gray-500">
            Want to skip sign In ?{" "}
            <a
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Click here
            </a>
            
          </p>
        </div>
      </div>
    </>
    
  );
};

export default ForgotPasssword;