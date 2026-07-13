import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/600-italic.css";
import "./globals.css";
import { SCHOOL } from "@/data/school";

const siteUrl = "https://www.royalenglishmediumschool.in";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SCHOOL.name} | Best CBSE School in Raniganj, West Bengal`,
    template: `%s | ${SCHOOL.name}`,
  },
  description:
    "Royal English Medium School, Ronai, Raniganj is a premier English-medium school known for academic excellence, holistic development and a nurturing campus. Admissions open.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ivory text-ink">{children}</body>
    </html>
  );
}
