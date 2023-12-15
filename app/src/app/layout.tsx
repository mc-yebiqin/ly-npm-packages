"use client";

import "./globals.css";
import { design } from "laoye-react-component_design";

const RootLayout = ({ children }: any) => {
  console.log(
    "%c >>>>> design -3",
    "font-size:13px; background:#29d680; color:white;",
    design
  );

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
