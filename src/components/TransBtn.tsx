import React from 'react';
import { useTranslation } from 'react-i18next';

const TransBtn:React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('zh')}>中文</button>
        </div>
    );
}

export default TransBtn;
