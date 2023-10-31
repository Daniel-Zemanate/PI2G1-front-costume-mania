import React from "react";
import styles from "./styles.module.css";
import NavLink from "../NavLink/NavLink";
import { useRouter } from "next/navigation";

type Props = {
  label: string;
  buttonStyle: "primary" | "secondary";
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
  onClick?: () => void;
  size?: "large" | "small"; // Added size prop
};

function Button({ label, type = undefined, buttonStyle, to, onClick, size = "large" }: Props) {
  const router = useRouter();

  const buttonClickHandler = () => {
    if (to) {
      router.push(to);
    } else if (onClick) {
      onClick();
    }
  };

  const buttonClassName = `${styles[buttonStyle]} ${size === "small" ? styles.smallButton : styles.largeButton}`;

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={buttonClickHandler}
    >
      {label}
    </button>
  );
}

export default Button;
