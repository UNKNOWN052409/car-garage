import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const updatePosition = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);

    const bindHoverTargets = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((element) => {
        element.addEventListener('mouseenter', enter);
        element.addEventListener('mouseleave', leave);
      });
    };

    bindHoverTargets();
    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.querySelectorAll('a, button, [role="button"]').forEach((element) => {
        element.removeEventListener('mouseenter', enter);
        element.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  if (window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <div className={`${styles.cursor} ${isHovering ? styles.hovering : ''}`} style={{ left: position.x, top: position.y }} />
      <div className={`${styles.cursorFollower} ${isHovering ? styles.hovering : ''}`} style={{ left: position.x, top: position.y }} />
    </>
  );
}
