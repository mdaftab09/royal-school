import { GraduationCap, Users, ShieldCheck, Sparkles, Monitor, Heart } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { WHY_CHOOSE_US } from "@/data/school";

const ICONS = [GraduationCap, Users, ShieldCheck, Sparkles, Monitor, Heart];

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="An education built on trust and results"
          description="Every decision on our campus — from classroom design to teacher training — is made with one question in mind: is this genuinely good for the child?"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-black/5 bg-white p-7 shadow-sm hover:shadow-lg hover:shadow-royal/10 transition-shadow duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal/8 text-royal group-hover:bg-royal group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
