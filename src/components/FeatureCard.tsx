import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './FeatureCard.module.css';

type FeatureItem = {
  title: string;
  description: string;
  icon?: string;
  to?: string;
  translations: {
    en: { title: string; description: string };
    ur: { title: string; description: string };
    sd: { title: string; description: string };
  };
};

const FeatureCard: React.FC<FeatureItem> = ({
  icon,
  to,
  translations
}) => {
  const { t } = useLanguage();

  const content = (
    <>
      <div className={styles.iconContainer}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
      </div>
      <Heading as="h3" className={styles.featureTitle}>
        {t({
          en: translations.en.title,
          ur: translations.ur.title,
          sd: translations.sd.title
        })}
      </Heading>
      <p className={styles.featureDescription}>
        {t({
          en: translations.en.description,
          ur: translations.ur.description,
          sd: translations.sd.description
        })}
      </p>
    </>
  );

  return (
    <div className={clsx('feature-card', styles.featureCard)}>
      {to ? (
        <Link to={to} className={styles.link}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

export default FeatureCard;