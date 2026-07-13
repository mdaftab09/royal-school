"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, AlertCircle, Terminal } from "lucide-react";
import Crest from "@/components/ui/Crest";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Crest className="h-14 w-14" />
          <h1 className="font-display text-2xl text-white">Admin Sign In</h1>
          <p className="text-sm text-white/60">Royal English Medium School</p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="rounded-2xl bg-white p-7 space-y-4">
            <div className="flex items-center gap-2 text-navy">
              <Terminal className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg">Backend not connected yet</h2>
            </div>
            <p className="text-sm text-slate leading-relaxed">
              The admin panel needs a Supabase project connected before you can sign in. Follow
              the <strong>ADMIN_SETUP.md</strong> guide in the project root — it walks through
              creating a free Supabase project, running the database schema, adding your
              environment variables, and creating your first admin user.
            </p>
            <p className="text-xs text-slate/70">
              Once connected and your <code className="bg-paper px-1 rounded">.env.local</code>{" "}
              is set, restart the dev server and this page will show a real sign-in form.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-7 space-y-5">
            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                {error}
              </div>
            )}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-navy mb-1.5">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-navy mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="focus-ring w-full flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Sign In
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
