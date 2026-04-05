import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, OtpInputField } from '../../../components/form/index';
import { Button } from '../../../components/Elements/index';
import z from 'zod';
import type { User } from '../types';
import { useVerifyOtp } from '../api/api';

const schema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
});

export const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate, isPending } = useVerifyOtp();
  const email = location.state?.email;

  const handleSubmit = (values: { otp: string }) => {
    const payload = { ...values, email };
    mutate(payload, {
      onSuccess: (user: User) => {
        navigate('/auth/login');
      },
      onError: (error: any) => {
        console.error('Opt verification failed:', error);
      },
    });
  };

  return (
    <div className="border-2 p-3 rounded-2xl w-2xl">
      <div>
        <h3>Welcome to our platform!</h3>
      </div>
      <div className="flex items-center justify-center">
        <h3>Verify Otp</h3>
      </div>
      <Form schema={schema} onSubmit={handleSubmit}>
        {({ register, formState, control }) => (
          <div className="space-y-4 max-w-2xl mx-auto flex-1">
            <div className="flex flex-col items-center justify-center gap-4 ">
              <OtpInputField
                name="otp"
                className="w-full max-w-sm"
                label="Enter OTP"
                control={control}
                error={formState.errors['otp']}
              />
            </div>
            <Button
              className="w-full"
              name="Verify Otp"
              type="submit"
              variant="primary"
              size="md"
              loading={isPending}
              disabled={isPending}
            />
          </div>
        )}
      </Form>
    </div>
  );
};
