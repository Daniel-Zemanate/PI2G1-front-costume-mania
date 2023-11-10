import React from "react";

const purchases = [
  {
    name: "Little Wolf",
    size: "S",
    quantity: 1,
    date: "10/11/2023",
  },
  {
    name: "Spiderman",
    size: "L",
    quantity: 1,
    date: "24/09/2023",
  },
  {
    name: "Granadero child",
    size: "16",
    quantity: 3,
    date: "05/04/2023",
  },
];

function Purchases() {
  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
        Purchases
      </h3>

      <ul className="flex flex-col gap-4 px-4">
        {purchases.map((item, index) => (
          <li key={index} className="flex justify-between">
            <div>
              <p>{item.name}</p>
              <p>Size: {item.size}</p>
              <p>{item.quantity} pc</p>
            </div>
            <p>{item.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Purchases;
