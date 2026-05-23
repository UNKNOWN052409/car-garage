import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { useLenis } from './hooks/useLenis';

function App() {
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();

  useLenis();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <>
      <SpeedInsights />
      <CustomCursor />
      {loading && <LoadingScreen />}
      <Navbar onLanguageChange={changeLanguage} currentLanguage={i18n.language} />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Contact />
      </main>
    </>
  );
}

export default App;
