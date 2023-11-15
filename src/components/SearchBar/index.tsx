import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

const SearchBar = ({ className, inputClassName, buttonClassName }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pathname === "/costumes") {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("search", searchValue);
      const search = current.toString();
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: searchValue },
      });
    } else {
      router.push({ pathname: "/costumes", query: { search: searchValue } });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex rounded-lg w-full ${className}`}
    >
      <div className="flex rounded-md overflow-hidden w-full shadow-inner">
        <input
          className={`w-full h-full p-2 px-4 ${inputClassName}`}
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button type="submit" className={`h-full px-2 ${buttonClassName}`}>
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
