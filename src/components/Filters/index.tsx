import { Category } from "@/interfaces/costume";
import { Disclosure } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineMinus as MinusIcon,
  AiOutlinePlus as PlusIcon,
  AiOutlineDelete as DeleteIcon,
} from "react-icons/ai";
import useCostumesQuery from "@/hooks/useCostumesQuery";
import SearchBar from "../SearchBar";

type Props = {
  categories: Category[];
};

const sizes = [
  {
    label: "Child",
    value: 0,
  },
  {
    label: "Adult",
    value: 1,
  },
];

function Filters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetch } = useCostumesQuery();

  const handleClick = (key: string, value: any) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(key, value);
    const search = current.toString();
    router
      .push(`${router.pathname}?${search}`, undefined, { shallow: true })
      .then(() => refetch());
  };

  const handleResetFilters = () => {
    router
      .push(`${router.pathname}`, undefined, { shallow: true })
      .then(() => refetch());
  };

  return (
    <aside className="self-start w-full md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem] rounded-lg md:px-4 px-8 shadow-lg">
      <span className="flex justify-between rounded-lg px-4 w-full bg-purple-3 bg-opacity-50 text-xl md:texl-xl lg:text-2xl py-3 font-bold">
        <h3>Filters</h3>
        {searchParams.toString() && (
          <button onClick={handleResetFilters} className="text-2xl">
            <DeleteIcon />
          </button>
        )}
      </span>

      <div className="border-gray-200 py-4 my-2">
        <SearchBar
          className="border-2"
          inputClassName="border-0 focus:outline-none rounded-r-none"
          buttonClassName="bg-white text-purple-1"
        />
      </div>

      <Disclosure as="div" className="border-t border-gray-200 p-4 my-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between text-gray-400 hover:text-gray-500">
              <span className="font-medium text-lg text-gray-900">
                Category
              </span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
            <Disclosure.Panel>
              <ul>
                {categories.map((category) => (
                  <li
                    key={category.idCategory}
                    className="space-y-6 cursor-pointer pl-5 pt-1"
                    onClick={() => handleClick("category", category.idCategory)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Disclosure as="div" className="border-t border-gray-200 p-4 my-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between text-gray-400 hover:text-gray-500 mb-2">
              <span className="font-medium text-lg text-gray-900">Size</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
            <Disclosure.Panel>
              <ul>
                {sizes.map((size) => (
                  <li
                    key={size.value}
                    className="space-y-6 cursor-pointer pl-5 pt-1"
                    onClick={() => handleClick("size", size.value)}
                  >
                    {size.label}
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </aside>
  );
}

export default Filters;
