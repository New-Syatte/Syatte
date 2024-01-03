import { ChangeEvent } from "react";

interface ICheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const Checkbox = ({
  label,
  checked = false,
  disabled = false,
  onChange,
  ...restProps
}: ICheckboxProps) => {
  return (
    <label style={{ fontSize: "1.4rem" }}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />{" "}
      {label}
    </label>
  );
};

export default Checkbox;
