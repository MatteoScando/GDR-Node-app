"use client";
import LoginForm from "@/components/form/login";
import { Anchor, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

const Page = () => {
  return (
    <Container
      h={"100vh"}
      size={420}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title ta="center" c="gray.0">
        Welcome back!
      </Title>
      <Text c="gray.4" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="/register">
          <Anchor underline="always" c="white">
            Create account
          </Anchor>
        </Link>
      </Text>
      <LoginForm />
    </Container>
  );
};

export default Page;
