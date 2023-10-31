import React from "react";

type Props = {
  children: React.ReactNode;
  additionalClasses?: string;
}

const HomeSection: React.FC<Props> = ({ children, additionalClasses }: Props) => {
  return <section className={`w-full py-8 px-[5vw] ${additionalClasses}`}>{children}</section>;
};

export default HomeSection;
