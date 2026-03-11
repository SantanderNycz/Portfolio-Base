"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Send, Download, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Contact() {
  const { t, language } = useLanguage();
  const cvFile =
    language === "en"
      ? "/DEV (EN) - Leonardo Santander Nycz.pdf"
      : "/DEV (PT) - Leonardo Santander Nycz.pdf";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "8d3ebfb2-eb57-400b-b85f-f8955d9fde29",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitError("Erro ao enviar. Tenta novamente mais tarde.");
      }
    } catch {
      setSubmitError("Erro de conexão. Verifica tua internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoItems = [
    {
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      label: t("contact.location"),
      value: "Porto - Portugal",
    },
    {
      icon: <Mail className="w-5 h-5 text-amber-500" />,
      label: t("contact.email"),
      value: "santandernycz.ls@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-amber-500" />,
      label: t("contact.phone"),
      value: "+351 915619867",
    },
  ];

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial={{
        background:
          "linear-gradient(to bottom, rgba(24,24,27,0.4), rgba(24,24,27,0.9), rgba(24,24,27,1))",
      }}
      animate={
        inView
          ? {
              background:
                "linear-gradient(to bottom, rgba(24,24,27,0.0), rgba(24,24,27,0.8), rgba(24,24,27,1))",
            }
          : {}
      }
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="py-24 overflow-hidden relative z-[48]"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-3">
            {t("contact.subtitle")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
            {t("contact.title")}
          </h2>
          <div className="w-12 h-px bg-amber-500 mt-4" />
        </motion.div>

        {/* Grid 1/3 + 2/3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* LEFT — 1 col */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-8">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/60 group-hover:border-amber-700/50 transition-colors duration-300 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-zinc-200 text-base">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href={cvFile} download className="w-fit">
              <button className="flex items-center gap-2 border border-zinc-700 hover:border-amber-700/60 bg-zinc-900/50 hover:bg-amber-700/10 text-zinc-300 hover:text-amber-400 text-xs tracking-widest uppercase px-5 py-3 rounded-lg transition-all duration-300">
                <Download className="w-3.5 h-3.5" />
                {t("contact.downloadCV")}
              </button>
            </a>
          </motion.div>

          {/* RIGHT — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 relative rounded-2xl border border-zinc-800/60 bg-zinc-900/70 backdrop-blur-md p-10 shadow-xl shadow-black/30"
          >
            <h3 className="text-zinc-200 text-sm tracking-[0.15em] uppercase font-light mb-8">
              {t("contact.message")}
            </h3>

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-12 h-12 text-amber-500" />
                <p className="text-zinc-300 text-sm tracking-wide">
                  {t("contact.success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-500 text-xs tracking-widest uppercase">
                      {t("contact.namePlaceholder")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/60 focus:bg-zinc-800 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-500 text-xs tracking-widest uppercase">
                      {t("contact.emailPlaceholder")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder={t("contact.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/60 focus:bg-zinc-800 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-500 text-xs tracking-widest uppercase">
                    {t("contact.subject") ?? "Assunto"}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t("contact.subject") ?? "Assunto"}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/60 focus:bg-zinc-800 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-zinc-500 text-xs tracking-widest uppercase">
                    {t("contact.messagePlaceholder")}
                  </label>
                  <textarea
                    name="message"
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-700/60 focus:bg-zinc-800 transition-all duration-200 resize-none"
                  />
                </div>

                {submitError && (
                  <p className="text-red-400 text-xs">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex items-center justify-center gap-2 bg-amber-700/80 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs tracking-widest uppercase font-medium py-3.5 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/30 group w-fit self-end"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      {t("contact.send")}
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}