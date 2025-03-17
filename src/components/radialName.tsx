import React, {useState, useRef, useEffect} from "react";
import { useGlobalMenuItemStore } from "@/stores/store";
import {Input, Tooltip} from 'antd';
import type {InputRef} from "antd";
import {EditOutlined} from "@ant-design/icons";
import EditableText from "@/components/editableText.tsx";


const RadialMenuName:React.FC<{
    index: number;
}> = ({index}) => {

    const { globalMenuItems, setGlobalMenuItems } = useGlobalMenuItemStore();
    const currentMenuItem = globalMenuItems[index];

    const h2NameRef = useRef<HTMLHeadingElement>(null);
    const inputNameRef = useRef<InputRef>(null);
    const inputCommandRef = useRef<InputRef>(null);
    const [isNameEditing, setNameEditing] = useState(false);
    const [menuName, setMenuName] = useState(currentMenuItem.name)
    const [isCommandEditing, setCommandEditing] = useState(false);
    const [command, setCommand] = useState(currentMenuItem.command)

    return (
        <div className="flex flex-col pt-6 pb-12">
            <EditableText
                keyStr='name'
                indexes={[index]}
                publicClassNames='text-4xl gabarito-bold border-b-1'
                editableClassNames='border-b-neutral-500 outline-0'
                normalClassNames='border-transparent'
            />

            <Tooltip title="Double click for command editing" placement="bottom">
                <div className="flex gap-2 text-neutral-400 items-baseline cursor-pointer">
                    <h4 className='gabarito-regular text-lg'>{currentMenuItem.command}</h4>
                    <EditOutlined />
                </div>
            </Tooltip>
        </div>
    )
}

export default RadialMenuName;