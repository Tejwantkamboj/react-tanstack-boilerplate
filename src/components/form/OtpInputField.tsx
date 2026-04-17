import clsx from 'clsx';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import type { InputProps } from 'react-otp-input';

type InputFieldProps = {
  name: string;
  error?: { message?: string };
  control: any;
  label: string;
  className?: string;
};

export const OtpInputField = ({ name, control, label, error, className }: InputFieldProps) => {
  const renderCustomInput = (inputProps: InputProps, index: number) => (
    <input
      key={index}
      {...inputProps}
      maxLength={1}
      className="inputfield"
      style={{
        width: '2em',
        height: '2em',
        fontSize: '1.5em',
        margin: '0.5em',
      }}
    />
  );
  return (
    <div className={clsx('flex flex-col gap-2  w-auto', className)}>
      {/* Label */}
      <label className="text-sm font-medium">{label}</label>

      {/* OTP Input */}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <OtpInput
            value={field.value || ''}
            onChange={(otp) => field.onChange(otp)}
            numInputs={6}
            renderSeparator={<span style={{ width: '3px' }}></span>}
            shouldAutoFocus={true}
            renderInput={renderCustomInput}
          />
        )}
      />

      {/* Error */}
      {error?.message && <p className="text-red-500 text-xs text-center">{error.message}</p>}
    </div>
  );
};
