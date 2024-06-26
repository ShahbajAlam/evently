import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextJS starter template",
    description: "A NextJS boilerplate starter template project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className=" lg:w-[80%] lg:max-w-[1000px] lg:mx-auto"
        >
            <head>
                <script
                    defer
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACE_API_KEY}&libraries=places`}
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <Toaster />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
