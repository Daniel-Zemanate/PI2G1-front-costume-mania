import Button from "@/components/Button";
import Form from "@/components/Form";
import React, { useState } from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import PopUp from "@/components/PopUp";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { getModelState } from "@/store/slices/modelSlice";
import Select from "@/components/Select";

interface AddModelPopUpProps {
  onSave: () => void;
}

const AddModelSchema = yup.object().shape({
  nameModel: yup.string().required("Model name is required"),
  url: yup.string().required("Image URL is required"),
});

function AddModelPopUp({ onSave }: AddModelPopUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddModelSchema) });
  const [error, setError] = useState<string>();
  const { data: session } = useSession();
  const { categories } = useSelector(getModelState);
  const [category, setCategory] = useState<string>(categories[0].key);

  const handleCategoryChange = async (key: string, value: any) => {
    setCategory(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log("adsa");
    try {
      const body = {
        nameModel: data.nameModel,
        category,
        urlImage: data.url,
      };

      console.log("ada");

      const response = await fetch(`/api/models/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });

      console.log(response);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Model successfully added`,
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
  });

  return (
    <PopUp
      button={
        <span className="flex items-center gap-2">
          <IoMdAddCircle /> Add new model
        </span>
      }
    >
      <Form
        onSubmit={onSubmit}
        className="bg-opacity-25 px-16 py-8 my-8 rounded-lg flex flex-col max-w-screen-lg min-w-[33%] m-auto"
      >
        <Form.Header className="text-center p-4">
          <Form.Title className="text-2xl font-bold">New Model</Form.Title>
        </Form.Header>

        <Form.Errors>{error}</Form.Errors>

        <Form.Body register={register} className="flex flex-col justify-center">
          <FormInput
            name="nameModel"
            label="Model name"
            placeholder="Enter model's name"
            error={errors.nameModel?.message}
            autoComplete="false"
          />

          <FormInput
            name="url"
            label="URL Image"
            placeholder="Enter image's url"
            error={errors.url?.message}
            autoComplete="false"
          />

          <Select
            label="Category"
            options={categories}
            onChange={handleCategoryChange}
          />
        </Form.Body>

        <Form.ButtonSection className="mt-4 flex justify-center gap-4">
          <Button
            label="Submit"
            type="submit"
            buttonStyle="primary"
            size="small"
          />
        </Form.ButtonSection>
      </Form>
    </PopUp>
  );
}

export default AddModelPopUp;
