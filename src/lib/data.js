import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  NEWS as STATIC_NEWS,
  EVENTS as STATIC_EVENTS,
  FACULTY_HIGHLIGHTS as STATIC_FACULTY,
  FEE_STRUCTURE as STATIC_FEES,
} from "@/data/school";

const STATIC_GALLERY = [
  { id: "1", title: "Main Building Facade", category: "Campus" },
  { id: "2", title: "Smart Classroom Session", category: "Academics" },
  { id: "3", title: "Annual Sports Day", category: "Sports" },
  { id: "4", title: "Science Exhibition", category: "Academics" },
  { id: "5", title: "Independence Day Celebration", category: "Celebrations" },
  { id: "6", title: "Library Reading Hour", category: "Campus" },
  { id: "7", title: "Inter-House Football", category: "Sports" },
  { id: "8", title: "Annual Function Performance", category: "Events" },
  { id: "9", title: "Prize Distribution Ceremony", category: "Events" },
  { id: "10", title: "Computer Lab Session", category: "Academics" },
  { id: "11", title: "Republic Day Flag Hoisting", category: "Celebrations" },
  { id: "12", title: "School Playground", category: "Campus" },
];

export async function getNews(limit = 3) {
  if (!isSupabaseConfigured) return STATIC_NEWS.slice(0, limit);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select("id, title, excerpt, category, date")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(limit);
    if (error || !data?.length) return STATIC_NEWS.slice(0, limit);
    return data.map((n) => ({ ...n, href: "/" }));
  } catch {
    return STATIC_NEWS.slice(0, limit);
  }
}

export async function getEvents(limit = 4) {
  if (!isSupabaseConfigured) return STATIC_EVENTS.slice(0, limit);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("id, title, description, event_date")
      .eq("published", true)
      .order("event_date", { ascending: true })
      .limit(limit);
    if (error || !data?.length) return STATIC_EVENTS.slice(0, limit);
    return data.map((e) => ({ title: e.title, description: e.description, date: e.event_date }));
  } catch {
    return STATIC_EVENTS.slice(0, limit);
  }
}

export async function getFaculty() {
  if (!isSupabaseConfigured) return STATIC_FACULTY;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faculty")
      .select("id, name, role, note")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return STATIC_FACULTY;
    return data;
  } catch {
    return STATIC_FACULTY;
  }
}

export async function getFeeStructure() {
  if (!isSupabaseConfigured) return STATIC_FEES;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("fee_structure")
      .select("id, stage, admission_fee, monthly_tuition")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return STATIC_FEES;
    return data.map((f) => ({
      stage: f.stage,
      admission: f.admission_fee,
      tuitionMonthly: f.monthly_tuition,
    }));
  } catch {
    return STATIC_FEES;
  }
}

export async function getGallery() {
  if (!isSupabaseConfigured) return STATIC_GALLERY;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("id, title, category, image_url")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error || !data?.length) return STATIC_GALLERY;
    return data;
  } catch {
    return STATIC_GALLERY;
  }
}
