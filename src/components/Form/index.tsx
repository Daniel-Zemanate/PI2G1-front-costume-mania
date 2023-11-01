import React, { FC, createElement } from "react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onSubmit?: any;
};

const Form = ({
  children,
  onSubmit,
  ...rest
}: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-purple-3 bg-opacity-25 px-16 py-8 rounded-lg flex flex-col max-w-screen-lg shadow min-w-[33%]"
      {...rest}
    >
      {children}
    </form>
  );
};

const Header = ({ children }: { children: ReactNode }) => {
  return <div className="text-center p-4">{children}</div>;
};


const Title = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};

const ButtonSection = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 flex justify-center gap-4">{children}</div>;
};

const TextSection = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 flex justify-center gap-4">{children}</div>;
};

const Body = ({
  children,
  register,
}: {
  children: ReactNode;
  register?: any;
}) => {
  return (
    <div className="flex flex-col justify-center">
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </div>
  );
};

Form.Header = Header;
Form.Title = Title;
Form.TextSection = TextSection;
Form.Body = Body;
Form.ButtonSection = ButtonSection;

export default Form;
