"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdminModal from "@/components/admin/AdminModal";

const CATEGORIES = ["Admissions", "Events", "Achievement", "Announcement", "Notice"];
const EMPTY = { title: "", excerpt: "", category: "Announcement", date: "" };

export default function AdminNewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("news").select("*").order("date", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, date: new Date().toISOString().slice(0, 10) });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, excerpt: item.excerpt || "", category: item.category, date: item.date });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from("news").update(form).eq("id", editing.id);
    } else {
      await supabase.from("news").insert(form);
    }
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const togglePublished = async (item) => {
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, published: !n.published } : n)));
    await supabase.from("news").update({ published: !item.published }).eq("id", item.id);
  };

  const remove = async (id) => {
    if (!confirm("Delete this news item?")) return;
    setItems((prev) => prev.filter((n) => n.id !== id));
    await supabase.from("news").delete().eq("id", id);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">News</h1>
          <p className="mt-1 text-sm text-slate">Shown in the &ldquo;Latest News&rdquo; section on the homepage.</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="focus-ring flex items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add News
        </button>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-royal" aria-hidden="true" />
        </div>
      ) : items.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-black/5 bg-white p-10 text-center text-sm text-slate">
          No news items yet — add your first one.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl border border-black/5 bg-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {item.category} · {new Date(item.date).toLocaleDateString("en-IN")}
                  </span>
                  {!item.published && (
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-slate">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-1 font-medium text-navy">{item.title}</p>
                <p className="mt-1 text-sm text-slate line-clamp-2">{item.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => togglePublished(item)}
                  className="focus-ring rounded-full p-2 text-slate hover:bg-black/5"
                  aria-label={item.published ? "Hide from site" : "Publish to site"}
                  title={item.published ? "Hide from site" : "Publish to site"}
                >
                  {item.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="focus-ring rounded-full p-2 text-royal hover:bg-royal/5"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="focus-ring rounded-full p-2 text-red-500 hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <AdminModal title={editing ? "Edit News Item" : "Add News Item"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Excerpt</label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="focus-ring w-full flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white hover:bg-navy disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save Changes" : "Add News Item"}
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
