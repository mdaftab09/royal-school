"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AdminModal from "@/components/admin/AdminModal";

const EMPTY = { stage: "", admission_fee: "", monthly_tuition: "", sort_order: 0 };

export default function AdminFeesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("fee_structure").select("*").order("sort_order", { ascending: true });
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
    setForm({
      stage: item.stage,
      admission_fee: item.admission_fee,
      monthly_tuition: item.monthly_tuition,
      sort_order: item.sort_order,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      await supabase.from("fee_structure").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("fee_structure").insert(payload);
    }
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this fee row?")) return;
    setItems((prev) => prev.filter((n) => n.id !== id));
    await supabase.from("fee_structure").delete().eq("id", id);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">Fee Structure</h1>
          <p className="mt-1 text-sm text-slate">Shown on the Admissions page.</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="focus-ring flex shrink-0 items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Row
        </button>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-royal" aria-hidden="true" />
        </div>
      ) : items.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-black/5 bg-white p-10 text-center text-sm text-slate">
          No fee rows yet — add your first one.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-black/5 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white text-left">
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Admission Fee</th>
                <th className="px-6 py-4 font-medium">Monthly Tuition</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? "bg-white" : "bg-paper"}>
                  <td className="px-6 py-4 font-medium text-navy">{row.stage}</td>
                  <td className="px-6 py-4 text-slate">{row.admission_fee}</td>
                  <td className="px-6 py-4 text-slate">{row.monthly_tuition}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="focus-ring rounded-full p-2 text-royal hover:bg-royal/5"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(row.id)}
                        className="focus-ring rounded-full p-2 text-red-500 hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <AdminModal title={editing ? "Edit Fee Row" : "Add Fee Row"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Stage</label>
              <input
                required
                placeholder="e.g. Class I – V"
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Admission Fee</label>
                <input
                  required
                  placeholder="₹3,500"
                  value={form.admission_fee}
                  onChange={(e) => setForm({ ...form, admission_fee: e.target.value })}
                  className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Monthly Tuition</label>
                <input
                  required
                  placeholder="₹950"
                  value={form.monthly_tuition}
                  onChange={(e) => setForm({ ...form, monthly_tuition: e.target.value })}
                  className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
                />
              </div>
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
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Save Changes" : "Add Row"}
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
