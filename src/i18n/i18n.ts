import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import vi from './locales/vi/translation.json';
import en from './locales/en/translation.json';

i18n
    .use(LanguageDetector) // 👈 tự lấy từ localStorage, navigator,...
    .use(initReactI18next)
    .init({
        resources: {
            vi: { translation: vi },
            en: { translation: en },
        },
        fallbackLng: 'vi', // fallback nếu không xác định được ngôn ngữ
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'], // ưu tiên lấy từ localStorage
            caches: ['localStorage'],             // lưu lại ngôn ngữ
        },
    });

export default i18n;