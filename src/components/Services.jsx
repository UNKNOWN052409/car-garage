import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from './ServiceCard';
import { SERVICES } from '../utils/constants';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, filter: 'blur(14px)', scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.services} id="services">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="section-kicker">Workshop systems</div>
          <h2 className={styles.sectionTitle}>{t('services.title')}</h2>
          <p className={styles.sectionSubtitle}>{t('services.subtitle', 'Precision maintenance, diagnostics, insurance support, and rescue services inside a future-ready service stack.')}</p>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES.map((service, index) => (
            <div key={service.id} ref={(el) => (cardsRef.current[index] = el)}>
              <ServiceCard
                icon={service.icon}
                title={t(`services.items.${index}.title`)}
                description={t(`services.items.${index}.desc`)}
              />
            </div>
          ))}
        </div>

        <div className={styles.servicesFooter}>
          <div className={styles.footerHighlight}>
            <div className={styles.highlightIcon}>✓</div>
            <div>
              <h4>{t('services.spare.title')}</h4>
              <p>{t('services.spare.desc')}</p>
            </div>
          </div>
          <div className={styles.footerHighlight}>
            <div className={styles.highlightIcon}>⚡</div>
            <div>
              <h4>{t('services.oncall.title')}</h4>
              <p>{t('services.oncall.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
