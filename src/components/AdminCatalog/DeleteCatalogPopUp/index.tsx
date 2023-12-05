import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Catalog } from "@/interfaces/catalog";
import { FaTrash } from "react-icons/fa";
import PopUp from "@/components/PopUp";

interface Props {
    data: Catalog;
    onSave: () => void;
}


function DeleteCatalogPopUp({ data, onSave }: Props) {


    const { data: session } = useSession();

    const DeleteCatalogHandle = async () => {
        const result = await Swal.fire({
            title: "Confirm",
            text: `Are you sure you want to delete catalog n° ${data.idCatalog}`,
            icon: "warning",
            showCancelButton: true,
        });

        if (result.isConfirmed) {

            const res = await fetch(`/api/catalog/delete/${data.idCatalog}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${session?.user.token}`,
                },
            });
            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: `Catalog ${data.idCatalog} successfully deleted`,
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
                onSave()
            } else {
                Swal.fire("Error", "Failed to delete catalog", "error");
            }
        }
    }

    return (
        <button
            type="button"
            onClick={DeleteCatalogHandle}
            className="rounded-md bg-white text-orange-2 border border-orange-2 p-2 text-sm font-medium hover:text-white hover:bg-orange-2 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
            {<FaTrash />}
        </button>
    )
}

export default DeleteCatalogPopUp;
