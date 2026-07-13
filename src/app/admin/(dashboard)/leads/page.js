"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Mail, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const STATUS_OPTIONS = ["new", "contacted", "closed"];
const TYPE_FILTERS = ["all", "admission", "contact"];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const supabase = createClient();

  const loadLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLeads();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  const deleteLead = async (id) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await supabase.from("leads").delete().eq("id", id);
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.type === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">Leads</h1>
          <p className="mt-1 text-sm text-slate">
            Admission enquiries and contact messages submitted through the website.
          </p>
        </div>
        <div className="flex gap-2">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`focus-ring rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                filter === t ? "bg-royal text-white" : "bg-white border border-black/10 text-slate"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-royal" aria-hidden="true" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-black/5 bg-white p-10 text-center text-sm text-slate">
          No {filter !== "all" ? filter : ""} enquiries yet.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {filtered.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-navy">{lead.name}</p>
                    <span className="rounded-full bg-royal/8 px-2.5 py-0.5 text-xs font-medium capitalize text-royal">
                      {lead.type}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-slate">
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="focus-ring flex items-center gap-1 hover:text-royal">
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                        {lead.phone}
                      </a>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="focus-ring flex items-center gap-1 hover:text-royal">
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        {lead.email}
                      </a>
                    )}
                    <span>{new Date(lead.created_at).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="focus-ring rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium capitalize bg-white"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => deleteLead(lead.id)}
                    className="focus-ring rounded-full p-2 text-red-500 hover:bg-red-50"
                    aria-label="Delete enquiry"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {lead.type === "admission" && (
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate border-t border-black/5 pt-3">
                  <span>
                    <strong className="text-navy">Student:</strong> {lead.student_name}
                  </span>
                  <span>
                    <strong className="text-navy">Class:</strong> {lead.class_applying}
                  </span>
                </div>
              )}
              {lead.type === "contact" && lead.subject && (
                <p className="mt-3 text-sm border-t border-black/5 pt-3">
                  <strong className="text-navy">Subject:</strong> {lead.subject}
                </p>
              )}
              {lead.message && <p className="mt-2 text-sm text-slate">{lead.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
