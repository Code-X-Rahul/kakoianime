import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "../UserContext.jsx";
import { AnimeProvider } from "../context/AnimeContext.jsx";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AnimeProvider>
            <body className={inter.className}>
              <Header />
              {children}
              <Footer />
            </body>
          </AnimeProvider>
          <ReactQueryDevtools />
        </UserProvider>
      </QueryClientProvider>
    </html>
  );
}
