"use client";

import { useState } from "react";
import { FiSend as Send } from "react-icons/fi";
import { sendContactEmail } from "@/app/actions/contact";
import type { Dictionary } from "@/get-dictionary";

export function ContactForm({
  copy,
}: {
  copy: Dictionary["contact"];
}) {
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
    <form onSubmit={handleSubmit} className="flex-1 space-y-6">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-foreground"
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
          className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-foreground"
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
          className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-foreground"
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
          className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={`inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all ${
          status === "error"
            ? "bg-red-500 text-white"
            : status === "success"
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
        } disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {buttonLabel}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
