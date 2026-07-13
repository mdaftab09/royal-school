"use client";

import { X } from "lucide-react";

export default function AdminModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-black/5 px-6 py-4 sticky top-0 bg-white">
          <h2 className="font-display text-lg text-navy">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-full p-1.5 text-slate hover:bg-black/5"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
