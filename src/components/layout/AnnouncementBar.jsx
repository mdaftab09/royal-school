import Link from "next/link";
import { Phone, Sparkles } from "lucide-react";
import { SCHOOL } from "@/data/school";

export default function AnnouncementBar() {
  return (
    <div className="bg-navy text-white/90 text-xs sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-10 py-2">
        <p className="flex items-center gap-2 truncate">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
          <span className="truncate">Admissions open for Session 2026–27, Nursery to Class X.</span>
        </p>
        <a
          href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
          className="focus-ring hidden sm:flex items-center gap-1.5 shrink-0 font-medium hover:text-gold"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {SCHOOL.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
