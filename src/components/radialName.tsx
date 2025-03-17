import React, {useState, useRef, useEffect} from "react";
import { useGlobalMenuItemStore } from "@/stores/store";
import {Input, Tooltip} from 'antd';
import type {InputRef} from "antd";
import {EditOutlined} from "@ant-design/icons";


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


    // 重点：使用 useEffect 监听编辑状态变化
    useEffect(() => {
        if (isNameEditing && h2NameRef.current) {
            // 先确保元素可编辑且已挂载
            h2NameRef.current.focus();  // 必须优先聚焦

            // 创建选区并全选文字
            const range = document.createRange();
            range.selectNodeContents(h2NameRef.current);  // 选中所有内容
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [isNameEditing]);

    const handleNameDbClick = () => {
        setNameEditing(true);
        if(!h2NameRef.current) return;

        // 创建选区并全选文字
        // const range = document.createRange();
        // range.selectNodeContents(h2NameRef.current); // 选中所有内容[2,3](@ref)
        // const selection = window.getSelection();
        // selection?.removeAllRanges();
        // selection?.addRange(range);

        h2NameRef.current.focus({
            preventScroll: true,
        });
    }

    const handleBlur = () => {
        setNameEditing(false);
        h2NameRef.current?.blur()
        console.log('保存内容:', h2NameRef.current?.textContent);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // 阻止默认换行
            handleBlur() // 手动触发失焦
        }
    };

    return (
        <div className="flex flex-col pt-6 pb-12">
                <div className="group flex gap-2 text-white items-baseline cursor-pointer" >
                    <Tooltip title={isNameEditing?null:"Double click for name editing"}>
                    <h2
                        ref={h2NameRef}
                        contentEditable={isNameEditing}
                        suppressContentEditableWarning
                        className={`text-4xl gabarito-bold border-b-1 ${isNameEditing?'border-b-neutral-500 outline-0':'border-transparent'}`}
                        onDoubleClick={handleNameDbClick}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                    >
                        {currentMenuItem.name}
                    </h2>
                    </Tooltip>
                    <EditOutlined className='opacity-0 group-hover:opacity-100' onClick={handleNameDbClick}/>
                </div>

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