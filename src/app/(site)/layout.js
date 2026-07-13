import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SCHOOL } from "@/data/school";

const siteUrl = "https://www.royalenglishmediumschool.in";

export const metadata = {
  title: {
    default: `${SCHOOL.name} | Best CBSE School in Raniganj, West Bengal`,
    template: `%s | ${SCHOOL.name}`,
  },
  description:
    "Royal English Medium School, Ronai, Raniganj is a premier English-medium school known for academic excellence, holistic development and a nurturing campus. Admissions open.",
  keywords: [
    "Royal English Medium School",
    "school in Raniganj",
    "best school Ronai",
    "English medium school West Bengal",
    "CBSE school Raniganj",
    "school admission Raniganj",
    "Islam Nagar school",
  ],
  authors: [{ name: SCHOOL.name }],
  creator: SCHOOL.name,
  publisher: SCHOOL.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: SCHOOL.name,
    title: `${SCHOOL.name} | Best CBSE School in Raniganj, West Bengal`,
    description:
      "A premier English-medium school in Ronai, Raniganj shaping confident, capable learners since inception.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SCHOOL.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SCHOOL.name} | Best CBSE School in Raniganj`,
    description:
      "A premier English-medium school in Ronai, Raniganj shaping confident, capable learners since inception.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function SiteLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: SCHOOL.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SCHOOL.address.line1,
      addressLocality: SCHOOL.address.city,
      addressRegion: SCHOOL.address.state,
      postalCode: SCHOOL.address.pin,
      addressCountry: "IN",
    },
    telephone: SCHOOL.phone,
    email: SCHOOL.email,
    sameAs: Object.values(SCHOOL.social || {}),
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to main content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
