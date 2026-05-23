import { useTranslation } from 'react-i18next';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    rating: 5,
    author: 'Rajesh Kumar',
    title: 'Honda City Owner',
    avatar: 'R'
  },
  {
    rating: 5,
    author: 'Priya Sharma',
    title: 'Maruti Swift Owner',
    avatar: 'P'
  },
  {
    rating: 5,
    author: 'Amit Patel',
    title: 'Hyundai Creta Owner',
    avatar: 'A'
  }
];

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{t('testimonials.label', 'TESTIMONIALS')}</span>
          <h2 className={styles.sectionTitle}>{t('testimonials.title', 'What Our Clients Say')}</h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${styles.testimonialCard} glass-card`}>
              <div className={styles.rating}>{'★'.repeat(testimonial.rating)}</div>
              <p className={styles.testimonialText}>
                {t(`testimonials.items.${index}.text`, `Testimonial ${index + 1}`)}
              </p>
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorTitle}>{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}