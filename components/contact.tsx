"use client";

import { useRef, useState } from "react";
import {
  FiSend as Send,
  FiMail as Mail,
  FiGithub as GithubIcon,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useInView } from "@/hooks/use-in-view";
import { sendContactEmail } from "@/app/actions/contact";

export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { threshold: 0.1 });
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const getButtonLabel = () => {
    if (status === "loading") return "Sending...";
    if (status === "success") return "Message Sent!";
    if (status === "error") return "Failed, Try Again";
    return "Send Message";
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-700 ease-out ${isHeadingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-2 font-mono text-sm text-primary">Say Hello</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Get In Touch
          </h2>
        </div>

        <div
          ref={formRef}
          className={`flex flex-col gap-12 md:flex-row md:gap-16 transition-all duration-700 ease-out ${
            isFormInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Your message..."
                className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={`inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all
                ${
                  status === "error"
                    ? "bg-red-500 text-white"
                    : status === "success"
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {getButtonLabel()}
              <Send className="h-4 w-4" />
            </button>
          </form>

          {/* Contact Info — unchanged */}
          <div className="flex flex-col justify-center gap-8 md:w-80">
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Connect With Me
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of something great. Feel free to
                reach out!
              </p>
            </div>
            <div className="space-y-4">
              <a
                href="mailto:yamen.barakat.1994@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                yamen.barakat.1994@gmail.com
              </a>
              <a
                href="https://github.com/yamenbarakat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <GithubIcon className="h-4 w-4 text-primary" />
                </div>
                github.com/yamenbarakat
              </a>
              <a
                href="https://wa.me/963987319420"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <FaWhatsapp className="h-4 w-4 text-primary" />
                </div>
                +963987319420
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
