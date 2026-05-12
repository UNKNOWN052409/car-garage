import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createLead } from '../utils/api';
import { CAR_BRANDS, PHONE_LINK, SERVICE_TYPES, TELEGRAM_URL, WHATSAPP_NUMBER } from '../utils/constants';
import styles from './Booking.module.css';

const initialForm = { brand: '', model: '', year: '', service: '', phone: '' };

export default function Booking() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialForm);
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const selectedIndex = SERVICE_TYPES.indexOf(formData.service);
  const selectedService = selectedIndex >= 0 ? t(`services.items.${selectedIndex}.title`) : '';
  const isReady = Boolean(formData.brand && formData.model && formData.year && formData.service && formData.phone);

  const whatsappUrl = useMemo(() => {
    const message = `Hi ADVANCED CAR WORKSHOP, I want to book service for ${formData.brand} ${formData.model} (${formData.year}). Service: ${selectedService || 'Not selected yet'}. My phone number is ${formData.phone || 'not entered yet'}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [formData.brand, formData.model, formData.year, formData.phone, selectedService, formData.service]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isReady) {
      setSubmitState({ status: 'error', message: 'Please fill all fields, including your phone number.' });
      return;
    }

    setSubmitState({ status: 'loading', message: 'Saving your request...' });

    try {
      await createLead({
        customerPhone: formData.phone,
        carBrand: formData.brand,
        carModel: formData.model,
        carYear: Number(formData.year),
        serviceKey: formData.service,
        serviceLabel: selectedService,
        source: 'booking_form'
      });

      setSubmitState({ status: 'success', message: 'Your request is saved. We can now follow up by SMS.' });
    } catch (error) {
      setSubmitState({ status: 'error', message: error.message });
    }
  };

  return (
    <section className={styles.booking} id="booking">
      <div className="container">
        <div className={styles.bookingLayout}>
          <div className={styles.bookingIntro}>
            <div className="section-kicker">Smart booking</div>
            <h2 className={styles.sectionTitle}>{t('booking.title', 'Book high-tech service in seconds')}</h2>
            <p className={styles.sectionSubtitle}>{t('booking.subtitle', 'Prepare your request with vehicle details, then save it instantly for callback and SMS follow-up.')}</p>
            <div className={styles.bookingStats}>
              <div><strong>Fast</strong><span>Response-first workflow</span></div>
              <div><strong>Live</strong><span>WhatsApp booking path</span></div>
              <div><strong>Direct</strong><span>Call and Telegram support</span></div>
            </div>
          </div>

          <form className={`${styles.bookingForm} glass-card`} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.formGroup}>
                <span>{t('booking.brand', 'Car Brand')}</span>
                <select name="brand" value={formData.brand} onChange={handleChange} className={styles.formField}>
                  <option value="">{t('booking.selectBrand', 'Select Brand')}</option>
                  {CAR_BRANDS.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </label>

              <label className={styles.formGroup}>
                <span>{t('booking.model', 'Model')}</span>
                <input name="model" value={formData.model} onChange={handleChange} placeholder={t('booking.modelPlaceholder', 'Enter model name')} className={styles.formField} />
              </label>

              <label className={styles.formGroup}>
                <span>{t('booking.year', 'Year')}</span>
                <input name="year" type="number" min="1990" max="2026" value={formData.year} onChange={handleChange} placeholder="2024" className={styles.formField} />
              </label>

              <label className={styles.formGroup}>
                <span>{t('booking.serviceType', 'Service Type')}</span>
                <select name="service" value={formData.service} onChange={handleChange} className={styles.formField}>
                  <option value="">{t('booking.selectService', 'Select Service')}</option>
                  {SERVICE_TYPES.map((service, index) => (
                    <option key={service} value={service}>{t(`services.items.${index}.title`)}</option>
                  ))}
                </select>
              </label>

              <label className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <span>Phone Number</span>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="9876543210" className={styles.formField} />
              </label>
            </div>

            <div className={styles.bookingOutput}>
              <p>{submitState.message || (isReady ? `Ready to save ${selectedService} for ${formData.brand} ${formData.model}.` : 'Fill the fields to save your request and unlock the fastest booking route.')}</p>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitState.status === 'loading'}>
                {submitState.status === 'loading' ? 'Saving...' : 'Save Request'}
              </button>
              <a href={PHONE_LINK} className={styles.btnGlass}>Call Now</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGlass}>WhatsApp Chat</a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.btnGlass}>Telegram</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
