import { Button } from '../../../components/Elements/index';
import { Form, InputField, InputPhone } from '../../../components/form/index';
import z from 'zod';
import { useRegister } from '../../../lib/auth';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterValues, User } from '../types';
import { isValidPhoneNumber } from 'react-phone-number-input';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.preprocess(
    (val) => val ?? '', // convert undefined/null → ''
    z
      .string()
      .min(1, 'Phone number is required')
      .refine((val) => isValidPhoneNumber(val), {
        message: 'Invalid phone number',
      }),
  ),
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(
      8,
      'Your password must be at least 8 characters long and include a combination of uppercase letters, lowercase letters, numbers, and special characters (e.g., !, @, #, $).',
    )
    .regex(
      // /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!@$#%]).*$/,
      // /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$#%]).{8,}$/,
      // /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$#%\-\^&*]).{8,}$/,
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/,
      'Your password must be at least 8 characters long and include a combination of uppercase letters, lowercase letters, numbers, and special characters (e.g., !, @, #, $).',
    ),
});

export const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const handleSubmit = (values: RegisterValues) => {
    // return;
    mutate(values, {
      onSuccess: (user: User) => {
        navigate('/auth/verify-otp', { state: {email:values.email} });
      },
      onError: (error: any) => {
        console.error('Registration failed:', error);
      },
    });
  };

  return (
    <div className="border-2 p-3 rounded-2xl">
      <div>
        <h3>Welcome to our platform!</h3>
      </div>
      <div className="flex items-center justify-center">
        <h3>Login</h3>
      </div>
      <Form schema={registerSchema} onSubmit={handleSubmit}>
        {({ register, formState, control }) => (
          <div className="space-y-4 max-w-2xl mx-auto flex-1">
            <InputField
              type="email"
              Inputicon="a"
              className="input-field"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="text"
              Inputicon="a"
              className="input-field"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <InputField
              type="text"
              className="input-field"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <InputPhone name="phone" label="Phone Number" control={control} error={formState.errors.phone} />
            <InputField
              type="password"
              Inputicon="a"
              className="input-field"
              label="Enter Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button
              className="w-full"
              name="Register"
              type="submit"
              variant="primary"
              size="md"
              loading={isPending}
              disabled={isPending}
            />

            <p className="text-center mt-2 text-gray-600">
              Not a member?{' '}
              <Link
                to="/auth/register"
                className="text-blue-500 hover:text-black font-medium transition-colors duration-200"
              >
                Create New Account
              </Link>
            </p>
          </div>
        )}
      </Form>
    </div>
  );
};
