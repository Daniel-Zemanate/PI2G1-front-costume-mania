import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form action="" className="flex rounded-lg">
      <div className="flex rounded-md overflow-hidden w-full shadow-inner">
        <input
          className="w-full h-full border-0 focus:outline-none  focus:border-blue-500 rounded-r-none px-4"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="bg-white text-violet-500 h-full border px-2">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
