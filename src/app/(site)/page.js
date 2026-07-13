import Hero from "@/components/home/Hero";
import StatsCounter from "@/components/home/StatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import Facilities from "@/components/home/Facilities";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import NewsEvents from "@/components/home/NewsEvents";
import AdmissionCTA from "@/components/home/AdmissionCTA";
import MapSection from "@/components/shared/MapSection";
import { SCHOOL } from "@/data/school";
import { getNews, getEvents, getFaculty } from "@/lib/data";

export const metadata = {
  title: `${SCHOOL.name} | Best CBSE School in Raniganj, West Bengal`,
  description:
    "Royal English Medium School, Ronai, Raniganj — premier CBSE-pattern English medium education from Nursery to Class X. Admissions open for 2026–27.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [news, events, faculty] = await Promise.all([getNews(3), getEvents(4), getFaculty()]);
  const principal = faculty[0];

  return (
    <>
      <Hero />
      <StatsCounter />
      <WhyChooseUs />
      <PrincipalMessage principal={principal} />
      <Facilities />
      <GalleryPreview />
      <Testimonials />
      <NewsEvents news={news} events={events} />
      <AdmissionCTA />
      <MapSection compact />
    </>
  );
}
