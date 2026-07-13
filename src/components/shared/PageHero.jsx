import Container from "@/components/ui/Container";
import Crest from "@/components/ui/Crest";

export default function PageHero({ eyebrow, title, description, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      <Crest className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-[0.07]" />
      <Container className="relative">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/50">
            {breadcrumb}
          </nav>
        )}
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-display text-balance text-3xl sm:text-4xl lg:text-5xl text-white max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70">{description}</p>
        )}
      </Container>
    </section>
  );
}
