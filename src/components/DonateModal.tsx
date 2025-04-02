import React from "react";
import {Modal, QRCode} from 'antd';
import {useTranslation} from "react-i18next";

const modalStyles = {
    mask: {
        backdropFilter: 'blur(10px)',
    }
};
const DonateModal:React.FC<{
    visible: boolean;
    onCancel: () => void;
}> = ({visible, onCancel}) => {
    const {t} = useTranslation();

    return (
        <Modal
            title={t('donate')}
            centered
            open={visible}
            onCancel={onCancel}
            styles={modalStyles}
            footer={null}
        >
            <div className="flex flex-col items-center justify-center">
                <div className="text-center">
                    <p>{t('donateText_1')}</p>
                    <p>{t('donateText_2')}</p>
                </div>
                <div className="mt-4">
                    <QRCode
                        size={200}
                        value="https://qr.alipay.com/tsx15278hfeqs7n0whguacc"
                        icon="./public/static/alipay.svg"
                    />
                </div>
            </div>
        </Modal>
    )
}

export default DonateModal;