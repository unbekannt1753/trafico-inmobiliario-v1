import "./globals.css";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { AppProvider } from "@/src/context/AppContext";
import Tweaks from "@/src/components/Tweaks";
import { Metadata } from "next";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Tráfico Inmobiliario",
  description: "Marketplace mexicano para comprar, vender o rentar inmuebles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="light" data-density="compact" data-card="minimal" data-serif="true">
      <body className={`${instrumentSerif.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
        <AppProvider>
          {children}
          <Tweaks />
        </AppProvider>
      </body>
    </html>
  );
}
