import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ur', label: 'اردو' },
    { code: 'sd', label: 'سنڌي' },
  ];

  return (
    <div className={styles.languageSwitcher}>
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value as 'en' | 'ur' | 'sd')}
        className={styles.select}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;