"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    } catch (error) {
      setSubmitError("Erro de conexão. Verifica tua internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      className="py-20 overflow-hidden relative z-[48]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t("contact.title")}
          </h2>
          <motion.div
            className="w-20 h-1 bg-amber-400 mx-auto mb-6 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <p className="text-zinc-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Lado esquerdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("contact.info")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-zinc-700 p-3 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">
                      {t("contact.location")}
                    </h4>
                    <p className="text-zinc-400">Porto - Portugal</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-zinc-700 p-3 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">
                      {t("contact.email")}
                    </h4>
                    <p className="text-zinc-400">santandernycz.ls@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-zinc-700 p-3 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">
                      {t("contact.phone")}
                    </h4>
                    <p className="text-zinc-400">+351 915619867</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a href={cvFile} download>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white w-full flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  {t("contact.downloadCV")}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Lado direito */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("contact.message")}
              </h3>
              {submitSuccess ? (
                <div className="bg-amber-700/20 border border-amber-400 text-amber-400 p-4 rounded-lg">
                  {t("contact.success")}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
                    />
                    <Input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder={t("contact.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
                    />
                  </div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder={t("contact.message")}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
                  />
                  <Textarea
                    name="message"
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400 min-h-[150px]"
                  />
                  {submitError && (
                    <div className="text-red-400 text-sm">{submitError}</div>
                  )}
                </form>
              )}
            </div>

            {!submitSuccess && (
              <div className="mt-4">
                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        {t("contact.sending")}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        {t("contact.send")}
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
