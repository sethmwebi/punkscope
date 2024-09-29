import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import ApolloProviderWrapper from "@/components/apollo-provider";
import MetaMaskProviderWrapper from "@/components/metamask-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Punkscope",
  description: "Website that shows stats on various NFTs",
};
export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ApolloProviderWrapper>
            <MetaMaskProviderWrapper>
              <Navbar />
              {children}
            </MetaMaskProviderWrapper>
          </ApolloProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
