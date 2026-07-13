"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import Crest from "@/components/ui/Crest";
import Button from "@/components/ui/Button";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { NAV_LINKS, SCHOOL } from "@/data/school";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div
        className={`bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_20px_rgba(11,32,73,0.08)]" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10 py-3">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-full">
            <Crest className="h-11 w-11 shrink-0" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg sm:text-xl text-navy">{SCHOOL.name}</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">
                {SCHOOL.tagline}
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => link.children && setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="focus-ring flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink hover:bg-royal/5 hover:text-royal transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>

                {link.children && openDropdown === link.label && (
                  <div className="absolute left-0 top-full pt-2 w-64">
                    <ul className="rounded-2xl border border-black/5 bg-white p-2 shadow-xl shadow-navy/10">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="focus-ring block rounded-xl px-4 py-2.5 text-sm text-slate hover:bg-royal/5 hover:text-royal"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
              className="focus-ring flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-royal hover:bg-royal/5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SCHOOL.phoneDisplay}
            </a>
            <Button href="/admissions" variant="primary">
              Admissions Open
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="focus-ring lg:hidden rounded-full p-2 text-navy hover:bg-royal/5"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <span className="flex items-center gap-2">
                <Crest className="h-9 w-9" />
                <span className="font-display text-navy">{SCHOOL.shortName}</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="focus-ring rounded-full p-2 text-navy hover:bg-royal/5"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="focus-ring block rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-royal/5"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ul className="ml-3 flex flex-col border-l border-black/5 pl-3">
                        {link.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="focus-ring block rounded-lg px-3 py-2 text-sm text-slate hover:text-royal"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-black/5 p-5 flex flex-col gap-3">
              <a
                href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
                className="focus-ring flex items-center justify-center gap-2 rounded-full border border-royal/20 px-4 py-3 text-sm font-semibold text-royal"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call the School
              </a>
              <Button href="/admissions" variant="primary" className="w-full">
                Admissions Open
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
