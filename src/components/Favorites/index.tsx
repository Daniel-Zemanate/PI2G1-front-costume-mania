import { ApiCostume } from "@/interfaces/costume";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@assets/logo-mask.png";
import Link from "next/link";

function Favorites() {
  const [favs, setFavs] = useState<ApiCostume[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem("favs");
    if (favs) setFavs(JSON.parse(favs));
  }, []);

  return (
    <section className="w-full rounded p-2 border mb-8">
      <h3 className="border-b-2 border-purple-3 py-2 mb-4 text-2xl font-bold">
        Favorites
      </h3>

      {favs.length ? (
        <ul className="flex flex-col gap-4">
          {favs.map((e) => (
            <li key={e.idModel}>
              <Link href={`/costumes/${e.idModel}`} className="flex gap-4">
                <Image
                  src={e.urlImage || logo}
                  alt={e.name}
                  width={75}
                  height={75}
                />
                <div className="flex flex-col justify-center">
                  <p>{e.name}</p>
                  <p>$ {e.price.toFixed(2)}</p>
                </div>
              </Link>
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
