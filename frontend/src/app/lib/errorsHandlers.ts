export const errorsHandlers = (error: number) => {
  switch (error) {
    case 401:
      return "Invalid email or password";
    default:
    case 500:
      return "Internal Server Error";
  }
};
