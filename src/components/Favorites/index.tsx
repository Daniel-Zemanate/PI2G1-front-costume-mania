import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@assets/logo-mask.png";
import Link from "next/link";
import {
  fetchFavs,
  getFavoritesState,
  removeFav,
} from "@/store/slices/favoritesSlices";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { AppDispatch } from "@/store/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { FetchResult } from "@/interfaces/costume";
import { useSession } from "next-auth/react";

function Favorites() {
  const { favorites, status } = useSelector(getFavoritesState);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const handleFavRemove = async (idFav: number) => {
    const { payload } = (await dispatch(
      removeFav(idFav)
    )) as PayloadAction<FetchResult>;
  };

  useEffect(() => {
    if (status === "idle" && session) {
      dispatch(fetchFavs(Number(session.user.user_id)));
    }
  }, [dispatch, session, status]);

  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
        Favorites
      </h3>

      {status === "loading" && <Spinner />}

      {status === "failed" && (
        <ErrorMessage title="Error" text="Failed to fetch favorites" />
      )}

      {status === "succeeded" &&
        (favorites.length ? (
          <ul className="flex flex-col gap-4 px-4">
            {favorites.map((e) => (
              <li key={e.idModel} className="flex justify-between">
                <Link href={`/costumes/${e.idModel}`} className="flex gap-4">
                  <div className="w-20 flex justify-center">
                    <Image
                      src={e.urlImage || logo}
                      alt={e.nameModel}
                      width={75}
                      height={75}
                      style={{
                        maxHeight: "75px",
                        width: "auto",
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>{e.nameModel}</p>
                  </div>
                </Link>
                <button onClick={() => handleFavRemove(e.idFav)}>X</button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full flex">
            <p className="m-auto">No favorites yet</p>
          </div>
        ))}
    </section>
  );
}

export default Favorites;
