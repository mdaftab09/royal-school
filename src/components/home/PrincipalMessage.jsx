import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function PrincipalMessage({ principal }) {
  return (
    <section id="principal" className="py-20 sm:py-28 bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-royal/10 to-gold/10 border border-black/5 flex items-center justify-center">
                <span className="font-display text-6xl text-royal/20">RS</span>
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-2xl bg-navy px-5 py-4 shadow-xl">
                <p className="font-display text-sm text-white">{principal.name}</p>
                <p className="text-xs text-gold-light">{principal.role}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Quote className="h-10 w-10 text-gold/50" aria-hidden="true" />
            <p className="mt-4 font-display text-2xl sm:text-3xl leading-snug text-navy text-balance">
              &ldquo;Our promise to every family is simple — we will know your child by name, and
              we will help them become the best version of themselves.&rdquo;
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate max-w-xl">
              At Royal English Medium School, we believe education is more than examinations.
              It is the daily practice of curiosity, discipline and kindness. Our teachers work
              closely with every student, and our doors are always open to parents who want to
              be part of that journey.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div>
                <p className="font-semibold text-navy">{principal.name}</p>
                <p className="text-sm text-slate">{principal.role}, {principal.note}</p>
              </div>
            </div>
            <Button href="/about#principal" variant="ghost" className="mt-8">
              Read Full Message
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
