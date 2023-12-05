import Button from "@/components/Button";
import PopUp from "@/components/PopUp";
import Select from "@/components/Select";
import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Catalog, Category, Model, Size } from "@/interfaces/catalog";
import { Autocomplete, FormControl, Input, InputAdornment, InputLabel, NativeSelect, OutlinedInput, TextField } from "@mui/material";
import { categoryStatus } from "@/utils/categories";
import { IoMdAddCircle } from "react-icons/io";

interface Props {
    onSave: () => void;
}


function AddCatalogPopUp({ onSave }: Props) {
    const [models, setModels] = useState<Model[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null)
    const [selectedSize, setSelectedSize] = useState<Size | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [stock, setStock] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [newStatus, setNewStatus] = useState<number>(1);

    const { data: session } = useSession();

    const handleSave = async () => {
        try {
            const body = {
                model: selectedModel?.idModel,
                size: selectedSize?.id,
                quantity: stock,
                price: price,
                status: newStatus,
            }
            console.log(body)
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


    useEffect(() => {
        fetch(`/api/models`)
            .then((response) => response.json())
            .then((dataC) => {
                setModels(dataC)
                const modelInDataC = dataC && dataC.length > 0 ? dataC[0] : null;
                setSelectedModel(modelInDataC);
            });
        fetch(`/api/sizes`)
            .then((response) => response.json())
            .then((dataC) => {
                setSizes(dataC)
                const sizeInDataC = dataC && dataC.length > 0 ? dataC[0] : null;
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
                const categoryInDataC = dataC && dataC.length > 0 ? dataC[0] : null;
                setSelectedCategory(categoryInDataC);
            });
    }, [session])

    return (
        <PopUp button={
            <span className="flex items-center gap-2">
                <IoMdAddCircle /> Add new category
            </span>
        }>
            <Dialog.Title as="h2" className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2">
                Add new catalog
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
                        inputProps={{ min: "0" }}
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
                            inputProps={{ min: "0" }}
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

export default AddCatalogPopUp;
