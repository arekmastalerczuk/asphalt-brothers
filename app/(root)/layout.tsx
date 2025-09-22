import React from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/Footer";

type Props = {
  readonly children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="wrapper flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
