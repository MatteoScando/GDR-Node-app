import { Box, Container, Group, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { IconLogout } from "@tabler/icons-react";
import classes from "./styles.module.css";

const InnerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header className={classes.header}>
        <Container size="full" className={classes.inner}>
          <Group justify="space-between">
            <Link href="/">
              <Image src={logo} width={178} height={100} alt={"App Logo"} />
            </Link>
          </Group>

          <Link href="#" className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={1.5} size={32} />
            <Title order={4} ml={8}>
              Logout
            </Title>
          </Link>
        </Container>
      </header>
      <Box>{children}</Box>
    </>
  );
};
export default InnerLayout;
