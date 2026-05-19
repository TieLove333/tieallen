"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./start-project-form.module.css";

// ── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  company: string;
  launchDate: string;
  budgetMin: string;
  budgetMax: string;
  services: string[];
  summary: string;
  brief: File | null;
  newsletter: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const SERVICES = [
  "Branding",
  "Web Design",
  "Web Development",
  "Web App Development",
  "eCommerce",
  "Funnels",
  "CRM + Automation",
  "I want it all",
];

const TOTAL_STEPS = 4;

// ── Floating label field ──────────────────────────────────────────────────────

function FloatField({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const filled = value.length > 0;
  return (
    <div className={`${styles.floatField} ${filled ? styles.floatFieldFilled : ""}`}>
      <input
        type={type}
        className={styles.floatInput}
        value={value}
        placeholder=""
        onChange={(e) => onChange(e.target.value)}
      />
      <span className={styles.floatLabel}>{label}</span>
    </div>
  );
}

// ── Step components ───────────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className={styles.stepContent}>
      <h1 className={styles.stepTitle}>The basics</h1>

      <p className={styles.alternateCta}>
        Just want to schedule a quick chat first?{" "}
        <a href="/book" className={styles.alternateLink}>
          Skip and book a discovery call
        </a>
      </p>

      <div className={styles.fields}>
        <FloatField label="Name" value={data.name} onChange={(v) => onChange("name", v)} />
        <FloatField label="Email" type="email" value={data.email} onChange={(v) => onChange("email", v)} />
        <FloatField label="Company" value={data.company} onChange={(v) => onChange("company", v)} />
      </div>
    </div>
  );
}

function Step2({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className={styles.stepContent}>
      <h1 className={styles.stepTitle}>Budget &amp; milestones</h1>

      <div className={styles.fields}>
        <div className={styles.inlineField}>
          <span className={styles.inlineLabel}>I want to launch my project on:</span>
          <div className={styles.dateWrapper}>
            <input
              className={styles.fieldInput}
              type="date"
              value={data.launchDate}
              onChange={(e) => onChange("launchDate", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inlineField}>
          <span className={styles.inlineLabel}>My budget is between</span>
          <div className={styles.budgetRow}>
            <div className={styles.budgetInput}>
              <span className={styles.currency}>$</span>
              <input
                className={styles.fieldInput}
                type="number"
                placeholder=""
                value={data.budgetMin}
                onChange={(e) => onChange("budgetMin", e.target.value)}
              />
            </div>
            <span className={styles.budgetAnd}>and</span>
            <div className={styles.budgetInput}>
              <span className={styles.currency}>$</span>
              <input
                className={styles.fieldInput}
                type="number"
                placeholder=""
                value={data.budgetMax}
                onChange={(e) => onChange("budgetMax", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({
  data,
  onToggle,
}: {
  data: FormData;
  onToggle: (service: string) => void;
}) {
  return (
    <div className={styles.stepContent}>
      <h1 className={styles.stepTitle}>What does your project require?</h1>

      <div className={styles.servicesGrid}>
        {SERVICES.map((service) => {
          const selected = data.services.includes(service);
          return (
            <button
              key={service}
              type="button"
              className={`${styles.serviceChip} ${selected ? styles.serviceChipSelected : ""}`}
              onClick={() => onToggle(service)}
            >
              <span className={styles.serviceChipRadio} aria-hidden="true" />
              {service}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({
  data,
  onChange,
  onFileChange,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  onFileChange: (file: File | null) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileChange(file);
  };

  return (
    <div className={styles.stepContent}>
      <h1 className={styles.stepTitle}>Give me the breakdown</h1>

      <div className={styles.fields}>
        <textarea
          className={styles.textarea}
          placeholder="Give me the rundown. What are you building, who is it for, and what does success look like?"
          value={data.summary}
          rows={5}
          onChange={(e) => onChange("summary", e.target.value)}
        />

        <div className={styles.uploadSection}>
          <div className={styles.uploadMeta}>
            <span>Or upload a project brief</span>
            <span className={styles.uploadHint}>PDF or docx, max 10 MB</span>
          </div>

          <div
            className={styles.dropzone}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <label className={styles.fileLabel}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className={styles.fileInput}
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              />
              <span className={styles.fileButton}>Choose File</span>
              <span className={styles.fileName}>
                {data.brief ? data.brief.name : "No file chosen"}
              </span>
            </label>
          </div>
        </div>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={data.newsletter}
            onChange={(e) => onChange("newsletter", e.target.checked)}
          />
          <span>Keep me in the loop with tips, launches &amp; updates</span>
        </label>
      </div>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className={styles.progressWrap}>
      <div
        className={styles.progressBar}
        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
      />
    </div>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className={styles.successScreen}>
      <div className={styles.successIcon}>✓</div>
      <h2 className={styles.successTitle}>
        Awesome, you&apos;re in{name ? `, ${name.split(" ")[0]}` : ""}!
      </h2>
      <p className={styles.successText}>
        I have received your project breakdown. Let&apos;s schedule your 15-minute discovery call to align on scope, deliverables, and next steps.
      </p>
      <Button label="Schedule Discovery Call" href="/book" size="lg" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StartProjectForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    launchDate: "",
    budgetMin: "",
    budgetMax: "",
    services: [],
    summary: "",
    brief: null,
    newsletter: false,
  });

  const setField = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleService = (service: string) => {
    setError("");
    setFormData((prev) => {
      if (service === "I want it all") {
        return { ...prev, services: prev.services.includes(service) ? [] : SERVICES };
      }
      const next = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service && s !== "I want it all")
        : [...prev.services.filter((s) => s !== "I want it all"), service];
      return { ...prev, services: next };
    });
  };

  const validate = (): string => {
    if (step === 1) {
      if (!formData.name.trim()) return "Please enter your name.";
      if (!formData.email.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address.";
      if (!formData.company.trim()) return "Please enter your company name.";
    }
    if (step === 3 && formData.services.length === 0) return "Please select at least one service.";
    return "";
  };

  const handleNext = () => {
    const msg = validate();
    if (msg) { setError(msg); return; }
    setError("");
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setError("");
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSending(true);
    setError("");

    try {
      // Split name into first and last
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");

      // Compile comprehensive notes for the contact
      const contactNotes = `
Company: ${formData.company || "Not provided"}
Services Requested: ${formData.services.join(", ")}
Target Launch Date: ${formData.launchDate || "Not specified"}
Budget Range: $${formData.budgetMin} - $${formData.budgetMax}
Project Summary: ${formData.summary || "No summary provided"}
Newsletter Opt-in: ${formData.newsletter ? "Yes" : "No"}
Project Brief: ${formData.brief ? formData.brief.name : "None uploaded"}
`.trim();

      // Compile notes for the deal
      const dealNotes = `Full Budget Range: $${formData.budgetMin} - $${formData.budgetMax}`;

      // Construct deal title
      const dealTitle = formData.company 
        ? `${formData.name} and ${formData.company}`
        : formData.name;

      const payload = {
        contact: {
          email: formData.email,
          first_name: firstName,
          last_name: lastName || "",
          notes: contactNotes,
        },
        company: {
          name: formData.company,
          domain: "", // Matches the example structure
          description: "Project Lead",
        },
        tags: ["lead", "project lead", ...(formData.newsletter ? ["subscribed"] : [])],
        deal: {
          title: dealTitle,
          value: parseFloat(formData.budgetMax) || 0,
          stage: "New",
          notes: dealNotes,
        }
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send enquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) return <SuccessScreen name={formData.name} />;

  return (
    <div className={styles.form}>
      <ProgressBar step={step} />
      <p className={styles.stepCount}>Step {step} of {TOTAL_STEPS}</p>

      {step === 1 && (
        <Step1 data={formData} onChange={(f, v) => setField(f, v)} />
      )}
      {step === 2 && (
        <Step2 data={formData} onChange={(f, v) => setField(f, v)} />
      )}
      {step === 3 && (
        <Step3 data={formData} onToggle={toggleService} />
      )}
      {step === 4 && (
        <Step4
          data={formData}
          onChange={(f, v) => setField(f, v)}
          onFileChange={(file) => setField("brief", file)}
        />
      )}

      {error && <p className={styles.errorMsg}>{error}</p>}

      <div className={styles.nav}>
        {step > 1 && (
          <button type="button" className={styles.backBtn} onClick={handleBack}>
            Back
          </button>
        )}

        {step < TOTAL_STEPS ? (
          <Button label="Next Step" size="lg" onClick={handleNext} />
        ) : (
          <Button
            label={sending ? "Sending…" : "Send Enquiry"}
            size="lg"
            onClick={handleSubmit}
            disabled={sending}
          />
        )}
      </div>
    </div>
  );
}
