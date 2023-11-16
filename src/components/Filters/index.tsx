import { Category, KeyValue } from "@/interfaces/costume";
import { Disclosure, Listbox } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AiOutlineMinus as MinusIcon,
  AiOutlinePlus as PlusIcon,
  AiOutlineDelete as DeleteIcon,
} from "react-icons/ai";
import SearchBar from "../SearchBar";
import Select from "../Select";

type Props = {
  categories: Category[];
};

const sizes = [
  {
    key: "0",
    value: "Child",
  },
  {
    key: "1",
    value: "Adult",
  },
];

function Filters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryOptions: KeyValue[] = categories.map((category) => ({
    key: category.idCategory.toString(),
    value: category.name,
  }));

  const handleClick = (key: string, value: any) => {
    console.log("awsdad");
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("page");
    !value ? current.delete(key) : current.set(key, value);
    const search = current.toString();
    router.push(`${router.pathname}?${search}`);
  };

  const handleResetFilters = () => {
    router.push(`${router.pathname}`);
  };

  return (
    <aside className="self-start w-full md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem] rounded-lg px-8 md:py-2 shadow-lg bg-lightGrey">
      <span className="flex justify-between items-center rounded-lg w-full text-xl lg:text-2xl py-3 font-bold mb-2">
        <h3 className="">Filters</h3>
        {searchParams.toString() && (
          <button onClick={handleResetFilters} className="text-xl bg-orange-2 p-2 rounded-full">
            <DeleteIcon />
          </button>
        )}
      </span>

      <div className="border-gray-200">
        <SearchBar
          className="border-2"
          inputClassName="border-0 focus:outline-none rounded-r-none"
          buttonClassName="bg-white text-purple-1"
        />
      </div>

      <Select
        label="Category"
        options={categoryOptions}
        onChange={handleClick}
        className="my-4"
        filter
      />

      <Select
        label="Size"
        options={sizes}
        onChange={handleClick}
        filter
        className="my-4"
      />
    </aside>
  );
}

export default Filters;
