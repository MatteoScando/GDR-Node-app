"use client";
import loop from "@/assets/loop.mp4";
import Video from "@/components/ui/video";
import { Paper, Title } from "@mantine/core";

const HomePage = () => {
  return (
    <>
      <Paper
        radius={0}
        p={30}
        bg="violet.6"
        style={{ height: "100vh", width: "400px" }}
      >
        <Title order={2} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
      </Paper>
    </>
  );
};

export default HomePage;
