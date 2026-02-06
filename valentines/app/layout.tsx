import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valentines",
  description: "Will you be my Valentine?",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-b from-pink-50 to-rose-100 antialiased">
        {children}
      </body>
    </html>
  );
}
