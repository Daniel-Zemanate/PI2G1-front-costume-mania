import Image from "next/image";
import React from "react";

const favorites = [
  {
    id: 1,
    name: "Elsa from Frozen",
    price: 46.0,
    urlImage:
      "https://images.unsplash.com/photo-1607824693178-8dcc03b4ac74?auto=format&fit=crop&q=80&w=2145&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pP3xfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      {
        quantity: 7,
        noSize: "L",
        sizeDescription: "Sample Size 3",
      },
      {
        quantity: 4,
        noSize: "XL",
        sizeDescription: "Sample Size 4",
      },
    ],
  },

  {
    id: 2,
    name: "Batman Costume",
    price: 39.99,
    urlImage:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      {
        quantity: 7,
        noSize: "L",
        sizeDescription: "Sample Size 3",
      },
      {
        quantity: 4,
        noSize: "XL",
        sizeDescription: "Sample Size 4",
      },
    ],
  },
  {
    id: 3,
    name: "Snow White Costume",
    price: 55.5,
    urlImage:
      "https://images.unsplash.com/photo-1610524689143-88d4c6fa4789?auto=format&fit=crop&q=80&w=1665&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      {
        quantity: 7,
        noSize: "L",
        sizeDescription: "Sample Size 3",
      },
      {
        quantity: 4,
        noSize: "XL",
        sizeDescription: "Sample Size 4",
      },
    ],
  },
];

function Favorites() {
  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
        Favorites
      </h3>

      <ul className="flex flex-col gap-4">
        {favorites.map((fav, index) => (
          <li key={index} className="flex gap-4">
            <Image src={fav.urlImage} alt={fav.name} width={75} height={75} />
            <div className="flex flex-col justify-center">
              <p>{fav.name}</p>
              <p>$ {fav.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Favorites;
