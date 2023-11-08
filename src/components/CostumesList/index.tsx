import React from "react";
import { ApiCostume } from "@/interfaces/costume";
import { CostumeCard } from "../Costumes";

type Props = {
  costumes: ApiCostume[];
}

function CostumesList({costumes}: Props) {

  return (
    <>
      {costumes?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
          {costumes.map((costume) => (
            <CostumeCard key={costume.idModel} costume={costume} />
          ))}
        </div>
      ) : (
        <h3 className="m-auto py-36 text-xl md:text-3xl">No costumes found under search criteria</h3>
      )}
    </>
  );
}

export default CostumesList;
