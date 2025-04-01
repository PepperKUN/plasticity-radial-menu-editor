import React, { useMemo, useState } from "react";
import {Segmented, Button, Space, Tooltip, message, Popconfirm} from 'antd';
import {PlusOutlined, DownloadOutlined, DeleteOutlined, WarningOutlined} from "@ant-design/icons";
import {GlobalRadialMenuItem} from "@/types/type";
import type {PopconfirmProps} from 'antd';
import NewMenuModal from "@/components/NewMenuModal.tsx";
import {useTranslation} from "react-i18next";


const Tabunit:React.FC<{
    index: number;
    label: string;
    onDelete: (index: number) => void;
}> = ({ label }) => {

    return (
        <Tooltip
            // title={
            // (<span
            //     className='flex gap-1 text-neutral-400 cursor-pointer hover:text-red-500'
            //     onClick={()=>onDelete(index)}
            // >
            //     <DeleteFilled />Delete</span>)}
            title={label}
            trigger='hover'
        >
            <span className={`py-1`}>{label}</span>
        </Tooltip>
    )
}

const TabTitle:React.FC< {
    index: number;
    globalItems: GlobalRadialMenuItem[];
    onSwitch: (index:number) => void;
    onItemsChange: (newItems: GlobalRadialMenuItem[]) => void;
}> = ({index, globalItems, onSwitch, onItemsChange}) => {

    const {t} = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleMenuDelete = (index:number) => {
        console.log('delete:',index)
        onItemsChange(globalItems.filter((_, idx:number) => idx !== index));
    }

    const globalItemsOnlyName = useMemo(() => globalItems.map(item => item.name), [globalItems])

    const segmentOptions = useMemo(() => {
        return globalItems.map((item, idx) => ({
            value: item.name,
            label: (
                <Tabunit
                    index={idx}
                    label={item.name}
                    onDelete={handleMenuDelete}
                />
            ),
        }))
    }, [globalItems.length, globalItemsOnlyName])


    const handleMenuSwitch = (value: string) => {
        const tempIndex = segmentOptions.findIndex(option => option.value === value);
        onSwitch(tempIndex);
    }

    const handleAdd = () => {


        setModalOpen(true);
    }

    const handleExport = () => {

        const currentRadialMenuData = {
            name: globalItems[index].name,
            command: globalItems[index].command,
            items: globalItems[index].items.map(item => ({
                command: item.command,
                icon: item.icon,
                label: t(item.label),
            }))
        }

        try {
            const jsonString = JSON.stringify(currentRadialMenuData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${globalItems[index].name}.radial.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('导出 JSON 失败:', error);
        }
    }

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        handleMenuDelete(index);
        console.log(e);
        messageApi.success('Radial menu has been removed');
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };

    const handleSubmit = async (item:GlobalRadialMenuItem) => {
        console.log(item);
        setModalOpen(false);
        const copyGlobalItems = globalItems.slice()
        copyGlobalItems.splice(index+1, 0, item)
        onItemsChange(copyGlobalItems)
    }

    return (
        <div className="p-6 flex justify-between items-center gap-4">
            <NewMenuModal visible={isModalOpen} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)}/>
            <Segmented
                value={segmentOptions[index].value}
                size="large"
                options={segmentOptions}
                onChange={handleMenuSwitch}
                className='select-none gabarito-regular'
            />
            {contextHolder}
            <Space.Compact size="large">
                <Popconfirm
                    icon={<WarningOutlined />}
                    title="Delete the Menu"
                    description="Are you sure to delete this Menu?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button disabled={segmentOptions.length<2} icon={<DeleteOutlined/>}/>
                </Popconfirm>
                <Button type="default" onClick={handleAdd} icon={<PlusOutlined/>}/>
                <Button type='primary' onClick={handleExport} icon={<DownloadOutlined />}/>
            </Space.Compact>
        </div>
    )
}

export default TabTitle;