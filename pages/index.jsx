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
      <div className="bg-red-200 p-4">
        <ul className="flex gap-6">
          <li>
            <Link
              href="/demo/editor"
              className={`${geistSans.variable} font-sans hover:underline`}
            >
              Editor
            </Link>
          </li>
          <li>
            <Link href="/demo/pie-chart" className="hover:underline">
              Pie Chart
            </Link>
          </li>
          <li>
            <Link href="/demo/bar-chart" className="hover:underline">
              Bar Chart
            </Link>
          </li>
          <li>
            <Link href="/demo/table/checked-table" className="hover:underline">
              Checked Table
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
