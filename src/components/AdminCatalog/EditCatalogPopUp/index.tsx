import Button from "@/components/Button";
import PopUp from "@/components/PopUp";
import Select from "@/components/Select";
import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Catalog, Category, Model, Size } from "@/interfaces/catalog";
import { Autocomplete, FormControl, Input, InputAdornment, InputLabel, NativeSelect, OutlinedInput, TextField } from "@mui/material";
import { categoryStatus } from "@/utils/categories";

interface Props {
  data: Catalog;
  onSave: () => void;
}


function EditCatalogPopUp({ data, onSave }: Props) {
  const [models, setModels] = useState<Model[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(data.model)
  const [selectedSize, setSelectedSize] = useState<Size | null>(data.size)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(data.model.category)
  const [stock, setStock] = useState<number>(data.stock)
  const [price, setPrice] = useState<number>(data.price)
  const [newStatus, setNewStatus] = useState<number>(data.statusCatalog.id);

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
        onSave()
      } else {
        Swal.fire("Error", "Failed to modify catalog", "error");
      }
    }
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
        Edit Catalog - n° {data.idCatalog} - {data.statusCatalog.id}
      </Dialog.Title>
      <div className="flex justify-between flex-wrap">
        <div className="w-56 py-2">
          <Autocomplete
            getOptionLabel={(modelo) => modelo.nameModel}
            disablePortal
            id="combo-box-demo"
            options={models}
            value={selectedModel}
            sx={{ width: 222 }}
            onChange={(event, newValue) => setSelectedModel(newValue)}
            renderInput={(params) => <TextField {...params} label='Model' />}
          />
        </div>
        <div className="w-56 py-2">
          <FormControl fullWidth>
            <InputLabel htmlFor="adult">Adult</InputLabel>
            <NativeSelect
              defaultValue={selectedSize?.adult.toString()}
              inputProps={{
                name: 'adult',
                id: 'adult',
              }}
              disabled
            >
              <option value='0'>No</option>
              <option value='1'>Yes</option>
            </NativeSelect>

          </FormControl>
        </div>
        <div className="w-56 py-2">
          <Autocomplete
            getOptionLabel={(size) => size.noSize}
            disablePortal
            id="combo-box-demo"
            options={sizes}
            value={selectedSize}
            sx={{ width: 100 }}
            onChange={(event, newValue) => setSelectedSize(newValue)}
            renderInput={(params) => <TextField {...params} label='Size' />}
          />
        </div>
        <div className="w-56 py-2">
          <FormControl fullWidth>
            <InputLabel htmlFor="newStatus">Status</InputLabel>
            <NativeSelect
              defaultValue={newStatus}
              inputProps={{
                name: 'newStatus',
                id: 'newStatus',
              }}
              onChange={event => setNewStatus(Number(event.target.value))}
            >
              {categoryStatus.map((s) => <option value={s.key} key={s.key}>{s.value}</option>)}
            </NativeSelect>

          </FormControl>
        </div>
        <div className="w-56 py-2">
          <TextField
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
        <div className="w-56 py-2">
          <FormControl fullWidth>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              id="price"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Price"
              type="number"
              value={price}
              onChange={event => setPrice(Number(event.target.value))}
            />
          </FormControl>
        </div>
        <div className="w-56 py-2">
          <Autocomplete
            getOptionLabel={(category) => category.name}
            disablePortal
            id="combo-box-demo"
            options={categories}
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
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
