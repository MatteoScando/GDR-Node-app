import InnerLayout from "@/components/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerLayout>{children}</InnerLayout>;
}
