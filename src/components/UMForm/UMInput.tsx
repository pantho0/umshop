/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

interface UMInputProps {
  type: string;
  name: string;
  placeholder: string;
  label: React.ReactNode;
  defaultValue?: string;
}

export const UMInput = ({
  type,
  name,
  placeholder,
  label,
  defaultValue = "",
}: UMInputProps) => {
  return (
    <>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>

            <Input
              id={name}
              type={type}
              required
              placeholder={placeholder}
              className="w-full"
              {...field}
            />
          </>
        )}
      />
    </>
  );
};
