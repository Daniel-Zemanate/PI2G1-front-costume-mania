import Button from "@/components/Button";
import Form from "@/components/Form";
import React, { useState } from "react";
import FormInput from "@/components/Form/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PopUp from "@/components/PopUp";
import { IoMdAddCircle } from "react-icons/io";

interface AddCategoryPopUpProps {
  onSave: () => void;
}

const LogInSchema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
});

function AddCategoryPopUp({ onSave }: AddCategoryPopUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LogInSchema) });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = {
        name: data.categoryName,
      };

      const response = await fetch(`/api/categories/admin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `Category successfully added`,
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
          <IoMdAddCircle /> Add new category
        </span>
      }
    >
      <Form
        onSubmit={onSubmit}
        className="bg-opacity-25 px-16 py-8 my-8 rounded-lg flex flex-col max-w-screen-lg min-w-[33%] m-auto"
      >
        <Form.Header className="text-center p-4">
          <Form.Title className="text-2xl font-bold">
            Add new category
          </Form.Title>
        </Form.Header>

        <Form.Errors>{error}</Form.Errors>

        <Form.Body register={register} className="flex flex-col justify-center">
          <FormInput
            name="categoryName"
            label="Category Name"
            placeholder="Enter your email"
            error={errors.categoryName?.message}
            autoFocus
            autoComplete="false"
          />
          {/* INPUT DUMMY PARA QUE FUNCIONE EL FORM (NECESITA MÍNIMO 2 INPUTS) */}
          <FormInput name="dummy" className="hidden" />
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

export default AddCategoryPopUp;
