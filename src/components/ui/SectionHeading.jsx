export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center mx-auto";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-gold-light" : "text-gold"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-balance text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? "text-white/75" : "text-slate"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
