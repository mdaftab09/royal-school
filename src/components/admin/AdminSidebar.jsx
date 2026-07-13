"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Newspaper,
  CalendarDays,
  Images,
  Users2,
  Wallet,
  LogOut,
  ExternalLink,
} from "lucide-react";
import Crest from "@/components/ui/Crest";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/faculty", label: "Faculty", icon: Users2 },
  { href: "/admin/fees", label: "Fee Structure", icon: Wallet },
];

export default function AdminSidebar({ userEmail }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-black/5 bg-white">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-black/5">
        <Crest className="h-9 w-9" />
        <div>
          <p className="font-display text-sm text-navy leading-tight">Royal EMS</p>
          <p className="text-xs text-slate">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-royal text-white" : "text-slate hover:bg-royal/5 hover:text-royal"
                  }`}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-black/5 p-4 flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate hover:bg-royal/5 hover:text-royal"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          View Live Site
        </Link>
        {userEmail && <p className="truncate px-3 text-xs text-slate">{userEmail}</p>}
        <button
          type="button"
          onClick={handleSignOut}
          className="focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
