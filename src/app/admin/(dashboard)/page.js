import Link from "next/link";
import { Inbox, Newspaper, CalendarDays, Images, Users2 } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

async function getCounts() {
  if (!isSupabaseConfigured) {
    return { leads: 0, news: 0, events: 0, gallery: 0, faculty: 0, newLeads: 0 };
  }
  const supabase = await createClient();
  const [leads, news, events, gallery, faculty, newLeads] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("news").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("gallery").select("id", { count: "exact", head: true }),
    supabase.from("faculty").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);
  return {
    leads: leads.count ?? 0,
    news: news.count ?? 0,
    events: events.count ?? 0,
    gallery: gallery.count ?? 0,
    faculty: faculty.count ?? 0,
    newLeads: newLeads.count ?? 0,
  };
}

async function getRecentLeads() {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("id, type, name, phone, created_at, status")
    .order("created_at", { ascending: false })
    .limit(5);
  return data || [];
}

export default async function AdminDashboardPage() {
  const [counts, recentLeads] = await Promise.all([getCounts(), getRecentLeads()]);

  const cards = [
    { label: "New Leads", value: counts.newLeads, href: "/admin/leads", icon: Inbox, highlight: true },
    { label: "News Items", value: counts.news, href: "/admin/news", icon: Newspaper },
    { label: "Upcoming Events", value: counts.events, href: "/admin/events", icon: CalendarDays },
    { label: "Gallery Photos", value: counts.gallery, href: "/admin/gallery", icon: Images },
    { label: "Faculty Members", value: counts.faculty, href: "/admin/faculty", icon: Users2 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-slate">Overview of your website&apos;s content and enquiries.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`focus-ring rounded-2xl border p-6 transition-shadow hover:shadow-md ${
              c.highlight ? "border-gold/30 bg-gold/5" : "border-black/5 bg-white"
            }`}
          >
            <c.icon className={`h-6 w-6 ${c.highlight ? "text-gold" : "text-royal"}`} aria-hidden="true" />
            <p className="mt-4 font-display text-3xl text-navy">{c.value}</p>
            <p className="mt-1 text-sm text-slate">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-navy">Recent Leads</h2>
          <Link href="/admin/leads" className="focus-ring text-sm font-medium text-royal hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-black/5">
                <th className="px-5 py-3 font-medium text-slate">Name</th>
                <th className="px-5 py-3 font-medium text-slate">Type</th>
                <th className="px-5 py-3 font-medium text-slate">Phone</th>
                <th className="px-5 py-3 font-medium text-slate">Status</th>
                <th className="px-5 py-3 font-medium text-slate">Received</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate">
                    No enquiries yet.
                  </td>
                </tr>
              )}
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3 font-medium text-navy">{lead.name}</td>
                  <td className="px-5 py-3 capitalize text-slate">{lead.type}</td>
                  <td className="px-5 py-3 text-slate">{lead.phone || "—"}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        lead.status === "new"
                          ? "bg-gold/15 text-gold"
                          : lead.status === "contacted"
                          ? "bg-royal/10 text-royal"
                          : "bg-black/5 text-slate"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate">
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
