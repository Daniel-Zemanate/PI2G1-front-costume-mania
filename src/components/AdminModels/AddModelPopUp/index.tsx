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

interface AddModelPopUpProps {
  onSave: () => void;
}

const LogInSchema = yup.object().shape({
  categoryName: yup.string().required("Category name is required"),
});

function AddModelPopUp({ onSave }: AddModelPopUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LogInSchema) });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  return (
    <PopUp
      button={
        <span className="flex items-center gap-2">
          <IoMdAddCircle /> Add new Model
        </span>
      }
    >
      still nothing here
    </PopUp>
  );
}

export default AddModelPopUp;
