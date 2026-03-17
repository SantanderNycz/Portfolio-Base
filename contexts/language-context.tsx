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
    "hero.role": "Full-Stack Developer",

    // About
    "about.title": "About Me",
    "about.role": "Full-Stack Developer",
    "about.description":
      "I'm a Full-Stack developer. I trained at 42 Porto, a peer-to-peer school known for its rigorous, project-based curriculum, where I developed a strong foundation in problem-solving and low-level programming. Today I focus on building modern web applications with React, Node.js, and TypeScript, combining clean code with thoughtful design to create experiences that make sense for users.",
    "about.description2":
      "Besides coding, I'm a musician, and I like bringing that same creative mindset into my work, finding original, elegant solutions rather than just getting things done. I'm currently looking for opportunities where I can keep growing and contribute to real products.",
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
    "contact.subtitle": "Feel free to reach out!",
    "contact.getInTouch": "Contact Information",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your.email@example.com",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Your message...",
    "contact.send": "Send Message",
    "contact.downloadCV": "Download CV",
    "contact.success": "Message sent!",

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
    "hero.role": "Desenvolvedor Full-Stack",

    // About
    "about.title": "Sobre Mim",
    "about.role": "Desenvolvedor Full-Stack",
    "about.description":
      "Sou um desenvolvedor Full-Stack. Estudei na 42 Porto, uma escola peer-to-peer conhecida por seu currículo rigoroso e baseado em projetos, onde desenvolvi uma base sólida em resolução de problemas e programação de baixo nível. Hoje, concentro-me na criação de aplicativos web modernos com React, Node.js e TypeScript, combinando código limpo com design cuidadoso para criar experiências que fazem sentido para os usuários.",
    "about.description2":
      "Além de programar, sou músico e gosto de trazer essa mesma mentalidade criativa para o meu trabalho, encontrando soluções originais e elegantes, em vez de apenas fazer as coisas. Atualmente, estou procurando oportunidades onde possa continuar crescendo e contribuir com produtos reais.",
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
    "contact.subtitle": "Sinta-se à vontade para entrar em contato!",
    "contact.getInTouch": "Informações de Contato",
    "contact.info": "Informações de Contato",
    "contact.location": "Localização",
    "contact.email": "Email",
    "contact.phone": "Telemóvel",
    "contact.name": "Nome",
    "contact.namePlaceholder": "Seu nome",
    "contact.emailPlaceholder": "seu.email@exemplo.com",
    "contact.subject": "Assunto",
    "contact.message": "Mensagem",
    "contact.messagePlaceholder": "Sua mensagem...",
    "contact.send": "Enviar Mensagem",
    "contact.downloadCV": "Baixar CV",
    "contact.success": "Mensagem enviada!",

    // Footer
    "footer.madeWith": "Feito com",
    "footer.and": "e",
    "footer.role": "Desenvolvedor Full-Stack",
    "footer.rights": "Todos os direitos reservados",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
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
