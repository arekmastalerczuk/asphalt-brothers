import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" duration={5000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
