import Button from "@/components/Button";
import Form from "@/components/Form";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import PopUp from "@/components/PopUp";
import { useSelector } from "react-redux";
import { getModelState } from "@/store/slices/modelSlice";
import Select from "@/components/Select";
import { TableModel } from "@/interfaces/model";
import { FaEdit } from "react-icons/fa";
import { modelStatus } from "@/utils/models";
import { Dialog } from "@headlessui/react";

interface AddModelPopUpProps {
  data: TableModel;
  onSave: () => void;
}

const AddModelSchema = yup.object().shape({
  nameModel: yup.string().required("Model name is required"),
  url: yup.string().required("Image URL is required"),
});

function EditModelPopUp({ data, onSave }: AddModelPopUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddModelSchema) });
  const [error, setError] = useState<string>();
  const { data: session } = useSession();
  const { categories } = useSelector(getModelState);
  const [category, setCategory] = useState<string>();
  const [newStatus, setNewStatus] = useState<string>(data.status);

  const handleCategoryChange = async (key: string, value: any) => {
    setCategory(value);
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const body = {
        nameModel: formData.nameModel,
        category,
        urlImage: formData.url,
        status: newStatus,
      };

      const response = await fetch(`/api/models/${data.idModel}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Model successfully modified`,
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

  const defaultCategory = categories.find(
    (e) => e.key === data.category.idCategory
  );

  useEffect(() => {
    if (!defaultCategory) return;
    setCategory(defaultCategory.key);
  }, [defaultCategory]);

  const defaultStatus = modelStatus.find((e) => e.key === data.idStatus);

  useEffect(() => {
    if (!defaultStatus) return;
    setNewStatus(defaultStatus.key);
  }, [data.status, defaultStatus]);

  const handleStatusChange = async (key: string, value: any) => {
    setNewStatus(value);
  };

  return (
    <PopUp button={<FaEdit />}>
      <Dialog.Title
        as="h2"
        className="text-2xl font-medium leading-6 text-center mb-8 text-purple-2"
      >
        Edit Model - ID {data.idModel}
      </Dialog.Title>
      <Form
        onSubmit={onSubmit}
        className="bg-opacity-25 px-16 py-8 my-8 rounded-lg flex flex-col max-w-screen-lg min-w-[33%] m-auto"
      >
        <Form.Errors>{error}</Form.Errors>

        <Form.Body register={register} className="flex flex-col justify-center">
          <FormInput
            name="nameModel"
            label="Model name"
            placeholder="Enter model's name"
            error={errors.nameModel?.message}
            defaultValue={data.nameModel}
            autoComplete="false"
          />

          <FormInput
            name="url"
            label="URL Image"
            placeholder="Enter image's url"
            error={errors.url?.message}
            defaultValue={data.urlImage}
            autoComplete="false"
          />

          <Select
            label="Category"
            options={categories}
            onChange={handleCategoryChange}
            defaultValue={defaultCategory}
          />

          <Select
            label="Status"
            options={modelStatus}
            onChange={handleStatusChange}
            defaultValue={defaultStatus}
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

export default EditModelPopUp;
