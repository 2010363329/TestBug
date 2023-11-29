import React from "react";
import { Inter } from "next/font/google";

import StyledComponentsRegistry from "../lib/StyleRegistry";

import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;