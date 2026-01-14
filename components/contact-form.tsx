"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle, ArrowUpRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.required");
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t("validation.nameMinLength");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t("validation.required");
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{t("fields.name")} *</Label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder={t("placeholders.name")}
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none transition-colors placeholder:text-muted-foreground ${
            errors.name ? "border-destructive" : ""
          }`}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-destructive text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("fields.email")} *</Label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder={t("placeholders.email")}
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none transition-colors placeholder:text-muted-foreground ${
            errors.email ? "border-destructive" : ""
          }`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-destructive text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">{t("fields.subject")}</Label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder={t("placeholders.subject")}
          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none transition-colors placeholder:text-muted-foreground"
          disabled={isSubmitting}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">{t("fields.message")}</Label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder={t("placeholders.message")}
          className={`min-h-[100px] resize-none w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border focus:border-primary outline-none transition-colors placeholder:text-muted-foreground`}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-destructive text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="max-sm:w-full"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : <ArrowUpRight />}
        {t("submit")}
      </Button>

      {/* Success */}
      {submitStatus === "success" && (
        <Alert>
          <CheckCircle className="size-4" />
          <AlertDescription>{t("messages.success")}</AlertDescription>
        </Alert>
      )}

      {/* Error */}
      {submitStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{t("messages.error")}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
