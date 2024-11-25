"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import ThemeProvider from "../theme-provider";

interface Props {
  children: ReactNode;
}
const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
