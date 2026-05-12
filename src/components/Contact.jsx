import { useTranslation } from 'react-i18next';
import { TELEGRAM_URL } from '../utils/constants';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <div className={styles.contactLayout}>
          <div className={styles.contactInfo}>
            <div className="section-kicker">Contact system</div>
            <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
            <p className={styles.contactDescription}>{t('contact.description')}</p>

            <div className={styles.contactMethods}>
              <a href="tel:+919834756711" className={`${styles.contactMethod} glass-card`}>
                <div className={styles.methodLabel}>{t('contact.phone.label')}</div>
                <div className={styles.methodValue}>+91 98347 56711</div>
              </a>
              <a href="https://wa.me/919834756711" className={`${styles.contactMethod} glass-card`} target="_blank" rel="noopener noreferrer">
                <div className={styles.methodLabel}>{t('contact.whatsapp.label')}</div>
                <div className={styles.methodValue}>{t('contact.whatsapp.value')}</div>
              </a>
              <a href={TELEGRAM_URL} className={`${styles.contactMethod} glass-card`} target="_blank" rel="noopener noreferrer">
                <div className={styles.methodLabel}>Telegram</div>
                <div className={styles.methodValue}>Open Support</div>
              </a>
            </div>
          </div>

          <div className={styles.contactSide}>
            <div className={`${styles.mapCard} glass-card`}>
              <iframe
                title="ADVANCED CAR WORKSHOP map"
                src="https://www.google.com/maps?q=Advanced%20Car%20Workshop&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <a href="https://wa.me/919834756711" className={styles.floatingWhatsapp} target="_blank" rel="noopener noreferrer">WA</a>
      </div>
    </section>
  );
}
