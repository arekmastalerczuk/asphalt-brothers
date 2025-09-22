import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/assets/styles/globals.css";

const lato = Lato({
  subsets: ["latin-ext"],
  weight: ["100", "400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Asphalt Brothers",
  description:
    "Two wheels. One lifestyle. Premium motorcycle gear, clothing and accessories for riders who value both style and protection. Ride hard, look sharp.",
};

type Props = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>{children}</body>
    </html>
  );
}
