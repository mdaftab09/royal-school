import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGallery } from "@/lib/data";

export const metadata = {
  title: "Gallery",
  description:
    "Photos from campus life, events, sports and celebrations at Royal English Medium School, Ronai, Raniganj.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life at Royal English Medium School"
        description="A look at our classrooms, events, sports and celebrations throughout the year."
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <GalleryGrid items={items} />
        </Container>
      </section>
    </>
  );
}
