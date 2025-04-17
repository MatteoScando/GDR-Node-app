"use client";
import {
  Alert,
  Button,
  Paper,
  PasswordInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { RegisterFormValues } from "./types";
import { initialValues_Register } from "./consts";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { errorsHandlers } from "@/lib/errorsHandlers";

const RegistrationForm = () => {
  const [message, setMessage] = useState<number | null>(null);

  const theme = useMantineTheme();

  const requirements = [
    { re: /.{8,}/, label: "Password need 8 characters" },
    { re: /[0-9]/, label: "Numbers are required" },
    { re: /[a-z]/, label: "Lowercase letters are required" },
    { re: /[A-Z]/, label: "Uppercase letters are required" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Add a symbol" },
  ];

  const form = useForm({
    initialValues: initialValues_Register,
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value.trim()) ? null : "Invalid email address",
      password: (value) => {
        for (const requirement of requirements) {
          if (!requirement.re.test(value)) {
            return requirement.label;
          }
        }
      },
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleRegistration = async (values: RegisterFormValues) => {
    const data = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.confirmPassword,
      }),
    });

    setMessage(data.status);
  };

  return (
    <Paper shadow="md" p={30} mt={30} radius="md" bg={"violet.8"}>
      <form onSubmit={form.onSubmit((values) => handleRegistration(values))}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          {...form.getInputProps("email")}
          styles={{
            label: {
              color: theme.colors.gray[4],
            },
          }}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps("password")}
          styles={{
            label: {
              color: theme.colors.gray[4],
            },
          }}
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          required
          mt="md"
          {...form.getInputProps("confirmPassword")}
          styles={{
            label: {
              color: theme.colors.gray[4],
            },
          }}
        />

        <Button fullWidth mt="xl" type="submit">
          Sign in
        </Button>

        {message && (
          <Alert
            mt={20}
            variant="filled"
            color={message === 201 ? "green" : "red"}
          >
            {message === 201
              ? "User created succesfully!"
              : errorsHandlers(message)}
          </Alert>
        )}
      </form>
    </Paper>
  );
};

export default RegistrationForm;
