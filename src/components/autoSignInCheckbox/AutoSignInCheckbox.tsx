import React, { ChangeEvent } from "react";
import Checkbox from "../checkbox/CheckBox";
import Tooltip from "../tooltip/Tooltip";

interface AutoSignInCheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  orientation?: "top" | "bottom" | "left" | "right";
  message?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const AutoSignInCheckbox = ({
  label = "자동 로그인",
  checked,
  disabled,
  orientation = "top",
  message = "개인 정보 보호를 위해 본인 기기에서만 이용해 주세요",
  onChange,
  ...restProps
}: AutoSignInCheckboxProps) => {
  return (
    <div className="relative">
      <Checkbox
        label={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      {checked && (
        <Tooltip
          left={-5}
          top={24}
          orientation={orientation}
          message={message}
        />
      )}
    </div>
  );
};

export default AutoSignInCheckbox;
