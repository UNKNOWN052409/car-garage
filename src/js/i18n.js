import translations from '../locales/translations.json';

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translations = translations;
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updatePageContent();
  }

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  updatePageContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;

    // Trigger custom event for dynamic content updates
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
  }
}

export default new I18n();