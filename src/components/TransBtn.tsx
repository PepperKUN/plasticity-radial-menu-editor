import React, {useEffect} from 'react';
import { Button } from 'antd';
import {GithubOutlined, TranslationOutlined} from "@ant-design/icons"
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";

const TransBtn:React.FC = () => {
    const { t, i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const changeLanguage = (lng: 'en'|'zh') => {
        searchParams.set('lang', lng);
        setSearchParams(searchParams)
        i18n.changeLanguage(lng);
    };

    const handleLangTrans = () => {
        if(searchParams.get('lang')=='zh') changeLanguage('en')
        else changeLanguage('zh')
    }

    useEffect(() => {
        if (searchParams.get('lang')=='zh') changeLanguage('zh')
        else changeLanguage('en')
    }, [searchParams])

    return (
        <>
            <Button icon={<GithubOutlined />} href='https://github.com/PepperKUN/plasticity-radial-menu-editor' target='_blank'>Github</Button>
            <Button icon={<TranslationOutlined />} onClick={handleLangTrans}>{t('lng')}</Button>
        </>
    );
}

export default TransBtn;
