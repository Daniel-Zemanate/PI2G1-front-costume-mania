import Button from "@/components/Button";
import PopUp from "@/components/PopUp";
import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Model, Size } from "@/interfaces/catalog";
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
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { getCatalogState } from "@/store/slices/catalogSlice";

interface Props {
  onSave: () => void;
}

function AddCatalogPopUp({ onSave }: Props) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const { models, sizes } = useSelector(getCatalogState);

  const { data: session } = useSession();

  const handleSave = async () => {
    try {
      const body = {
        model: selectedModel?.idModel,
        size: selectedSize?.id,
        quantity: stock,
        price: price,
      };
      const response = await fetch(`/api/catalog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Catalog successfully added`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PopUp
      button={
        <span className="flex items-center gap-2">
          <IoMdAddCircle /> Add new catalog
        </span>
      }
    >
      <Dialog.Title
        as="h2"
        className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2"
      >
        New catalog
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
            inputProps={{ min: "0" }}
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
              inputProps={{ min: "0" }}
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
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

export default AddCatalogPopUp;
