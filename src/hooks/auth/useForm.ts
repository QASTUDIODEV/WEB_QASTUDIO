import type React from 'react';
import { useEffect, useState } from 'react';

type TUseFormProps<T> = {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
};

function useForm<T extends Record<string, any>>({ initialValue, validate }: TUseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [valid, setValid] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChangeInput = (name: keyof T, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name] as string;
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(name, event.target.value);
    const onBlur = () => handleBlur(name);
    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);

    const newValid: Partial<Record<keyof T, boolean>> = {};
    (Object.keys(values) as (keyof T)[]).forEach((key) => {
      newValid[key] = !newErrors[key];
    });
    setValid(newValid);
  }, [validate, values]);

  return { values, errors, valid, touched, getTextInputProps };
}

export default useForm;
