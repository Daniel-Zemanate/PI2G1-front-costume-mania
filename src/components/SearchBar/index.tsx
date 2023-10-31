import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form action="" className="flex rounded-lg w-full">
      <div className="flex rounded-md overflow-hidden w-full shadow-inner">
        <input
          className="w-full h-full border-0 focus:outline-none  focus:border-blue-500 rounded-r-none p-2"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="bg-white text-purple-1 h-full px-2">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
