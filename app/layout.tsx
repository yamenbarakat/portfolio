import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Yamen | Full Stack Developer Portfolio",
  description:
    "Professional portfolio of Yamen, a Full Stack Developer specializing in Next.js, React, and modern web apps.",
  keywords: [
    "Yamen",
    "Full Stack Developer",
    "Next.js Developer",
    "Frontend Developer Syria",
    "React Specialist",
  ],
  authors: [{ name: "Yamen" }],
  verification: {
    google: "AUWQocc6IsHHaayif9En-t3AZvaOM7jxqCsVI0c4UG4",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
