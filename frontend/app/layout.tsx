import "./globals.css";
import { ReactNode } from "react";
import QueryProvider from "./components/QueryProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <QueryProvider>
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
