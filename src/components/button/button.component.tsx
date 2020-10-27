import React from "react";
import classNames from "classnames";

interface ButtonProps {
  element?: any;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "alt" | "alt-black";
}

const Button: React.FC<ButtonProps> = ({
  element: HtmlEl = "button",
  type = "button",
  onClick,
  disabled,
  children,
  variant,
}) => {
  const props = HtmlEl === "button" ? { type } : {};

  return (
    <HtmlEl
      className={classNames(
        "button",
        variant === "alt" && "button--alt",
        variant === "alt-black" && "button--alt-black"
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="button__content">{children}</span>
    </HtmlEl>
  );
};

export default Button;
