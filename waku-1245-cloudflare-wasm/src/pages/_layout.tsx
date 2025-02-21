import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
