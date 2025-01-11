import { useState } from "react";
import CreatableSelect from "react-select/creatable";

// interface Options {
//   readonly label: string;
//   readonly value: string;
// }

const createOption = (label: string) => ({
  label,
  value: label.replace(/\W/g, ""),
});

type Props = {
  values: string[];
  placeholder: string;
  onCreate: (name: string) => void;
  onChange: (value: string | undefined) => void;
  value: string;
};

const Select = ({ values, value, placeholder, onCreate, onChange }: Props) => {
  const defaultOptions = values.map((value) => createOption(value));

  const [options, setOptions] = useState(defaultOptions);
  // const [value, setValue] = useState<Options | null>();

  const handleCreate = (newName: string) => {
    const newOption = createOption(newName);
    setOptions((p) => [...p, newOption]);
    onCreate(newName);
  };

  return (
    <CreatableSelect
      isClearable
      value={createOption(value)}
      options={options}
      onChange={(newValue) => onChange(newValue?.value)}
      onCreateOption={handleCreate}
      placeholder={placeholder}
      styles={{
        control: (base, state) => ({
          ...base,
          borderRadius: "0.5rem",
          borderColor: state.isFocused ? "black" : "",
          boxShadow: "none",
          "&:hover": {
            cursor: "pointer",
          },
        }),
      }}
    />
  );
};

export default Select;
