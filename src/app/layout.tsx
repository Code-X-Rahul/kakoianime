import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "../context/UserContext.jsx";
import { AnimeProvider } from "../context/AnimeContext.jsx";
// import { DbProvider } from "../context/DbContext.jsx";
import QueryWrapper from "@/wrappers/queryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kakoi Anime",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`max-w-screen-2xl mx-auto min-h-screen ${inter.className}`}
      >
        <QueryWrapper>
          <UserProvider>
            {/* <DbProvider> */}
              <AnimeProvider>
                <Header />
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <Footer />
              </AnimeProvider>
            {/* </DbProvider> */}
          </UserProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
