"use client";

import { useState } from "react";

import { emptyContactValues, submitContact, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";

const services = ["Branding", "Uniform Design", "Marketing", "Graphic Design", "Photography", "Videography", "Other"];
const fieldClass = "w-full border-0 border-b border-black bg-transparent px-0 py-4 text-lg outline-none placeholder:text-brand-gray focus:border-brand-red";

type ContactFormProps = {
  endpoint: string;
  variant?: "default" | "editorial";
};

export function ContactForm({ endpoint, variant = "default" }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState(endpoint ? "" : "Contact form is not configured.");
  const update = (field: keyof ContactValues, value: string) => setValues((current) => ({ ...current, [field]: value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (!endpoint) {
      setState("error");
      setMessage("Contact form is not configured.");
      return;
    }
    setState("sending");
    setMessage("Sending your inquiry…");
    try {
      await submitContact(endpoint, values);
      setState("success");
      setMessage("Thank you. Your inquiry has been sent.");
      setValues(emptyContactValues);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your inquiry. Please try again.");
    }
  }

  const field = (name: keyof ContactValues, label: string, type = "text") => <label className="block">
    <span className="text-xs font-bold uppercase tracking-[.1em]">{label}</span>
    <input id={name} name={name} type={type} value={values[name]} onChange={(event) => update(name, event.target.value)} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} className={fieldClass} />
    {errors[name] ? <span id={`${name}-error`} className="mt-2 block text-sm text-brand-red">{errors[name]}</span> : null}
  </label>;

  return <form
    onSubmit={onSubmit}
    noValidate
    data-contact-form-panel={variant === "editorial" ? true : undefined}
    className={variant === "editorial" ? "space-y-9 border border-black/25 p-6 md:p-10" : "space-y-9"}
  >
    {field("name", "Name")}
    {field("company", "Company")}
    {field("email", "Email", "email")}
    {field("phone", "Phone", "tel")}
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[.1em]">Service</span>
      <select name="service" value={values.service} onChange={(event) => update("service", event.target.value)} aria-invalid={Boolean(errors.service)} className={fieldClass}>
        <option value="">Select a service</option>
        {services.map((service) => <option key={service}>{service}</option>)}
      </select>
      {errors.service ? <span className="mt-2 block text-sm text-brand-red">{errors.service}</span> : null}
    </label>
    {field("budget", "Budget")}
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[.1em]">Project Details</span>
      <textarea name="details" rows={5} value={values.details} onChange={(event) => update("details", event.target.value)} aria-invalid={Boolean(errors.details)} className={fieldClass} />
      {errors.details ? <span className="mt-2 block text-sm text-brand-red">{errors.details}</span> : null}
    </label>
    <button type="submit" disabled={state === "sending" || !endpoint} className="min-h-14 bg-brand-red px-7 text-sm font-bold uppercase tracking-[.06em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-brand-gray">{state === "sending" ? "Sending…" : "Send Inquiry ↗"}</button>
    <p role="status" aria-live="polite" className={`min-h-6 text-sm ${state === "error" ? "text-brand-red" : "text-brand-gray"}`}>{message}</p>
  </form>;
}