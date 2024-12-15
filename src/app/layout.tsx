import "./styles/globals.css";
import Footer from "./components/navigation/Footer";
import ClientLayout from "./components/global/ClientLayout";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Star Wars Films",
  description: "Made by Gordan Aleksandrovski",
  icons: {
    icon: "/icons/darth-vader.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
