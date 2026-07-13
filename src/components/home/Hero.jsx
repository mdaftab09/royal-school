"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Crest from "@/components/ui/Crest";
import Container from "@/components/ui/Container";
import { SCHOOL } from "@/data/school";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-royal/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <Crest className="absolute -right-16 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-[0.06]" />
      </div>

      <Container className="relative py-24 sm:py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                Admissions Open · Session 2026–27
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-balance text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-white"
            >
              Where every child is prepared for a{" "}
              <span className="italic text-gold-light">world worth leading.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg leading-relaxed text-white/70"
            >
              {SCHOOL.name} blends disciplined academics, dedicated mentorship and a
              nurturing campus in {SCHOOL.address.city} — building the confidence and
              character that carry children well beyond the classroom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button href="/admissions" variant="gold" className="group">
                Admissions Open
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
              <Button href="/about" variant="outline">
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                Learn More
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 grid grid-cols-3 gap-6 border-t border-white/10 pt-6 max-w-md"
            >
              {[
                ["19+", "Years"],
                ["1200+", "Students"],
                ["98%", "Results"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl sm:text-3xl text-white">{value}</dt>
                  <dd className="text-xs uppercase tracking-wide text-white/50">{label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2rem] bg-gradient-to-br from-royal-light/40 to-navy border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-10 text-center">
                <Crest className="h-20 w-20" />
                <p className="font-display text-xl text-white text-balance">
                  {SCHOOL.name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light">
                  Est. {SCHOOL.founded} &middot; {SCHOOL.address.city}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold font-display text-lg">
                A+
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Board Results</p>
                <p className="text-xs text-slate">98% pass rate, 2026</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
