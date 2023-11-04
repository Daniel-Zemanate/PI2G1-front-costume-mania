import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(pathname === "/costumes"){     
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("search", searchValue)
      const search = current.toString()
      router.push(`${pathname}?${search}`)
    } else{
      router.push("/costumes", {query: {search: searchValue}})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex rounded-lg w-full">
      <div className="flex rounded-md overflow-hidden w-full shadow-inner">
        <input
          className="w-full h-full border-0 focus:outline-none  focus:border-blue-500 rounded-r-none p-2 px-4"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button type="submit" className="bg-white text-purple-1 h-full px-2">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
