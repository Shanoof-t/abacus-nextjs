import { useNewAccount } from "@/hooks/use-account";
import { AccountInputs } from "@/services/account-service";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

interface Options {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.replace(/\W/g, ""),
});

type Props = {
  values: string[];
  placeholder: string;
  // setNewValue: () => void;
  isLoading: boolean;
  mutate: (data: AccountInputs) => void;
};

export default ({ values, placeholder, isLoading, mutate }: Props) => {
  const defaultOptions = values.map((value) => createOption(value));

  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState<Options | null>();

  // const { mutate, isPaused } = useNewAccount();
  const handleCreate = (newAccount: string) => {
    const newOption = createOption(newAccount);
    setOptions((p) => [...p, newOption]);
    setValue(newOption);
    mutate({ account_name: newAccount });
  };

  return (
    <CreatableSelect
      isClearable
      // isDisabled={isPaused}
      // isLoading={isPaused}
      value={value}
      options={options}
      onChange={(newValue) => setValue(newValue)}
      onCreateOption={handleCreate}
      placeholder={placeholder}
    />
  );
};
