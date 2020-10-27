import React from "react";
import { Field } from "react-final-form";
import classNames from "classnames";

interface FieldRowProps {
  label?: string;
  id: string;
  name?: string;
  component: "input" | "select";
  type?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

const FieldRow: React.FC<FieldRowProps> = ({
  label,
  id,
  name,
  type,
  component,
  placeholder,
  options,
}) => (
  <div className={classNames("field", type === "hidden" && "field--hidden")}>
    {label && (
      <label htmlFor={id} className="field__label">
        {label}
      </label>
    )}

    {component === "select" && (
      <Field
        name={name || id}
        type={type}
        component={component}
        id={id}
        placeholder={placeholder}
        className="field__input"
      >
        <>
          {options &&
            options.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
        </>
      </Field>
    )}

    {component === "input" && (
      <Field
        name={name || id}
        type={type}
        component={component}
        id={id}
        placeholder={placeholder}
        className="field__input"
      />
    )}
  </div>
);

export default FieldRow;
