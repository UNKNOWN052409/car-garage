import { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadingScreen.module.css';

const Gear = forwardRef(function Gear({ className, teeth = 10 }, ref) {
  return (
    <div ref={ref} className={`${styles.gear} ${className}`}>
      {Array.from({ length: teeth }).map((_, index) => (
        <span
          key={index}
          className={styles.tooth}
          style={{ transform: `translate(-50%, -50%) rotate(${index * (360 / teeth)}deg)` }}
        />
      ))}
      <span className={styles.gearInner}></span>
    </div>
  );
});

export default function LoadingScreen() {
  const loadingRef = useRef(null);
  const largeGearRef = useRef(null);
  const mediumGearRef = useRef(null);
  const smallGearRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, filter: 'blur(12px)', y: 18 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      gsap.to(largeGearRef.current, { rotate: 360, duration: 4.4, ease: 'none', repeat: -1 });
      gsap.to(mediumGearRef.current, { rotate: -360, duration: 3.8, ease: 'none', repeat: -1 });
      gsap.to(smallGearRef.current, { rotate: 360, duration: 5.2, ease: 'none', repeat: -1 });

      gsap.to(loadingRef.current, {
        opacity: 0,
        scale: 1.06,
        filter: 'blur(18px)',
        delay: 2.2,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }, loadingRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={loadingRef} className={styles.loadingScreen}>
      <div className={styles.loadingAura}></div>
      <div className={styles.loadingContent}>
        <div className={styles.gearField}>
          <Gear ref={largeGearRef} className={styles.gearLarge} teeth={12} />
          <Gear ref={mediumGearRef} className={styles.gearMedium} teeth={10} />
          <Gear ref={smallGearRef} className={styles.gearSmall} teeth={8} />
        </div>
        <div ref={textRef} className={styles.loadingTextWrap}>
          <p className={styles.loadingKicker}>Boot sequence</p>
          <h2 className={styles.loadingText}>Initializing Garage Systems…</h2>
        </div>
      </div>
    </div>
  );
}
