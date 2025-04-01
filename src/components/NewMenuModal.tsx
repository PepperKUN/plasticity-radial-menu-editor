import React, {useMemo, useEffect, useState} from "react";
import {Form, Input, Modal, message, Upload, UploadProps, UploadFile, FormRule} from 'antd';
import {useGlobalMenuItemStore, useListItemStore} from "@/stores/store";
import {flatListItem, GlobalRadialMenuItem, RadialMenuItem} from "@/types/type";
import {InboxOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

const itemTemplate: RadialMenuItem[] = [
    { id: 'radMenu-151', label: 'Selection mode: set control-point', icon: 'selection-mode-set-control-point', command: 'selection:mode:set:control-point' },
    { id: 'radMenu-152', label: 'Selection mode: set edge', icon: 'selection-mode-set-edge', command: 'selection:mode:set:edge' },
    { id: 'radMenu-153', label: 'Selection mode: set face', icon: 'selection-mode-set-face', command: 'selection:mode:set:face' },
    { id: 'radMenu-154', label: 'Selection mode: set solid', icon: 'selection-mode-set-solid', command: 'selection:mode:set:solid' },
]

const modalStyles = {
    mask: {
        backdropFilter: 'blur(10px)',
    }
};


type FieldType = {
    name: string;
    command: string;
    items: RadialMenuItem[];
};

interface ModalFormProps {
    visible: boolean;              // 控制弹窗显示/隐藏
    onSubmit: (values: GlobalRadialMenuItem) => void; // 表单提交回调（传递表单数据给父组件）
    onCancel: () => void;          // 关闭弹窗回调
}

const NewMenuModal:React.FC<ModalFormProps> = ({visible, onCancel, onSubmit }) => {
    const {t} = useTranslation();
    const { globalMenuItems } = useGlobalMenuItemStore();
    const { listItems } = useListItemStore()
    const [form] = Form.useForm();
    const { Dragger } = Upload;
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleDataLoaded = (values: GlobalRadialMenuItem) => {
        const itemsWithId = values.items.reduce((acc,item) => {
            const targetCommand = flatData.find(data=>data.command===item.command)
            if(targetCommand&&(acc.findIndex(item=>item.command===targetCommand.command)<0)&&acc.length<12) {
                acc.push({
                    ...item,
                    id:`RadialMenu-${targetCommand.id}`
                })
            }
            return acc
        }, [] as RadialMenuItem[])
        form.setFieldsValue({
            name: values.name,
            command: values.command,
            items: itemsWithId
        });
    };

    const flatData: flatListItem[] = useMemo(() => listItems.flatMap((category) => category.items.map((item) => ({
            ...item,
            type: category.commandType,
        }))
    ),[listItems])

    const props: UploadProps = {
        accept:".radial.json, application/json",
        name: 'file',
        multiple: false,
        fileList: fileList,
        beforeUpload: async (file) => {
            try {
                const content = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result);
                    reader.onerror = (e) => reject(e);
                    reader.readAsText(file);
                });
                const parsedData = JSON.parse(content as string);
                // console.log('解析成功:', parsedData);
                handleDataLoaded(parsedData)
                messageApi.success(t('parsedSuccess'))
                setFileList([file])
                // 将数据存入状态（如 React 的 useState）
                // setLocalData(jsonData);
            } catch (error) {
                console.error(error)
                messageApi.error(t('parsedError'));
            }
            return false;
        },
    };

    const globalMenuList = useMemo(() => {
        return globalMenuItems.map(item => ({
            name: item.name,
            command: item.command,
        }))
    }, [globalMenuItems]);

    const validateMenuName = (_:FormRule, value: string) => {
        if (globalMenuList.some(item => item.name === value)) {
            return Promise.reject(t('menuNameError'));
        }
        return Promise.resolve();
    };

    const validateCommand = (_:FormRule, value: string) => {
        if (globalMenuList.some(item => item.command === value)) {
            return Promise.reject(t('menuCommandError'));
        }
        return Promise.resolve();
    };

    const handleOk = async() => {
        try {
            await form.validateFields(); // 先校验
            form.submit(); // 再提交
        } catch (error) {
            console.log('vaild failed', error);
        }
    }

    // 重置表单（打开弹窗或关闭时清理数据）
    useEffect(() => {
        if (visible) {
            setFileList([])
            form.resetFields();
        }
    }, [visible]);


    return (
        <Modal
            centered
            okText={t('ok')}
            cancelText={t('cancel')}
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            styles={modalStyles}
            title={t('modalTitle')}
        >
            {contextHolder}
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item<FieldType>
                    label={t('menuName')}
                    name="name"
                    rules={[
                        {required:true,message:t('menuNameMesg')},
                        {validator: validateMenuName},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label={t('menuCommand')}
                    name="command"
                    rules={[
                        {required:true,message:t('menuCommandMesg')},
                        {validator: validateCommand},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    name='items'
                    hidden
                    initialValue={itemTemplate}
                >
                    <Input hidden/>
                </Form.Item>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">{t('uploadHeader')}</p>
                    <p className="ant-upload-hint">{t('uploadParagraph')}</p>
                </Dragger>
            </Form>

        </Modal>
    )
}

export default NewMenuModal;