import { costume } from "@/interfaces/costume";
import Image from "next/image";
import { FC } from "react";

interface Props {
    costume: costume
}
export const CostumeCard: FC<Props> = ({ costume }) => {
    return (
        <>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Image src={costume.url_image} className="h-80 w-72 object-cover rounded-t-xl" alt={costume.name} height={320} width={288} />
                <div className="px-4 py-3 w-72">
                    <p className="text-lg font-bold text-black truncate block capitalize">{costume.name}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">${costume.price}</p>
                    </div>
                    <div className="flex items-center">
                        {costume.sizes?.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-white-500 text-gray-700 dark:text-gray dark:border-violet-500 dark:border dark:rounded py-1 px-2 mr-2 hover:bg-violet-500 dark:hover:bg-violet-500 hover:text-white">{item.no_size}</div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}