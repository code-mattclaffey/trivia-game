import React from "react";
import Button from "../button";

interface FormContainerProps {
  title: string;
  onSubmit: () => void;
  submitText: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  onSubmit,
  submitText,
  children,
}) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <legend className="form__title">{title}</legend>
      <fieldset className="form__section">{children}</fieldset>
      <div className="form__footer">
        <Button type="submit">{submitText}</Button>
      </div>
    </form>
  );
};

export default FormContainer;
