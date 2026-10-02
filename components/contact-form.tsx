"use client";

import { useState } from "react";
import { FiSend as Send } from "react-icons/fi";
import { sendContactEmail } from "@/app/actions/contact";
import type { Dictionary } from "@/get-dictionary";

export function ContactForm({ copy }: { copy: Dictionary["contact"] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    const result = await sendContactEmail(formData);
    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  const buttonLabel =
    status === "loading"
      ? copy.sending
      : status === "success"
        ? copy.sent
        : status === "error"
          ? copy.failed
          : copy.send;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
          >
            {copy.name}
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            placeholder={copy.namePlaceholder}
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:border-primary/60 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
          >
            {copy.email}
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            placeholder={copy.emailPlaceholder}
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:border-primary/60 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase"
        >
          {copy.message}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(event) =>
            setFormData({ ...formData, message: event.target.value })
          }
          placeholder={copy.messagePlaceholder}
          className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition focus:border-primary/60 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all sm:w-auto ${
          status === "error"
            ? "bg-destructive text-white"
            : status === "success"
              ? "bg-emerald-500 text-white"
              : "bg-primary text-primary-foreground shadow-[0_10px_40px_-12px_rgba(242,169,59,0.55)] hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_rgba(242,169,59,0.75)]"
        } disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {buttonLabel}
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </button>
    </form>
  );
}
