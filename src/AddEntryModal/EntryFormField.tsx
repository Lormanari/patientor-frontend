import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import { HospitalType } from "../types";

export type TypeOption = {
	value: HospitalType;
	label: string;
  };

// props for select field component
type TypeSelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: any;
};

export const TypeSelectField: React.FC<TypeSelectFieldProps> = ({
  name,
  label,
  options,
  handleChange
}: TypeSelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown" onChange={handleChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);