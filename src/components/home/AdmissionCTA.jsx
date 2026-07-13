import { ArrowRight, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Crest from "@/components/ui/Crest";
import { SCHOOL } from "@/data/school";

export default function AdmissionCTA() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-royal to-navy px-8 py-14 sm:px-14 sm:py-16 text-center">
          <Crest className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 opacity-10" />
          <Crest className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 opacity-10" />
          <div className="relative flex flex-col items-center gap-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Session 2026–27
            </span>
            <h2 className="font-display text-balance text-3xl sm:text-4xl text-white max-w-2xl">
              Give your child a foundation that lasts a lifetime
            </h2>
            <p className="max-w-xl text-white/70">
              Limited seats available across Nursery to Class X. Book a campus visit or
              start your application today.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <Button href="/admissions" variant="gold">
                Apply Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <a
                href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SCHOOL.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
