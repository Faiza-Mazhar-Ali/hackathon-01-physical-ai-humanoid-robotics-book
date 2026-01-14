import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ur' | 'sd';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: Partial<Record<Language, string>>, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (translations: Partial<Record<Language, string>>, defaultText?: string) => {
    return translations[language] || defaultText || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};