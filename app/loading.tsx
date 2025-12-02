import React from "react";
import Image from "next/image";
import Header from "@/components/shared/header/Header";
import loader from "@/assets/loader.gif";
import Footer from "@/components/shared/footer/Footer";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-center flex-1">
        <Image src={loader} height={150} width={150} alt="Loading spinner" />
      </div>
      <Footer />
    </div>
  );
};

export default Loading;
