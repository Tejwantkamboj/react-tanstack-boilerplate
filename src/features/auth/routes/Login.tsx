import { Button } from '../../../components/Elements/index';
import { Form, InputField } from '../../../components/form/index';
import z from 'zod';
import { useLogin } from '../../../lib/auth';
import { useNavigate } from 'react-router-dom';
import type { LoginValues, User } from '../types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (values: LoginValues) => {
    mutate(values, {
      onSuccess: (user: User) => {
        console.log('Login success:', user);
        navigate(user.role === 'admin' ? '/admin' : '/user');
      },
      onError: (error: any) => {
        console.log('Login failed:', error);
      },
    });
  };

  return (
    <div>
      <Form schema={loginSchema} onSubmit={handleSubmit}>
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
            <Button name="Login" type="submit" variant="primary" size="md" loading={isPending} disabled={isPending} />
          </div>
        )}
      </Form>
    </div>
  );
};
