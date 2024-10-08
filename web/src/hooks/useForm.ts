import React, { useCallback, useState } from "react";

type TErrors<TValues> = {
  [k in keyof TValues]?: string;
};

type ValidatorFn = (value: string) => string | undefined;

const useForm = <TValues>({ initialValues }: { initialValues: TValues }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<TErrors<TValues>>({});

  const register = useCallback(
    (name: keyof TValues, validators?: ValidatorFn[]) => {
      return {
        name,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setValues((prevValues) => ({
            ...prevValues,
            [name]: e.target.value.trim(),
          }));

          if (validators?.length) {
            let error: string | undefined;
            let index = 0;
            while (!error && validators[index]) {
              error = validators[index](e.target.value);
              index++;
            }
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
          }
        },
      };
    },
    []
  );
  const handleSubmit = (
    onSubmit: (values: TValues) => void | Promise<void>
  ) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = Object.values(errors).every((error) => !error);
      if (!isValid) {
        return alert("Form contains errors.");
      }
      onSubmit(values);
    };
  };
  return {
    register,
    handleSubmit,
    values,
    errors,
  };
};
export default useForm;
