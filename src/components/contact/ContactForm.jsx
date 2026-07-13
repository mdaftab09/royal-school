"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number").max(13, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    if (isSupabaseConfigured) {
      const supabase = createClient();
      const { error } = await supabase.from("leads").insert({
        type: "contact",
        name: data.name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      if (error) {
        console.error("Failed to submit contact message:", error);
        throw error;
      }
    } else {
      // Backend not connected yet — simulate submission so the form
      // still works while you're setting up Supabase.
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.log("Contact message (not saved — connect Supabase):", data);
    }
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-royal" aria-hidden="true" />
        <h3 className="font-display text-xl text-navy">Message sent!</h3>
        <p className="max-w-sm text-sm text-slate">
          Thanks for reaching out — we&apos;ll get back to you as soon as possible.
        </p>
        <Button variant="ghost" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="block text-sm font-medium text-navy mb-1.5">
            Full Name
          </label>
          <input
            id="c-name"
            type="text"
            {...register("name")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="c-phone" className="block text-sm font-medium text-navy mb-1.5">
            Phone Number
          </label>
          <input
            id="c-phone"
            type="tel"
            {...register("phone")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-email" className="block text-sm font-medium text-navy mb-1.5">
            Email Address
          </label>
          <input
            id="c-email"
            type="email"
            {...register("email")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-subject" className="block text-sm font-medium text-navy mb-1.5">
            Subject
          </label>
          <input
            id="c-subject"
            type="text"
            {...register("subject")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="block text-sm font-medium text-navy mb-1.5">
            Message
          </label>
          <textarea
            id="c-message"
            rows={5}
            {...register("message")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm resize-none"
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
