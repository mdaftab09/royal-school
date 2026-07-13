import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import { SCHOOL } from "@/data/school";

export const metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${SCHOOL.name}'s website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate">
            <p>
              By accessing this website, you agree to the following terms and conditions. Please
              read them carefully.
            </p>
            <h2 className="font-display text-xl text-navy">Use of Content</h2>
            <p>
              All content on this website, including text, images and the {SCHOOL.name} name and
              logo, is the property of the school and may not be reproduced without permission.
            </p>
            <h2 className="font-display text-xl text-navy">Admission Enquiries</h2>
            <p>
              Submitting an enquiry or application form through this website does not guarantee
              admission. Final admission is subject to seat availability and the school&apos;s
              admission process.
            </p>
            <h2 className="font-display text-xl text-navy">Accuracy of Information</h2>
            <p>
              While we strive to keep information on this site accurate and up to date, fee
              structures, schedules and policies are subject to change. Please confirm current
              details with the school office.
            </p>
            <h2 className="font-display text-xl text-navy">Contact</h2>
            <p>
              For questions regarding these terms, contact us at{" "}
              <a href={`mailto:${SCHOOL.email}`} className="text-royal underline">
                {SCHOOL.email}
              </a>
              .
            </p>
            <p className="text-xs text-slate/70">
              This is placeholder terms text. Please have it reviewed by a legal professional
              before publishing.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
