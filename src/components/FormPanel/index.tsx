import React, { ReactNode } from "react";

function FormPanel({ title, children }: { title: string, children: ReactNode }) {
  return (
    <section className="w-full rounded p-2 border">
      <div className="border-b-2 py-2">{title}</div>
      {children}
    </section>
  );
}

export default FormPanel;
