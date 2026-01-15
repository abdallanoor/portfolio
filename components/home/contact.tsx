import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import ContactForm from "../contact-form";
import ContactLinks from "../contact-links";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Contact() {
  const t = useTranslations("contact");
  return (
    <section className="relative" id="contact">
      <div className="section container">
        <div className="md:col-span-2">
          <ScrollReveal width="100%" delay={0.4}>
            <SectionHeader title={t("title")} description={t("description")} />
          </ScrollReveal>
          <ScrollReveal width="100%" delay={0.6}>
            <div className="mt-8 mb-2 w-fit">
              <ContactLinks />
            </div>
          </ScrollReveal>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4">
            <ScrollReveal width="100%" delay={0.8}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
