import Button from "@/components/Button";
import PopUp from "@/components/PopUp";
import Select from "@/components/Select";
import { getInvoiceStatusState } from "@/store/slices/invoiceSlice";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { TableCategory } from "@/interfaces/category";
import { categoryStatus } from "@/utils/categories";

interface EditCategoryPopUpProps {
  data: TableCategory;
  onSave: () => void;
}

function EditCategoryPopUp({ data, onSave }: EditCategoryPopUpProps) {
  const [name, setName] = useState(data.name);
  const [newStatus, setNewStatus] = useState<string>(data.idStatus);
  const { data: session } = useSession();

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Confirm",
      text: `Are you sure you want to modify category n° ${data.idCategory}`,
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      const body = {
        status: newStatus,
        name,
      };

      const res = await fetch(`/api/categories/${data.idCategory}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: `Category ${data.idCategory} successfully modified`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });

        onSave()
      } else {
        Swal.fire("Error", "Failed to modify category", "error");
      }
    }
  };

  const defaultStatus = categoryStatus.find((e) => e.key === data.idStatus)
  
  useEffect(() => {
    if(!defaultStatus) return
    setNewStatus(defaultStatus.key)
  }, [data.status, defaultStatus])

  const handleStatusChange = async (key: string, value: any) => {
    setNewStatus(value);
  };

  return (
    <PopUp button={<FaEdit />}>
      <Dialog.Title
        as="h2"
        className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2"
      >
        Edit Category - ID {data.idCategory}
      </Dialog.Title>
      <div className="flex justify-between">
        <h3 className="text-lg mb-4 font-medium">Category name</h3>
        <input
          className="w-36 text-center"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <Select
        label="Status"
        options={categoryStatus}
        onChange={handleStatusChange}
        defaultValue={defaultStatus}
      />
      <div className="flex justify-center">
        <Button
          label="Save"
          buttonStyle="primary"
          size="small"
          onClick={handleSave}
        />
      </div>
    </PopUp>
  );
}

export default EditCategoryPopUp;
