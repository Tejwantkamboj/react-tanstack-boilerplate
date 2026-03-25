import React from "react";
import type {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

type FormProps<T extends FieldValues> = UseFormProps<T> & {
  onSubmit: SubmitHandler<T>;
  className?: string;
  schema?: any;
  id?: string;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
};

export const Form = <T extends FieldValues>({
  onSubmit,
  children,
  className,
  id,
  schema,
  ...options
}: FormProps<T>) => {
  const methods = useForm<T>({
    ...options,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <form
      id={id}
      className={clsx(className)}
      onSubmit={(e) =>
        methods.handleSubmit((data, event) => onSubmit(data, event))(e)
      }
    >
      {children(methods)}
    </form>
  );
};

