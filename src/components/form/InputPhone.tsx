import clsx from 'clsx';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

type InputFieldProps = {
  name: string;
  control: Control<any>;
  label: string;
  error?: { message?: string };
  className?: string;
};

export const InputPhone = ({ name, control, label, error, className }: InputFieldProps) => {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {/* Label */}
      <label className="text-sm font-medium">{label}</label>

      {/* Phone Input */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            defaultCountry="IN"
            placeholder="Enter phone number"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />

      {/* Error */}
      {error?.message && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};
