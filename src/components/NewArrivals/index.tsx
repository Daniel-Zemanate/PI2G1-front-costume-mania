import React from "react";
import { CostumeCard } from "@/components/Costumes/costumeCard.component";
import { Frijole } from "next/font/google";
import Carousel from "../Carousel";

const frijole = Frijole({
  subsets: ["latin"],
  variable: "--font-frijole",
  weight: "400",
});

const tarjetas = [
  {
    id: 1,
    name: "Elsa from Frozen",
    price: 46.0,
    url_image:
      "https://images.unsplash.com/photo-1607824693178-8dcc03b4ac74?auto=format&fit=crop&q=80&w=2145&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pP3xfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      {
        id: 13,
        adult: false,
        no_size: "S",
        size_description: "Niños de 9 a 11 años",
      },
      {
        id: 2,
        adult: false,
        no_size: "M",
        size_description: "Niños de 11 a 13 años",
      },
    ],
  },
  {
    id: 2,
    name: "Batman Costume",
    price: 39.99,
    url_image:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      {
        id: 8,
        adult: true,
        no_size: "L",
        size_description: "Adultos",
      },
      {
        id: 7,
        adult: false,
        no_size: "M",
        size_description: "Niños de 7 a 9 años",
      },
    ],
  },
  {
    id: 3,
    name: "Wonder Woman Costume",
    price: 55.5,
    url_image:
      "https://images.unsplash.com/photo-1610524689143-88d4c6fa4789?auto=format&fit=crop&q=80&w=1665&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sizes: [
      {
        id: 12,
        adult: true,
        no_size: "XL",
        size_description: "Adultos",
      },
      {
        id: 6,
        adult: false,
        no_size: "L",
        size_description: "Niños de 9 a 11 años",
      },
    ],
  },
  {
    id: 4,
    name: "Pirate Costume",
    price: 29.99,
    url_image:
      "https://images.unsplash.com/photo-1610271171653-ab4ebc7c7f47?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvc3R1bWVzfGVufDB8fDB8fHww",
    sizes: [
      {
        id: 9,
        adult: true,
        no_size: "XL",
        size_description: "Adultos",
      },
      {
        id: 3,
        adult: false,
        no_size: "S",
        size_description: "Niños de 7 a 9 años",
      },
    ],
  },
  {
    id: 5,
    name: "Pirate Costume 2",
    price: 29.99,
    url_image:
      "https://images.unsplash.com/photo-1610271171653-ab4ebc7c7f47?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvc3R1bWVzfGVufDB8fDB8fHww",
    sizes: [
      {
        id: 9,
        adult: true,
        no_size: "XL",
        size_description: "Adultos",
      },
      {
        id: 3,
        adult: false,
        no_size: "S",
        size_description: "Niños de 7 a 9 años",
      },
    ],
  },
  {
    id: 6,
    name: "Pirate Costume 3",
    price: 29.99,
    url_image:
      "https://images.unsplash.com/photo-1610271171653-ab4ebc7c7f47?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvc3R1bWVzfGVufDB8fDB8fHww",
    sizes: [
      {
        id: 9,
        adult: true,
        no_size: "XL",
        size_description: "Adultos",
      },
      {
        id: 3,
        adult: false,
        no_size: "S",
        size_description: "Niños de 7 a 9 años",
      },
    ],
  },
];

function NewArrivals() {
  return (
    <section className="w-full my-4">
      <h4 className={`${frijole.className} text-3xl mb-4`}>New Arrivals</h4>
      <div className="py-8 overflow-visible">
      <Carousel>
        {tarjetas.map((item) => (
          <CostumeCard key={item.id} costume={item} />
          ))}
      </Carousel>
          </div>
    </section>
  );
}

export default NewArrivals;
