"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
  const { t } = useLanguage();

  const infoItems = [
    {
      icon: User,
      label: t("about.name"),
      value: "Leo Santander Nycz",
    },
    {
      icon: Mail,
      label: t("about.email"),
      value: "santandernycz.ls@gmail.com",
      href: "mailto:santandernycz.ls@gmail.com",
    },
    {
      icon: MapPin,
      label: t("about.location"),
      value: "Porto - Portugal",
    },
    {
      icon: Phone,
      label: t("about.phone"),
      value: "+351 915 619 867",
      href: "+351915619867",
    },
  ];

  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    setShowBar(true);
  }, []);

  return (
    <motion.section
      id="about"
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 0.98 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="py-10 px-4 overflow-hidden relative z-[49]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(24,24,27,0) 0%, rgba(24,24,27,0.6) 30%, rgba(24,24,27,0.85) 70%, rgba(24,24,27,0) 100%)",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Título da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl font-bold mb-2">{t("about.title")}</h2>
          <motion.div
            className="w-20 h-1 bg-amber-400 mx-auto mb-6 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-0 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex justify-center"
          >
            <div
              className="w-100 h-100 md:w-[36rem] md:h-[36rem] mx-auto"
              style={{
                filter: "drop-shadow(0 10px 10px rgba(251,191,36, 0.5))",
              }}
            >
              <motion.svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <clipPath id="blob">
                    <motion.path
                      fill="#fff"
                      animate={{
                        d: [
                          "M43.1,-64.6C57.2,-57.6,67.3,-43.4,70.5,-28.8C73.7,-14.2,70,-0.2,64.2,12.2C58.3,24.5,50.4,35.4,39.1,41.8C27.7,48.3,13.8,50.3,0.2,50C-13.5,49.7,-27,47.2,-38.1,41.3C-49.2,35.3,-57.8,26,-63.3,14.4C-68.9,2.7,-71.5,-11.3,-66.8,-23.7C-62,-36.1,-49.8,-46.9,-36.4,-54.1C-22.9,-61.3,-11.5,-64.9,1,-66.1C13.5,-67.3,27,-66,43.1,-64.6Z",
                          "M50.1,-60.5C63.4,-53.7,70.3,-38.9,70.8,-24.4C71.3,-10,65.3,3.2,59.7,16.1C54,29,48,41.4,37.1,47.9C26.3,54.4,13.1,55,-0.5,55C-14.1,55,-28.3,54.1,-38.8,47.5C-49.4,40.9,-56.2,28.7,-61.2,16.5C-66.2,4.3,-69.5,-8.8,-65.6,-20.9C-61.7,-33,-50.7,-44.2,-38.7,-51.6C-26.7,-59,-13.3,-62.5,0,-62.5C13.3,-62.6,26.7,-59.3,50.1,-60.5Z",
                          "M40,-60C52.8,-53.2,60.4,-39.2,61.2,-25.1C62,-11,56.1,3.3,49.7,16.2C43.2,29.2,36.2,40.8,25.7,49C15.2,57.2,1.2,61.9,-11.5,63.1C-24.2,64.4,-48.5,62.1,-57.6,51.4C-66.8,40.7,-60.9,21.4,-58.2,3.2C-55.5,-15,-55.9,-31.1,-49.8,-41.7C-43.8,-52.3,-21.9,-57.3,-0.3,-56.9C21.3,-56.5,42.5,-50.3,40,-60Z",
                          "M45,-62C58,-54,68,-40,70,-25C72,-10,68,5,62,18C56,31,48,42,36,50C24,58,10,62,-5,62C-20,62,-35,60,-45,52C-55,44,-61,32,-64,18C-67,4,-66,-12,-60,-26C-54,-40,-40,-50,-25,-56C-10,-62,5,-64,45,-62Z",
                          "M43.1,-64.6C57.2,-57.6,67.3,-43.4,70.5,-28.8C73.7,-14.2,70,-0.2,64.2,12.2C58.3,24.5,50.4,35.4,39.1,41.8C27.7,48.3,13.8,50.3,0.2,50C-13.5,49.7,-27,47.2,-38.1,41.3C-49.2,35.3,-57.8,26,-63.3,14.4C-68.9,2.7,-71.5,-11.3,-66.8,-23.7C-62,-36.1,-49.8,-46.9,-36.4,-54.1C-22.9,-61.3,-11.5,-64.9,1,-66.1C13.5,-67.3,27,-66,43.1,-64.6Z",
                        ],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                      transform="translate(100 100)"
                    />
                  </clipPath>
                </defs>

                <image
                  href="/about.png"
                  width="100%"
                  height="100%"
                  clipPath="url(#blob)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Informações */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4 text-amber-400">
                {t("about.role")}
              </h3>
              <p className="text-lg leading-relaxed mb-6">
                {t("about.description")}
              </p>
              <p className="text-lg leading-relaxed">
                {t("about.description2")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
