import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My AI Twin",
  description: "Chat with my digital personality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
