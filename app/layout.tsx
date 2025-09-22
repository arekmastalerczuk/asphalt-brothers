import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";

const lato = Lato({
  subsets: ["latin-ext"],
  weight: ["100", "400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    template: `%s | Asphalt Brothers`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
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
