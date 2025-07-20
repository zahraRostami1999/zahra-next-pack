import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <div className="bg-red-500">
        <ul>
          <li>
            <Link
              href="/demo/editor"
              className={`${geistSans.variable} font-sans text-white`}
            >
              Editor
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
