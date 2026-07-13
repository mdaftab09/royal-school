"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/school";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-navy">
      <Container>
        <SectionHeading
          light
          eyebrow="Parent Voices"
          title="What families are saying"
        />

        <div className="mt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testimonial-pagination" }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-2"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name} className="h-auto pb-10">
                <div className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-7">
                  <Quote className="h-8 w-8 text-gold/60" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-auto pt-3 border-t border-white/10">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gold-light">{t.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-pagination flex justify-center gap-2 [&_.swiper-pagination-bullet]:bg-white/30 [&_.swiper-pagination-bullet-active]:bg-gold" />
        </div>
      </Container>
    </section>
  );
}
