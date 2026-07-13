import { Monitor, FlaskConical, Laptop, BookOpen, Trophy, Bus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FACILITIES } from "@/data/school";

const ICONS = [Monitor, FlaskConical, Laptop, BookOpen, Trophy, Bus];

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Campus Life"
          title="Facilities that support real learning"
          description="A campus designed to give students the tools, space and safety they need to grow — academically, physically and creatively."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((facility, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={facility.title} delay={i * 0.05}>
                <div className="relative overflow-hidden rounded-2xl bg-navy p-7 h-full">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/10 blur-2xl" />
                  <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg text-white">{facility.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {facility.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
