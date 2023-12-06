import Button from "@/components/Button";
import PopUp from "@/components/PopUp";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Catalog, Category, Model, Size } from "@/interfaces/catalog";
import {
  Autocomplete,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  NativeSelect,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { categoryStatus } from "@/utils/categories";
import { useSelector } from "react-redux";
import { getCatalogState } from "@/store/slices/catalogSlice";

interface Props {
  data: Catalog;
  onSave: () => void;
}

function EditCatalogPopUp({ data, onSave }: Props) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(data.model);
  const [selectedSize, setSelectedSize] = useState<Size | null>(data.size);
  const [stock, setStock] = useState<number>(data.stock);
  const [price, setPrice] = useState<number>(data.price);
  const [newStatus, setNewStatus] = useState<number>(data.statusCatalog.id);
  const { models, sizes } = useSelector(getCatalogState);

  const { data: session } = useSession();

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Confirm",
      text: `Are you sure you want to modify catalog n° ${data.idCatalog}`,
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      const body = {
        model: selectedModel?.idModel,
        size: selectedSize?.id,
        quantity: stock,
        price: price,
        status: newStatus,
      };

      const res = await fetch(`/api/catalog/${data.idCatalog}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: `Catalog ${data.idCatalog} successfully modified`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });
        onSave();
      } else {
        Swal.fire("Error", "Failed to modify catalog", "error");
      }
    }
  };

  return (
    <PopUp button={<FaEdit />}>
      <Dialog.Title
        as="h2"
        className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2"
      >
        Edit Catalog - n° {data.idCatalog}
      </Dialog.Title>
      <div className="flex justify-between flex-wrap">
        <div className="w-full md:w-56 py-2">
          <Autocomplete
            getOptionLabel={(modelo) => modelo.nameModel}
            disablePortal
            id="combo-box-demo"
            options={models}
            value={selectedModel}
            onChange={(event, newValue) => setSelectedModel(newValue)}
            renderInput={(params) => <TextField {...params} label="Model" />}
          />
        </div>
        <div className="w-full md:w-56 py-2">
          <Autocomplete
            getOptionLabel={(size) => size.noSize}
            disablePortal
            id="combo-box-demo"
            options={sizes}
            value={selectedSize}
            onChange={(event, newValue) => setSelectedSize(newValue)}
            renderInput={(params) => <TextField {...params} label="Size" />}
          />
        </div>
        <div className="w-full md:w-56 py-2">
          <TextField
            className="w-full"
            value={stock}
            label="Stock"
            id="stock"
            onChange={(event) => setStock(Number(event.target.value))}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="w-full md:w-56 py-2">
          <FormControl fullWidth>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              id="price"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Price"
              type="number"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </FormControl>
        </div>
        <div className="w-full md:w-56 py-2">
          <FormControl fullWidth>
            <InputLabel htmlFor="newStatus">Status</InputLabel>
            <NativeSelect
              defaultValue={newStatus}
              inputProps={{
                name: "newStatus",
                id: "newStatus",
              }}
              onChange={(event) => setNewStatus(Number(event.target.value))}
            >
              {categoryStatus.map((s) => (
                <option value={s.key} key={s.key} className="p-2">
                  {s.value}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
      </div>
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

export default EditCatalogPopUp;
