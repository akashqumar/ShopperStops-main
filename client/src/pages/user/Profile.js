import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import Layout from "./../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    // <Layout title={"Your Profile"}>
    //   <div className="container-fluid m-3 p-3">
    //     <div className="row">
    //       <div className="col-md-3">
    //         <UserMenu />
    //       </div>
    //       <div className="col-md-9">
    //         <div className="form-container ">
    //           <form onSubmit={handleSubmit}>
    //             <h4 className="title">USER PROFILE</h4>
    //             <div className="mb-3">
    //               <input
    //                 type="text"
    //                 value={name}
    //                 onChange={(e) => setName(e.target.value)}
    //                 className="form-control"
    //                 id="exampleInputEmail1"
    //                 placeholder="Enter Your Name"
    //                 autoFocus
    //               />
    //             </div>
    //             <div className="mb-3">
    //               <input
    //                 type="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 className="form-control"
    //                 id="exampleInputEmail1"
    //                 placeholder="Enter Your Email "
    //                 disabled
    //               />
    //             </div>
    //             <div className="mb-3">
    //               <input
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 className="form-control"
    //                 id="exampleInputPassword1"
    //                 placeholder="Enter Your Password"
    //               />
    //             </div>
    //             <div className="mb-3">
    //               <input
    //                 type="text"
    //                 value={phone}
    //                 onChange={(e) => setPhone(e.target.value)}
    //                 className="form-control"
    //                 id="exampleInputEmail1"
    //                 placeholder="Enter Your Phone"
    //               />
    //             </div>
    //             <div className="mb-3">
    //               <input
    //                 type="text"
    //                 value={address}
    //                 onChange={(e) => setAddress(e.target.value)}
    //                 className="form-control"
    //                 id="exampleInputEmail1"
    //                 placeholder="Enter Your Address"
    //               />
    //             </div>

    //             <button type="submit" className="btn btn-primary">
    //               UPDATE
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Layout>
    <Layout title={"Your Profile"}>
    <div className="container mx-auto mt-6 px-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/4 px-3">
          <UserMenu />
        </div>
        <div className="w-full md:w-3/4 px-3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <form onSubmit={handleSubmit}>
              <h4 className="text-xl font-semibold mb-4">USER PROFILE</h4>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Your Email"
                  disabled
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Your Address"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Profile;