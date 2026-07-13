import { Target, Eye, Landmark } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FACULTY_HIGHLIGHTS } from "@/data/school";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Royal English Medium School's history, vision, mission and leadership — a trusted English-medium school in Ronai, Raniganj, West Bengal.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const principal = FACULTY_HIGHLIGHTS[0];
  const chairman = FACULTY_HIGHLIGHTS[1];

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Two decades of shaping confident learners"
        description="From a single building in Ronai to a full-fledged institution serving hundreds of families, our story has always been about the children first."
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />}
      />

      {/* History */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Our History
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy text-balance">
                Built on a simple belief: every child deserves a strong foundation
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate">
                Royal English Medium School was founded in Ronai, Raniganj with a clear purpose —
                to bring quality English-medium education within reach of local families. What
                began as a small campus has since grown into a full school serving Nursery through
                Class X, guided by the same values of discipline, care and academic rigor that it
                started with.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Today, the school is recognized locally for its consistent academic results, its
                well-rounded co-curricular programs, and a faculty that treats every student as an
                individual rather than a roll number.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-royal/10 to-gold/10 border border-black/5 flex items-center justify-center">
                <Landmark className="h-16 w-16 text-royal/30" aria-hidden="true" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-20 sm:py-24 bg-paper">
        <Container>
          <SectionHeading eyebrow="What Drives Us" title="Our vision & mission" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-white border border-black/5 p-8 shadow-sm">
                <Eye className="h-8 w-8 text-royal" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl text-navy">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  To be the most trusted school in the region — one where academic excellence,
                  strong character and genuine curiosity grow together in every student.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-white border border-black/5 p-8 shadow-sm">
                <Target className="h-8 w-8 text-royal" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl text-navy">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  To provide a safe, disciplined and stimulating environment where every child is
                  known personally, supported academically, and encouraged to lead with integrity.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Chairman & Principal Messages */}
      <section id="principal" className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Messages from our leadership" />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-black/5 bg-white p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-royal/8 font-display text-lg text-royal">
                    RI
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{chairman.name}</p>
                    <p className="text-sm text-gold">Chairman&apos;s Message</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate">
                  &ldquo;Since our founding, we have believed that education is a partnership between
                  school and family. Every investment we make — in teachers, in infrastructure, in
                  new learning tools — is made with our students&apos; futures in mind. Thank you for
                  trusting us with your child&apos;s most formative years.&rdquo;
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-black/5 bg-white p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 font-display text-lg text-gold">
                    AS
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{principal.name}</p>
                    <p className="text-sm text-gold">Principal&apos;s Message</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate">
                  &ldquo;Our promise to every family is simple — we will know your child by name, and we
                  will help them become the best version of themselves. Step onto our campus and
                  you will feel it: a place built for children to be curious, confident and kind.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Infrastructure */}
      <section id="infrastructure" className="py-20 sm:py-24 bg-navy">
        <Container>
          <SectionHeading light eyebrow="Our Campus" title="Infrastructure built for learning" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Spacious, well-lit classrooms",
              "Dedicated science & computer labs",
              "School library with reading corner",
              "Open playground & sports facilities",
              "CCTV-monitored, secure campus",
              "Clean drinking water & sanitation",
              "First-aid & healthcare room",
              "Safe, supervised school transport",
            ].map((item) => (
              <Reveal key={item}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-white/80 h-full">
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
