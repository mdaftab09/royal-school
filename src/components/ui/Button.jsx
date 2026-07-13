import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-royal text-white hover:bg-navy shadow-sm shadow-royal/20",
  gold:
    "bg-gold text-navy hover:bg-gold-light",
  outline:
    "border border-white/40 text-white hover:bg-white/10",
  ghost:
    "border border-royal/20 text-royal hover:bg-royal/5",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
