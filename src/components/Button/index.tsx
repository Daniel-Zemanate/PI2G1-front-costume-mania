import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

type Props = {
  label: ReactNode;
  buttonStyle: "primary" | "secondary";
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
  onClick?: () => void;
  size?: "large" | "small";
  disabled?: boolean,
  className?: string
};

function Button({ label, type = undefined, buttonStyle, to, onClick, size = "large", disabled = false, className }: Props) {
  const router = useRouter();

  const buttonClickHandler = () => {
    if (to) {
      router.push(to);
    } else if (onClick) {
      onClick();
    }
  };

  const buttonClassName = `${styles[buttonStyle]} ${size === "small" ? styles.smallButton : styles.largeButton} ${disabled ? styles.disabledButton : ""} ${className || ""}`;

  return (
    <button
      type={type}
      className={`${className} ${buttonClassName}`}
      onClick={buttonClickHandler}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
