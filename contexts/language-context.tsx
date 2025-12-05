"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.name": "Léo",
    "hero.title": "Hi, I'm",
    "hero.scrollDown": "Scroll down",

    // About
    "about.title": "About Me",
    "about.role": "Full-Stack Developer",
    "about.description":
      "I’m a Full Stack developer who loves turning ideas into modern, intuitive web applications. I enjoy combining code and design to create experiences that truly make sense for users.",
    "about.description2":
      "Besides coding, I’m a musician, and I like bringing that creativity into my projects, finding original and elegant solutions. Writing clean code and constantly improving my skills are part of my everyday routine.",
    "about.name": "Name",
    "about.email": "Email",
    "about.location": "Location",
    "about.phone": "Phone",

    // Projects
    "projects.title": "My Projects",
    "projects.subtitle":
      "Here are some of my recent projects. Each one represents a unique challenge and learning experience.",

    // Skills
    "skills.title": "My Skills",
    "skills.subtitle":
      "Here's a breakdown of my technical skills and proficiency levels.",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle":
      "Feel free to reach out for collaborations or just a friendly hello",
    "contact.getInTouch": "Contact Information",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your.email@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Your message...",
    "contact.send": "Send Message",
    "contact.downloadCV": "Download CV",

    // Footer
    "footer.madeWith": "Made with",
    "footer.and": "and",
    "footer.role": "Full-Stack Developer",
    "footer.rights": "All rights reserved.",
  },
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contato",

    // Hero
    "hero.greeting": "Olá, eu sou",
    "hero.name": "Léo",
    "hero.title": "Olá, eu sou",
    "hero.scrollDown": "Role para baixo",

    // About
    "about.title": "Sobre Mim",
    "about.role": "Desenvolvedor Full-Stack",
    "about.description":
      "Sou um desenvolvedor Full Stack que adora transformar ideias em aplicações web modernas e intuitivas. Gosto de unir código e design para criar experiências que realmente fazem sentido para quem usa.",
    "about.description2":
      "Além de programação, sou músico e sempre busco levar essa criatividade para os projetos que construo, encontrando soluções originais e elegantes. Código limpo e evolução constante são parte do meu dia a dia.",
    "about.name": "Nome",
    "about.email": "Email",
    "about.location": "Localização",
    "about.phone": "Telefone",

    // Projects
    "projects.title": "Meus Projetos",
    "projects.subtitle":
      "Aqui estão alguns dos meus projetos recentes. Cada um representa um desafio único e experiência de aprendizado.",

    // Skills
    "skills.title": "Minhas Habilidades",
    "skills.subtitle":
      "Aqui está um resumo das minhas habilidades técnicas e níveis de proficiência.",

    // Contact
    "contact.title": "Entre em Contato",
    "contact.subtitle":
      "Sinta-se à vontade para entrar em contato para colaborações ou apenas um olá amigável",
    "contact.getInTouch": "Informações de Contato",
    "contact.info": "Informações de Contato",
    "contact.location": "Localização",
    "contact.email": "Email",
    "contact.phone": "Telemóvel",
    "contact.name": "Nome",
    "contact.namePlaceholder": "Seu nome",
    "contact.emailPlaceholder": "seu.email@exemplo.com",
    "contact.message": "Mensagem",
    "contact.messagePlaceholder": "Sua mensagem...",
    "contact.send": "Enviar Mensagem",
    "contact.downloadCV": "Baixar CV",

    // Footer
    "footer.madeWith": "Feito com",
    "footer.and": "e",
    "footer.role": "Desenvolvedor Full-Stack",
    "footer.rights": "Todos os direitos reservados",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Carregar idioma salvo do localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
