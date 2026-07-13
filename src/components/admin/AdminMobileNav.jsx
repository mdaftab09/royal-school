"use client";

import { useRouter, usePathname } from "next/navigation";
import Crest from "@/components/ui/Crest";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/faculty", label: "Faculty" },
  { href: "/admin/fees", label: "Fee Structure" },
];

export default function AdminMobileNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="lg:hidden sticky top-0 z-40 border-b border-black/5 bg-white px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Crest className="h-7 w-7" />
        <span className="font-display text-sm text-navy">Royal EMS Admin</span>
      </div>
      <select
        value={NAV.find((n) => n.href === pathname)?.href || pathname}
        onChange={(e) => router.push(e.target.value)}
        className="focus-ring w-full rounded-xl border border-black/10 px-3 py-2 text-sm bg-white"
        aria-label="Admin navigation"
      >
        {NAV.map((item) => (
          <option key={item.href} value={item.href}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
