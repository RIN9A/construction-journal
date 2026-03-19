import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: 'СтройКонтроль — Журнал работ',
  description: 'Учёт выполненных работ на строительном объекте',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}