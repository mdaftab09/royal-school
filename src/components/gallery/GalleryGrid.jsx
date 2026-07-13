"use client";

import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Campus", "Events", "Sports", "Academics", "Celebrations"];

export default function GalleryGrid({ items = [] }) {
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active, items]
  );

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => setLightboxIndex((i) => (i + 1) % filtered.length);
  const showPrev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);

  if (!items.length) {
    return (
      <p className="rounded-2xl border border-black/5 bg-white p-10 text-center text-sm text-slate">
        No gallery photos yet. Add some from the admin dashboard.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-royal text-white"
                : "bg-white border border-black/10 text-slate hover:border-royal/30 hover:text-royal"
            }`}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 sm:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openLightbox(i)}
            className="focus-ring group relative block w-full overflow-hidden rounded-xl bg-gradient-to-br from-royal/15 via-royal/5 to-gold/10 border border-black/5"
            style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/5" }}
          >
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-xs text-royal/40 font-medium">
                {item.category}
              </span>
            )}
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/70 via-transparent to-transparent p-3 text-left text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIndex].title}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="focus-ring absolute right-5 top-5 rounded-full p-2 text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showPrev}
            className="focus-ring absolute left-3 sm:left-8 rounded-full p-2 text-white hover:bg-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </button>

          <div className="aspect-[4/5] w-full max-w-md rounded-2xl bg-gradient-to-br from-royal/30 to-gold/10 border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-3 p-8 text-center">
            {filtered[lightboxIndex].image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={filtered[lightboxIndex].image_url}
                alt={filtered[lightboxIndex].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <p className="font-display text-xl text-white">{filtered[lightboxIndex].title}</p>
                <p className="text-xs uppercase tracking-wide text-gold-light">
                  {filtered[lightboxIndex].category}
                </p>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={showNext}
            className="focus-ring absolute right-3 sm:right-8 rounded-full p-2 text-white hover:bg-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
