import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div>
    //   <form className="d-flex" role="search" onSubmit={handleSubmit}>
    //     <input
    //       className="form-control me-2"
    //       type="search"
    //       placeholder="Search"
    //       aria-label="Search"
    //       value={values.keyword}
    //       onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    //     />
    //     <button className="btn btn-outline-success" type="submit">
    //       Search
    //     </button>
    //   </form>
    // </div>
    <form className=" flex justify-center  max-w-md gap-x-4 " onSubmit={handleSubmit}>
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        id="email-address"
        name="email"
        // type="email"
        autoComplete="email"
        required
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        className="min-w-0 flex-auto bg-light-green-100   rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 hover:bg-indigo-50 sm:text-sm sm:leading-6"
        placeholder="Search products"
      />
      
      <button
        type="submit"
        className="flex-none rounded-md bg-green-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        
      >
        🔍
      </button>
    </form>
  );
};

export default SearchInput;
