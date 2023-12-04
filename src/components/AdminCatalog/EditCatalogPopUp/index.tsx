import Button from "@/components/Button";
import PopUp from "@/components/PopUp";
import Select from "@/components/Select";
import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Catalog, Category, Model, Size } from "@/interfaces/catalog";
import { Autocomplete, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { categoryStatus } from "@/utils/categories";

function EditCatalogPopUp({ data }: { data: Catalog }) {
  const [newStatus, setNewStatus] = useState<string>();
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const { data: session } = useSession();

  const handleStatusChange = async (key: string, value: any) => {
    setNewStatus(value);
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: 'Confirm',
      text: `Are you sure you want to modify ${data.model} catalog `,
      icon: 'warning',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      const body = {
        newStatus,
      }

      console.log(body)

      const res = await fetch(`/api/catalog/${data.idCatalog}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: `${data.model} catalog successfully modified`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire('Error', 'Failed to cancel the invoice.', 'error');
      }
    }

    console.log(newStatus);
  };


  useEffect(() => {
    fetch(`/api/models`)
      .then((response) => response.json())
      .then((dataC) => {
        setModels(dataC)
        const modelInDataC = dataC.find((model: Model) => model.idModel === data.model.idModel);
        setSelectedModel(modelInDataC);
      });
    fetch(`/api/sizes`)
      .then((response) => response.json())
      .then((dataC) => {
        setSizes(dataC)
        const sizeInDataC = dataC.find((size: Size) => size.noSize === data.size.noSize);
        setSelectedSize(sizeInDataC);
      });
    fetch(`/api/categories/admin`, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      }
    })
      .then((response) => response.json())
      .then((dataC) => {
        setCategories(dataC)
        const categoryInDataC = dataC.find((category: Category) => category.idCategory === data.model.category.idCategory);
        setSelectedCategory(categoryInDataC);
      });
  }, [data, session])

  return (
    <PopUp button={<FaEdit />}>
      <Dialog.Title
        as="h2"
        className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2"
      >
        Edit Catalog - n° {data.idCatalog}
      </Dialog.Title>
      <div className="flex justify-between flex-wrap">
        <div className="w-56">
          <Autocomplete
            getOptionLabel={(modelo) => modelo.nameModel}
            disablePortal
            id="combo-box-demo"
            options={models}
            value={selectedModel}
            sx={{ width: 222 }}
            renderInput={(params) => <TextField {...params} label='Model' />}
          />
        </div>
        <div className="w-56">
          <Select
            label="Adult"
            options={[{ key: '0', value: 'No' }, { key: '1', value: 'Yes' }]}
            onChange={handleStatusChange}
            defaultValue={{ key: data.size.adult.toString(), value: data.size.adult === 0 ? 'No' : 'Yes' }}
            className="w-24"
          />
        </div>
        <div className="w-56 pt-3">
          <Autocomplete
            getOptionLabel={(size) => size.noSize}
            disablePortal
            id="combo-box-demo"
            options={sizes}
            value={selectedSize}
            sx={{ width: 100 }}
            renderInput={(params) => <TextField {...params} label='Size' />}
          />
        </div>
        <div className="w-56">
          <Select
            label="Status"
            options={categoryStatus}
            onChange={handleStatusChange}
            defaultValue={{ key: data.statusCatalog.id.toString(), value: data.statusCatalog.description }}
            className="w-24 "
          />
        </div>
        <div className="w-56 pt-3">
          <TextField
            value={data.stock}
            label="Stock"
            id="stock"
            onChange={(event) => { }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="w-56 pt-3">
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl>
        </div>
        <div className="w-56 pt-3">
          <Autocomplete
            getOptionLabel={(category) => category.name}
            disablePortal
            id="combo-box-demo"
            options={categories}
            value={selectedCategory}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label='Category' />}
          />
        </div>
      </div>
      <Button
        label="Save"
        buttonStyle="primary"
        size="small"
        onClick={handleSave}
      />
    </PopUp>
  );
}

export default EditCatalogPopUp;
