import React, {useState, useRef, useEffect} from "react";
import { useGlobalMenuItemStore } from "@/stores/store";
import {Tooltip} from 'antd';
import {EditOutlined} from "@ant-design/icons";

const EditableText:React.FC<{
    indexes: number[];
    publicClassNames: string;
    editableClassNames: string;
    normalClassNames: string;
    keyStr: 'name'|'label'|'command';
}> = ({indexes, publicClassNames, editableClassNames, normalClassNames, keyStr}) => {

    const divRef = useRef<HTMLDivElement>(null);
    const { globalMenuItems, setGlobalMenuItems } = useGlobalMenuItemStore();
    const [isEditing, setEditing] = useState(false);
    // if(indexs.length > 0) return;
    const currentMenuItem = indexes.length>1?globalMenuItems[indexes[0]].items[indexes[1]]:globalMenuItems[indexes[0]]

    const showText = currentMenuItem[keyStr] as string;

    // 重点：使用 useEffect 监听编辑状态变化
    useEffect(() => {
        if (isEditing && divRef.current && divRef.current.contentEditable) {
            // 先确保元素可编辑且已挂载
            divRef.current.focus();  // 必须优先聚焦
            // 创建选区并全选文字
            const range = document.createRange();
            range.selectNodeContents(divRef.current);  // 选中所有内容
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [isEditing]);

    const handleNameDbClick = () => {
        setEditing(true);
        if(!divRef.current) return;

        divRef.current.focus({
            preventScroll: true,
        });
    }

    const handleBlur = () => {
        setEditing(false);
        divRef.current?.blur()
        console.log('保存内容:', divRef.current?.textContent);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // 阻止默认换行
            handleBlur() // 手动触发失焦
        }
    };

    return (
        <div className='group flex gap-2 text-white items-baseline cursor-pointer' ref={divRef} >
            <Tooltip title={isEditing?null:"Double click for name editing"}>
                <div
                    ref={divRef}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    className={`${publicClassNames} ${isEditing?editableClassNames:normalClassNames}`}
                    onDoubleClick={handleNameDbClick}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                >
                    {showText}
                </div>
            </Tooltip>
            <EditOutlined className='opacity-0 group-hover:opacity-100' onClick={handleNameDbClick}/>
        </div>
    )
}

export default EditableText;