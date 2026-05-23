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
              <a href="https://maps.app.goo.gl/nsE5ZBVXpy8wbUxo8" className={`${styles.contactMethod} glass-card`} target="_blank" rel="noopener noreferrer">
                <div className={styles.methodLabel}>Location</div>
                <div className={styles.methodValue}>View on Map</div>
              </a>
            </div>
          </div>

          <div className={styles.contactSide}>
            <div className={`${styles.mapCard} glass-card`}>
              <iframe
                title="ADVANCED CAR WORKSHOP map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.app.goo.gl/nsE5ZBVXpy8wbUxo8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOverlayLink}
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>

        <a href="https://wa.me/919834756711" className={styles.floatingWhatsapp} target="_blank" rel="noopener noreferrer">WA</a>
      </div>
    </section>
  );
}
