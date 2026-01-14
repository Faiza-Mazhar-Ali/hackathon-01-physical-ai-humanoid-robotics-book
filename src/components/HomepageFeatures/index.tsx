import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import FeatureCard from '../FeatureCard';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './styles.module.css';

export default function HomepageFeatures(): ReactNode {
  const { t } = useLanguage();

  return (
    <section>
      {/* Hero Section */}
      <div className="hero">
        <LanguageSwitcher />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <Heading as="h1" className="hero__title">
                {t({
                  en: 'Physical AI & Humanoid Robotics',
                  ur: 'فزکل ای آئی اور ہیومنوائڈ روبوٹکس',
                  sd: 'فزڪل ای آءِ ۽ ھیومنوائڊ روبوٽس'
                })}
              </Heading>
              <p className="hero__subtitle">
                {t({
                  en: 'Advanced concepts in embodied artificial intelligence',
                  ur: 'مادی مصنوعی ذہانت میں اعلیٰ تصورات',
                  sd: ' embodڊ ٿيل مصنوعي ھوشياري ۾ اعلو تصورات'
                })}
              </p>
              <div className={styles.buttons}>
                <Link className="button button--primary button--lg button--cta" to="/docs/intro">
                  {t({
                    en: '📘 Read Book',
                    ur: ' 📖 کتاب پڑھیں',
                    sd: ' 📖 ڪتاب پڙهو'
                  })}
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.robotImage}>
                <div className={styles.robotSilhouette}>
                  <div className={styles.robotArmLeft}></div>
                  <div className={styles.robotArmRight}></div>
                  <div className={styles.robotLegLeft}></div>
                  <div className={styles.robotLegRight}></div>
                  <div className={styles.robotBrain}></div>
                  <div className={styles.robotReflection}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features/Learning Outcomes Section */}
      <div className="course-overview">
        <div className="container">
          <Heading as="h2" className="course-overview__title">
            {t({
              en: 'Foundational Disciplines',
              ur: 'بنیادی مضامین',
              sd: 'بنيادی مضامين'
            })}
          </Heading>
          <p className={styles.description}>
            {t({
              en: 'Advanced theoretical frameworks and computational methodologies in embodied intelligence',
              ur: 'مادی ذہانت میں اعلیٰ نظریاتی چوکھٹیں اور حسابی میتھڈولوجیز',
              sd: ' embodڊ ٿيل ھوشياري ۾ اعلو نظرياتي ڍانچو ۽ حسابياتي ميٿوڊولوڄيز'
            })}
          </p>
          
          <div className="features-container">
            <FeatureCard
              icon="🧠"
              translations={{
                en: { 
                  title: 'Embodied Intelligence Theory', 
                  description: 'Computational frameworks for intelligence emerging from physical interaction with the environment.' 
                },
                ur: { 
                  title: 'مادی ذہانت کا نظریہ', 
                  description: 'ماحول کے ساتھ جسمانی تعامل سے نکلنے والی ذہانت کے لیے حسابی چوکھٹیں۔' 
                },
                sd: { 
                  title: ' embodڊ ٿيل ھوشياري جو نظريو', 
                  description: 'ماحول سان جسماني تعامل مان اڀرندڙ ھوشياري لاءِ حساباتي ڍانچا.' 
                }
              }}
            />
            
            <FeatureCard
              icon="🤖"
              translations={{
                en: { 
                  title: 'Morphic Design Principles', 
                  description: 'Biomechanical and morphological computation in anthropomorphic robotic systems.' 
                },
                ur: { 
                  title: 'مسحوری ڈیزائن کے اصول', 
                  description: 'انسان نما روبوٹک نظاموں میں حیاتیاتی اور مورفولوجیکل حساب کتاب۔' 
                },
                sd: { 
                  title: ' مورفڪ ڊيزائن جا اصول', 
                  description: 'انساني نما روبوٽي نظامن ۾ حيويات ۽ مورفولوڄيڪل حساب.' 
                }
              }}
            />
            
            <FeatureCard
              icon="⚙️"
              translations={{
                en: { 
                  title: 'Dynamical Systems Control', 
                  description: 'Nonlinear control theory and adaptive algorithms for complex robotic dynamics.' 
                },
                ur: { 
                  title: 'متحرک نظام کا کنٹرول', 
                  description: 'پیچیدہ روبوٹک متحرکات کے لیے غیر لکیری کنٹرول کا نظریہ اور موافق الگورتھم۔' 
                },
                sd: { 
                  title: ' ڊينامڪل سسٽم ڪنٽرول', 
                  description: 'پيچيда روبوٽي ڊينامڪس لاءِ غير لينيئر ڪنٽرول ٿيory ۽ موافق الگورٿم.' 
                }
              }}
            />
            
            <FeatureCard
              icon="🔬"
              translations={{
                en: { 
                  title: 'Perceptual Sensory Integration', 
                  description: 'Multimodal sensor fusion and real-time environmental perception algorithms.' 
                },
                ur: { 
                  title: 'ادراکی حسی یکجہتی', 
                  description: 'ملٹی ماڈل سینسر فیوژن اور حقیقی وقت کے ماحولی ادراک الگورتھم۔' 
                },
                sd: { 
                  title: 'ادراڪي حسي ٺاھ', 
                  description: 'مलٽي ماڊل سينسر فيوژن ۽ حقيقي وقت جو ماحول ادراڪ الگورٿم.' 
                }
              }}
            />
            
            <FeatureCard
              icon="🌐"
              translations={{
                en: { 
                  title: 'Morphological Computation', 
                  description: 'Physical computation through body-environment interaction and morphological properties.' 
                },
                ur: { 
                  title: 'شکل بندی کا حساب', 
                  description: 'جسم-ماحول کے تعامل اور مورفولوجیکل خصوصیات کے ذریعے جسمانی حساب کتاب۔' 
                },
                sd: { 
                  title: ' مورفولوڄيڪل حساب', 
                  description: 'جسم-ماحول جي تعامل ۽ مورفولوڄيڪل خصوصيتن ذريعي جسماني حساب.' 
                }
              }}
            />
            
            <FeatureCard
              icon="🧪"
              translations={{
                en: { 
                  title: 'Embodied Learning Paradigms', 
                  description: 'Self-organizing and adaptive learning in physical robotic agents.' 
                },
                ur: { 
                  title: 'مادی سیکھنے کے طریقے', 
                  description: 'جسمانی روبوٹک ایجنٹوں میں خود سے منظم ہونے اور موافق سیکھنا۔' 
                },
                sd: { 
                  title: ' embodڊ ٿيل سکھڻ جا طريقي', 
                  description: 'جسماني روبوٽي ايجنٽن ۾ خود-تنظيم ۽ موافق سکھڻ.' 
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <div className="container">
          <Heading as="h2">
            {t({
              en: 'Ready to explore Physical AI & Humanoid Robotics?',
              ur: 'کیا آپ فزکل ای آئی اور ہیومنوائڈ روبوٹکس کا جائزہ لینے کے لیے تیار ہیں؟',
              sd: 'ڇا توهان فيزيڪل ای آءِ ۽ ھیومنوائڊ روبوٽس بابت ڄاڻ حاصل ڪرڻ لاءِ تيار آهيو؟'
            })}
          </Heading>
          <p>
            {t({
              en: 'Start your journey into the future of robotics and AI with our comprehensive course materials.',
              ur: 'ہماری جامع کورس سامگری کے ساتھ روبوٹکس اور ای آئی کے مستقبل میں اپنی سفر شروع کریں۔',
              sd: 'روبوٽس ۽ ای آءِ جي مستقبل ۾ پنھنجو سفر شروع ڪريو اسان جي جامع ڪورس سامان سان.'
            })}
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg button--cta" to="/docs/intro">
              {t({
                en: '📘 Read Book',
                ur: ' 📖 کتاب پڑھیں',
                sd: ' 📖 ڪتاب پڙهو'
              })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}