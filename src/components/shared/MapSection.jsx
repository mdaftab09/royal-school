import Container from "@/components/ui/Container";
import { MapPin } from "lucide-react";
import { SCHOOL } from "@/data/school";

export default function MapSection({ compact = false }) {
  return (
    <section className={compact ? "" : "py-20 sm:py-28"}>
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-black/5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white px-6 sm:px-8 py-5">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-royal" aria-hidden="true" />
              <div>
                <p className="font-semibold text-navy">Visit Our Campus</p>
                <p className="text-sm text-slate">{SCHOOL.address.full}</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${SCHOOL.mapEmbedQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-sm font-semibold text-royal hover:underline shrink-0"
            >
              Get Directions →
            </a>
          </div>
          <iframe
            title={`Map showing location of ${SCHOOL.name}`}
            src={`https://maps.google.com/maps?q=${SCHOOL.mapEmbedQuery}&z=15&output=embed`}
            className="w-full h-[360px] sm:h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}
