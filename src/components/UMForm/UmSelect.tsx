import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormItem, FormMessage, FormLabel } from "../ui/form";
import React from "react";

interface OptionType {
  value: string;
  label: string;
}

interface UmSelectProps {
  name: string;
  label: string;
  options?: OptionType[];
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const UmSelect: React.FC<UmSelectProps> = ({
  name,
  label,
  options = [],
  onValueChange,
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <FormItem>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.value === "__placeholder__"}
                    >
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__placeholder__" disabled>
                    No options available
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <FormMessage />
    </FormItem>
  );
};

export default UmSelect;
