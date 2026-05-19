"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./contact-form.module.css";

const HEAR_OPTIONS = [
  "Google Search",
  "Social Media",
  "Referral",
  "Past Client",
  "Other",
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setError("");

    // Validate
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    if (!hearAbout) { setError("Please let me know how you heard about me."); return; }
    if (!message.trim()) { setError("Please tell me about your project."); return; }

    setSending(true);

    try {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");

      const contactNotes = `
Source: Contact Page
Phone: ${phone || "Not provided"}
How they heard about me: ${hearAbout || "Not specified"}
Message: ${message}
Newsletter Opt-in: ${newsletter ? "Yes" : "No"}
`.trim();

      const payload = {
        contact: {
          email,
          first_name: firstName,
          last_name: lastName || "",
          notes: contactNotes,
        },
        company: {
          name: "",
          domain: "",
          description: "",
        },
        tags: ["lead", "contact submission", ...(newsletter ? ["subscribed"] : [])],
        deal: {
          title: name.trim(),
          value: 0,
          stage: "New",
          notes: `Contact form enquiry. Source: ${hearAbout || "Unknown"}`,
        },
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact form error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className={styles.formSection}>
        <div className={styles.formInner}>
          <div />
          <div className={styles.successMsg}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>
              Message sent{name ? `, ${name.split(" ")[0]}` : ""}!
            </h3>
            <p className={styles.successText}>
              I&apos;ll review your message and get back to you within one business day. If you want to discuss a custom build, you can also book a discovery call directly.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "0.5rem" }}>
              <Button label="Book a Discovery Call" href="/book" size="md" />
              <a href="/" className={styles.emailLink} style={{ textDecoration: "underline", fontSize: "0.95rem" }}>
                Back to home
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection}>
      <div className={styles.formInner}>
        {/* Left: intro */}
        <div className={styles.introCol}>
          <p className={styles.introText}>
            Have a general question or just want to say hi? Drop me a message and I&apos;ll get back to you shortly. If you&apos;re ready to kick off a new project, the project planner is the best place to start.
          </p>

          <Button label="Go to Project Planner" href="/start" size="md" />

          <div className={styles.emailFallback}>
            <span className={styles.emailLabel}>Hate contact forms?</span>
            <a href="mailto:hello@madebytie.com" className={styles.emailLink}>
              hello@madebytie.com
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className={styles.formCol}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Name"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
              />
            </div>
            <div className={styles.formField}>
              <input
                type="email"
                className={styles.formInput}
                placeholder="Email Address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <input
                type="tel"
                className={styles.formInput}
                placeholder="Phone (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <select
                className={styles.formSelect}
                value={hearAbout}
                onChange={(e) => setHearAbout(e.target.value)}
              >
                <option value="" disabled>
                  How did you hear about me?
                </option>
                {HEAR_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formField}>
            <textarea
              className={styles.formTextarea}
              placeholder="Tell me about your project"
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError(""); }}
            />
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            <span>Subscribe for tips, launches &amp; updates</span>
          </label>

          <div className={styles.submitArea}>
            <p className={styles.privacyNote}>
              By submitting this form I accept the{" "}
              <a href="/privacy" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </a>{" "}
              of this site.
            </p>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <Button
              label={sending ? "Sending…" : "Send Message"}
              size="lg"
              variant="dark"
              onClick={handleSubmit}
              disabled={sending}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
