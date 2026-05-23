import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { useLenis } from './hooks/useLenis';

function App() {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useLenis();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <>
      <CustomCursor />
      {loading && <LoadingScreen />}
      <Navbar onLanguageChange={changeLanguage} currentLanguage={i18n.language} />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}

export default App;
