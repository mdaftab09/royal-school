import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Crest from "@/components/ui/Crest";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { SCHOOL } from "@/data/school";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Link href="/" className="focus-ring flex items-center gap-3 w-fit">
            <Crest className="h-11 w-11" />
            <span className="font-display text-lg text-white">{SCHOOL.name}</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/60">
            Shaping confident, capable learners in Raniganj since {SCHOOL.founded}.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={SCHOOL.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={SCHOOL.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SCHOOL.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base text-white mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring text-white/60 hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-white mb-4">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden="true" />
              <span>{SCHOOL.address.full}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden="true" />
              <a href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`} className="focus-ring hover:text-gold">
                {SCHOOL.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden="true" />
              <a href={`mailto:${SCHOOL.email}`} className="focus-ring hover:text-gold">
                {SCHOOL.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="h-4 w-4 shrink-0 mt-0.5 text-gold" aria-hidden="true" />
              <span>{SCHOOL.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-white mb-4">Stay Updated</h3>
          <p className="text-sm text-white/60 mb-4">
            Get admission updates and school news in your inbox.
          </p>
          <form className="flex items-center gap-2" aria-label="Newsletter signup">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Your email"
              className="focus-ring min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              className="focus-ring shrink-0 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-navy hover:bg-gold-light transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} {SCHOOL.name}. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
