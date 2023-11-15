import React from "react";

function ErrorMessage({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full m-auto bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-red text-3xl font-bold mb-2">{title}</h2>
        <p className="text-grey text-xl">{text}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
