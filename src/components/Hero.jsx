import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const copyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        copyRef.current.children,
        { opacity: 0, y: 40, filter: 'blur(18px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 18, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.35
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={styles.heroBg}>
        <div className={styles.mesh}></div>
        <div className={`${styles.orb} ${styles.orbLeft}`}></div>
        <div className={`${styles.orb} ${styles.orbRight}`}></div>
      </div>

      <div className="container">
        <div className={styles.heroGrid}>
          <div ref={copyRef} className={styles.heroCopy}>
            <div className="section-kicker">Future-ready automotive care</div>
            <p className={styles.heroEyebrow}>{t('hero.badge')}</p>
            <h1 className={styles.heroTitle}>
              <span>{t('hero.title1')}</span>
              <span>{t('hero.title2')}</span>
            </h1>
            <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            <div className={styles.heroMeta}>
              <span>4-Wheeler Systems</span>
              <span>One Call Away</span>
              <span>High-tech Workshop</span>
            </div>
            <div ref={ctaRef} className={styles.heroCta}>
              <a href="tel:+919834756711" className={styles.btnPrimary}>{t('cta.call')}</a>
              <a href="https://wa.me/919834756711" className={styles.btnGlass} target="_blank" rel="noopener noreferrer">{t('cta.whatsapp')}</a>
              <a href="#booking" className={styles.btnGlass}>{t('cta.book', 'Book Service')}</a>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={`${styles.infoCard} glass-card`}>
              <span className={styles.cardLabel}>Workshop stack</span>
              <strong>Diagnostics, repairs, towing, insurance support and direct one-call service.</strong>
            </div>
            <div className={`${styles.infoCard} glass-card`}>
              <span className={styles.cardLabel}>Design system</span>
              <strong>Layered deep grays, frosted glass, smooth motion, and premium monochrome contrast.</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine}></div>
        <span>{t('hero.scroll', 'SCROLL TO EXPLORE')}</span>
      </div>
    </section>
  );
}
