import Link from "next/link";
import { Home, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Crest from "@/components/ui/Crest";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy py-28 sm:py-36">
      <Crest className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 opacity-[0.08]" />
      <Container className="relative text-center">
        <span className="font-display text-7xl sm:text-8xl text-gold-light">404</span>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl text-white">
          This page has gone off-campus
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="gold">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
          <Button href="/contact" variant="outline">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
