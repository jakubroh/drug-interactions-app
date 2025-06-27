import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kontrola interakcí léků",
  description: "Bezpečná kontrola interakcí mezi léky pomocí AI. Vždy se poraďte s lékařem.",
  keywords: "léky, interakce, zdraví, lékař, bezpečnost",
  authors: [{ name: "Drug Interactions App" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
