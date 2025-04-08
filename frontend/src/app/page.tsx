import { Button } from "@mantine/core";

const Page = async () => {
  const reponse = await fetch("http://localhost:3000/api/hello");

  return (
    <div>
      Game ITS
      <Button variant="light">Button</Button>
    </div>
  );
};

export default Page;
