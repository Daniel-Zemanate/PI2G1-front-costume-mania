import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

type Props = {
  buttonIcon?: any;
  buttonText?: any;
  children: ReactNode;
};

function Dropdown({ buttonIcon, buttonText, children }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex flex-col space-y-2 w-full h-full items-center rounded-md px-4 text-sm font-medium text-white focus:outline-none">
        <span className="text-3xl">{buttonIcon}</span>
        <span className="flex m-auto whitespace-nowrap">
          {buttonText && (
            <>
              {buttonText}
              <span className="flex text-2xl text-orange-2">
                <RiArrowDropDownLine />
              </span>
            </>
          )}
        </span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 min-w-[14rem] whitespace-nowrap origin-top-right rounded-xl bg-white shadow-lg border border-purple-2 p-4">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const Item = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active && onClick ? "text-orange-2" : "text-purple-1 cursor-auto"
          } flex w-full items-center rounded-md p-2`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

Dropdown.Item = Item;

export default Dropdown;
