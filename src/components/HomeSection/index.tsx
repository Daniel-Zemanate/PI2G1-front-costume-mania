import React from "react";

interface Props {
    children: React.ReactNode;
}

const HomeSection: React.FC<Props> = ({ children }) => {
    return (
        <section className="w-full pb-8">
            {children}
        </section>)
}

export default HomeSection