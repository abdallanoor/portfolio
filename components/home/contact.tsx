import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import ContactForm from "../contact-form";
import ContactLinks from "../contact-links";

export default function Contact() {
  const t = useTranslations("contact");
  return (
    <section className="relative" id="contact">
      <div className="section container">
        <div className="md:col-span-2">
          <SectionHeader title={t("title")} description={t("description")} />
          <div className="mt-8 mb-2">
            <ContactLinks />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col gap-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
