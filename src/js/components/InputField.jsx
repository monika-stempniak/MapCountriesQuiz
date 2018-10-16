// @flow
import React from "react";

type Props = {
  labelClass: string,
  inputId: string,
  inputType?: string,
  inputName?: string,
  inputClass: string,
  handleInputChange: (?Object) => void,
  handleInputBlur: () => void,
  inputValue?: string,
  inputPlaceholder?: string,
  isChecked?: boolean,
  inputText?: string,
};

function InputField(props: Props) {
  const {
    labelClass,
    inputId,
    inputType,
    inputName,
    inputClass,
    handleInputChange,
    handleInputBlur,
    inputValue,
    inputPlaceholder,
    isChecked,
    inputText,
  } = props;

  return (
    <label htmlFor={inputId} className={labelClass}>
      <input
        type={inputType}
        id={inputId}
        className={inputClass}
        name={inputName}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={inputValue}
        placeholder={inputPlaceholder}
        checked={isChecked}
      />
      {inputText}
    </label>
  );
}

InputField.defaultProps = {
  inputType: "text",
  inputName: "",
  inputValue: "",
  inputPlaceholder: "",
  isChecked: false,
  inputText: "",
};

export default InputField;
