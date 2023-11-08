import React, { FC, createElement } from "react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onSubmit?: any;
  className?: string;
};

const Form = ({ children, onSubmit, className, ...rest }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${className}`}
      {...rest}
    >
      {children}
    </form>
  );
};

const Header = ({ className, children }: { className?: string, children: ReactNode }) => {
  return <div className={`${className}`}>{children}</div>;
};

const Title = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <h2 className={`${className}`}>{children}</h2>;
};

const ButtonSection = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <div className={`${className}`}>{children}</div>;
};

const TextSection = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <div className={`${className}`}>{children}</div>;
};

const Body = ({
  children,
  register,
  className
}: {
  children: ReactNode;
  register?: any;
  className?:string
}) => {
  return (
    <div className={`${className}`}>
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

const ErrorSection = ({ children }: { children: ReactNode }) => {
  return <span className="text-red text-lg text-center">{children}</span>;
};

Form.Header = Header;
Form.Title = Title;
Form.TextSection = TextSection;
Form.Body = Body;
Form.ButtonSection = ButtonSection;
Form.Errors = ErrorSection;

export default Form;
