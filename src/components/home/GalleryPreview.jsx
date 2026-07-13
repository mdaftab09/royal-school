import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const PREVIEW_ITEMS = [
  { label: "Classrooms", span: "sm:col-span-2 sm:row-span-2" },
  { label: "Sports Day" },
  { label: "Science Lab" },
  { label: "Annual Function" },
  { label: "Library" },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 sm:py-28 bg-paper">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Gallery"
            title="A glimpse into everyday school life"
          />
          <Button href="/gallery" variant="ghost" className="w-fit shrink-0">
            View Full Gallery
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:auto-rows-[9rem]">
          {PREVIEW_ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05} className={item.span || ""}>
              <Link
                href="/gallery"
                className="focus-ring group relative flex h-full min-h-[9rem] items-end overflow-hidden rounded-2xl bg-gradient-to-br from-royal/15 via-royal/5 to-gold/10 border border-black/5"
              >
                <span className="relative z-10 w-full bg-gradient-to-t from-navy/70 to-transparent p-4 text-sm font-medium text-white">
                  {item.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
