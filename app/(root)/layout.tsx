import React from "react";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

type Props = {
  readonly children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
