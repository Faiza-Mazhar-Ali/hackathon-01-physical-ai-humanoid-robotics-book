import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <LanguageProvider>
      <Layout
        title={`Welcome to ${siteConfig.title}`}
        description="Physical AI & Humanoid Robotics - Advanced concepts in embodied artificial intelligence">
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </LanguageProvider>
  );
}
