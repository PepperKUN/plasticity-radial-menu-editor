import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false, // React 已经做了 XSS 防护
        },
        backend: {
            loadPath: '/plasticity-radial-menu-editor/locales/translation_{{lng}}.json',
        },
        // 添加这些配置以减少警告
        saveMissing: false, // 禁用缺失键保存
        missingKeyHandler: false, // 禁用缺失键处理器
        parseMissingKeyHandler: (key) => {
            console.warn(`Missing translation key: ${key}`);
            return key; // 直接返回键名而不是显示missing
        }
    });

export default i18n;