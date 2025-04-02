import React, {useEffect, useState} from 'react';
import { Button, Space, Tooltip } from 'antd';
import {GithubOutlined, TranslationOutlined, CoffeeOutlined} from "@ant-design/icons"
import { useTranslation } from 'react-i18next';
import { useSearchParams } from "react-router-dom";
import DonateModal from "@/components/DonateModal.tsx";

const TransBtn:React.FC = () => {
    const { t, i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [donateOpen, setDonateOpen] = useState(false)

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
            <DonateModal visible={donateOpen} onCancel={()=>setDonateOpen(false)}/>
            <Space.Compact>
                <Tooltip title="Github">
                    <Button icon={<GithubOutlined />} href='https://github.com/PepperKUN/plasticity-radial-menu-editor' target='_blank'/>
                </Tooltip>
                <Button icon={<CoffeeOutlined />} onClick={()=>setDonateOpen(true)}>{t('donate')}</Button>
            </Space.Compact>
            <Button icon={<TranslationOutlined />} onClick={handleLangTrans}>{t('lng')}</Button>
        </>
    );
}

export default TransBtn;
