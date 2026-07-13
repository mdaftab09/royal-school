import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsEvents({ news, events }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Stay Informed" title="Latest news & upcoming events" />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-navy mb-6">Latest News</h3>
            <div className="flex flex-col gap-4">
              {news.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <Link
                    href={item.href || "/"}
                    className="focus-ring group flex items-start justify-between gap-4 rounded-2xl border border-black/5 bg-white p-5 hover:border-royal/20 hover:shadow-md transition-all"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                        {item.category} · {formatDate(item.date)}
                      </span>
                      <p className="mt-1.5 font-medium text-navy">{item.title}</p>
                      <p className="mt-1 text-sm text-slate line-clamp-2">{item.excerpt}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-royal opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl text-navy mb-6">Upcoming Events</h3>
            <div className="flex flex-col gap-4">
              {events.map((event, i) => (
                <Reveal key={event.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-royal/8 text-royal">
                      <CalendarDays className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                        {formatDate(event.date)}
                      </p>
                      <p className="mt-1 font-medium text-navy">{event.title}</p>
                      <p className="mt-1 text-sm text-slate">{event.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
