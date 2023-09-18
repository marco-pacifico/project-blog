import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import { cookies } from 'next/headers';
import { BLOG_TITLE } from "@/constants";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";

export const metadata = {
  title: BLOG_TITLE,
  description: "A blog about software development and other things.",
};

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  // Get the theme from the cookies
  const savedTheme = cookies().get('color-theme');
  // If there's a saved theme in cookies, use that. Otherwise, use the default "light" theme
  const initialTheme = savedTheme?.value;
  // Pass theme to Header component which will use it to set the theme
  
  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        color-theme={initialTheme}
        // style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header initialTheme={initialTheme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
