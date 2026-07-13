export default function Crest({ className = "", monochrome = false }) {
  const gold = monochrome ? "currentColor" : "#C6971F";
  const line = monochrome ? "currentColor" : "#F7F8FC";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke={gold} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="25.5" stroke={line} strokeOpacity="0.5" strokeWidth="1" />
      <path
        d="M32 14 L44 20 V31 C44 40 38.5 46 32 49 C25.5 46 20 40 20 31 V20 Z"
        stroke={gold}
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M32 22 L32 40 M25 27 L39 27 M26.5 34.5 L37.5 34.5"
        stroke={line}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
