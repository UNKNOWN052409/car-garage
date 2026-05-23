import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span className={styles.logoText}>ADVANCED GARAGE</span>
            </div>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>

          <div className={styles.footerLinks}>
            <a href="#services">{t('nav.services', 'Services')}</a>
            <a href="#booking">{t('nav.booking', 'Book Now')}</a>
            <a href="#contact">{t('nav.contact', 'Contact')}</a>
          </div>

          <div className={styles.footerContact}>
            <p>{t('footer.copyright')}</p>
            <p>
              <span>{t('footer.phone')}</span>{' '}
              <a href="tel:+919834756711">+91 98347 56711</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}