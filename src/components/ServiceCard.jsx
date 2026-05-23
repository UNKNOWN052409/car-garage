import { useRef } from 'react';
import gsap from 'gsap';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ icon, title, description }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -12,
      rotateX: -4,
      rotateY: 2,
      scale: 1.02,
      duration: 0.45,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power3.out'
    });
  };

  return (
    <article ref={cardRef} className={`${styles.serviceCard} glass-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.serviceIcon}>{icon}</div>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDescription}>{description}</p>
    </article>
  );
}
