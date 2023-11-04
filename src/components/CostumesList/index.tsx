import React from "react";
import { ApiCostume } from "@/interfaces/costume";

type Props = {
  costumes: ApiCostume[];
}

function CostumesList({costumes}: Props) {

  return (
    <>
      {costumes?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 place-self-start">
          {costumes.map((costume) => (
            <div key={costume.idCatalog} className="bg-purple-1 bg-opacity-20 p-4 w-50 h-80">
              <p>ID Model: {costume.model.idModel}</p>
              <p className={costume.quantity === 0 ? "text-red" : ""}> Quantity: {costume.quantity}</p>
              <p>Name: {costume.model.nameModel}</p>
              <p>Category: {costume.model.category.name}</p>
              <p>Price: ${costume.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="m-auto py-36 text-xl md:text-3xl">No costumes found under search criteria</h3>
      )}
    </>
  );
}

export default CostumesList;
