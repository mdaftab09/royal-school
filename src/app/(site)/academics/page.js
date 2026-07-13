import { BookOpen, Users2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Facilities from "@/components/home/Facilities";
import { CLASSES } from "@/data/school";
import { getFaculty } from "@/lib/data";

export const metadata = {
  title: "Academics",
  description:
    "Explore the curriculum, classes offered and experienced faculty at Royal English Medium School, Ronai, Raniganj — from Nursery to Class X.",
  alternates: { canonical: "/academics" },
};

export default async function AcademicsPage() {
  const faculty = await getFaculty();

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="A curriculum built for real understanding"
        description="We combine a disciplined academic structure with an activity-based teaching style, so students don't just memorize — they understand."
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Academics" }]} />}
      />

      {/* Curriculum */}
      <section id="curriculum" className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-royal/10 to-gold/10 border border-black/5 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-royal/30" aria-hidden="true" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Our Curriculum
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl text-navy text-balance">
                Structured, board-aligned, and genuinely engaging
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate">
                Our curriculum follows a structured, board-aligned syllabus across all subjects,
                supplemented with activity-based learning, regular assessments and personal
                attention from subject teachers. Emphasis is placed equally on English
                communication, mathematics, science and general knowledge from the earliest years.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Beyond textbooks, students take part in quizzes, project work, elocution and
                inter-class competitions that build confidence alongside knowledge.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Classes Offered */}
      <section id="classes" className="py-20 sm:py-24 bg-paper">
        <Container>
          <SectionHeading eyebrow="Classes Offered" title="From first steps to board exams" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CLASSES.map((c, i) => (
              <Reveal key={c.stage} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-white border border-black/5 p-6 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {c.grades}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-navy">{c.stage}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{c.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Faculty */}
      <section id="faculty" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Faculty"
            title="Experienced teachers, personally invested"
            description="Our teachers are selected not just for qualifications, but for their ability to connect with children and make learning genuinely enjoyable."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-royal/8 text-royal">
                    <Users2 className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <p className="mt-4 font-semibold text-navy">{f.name}</p>
                  <p className="text-sm text-gold">{f.role}</p>
                  <p className="mt-2 text-xs text-slate">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Facilities />
    </>
  );
}
