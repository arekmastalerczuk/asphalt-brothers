"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

// Target date 30 days from now
const TARGET_DATE = new Date();
TARGET_DATE.setDate(TARGET_DATE.getDate() + 7);
TARGET_DATE.setHours(23, 59, 59, 999);

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    // Calculate initial time on client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }
      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className="my-20 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-3xl font-bold">Loading countdown...</h3>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className="my-20 grid grid-cols-1 gap-y-4 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-2">
          <h3 className="text-3xl font-bold">Deal has ended</h3>
          <p className="text-xl">
            This deal is no longer available. Check back soon for new deals!
          </p>
          <div className="my-4 text-center md:my-0">
            <Button asChild>
              <Link href="/search">View Products</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/promo.png"
            alt="Product of the week"
            width={250}
            height={250}
            className="h-[250px] w-[250px] rounded-full object-fill"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="my-20 grid grid-cols-1 gap-y-4 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-3xl font-bold">Deal of the week</h3>
        <p className="text-xl">
          Don&apos;t miss out on the biggest deals of the week! Buy now and get
          amazing discounts on your purchases. Take advantage of our
          limited-time offers and get ready to save big on your favorite
          products.
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label="Days" value={time?.days || 0} />
          <StatBox label="Hours" value={time?.hours || 0} />
          <StatBox label="Minutes" value={time?.minutes || 0} />
          <StatBox label="Seconds" value={time?.seconds || 0} />
        </ul>
        <div className="my-4 text-center md:my-0">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/promo.png"
          alt="Product of the week"
          width={250}
          height={250}
          className="h-[250px] w-[250px] rounded-full object-fill"
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="w-full p-4 text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
);
export default DealCountdown;
