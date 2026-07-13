"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const schema = z.object({
  parentName: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid 10-digit phone number")
    .max(13, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  studentName: z.string().min(2, "Please enter the student's name"),
  classApplying: z.string().min(1, "Please select a class"),
  message: z.string().optional(),
});

const CLASS_OPTIONS = [
  "Nursery", "LKG", "UKG",
  "Class I", "Class II", "Class III", "Class IV", "Class V",
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
];

export default function AdmissionForm() {
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
        type: "admission",
        name: data.parentName,
        phone: data.phone,
        email: data.email || null,
        student_name: data.studentName,
        class_applying: data.classApplying,
        message: data.message || null,
      });
      if (error) {
        console.error("Failed to submit admission enquiry:", error);
        throw error;
      }
    } else {
      // Backend not connected yet — simulate submission so the form
      // still works while you're setting up Supabase.
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.log("Admission enquiry (not saved — connect Supabase):", data);
    }
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-white p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-royal" aria-hidden="true" />
        <h3 className="font-display text-xl text-navy">Enquiry received!</h3>
        <p className="max-w-sm text-sm text-slate">
          Thank you for reaching out. Our admissions team will contact you within 24 hours.
        </p>
        <Button variant="ghost" onClick={() => setSubmitted(false)}>
          Submit Another Enquiry
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
          <label htmlFor="parentName" className="block text-sm font-medium text-navy mb-1.5">
            Parent / Guardian Name
          </label>
          <input
            id="parentName"
            type="text"
            {...register("parentName")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.parentName}
            aria-describedby={errors.parentName ? "parentName-error" : undefined}
          />
          {errors.parentName && (
            <p id="parentName-error" className="mt-1 text-xs text-red-600">
              {errors.parentName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-xs text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
            Email Address <span className="text-slate font-normal">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-navy mb-1.5">
            Student&apos;s Name
          </label>
          <input
            id="studentName"
            type="text"
            {...register("studentName")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm"
            aria-invalid={!!errors.studentName}
            aria-describedby={errors.studentName ? "studentName-error" : undefined}
          />
          {errors.studentName && (
            <p id="studentName-error" className="mt-1 text-xs text-red-600">
              {errors.studentName.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="classApplying" className="block text-sm font-medium text-navy mb-1.5">
            Class Applying For
          </label>
          <select
            id="classApplying"
            {...register("classApplying")}
            defaultValue=""
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm bg-white"
            aria-invalid={!!errors.classApplying}
            aria-describedby={errors.classApplying ? "classApplying-error" : undefined}
          >
            <option value="" disabled>
              Select a class
            </option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.classApplying && (
            <p id="classApplying-error" className="mt-1 text-xs text-red-600">
              {errors.classApplying.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
            Message <span className="text-slate font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            className="focus-ring w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm resize-none"
          />
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit Enquiry"
        )}
      </Button>
    </form>
  );
}
