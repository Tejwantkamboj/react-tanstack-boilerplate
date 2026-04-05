import { Button } from '../../../components/Elements/index';
import { Form, InputField } from '../../../components/form/index';
import z from 'zod';
import { useRegister } from '../../../lib/auth';
import { Link, useNavigate } from 'react-router-dom';
import type { RegisterValues, User } from '../types';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  firstname: z.string(),
  lastName: z.string(),
});

export const Register = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const handleSubmit = (values: RegisterValues) => {
    console.log('values of login data', values);
    mutate(values, {
      onSuccess: (user: User) => {
        console.log('Login success:', user);
        navigate("/verify-register-otp");
      },
      onError: (error: any) => {
        console.log('Login failed:', error);
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
        {({ register, formState }) => (
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
              type="password"
              Inputicon="a"
              className="input-field"
              label="Enter Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Button
              className="w-full"
              name="Login"
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
