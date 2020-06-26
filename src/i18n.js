import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//import translationEN from './locales/en/translation.json';
//import translationRU from './locales/ru/translation.json';
const availableLanguages = ['ru', 'en'];

/*
const resources = {
  ru: {
    translation: translationRU
  },
  en: {
    translation: translationEN
  },
};

const options = {
  // order and from where user language should be detected
  //order: ['querystring', 'localStorage', 'navigator', 'htmlTag', 'path'],

  lookupQuerystring: 'lng',
 // lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  //cookieMinutes: 10,
  //cookieDomain: 'myDomain',
  //cookieSecure: true,
  //cookieOptions: {path:'/'},
  //cookieSameSiteStatus: 'Lax',
  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true
}
*/
i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step
  .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({

    debug: false,
   // whitelist: availableLanguages,
  //  detection: options,
    fallbackLng: 'ru', 

    interpolation: {
      escapeValue: false
    },
  });

export default i18n;