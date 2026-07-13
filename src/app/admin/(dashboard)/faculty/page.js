"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, Users2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdminModal from "@/components/admin/AdminModal";

const EMPTY = { name: "", role: "", note: "", sort_order: 0 };

export default function AdminFacultyPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("faculty").select("*").order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, sort_order: items.length + 1 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, role: item.role, note: item.note || "", sort_order: item.sort_order });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      await supabase.from("faculty").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("faculty").insert(payload);
    }
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const togglePublished = async (item) => {
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, published: !n.published } : n)));
    await supabase.from("faculty").update({ published: !item.published }).eq("id", item.id);
  };

  const remove = async (id) => {
    if (!confirm("Remove this faculty member?")) return;
    setItems((prev) => prev.filter((n) => n.id !== id));
    await supabase.from("faculty").delete().eq("id", id);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">Faculty</h1>
          <p className="mt-1 text-sm text-slate">
            Shown on the Academics page. The first entry (lowest order) is also used as the
            Principal&apos;s Message on the homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="focus-ring flex shrink-0 items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Faculty
        </button>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-royal" aria-hidden="true" />
        </div>
      ) : items.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-black/5 bg-white p-10 text-center text-sm text-slate">
          No faculty members yet — add your first one.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-royal/8 text-royal">
                <Users2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-navy truncate">{item.name}</p>
                  {!item.published && (
                    <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-slate">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-gold">{item.role}</p>
                <p className="mt-1 text-xs text-slate">{item.note}</p>
                <div className="mt-3 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => togglePublished(item)}
                    className="focus-ring rounded-full p-2 text-slate hover:bg-black/5"
                    aria-label={item.published ? "Hide from site" : "Publish to site"}
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
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <AdminModal title={editing ? "Edit Faculty Member" : "Add Faculty Member"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Role</label>
              <input
                required
                placeholder="e.g. Principal, Head of Science"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Note</label>
              <textarea
                rows={2}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Display Order <span className="text-slate font-normal">(lowest shows first)</span>
              </label>
              <input
                type="number"
                required
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="focus-ring w-full flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white hover:bg-navy disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save Changes" : "Add Faculty Member"}
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
