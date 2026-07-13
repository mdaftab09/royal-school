export const SCHOOL = {
  name: "Royal English Medium School",
  shortName: "Royal EMS",
  tagline: "Rooted in Values. Built for Tomorrow.",
  founded: 2005,
  address: {
    line1: "Islam Nagar, Ronai",
    city: "Raniganj",
    state: "West Bengal",
    pin: "713347",
    full: "Islam Nagar, Ronai, Raniganj, West Bengal 713347",
  },
  phone: "+91 90000 00000",
  phoneDisplay: "+91 90000 00000",
  email: "info@royalenglishmediumschool.in",
  hours: "Monday – Saturday, 9:00 AM – 4:00 PM",
  mapEmbedQuery: "Islam+Nagar,+Ronai,+Raniganj,+West+Bengal+713347",
  social: {
    facebook: "https://facebook.com/royalenglishmediumschool",
    instagram: "https://instagram.com/royalenglishmediumschool",
    youtube: "https://youtube.com/@royalenglishmediumschool",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Principal's Message", href: "/about#principal" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "Infrastructure", href: "/about#infrastructure" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum", href: "/academics#curriculum" },
      { label: "Classes Offered", href: "/academics#classes" },
      { label: "Faculty", href: "/academics#faculty" },
      { label: "Facilities", href: "/academics#facilities" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Process", href: "/admissions#process" },
      { label: "Fee Structure", href: "/admissions#fees" },
      { label: "Documents Required", href: "/admissions#documents" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { label: "Years of Excellence", value: 19, suffix: "+" },
  { label: "Students Enrolled", value: 1200, suffix: "+" },
  { label: "Qualified Faculty", value: 65, suffix: "+" },
  { label: "Board Result", value: 98, suffix: "%" },
];

export const WHY_CHOOSE_US = [
  {
    title: "Academic Excellence",
    description:
      "A structured curriculum, consistent board results and a teaching approach that balances concept clarity with real application.",
  },
  {
    title: "Experienced Faculty",
    description:
      "Trained, dedicated teachers who mentor every child individually, not just a classroom of students.",
  },
  {
    title: "Safe, Modern Campus",
    description:
      "CCTV-monitored premises, clean classrooms and a campus designed for both learning and play.",
  },
  {
    title: "Holistic Development",
    description:
      "Sports, arts, elocution and clubs sit alongside academics, so every child finds a place to shine.",
  },
  {
    title: "Smart Classrooms",
    description:
      "Digital learning aids and audio-visual teaching tools make lessons easier to grasp and remember.",
  },
  {
    title: "Trusted by Families",
    description:
      "Generations of local families have chosen Royal English Medium School for their children's education.",
  },
];

export const FACILITIES = [
  { title: "Smart Classrooms", description: "Digital boards and audio-visual aids in every classroom." },
  { title: "Science Laboratory", description: "Fully equipped physics, chemistry and biology labs for hands-on learning." },
  { title: "Computer Lab", description: "Modern systems introducing students to technology from an early age." },
  { title: "Library", description: "A growing collection of books, journals and reference material." },
  { title: "Sports Ground", description: "Open playground for athletics, football, cricket and physical education." },
  { title: "Transport", description: "Safe, supervised school transport covering surrounding localities." },
];

export const TESTIMONIALS = [
  {
    name: "Parent of Class V Student",
    role: "Parent",
    quote:
      "The teachers genuinely care about how each child is doing, not just academically but personally. My daughter looks forward to school every day.",
  },
  {
    name: "Parent of Class VIII Student",
    role: "Parent",
    quote:
      "We moved our son here two years ago and the difference in his confidence and discipline has been remarkable.",
  },
  {
    name: "Parent of Class II Student",
    role: "Parent",
    quote:
      "A safe campus, attentive staff, and a curriculum that actually builds a strong foundation. Highly recommend.",
  },
];

export const NEWS = [
  {
    title: "Admissions Open for Academic Session 2026–27",
    date: "2026-07-01",
    excerpt:
      "Applications are now open for Nursery through Class X. Seats are limited — apply early to secure your child's place.",
    href: "/admissions",
    category: "Admissions",
  },
  {
    title: "Annual Sports Day Announced",
    date: "2026-06-20",
    excerpt:
      "Our Annual Sports Day will be held on the main campus ground, featuring track events, team sports and a prize distribution ceremony.",
    href: "/gallery",
    category: "Events",
  },
  {
    title: "Outstanding Board Examination Results",
    date: "2026-05-15",
    excerpt:
      "Students of Class X achieved excellent results this year, with the majority scoring distinctions across subjects.",
    href: "/about",
    category: "Achievement",
  },
];

export const EVENTS = [
  { title: "Admissions Open House", date: "2026-07-20", description: "Meet our faculty, tour the campus and get all your admission questions answered." },
  { title: "Annual Sports Day", date: "2026-08-15", description: "A full day of athletics, team sports and celebration on the school ground." },
  { title: "Independence Day Celebration", date: "2026-08-15", description: "Flag hoisting, cultural performances and patriotic programs." },
  { title: "Annual Function", date: "2026-12-18", description: "Our flagship cultural evening featuring performances from every class." },
];

export const CLASSES = [
  { stage: "Pre-Primary", grades: "Nursery – UKG", focus: "Play-based learning, motor skills, early literacy and numeracy." },
  { stage: "Primary", grades: "Class I – V", focus: "Foundational academics with activity-based, concept-first teaching." },
  { stage: "Middle School", grades: "Class VI – VIII", focus: "Subject specialization begins, with labs, projects and skill-building." },
  { stage: "Secondary", grades: "Class IX – X", focus: "Board-exam preparation with focused mentoring and regular assessment." },
];

export const FACULTY_HIGHLIGHTS = [
  { name: "Mrs. A. Sharma", role: "Principal", note: "22 years in school leadership and curriculum design." },
  { name: "Mr. R. Iqbal", role: "Vice Principal / Mathematics", note: "Specialist in foundational and board-level mathematics." },
  { name: "Ms. P. Banerjee", role: "Head of Science", note: "Postgraduate in Physics; leads the school science lab." },
  { name: "Mrs. S. Khatun", role: "Head of English & Languages", note: "Focused on communication skills and creative writing." },
];

export const ADMISSION_PROCESS = [
  { step: "Enquire", detail: "Visit the school office or call our admissions desk to check seat availability for your child's class." },
  { step: "Application", detail: "Collect and submit the admission form along with the required documents." },
  { step: "Interaction", detail: "A short, friendly interaction with the child and parents to understand the child's needs." },
  { step: "Confirmation", detail: "On confirmation, complete the fee payment to secure the admission." },
];

export const DOCUMENTS_REQUIRED = [
  "Birth certificate (original + photocopy)",
  "Aadhaar card of the student",
  "Passport-size photographs (4 copies)",
  "Previous school's transfer certificate (for Class II and above)",
  "Previous year's report card / mark sheet",
  "Address proof of parent/guardian",
];

export const FEE_STRUCTURE = [
  { stage: "Nursery – UKG", admission: "₹3,000", tuitionMonthly: "₹800" },
  { stage: "Class I – V", admission: "₹3,500", tuitionMonthly: "₹950" },
  { stage: "Class VI – VIII", admission: "₹4,000", tuitionMonthly: "₹1,100" },
  { stage: "Class IX – X", admission: "₹4,500", tuitionMonthly: "₹1,300" },
];
