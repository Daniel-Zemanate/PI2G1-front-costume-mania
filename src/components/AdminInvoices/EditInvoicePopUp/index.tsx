import Button from "@/components/Button";
import SingleDatePicker from "@/components/SingleDatePicker";
import PopUp from "@/components/PopUp";
import Select from "@/components/Select";
import { TableInvoice } from "@/interfaces/invoice";
import { getInvoiceStatusState } from "@/store/slices/invoiceSlice";
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

interface EditInvoicePopUpProps {
  data: TableInvoice;
  onSave: () => void;
}

function EditInvoicePopUp({ data, onSave }: EditInvoicePopUpProps) {
  const [newStatus, setNewStatus] = useState<string>(data.status);
  const { invoiceStatus } = useSelector(getInvoiceStatusState);
  const [date, setDate] = useState<Date | null>(null);
  const { data: session } = useSession();

  const handleStatusChange = async (key: string, value: any) => {
    setNewStatus(value);
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Confirm",
      text: `Are you sure you want to modify invoice n° ${data.no_invoice}`,
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      const body = {
        newStatus,
        shippingDate: date?.toISOString().replace("Z", ""),
      };

      const res = await fetch(`/api/invoices/${data.no_invoice}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: `Invoice n°${data.no_invoice} successfully modified`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });

        onSave()
      } else {
        Swal.fire("Error", "Failed to modify the invoice.", "error");
      }
    }
  };

  const defaultStatus = invoiceStatus.find((e) => e.value === data.status)
  
  useEffect(() => {
    if(!defaultStatus) return
    setNewStatus(defaultStatus.key)
  }, [data.status, defaultStatus, invoiceStatus])


  return (
    <PopUp button={<FaEdit />}>
      <Dialog.Title
        as="h2"
        className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2"
      >
        Edit Invoice - n° {data.no_invoice}
      </Dialog.Title>
      <div className="flex justify-between">
        <h3 className="text-lg mb-4 font-medium">Invoice Date</h3>
        <span className="w-36 text-center">{data.invoiceDateString}</span>
      </div>
      <div className="flex justify-between">
        <h3 className="text-lg mb-4 font-medium">Shipping Date</h3>
        <div className="w-36">
          <SingleDatePicker
            date={date}
            setDate={setDate}
            minDate={new Date(data.invoiceDate)}
            maxDate={new Date()}
            onChange={(date: Date | null) => setDate(date)}
          />
        </div>
      </div>
      <div className="container mx-auto  py-8">
        <h3 className="text-lg mb-4 font-medium">Details</h3>
        <div className="mx-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-lightGrey">
                <th className="px-4 py-2">ID Catalog</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">pxQ</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((costume, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-grey/10"}
                >
                  <td className="px-4 py-2">{costume.catalog}</td>
                  <td className="px-4 py-2">{costume.model}</td>
                  <td className="px-4 py-2">{costume.quantity}</td>
                  <td className="px-4 py-2">{costume.price}</td>
                  <td className="px-4 py-2">{costume.pxQ}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Select
        label="Status"
        options={invoiceStatus}
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

export default EditInvoicePopUp;
