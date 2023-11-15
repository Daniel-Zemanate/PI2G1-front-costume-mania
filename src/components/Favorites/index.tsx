import { ApiCostume } from "@/interfaces/costume";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@assets/logo-mask.png";
import Link from "next/link";
import { getFavoritesState, removeFavorite } from "@/store/slices/favoritesSlices";
import { useDispatch, useSelector } from "react-redux";

function Favorites() {
  const { favorites } = useSelector(getFavoritesState)
  const dispatch = useDispatch();

  const handleFavRemove = (idModel: number) => {
    dispatch(removeFavorite(idModel))    
  };

  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
        Favorites
      </h3>

      {favorites.length ? (
        <ul className="flex flex-col gap-4 px-4">
          {favorites.map((e) => (
            <li key={e.idModel} className="flex justify-between">
              <Link href={`/costumes/${e.idModel}`} className="flex gap-4">
                <div className="w-20 flex justify-center">
                  <Image
                    src={e.urlImage || logo}
                    alt={e.name}
                    width={75}
                    height={75}
                    style={{
                      maxHeight: "75px",
                      width: "auto",
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p>{e.name}</p>
                  <p>$ {e.price.toFixed(2)}</p>
                </div>
              </Link>
              <button onClick={() => handleFavRemove(e.idModel)}>X</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex">
          <p className="m-auto">No favorites yet</p>
        </div>
      )}
    </section>
  );
}

export default Favorites;
