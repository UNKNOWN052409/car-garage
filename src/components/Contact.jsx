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
              <a href="https://www.google.com/maps/place/ADVANCE+CAR+REPAIR+AND+SERVICE/@20.1860526,79.9771726,17z/data=!3m1!4b1!4m6!3m5!1s0x3a2cfbf5756427a9:0x9fa0fc78d69a01b2!8m2!3d20.1860526!4d79.9797475!16s%2Fg%2F11n99qkf91!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D" className={`${styles.contactMethod} glass-card`} target="_blank" rel="noopener noreferrer">
                <div className={styles.methodLabel}>Location</div>
                <div className={styles.methodValue}>View on Map</div>
              </a>
            </div>
          </div>

          <div className={styles.contactSide}>
            <div className={`${styles.mapCard} glass-card`}>
              <iframe
                title="ADVANCED CAR WORKSHOP map"
                src="https://maps.google.com/maps?q=20.1860526,79.9797475&hl=en&z=17&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps/place/ADVANCE+CAR+REPAIR+AND+SERVICE/@20.1860526,79.9771726,17z/data=!3m1!4b1!4m6!3m5!1s0x3a2cfbf5756427a9:0x9fa0fc78d69a01b2!8m2!3d20.1860526!4d79.9797475!16s%2Fg%2F11n99qkf91!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
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
