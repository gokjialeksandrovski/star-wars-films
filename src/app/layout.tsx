import type { Metadata } from "next";
import "./styles/globals.css";
import Footer from "./components/navigation/Footer";
import ClientLayout from "./components/global/ClientLayout";

export const metadata: Metadata = {
  title: "Star Wars Films",
  description: "Made by Gordan Aleksandrovski",
  icons: {
    icon: "/icons/darth-vader.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
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
