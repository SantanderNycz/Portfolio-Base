"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitError(
        "There was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-zinc-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t("contact.info")}</h3>
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
                  <h4 className="text-lg font-medium">{t("contact.email")}</h4>
                  <p className="text-zinc-400">santandernycz.ls@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-zinc-700 p-3 rounded-lg mr-4">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">{t("contact.phone")}</h4>
                  <p className="text-zinc-400">+351 915619867</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6">
              {t("contact.message")}
            </h3>
            {submitSuccess ? (
              <div className="bg-amber-400/20 border border-amber-400 text-amber-400 p-4 rounded-lg">
                {t("contact.success")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder={t("contact.yourName")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder={t("contact.yourEmail")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
                    />
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder={t("contact.subject")}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t("contact.yourMessage")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-400 min-h-[150px]"
                  />
                </div>
                {submitError && (
                  <div className="text-red-400 text-sm">{submitError}</div>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 text-white w-full"
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
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
