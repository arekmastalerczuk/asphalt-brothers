import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { APP_NAME } from "@/lib/constants";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 items-center justify-center">
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/404-not-found.jpg"
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="bg-background/40 mx-4 w-full max-w-md rounded-lg p-8 text-center shadow-lg backdrop-blur-xs">
          <h1 className="mb-4 text-3xl font-bold">Error 404 - Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we can&apos;t find the page you&apos;re looking for.
          </p>
          <Button size="lg" asChild>
            <Link href="/">Back to {APP_NAME}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
