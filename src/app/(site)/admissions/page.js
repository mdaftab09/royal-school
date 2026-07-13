import { CheckCircle2, FileText } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import AdmissionForm from "@/components/admissions/AdmissionForm";
import { ADMISSION_PROCESS, DOCUMENTS_REQUIRED } from "@/data/school";
import { getFeeStructure } from "@/lib/data";

export const metadata = {
  title: "Admissions",
  description:
    "Admission process, fee structure and required documents for Royal English Medium School, Ronai, Raniganj. Apply online for Session 2026–27.",
  alternates: { canonical: "/admissions" },
};

export default async function AdmissionsPage() {
  const feeStructure = await getFeeStructure();

  return (
    <>
      <PageHero
        eyebrow="Admissions Open · 2026–27"
        title="Begin your child's journey with us"
        description="Admissions are open for Nursery through Class X. Our team is here to guide you through every step, from enquiry to enrollment."
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admissions" }]} />}
      />

      {/* Process */}
      <section id="process" className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How It Works" title="A simple, transparent admission process" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADMISSION_PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-black/5 bg-white p-6">
                  <span className="font-display text-3xl text-gold/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg text-navy">{step.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Fee Structure */}
      <section id="fees" className="py-20 sm:py-24 bg-paper">
        <Container>
          <SectionHeading
            eyebrow="Fee Structure"
            title="Transparent, affordable fees"
            description="Indicative fee structure by stage. Final fees are confirmed at the time of admission and may vary based on scheme updates."
          />
          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-6 py-4 font-medium">Stage</th>
                    <th className="px-6 py-4 font-medium">Admission Fee (One-time)</th>
                    <th className="px-6 py-4 font-medium">Monthly Tuition Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((row, i) => (
                    <tr key={row.stage} className={i % 2 === 0 ? "bg-white" : "bg-paper"}>
                      <td className="px-6 py-4 font-medium text-navy">{row.stage}</td>
                      <td className="px-6 py-4 text-slate">{row.admission}</td>
                      <td className="px-6 py-4 text-slate">{row.tuitionMonthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate">
              *Fees shown are indicative placeholders — update with actual figures before publishing.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Documents Required */}
      <section id="documents" className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Documents Required
              </span>
              <h2 className="mt-3 font-display text-3xl text-navy text-balance">
                What you&apos;ll need to apply
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {DOCUMENTS_REQUIRED.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-slate">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-royal" aria-hidden="true" />
                    {doc}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/5 p-4">
                <FileText className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-sm text-navy">
                  Prospectus and admission form are available at the school office during working hours.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div id="apply">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Apply Online
                </span>
                <h2 className="mt-3 font-display text-3xl text-navy text-balance mb-6">
                  Submit an admission enquiry
                </h2>
                <AdmissionForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
