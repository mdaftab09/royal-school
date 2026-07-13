import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/shared/MapSection";
import { SCHOOL } from "@/data/school";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Royal English Medium School, Ronai, Raniganj, West Bengal. Address, phone, email and campus visit information.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { icon: MapPin, label: "Address", value: SCHOOL.address.full },
  { icon: Phone, label: "Phone", value: SCHOOL.phoneDisplay },
  { icon: Mail, label: "Email", value: SCHOOL.email },
  { icon: Clock, label: "Working Hours", value: SCHOOL.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        description="Have a question about admissions, academics or a campus visit? Reach out and our team will respond promptly."
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col gap-5">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-royal/8 text-royal">
                    <d.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">{d.label}</p>
                    <p className="mt-1 text-sm text-navy">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>

      <MapSection />
    </>
  );
}
