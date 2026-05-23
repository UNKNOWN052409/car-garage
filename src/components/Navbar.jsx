import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

export default function Navbar({ onLanguageChange, currentLanguage }) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.navContent}>
          <button className={styles.logo} onClick={() => scrollToSection('hero')}>
            <span className={styles.logoMark}></span>
            <span>
              <strong>ADVANCED</strong>
              <small>CAR WORKSHOP</small>
            </span>
          </button>

          <div className={styles.navLinks}>
            <button onClick={() => scrollToSection('services')} className={styles.navLink}>{t('nav.services', 'Services')}</button>
            <button onClick={() => scrollToSection('booking')} className={styles.navLink}>{t('nav.booking', 'Booking')}</button>
            <button onClick={() => scrollToSection('contact')} className={styles.navLink}>{t('nav.contact', 'Contact')}</button>
          </div>

          <div className={styles.navRight}>
            <div className={styles.languageSwitcher}>
              <button className={`${styles.langBtn} ${currentLanguage === 'en' ? styles.active : ''}`} onClick={() => onLanguageChange('en')}>EN</button>
              <button className={`${styles.langBtn} ${currentLanguage === 'hi' ? styles.active : ''}`} onClick={() => onLanguageChange('hi')}>हिं</button>
              <button className={`${styles.langBtn} ${currentLanguage === 'mr' ? styles.active : ''}`} onClick={() => onLanguageChange('mr')}>मर</button>
            </div>
            <a href="tel:+919834756711" className={styles.navCta}>{t('cta.call', 'Call Now')}</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
