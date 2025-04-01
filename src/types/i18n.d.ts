import 'i18next';
import enTranslation from '../public/locales/translation_en.json';
import zhTranslation from '../public/locales/translation_zh.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: typeof enTranslation & typeof zhTranslation;
        };
    }
}