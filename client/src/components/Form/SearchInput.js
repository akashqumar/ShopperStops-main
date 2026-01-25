import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
    <form className="flex w-full max-w-md gap-2" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={values?.keyword || ""}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          placeholder="Search products..."
          className="input-base pl-10 pr-4"
          aria-label="Search products"
        />
      </div>
      <button type="submit" className="btn-primary shrink-0 px-4">
        <MagnifyingGlassIcon className="h-4 w-4 md:mr-1" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
};

export default SearchInput;
