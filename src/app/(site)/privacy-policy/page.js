import PageHero from "@/components/shared/PageHero";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Container from "@/components/ui/Container";
import { SCHOOL } from "@/data/school";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SCHOOL.name}'s website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="prose-sm sm:prose max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-slate">
            <p>
              This Privacy Policy explains how {SCHOOL.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) collects, uses
              and protects information submitted through this website.
            </p>
            <h2 className="font-display text-xl text-navy">Information We Collect</h2>
            <p>
              When you submit an enquiry, admission form or contact message on this website, we
              may collect your name, phone number, email address and any other details you
              choose to share.
            </p>
            <h2 className="font-display text-xl text-navy">How We Use Information</h2>
            <p>
              Information submitted is used solely to respond to your enquiry, process admission
              applications, and communicate school-related updates. We do not sell or share your
              information with third parties for marketing purposes.
            </p>
            <h2 className="font-display text-xl text-navy">Cookies</h2>
            <p>
              This website may use basic cookies to improve browsing experience. No sensitive
              personal data is stored via cookies.
            </p>
            <h2 className="font-display text-xl text-navy">Contact Us</h2>
            <p>
              For questions about this policy, contact us at{" "}
              <a href={`mailto:${SCHOOL.email}`} className="text-royal underline">
                {SCHOOL.email}
              </a>
              .
            </p>
            <p className="text-xs text-slate/70">
              This is placeholder policy text. Please have it reviewed by a legal professional
              before publishing.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
