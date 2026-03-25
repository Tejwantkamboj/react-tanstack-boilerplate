import React, { useState } from "react";
import { Button } from "../../../components/Elements/index";
import { Form, InputField } from "../../../components/form/index";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: LoginValues) => {
    console.log("clicked", values);
    setLoading(true);
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
              error={formState.errors["email"]}
              registration={register("email")}
            />
            <InputField
              type="password"
              Inputicon="a"
              className="input-field"
              label="Enter Password"
              error={formState.errors["password"]}
              registration={register("password")}
            />
            <Button
              name="Login"
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              disabled={loading}
            />
          </div>
        )}
      </Form>
    </div>
  );
};
