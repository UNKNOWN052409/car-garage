import { useState } from 'react';
import styles from './Car3D.module.css';

export default function Car3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.scene} ${hovered ? styles.sceneHovered : ''}`}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.glowBlue}></div>
      <div className={styles.glowRed}></div>
      <div className={styles.platform}></div>
      <div className={styles.hudRing}></div>
      <div className={styles.hudRingInner}></div>
      <div className={styles.car3d}>
        <div className={styles.body}></div>
        <div className={styles.bodyPanel}></div>
        <div className={styles.sideBlade}></div>
        <div className={styles.cabin}></div>
        <div className={styles.roofLine}></div>
        <div className={styles.windshield}></div>
        <div className={styles.sideWindow}></div>
        <div className={styles.mirror}></div>
        <div className={styles.frontSplit}></div>
        <div className={styles.rearDiffuser}></div>
        <div className={styles.lightFront}></div>
        <div className={styles.lightRear}></div>
        <div className={styles.headlightGlow}></div>
        <div className={styles.taillightGlow}></div>
        <div className={`${styles.wheel} ${styles.wheelFront}`}><span className={styles.wheelCore}></span></div>
        <div className={`${styles.wheel} ${styles.wheelBack}`}><span className={styles.wheelCore}></span></div>
        <div className={styles.rimLine}></div>
        <div className={styles.shadowTrail}></div>
      </div>
    </div>
  );
}
