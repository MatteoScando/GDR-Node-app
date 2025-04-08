import { ZodError } from "zod";

export const validationError = (error: ZodError) => {
  console.error("Validation Error:", error.errors);
  let errors: string = "";

  error.errors.forEach((err) => {
    errors += `Path: ${err.path.join(".")}\n`;
    errors += `Message: ${err.message}\n`;
  });

  return errors;
};
