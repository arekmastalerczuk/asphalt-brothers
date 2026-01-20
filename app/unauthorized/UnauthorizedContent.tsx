"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

const UnauthorizedContent = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [router]);

  return (
    <div className="container mx-auto flex h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4">
      <h1 className="h1-bold text-4xl">Unauthorized Access</h1>
      <p className="text-muted-foreground">
        You do not have permission to access this page.
      </p>
      <p className="text-muted-foreground">
        You will be redirect to homepage after{" "}
        <span className="text-primary font-bold">{countdown}</span> seconds.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default UnauthorizedContent;
