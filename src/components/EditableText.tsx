import React, {useState, useRef, useEffect} from "react";
import { useGlobalMenuItemStore } from "@/stores/store";
import {Tooltip} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {GlobalRadialMenuItem, strictTuple} from "@/types/type";
import {TooltipPlacement} from "antd/es/tooltip";
import {useTranslation} from "react-i18next";


type keyNames = "name" | "label" | "command";

interface updateParams {
    newValue: string;
    indexes: strictTuple;
    keyStr: keyNames;
}
export const EditableText:React.FC<{
    indexes: strictTuple;
    publicClassNames: string;
    editableClassNames: string;
    normalClassNames: string;
    keyStr: keyNames;
    className?: string;
    tooltipPlacement?: TooltipPlacement
}> = ({indexes, publicClassNames, editableClassNames, normalClassNames, keyStr, className, tooltipPlacement}) => {

    const { t } = useTranslation();
    const divRef = useRef<HTMLDivElement>(null);
    const { globalMenuItems, setGlobalMenuItems } = useGlobalMenuItemStore();
    const [isEditing, setEditing] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const getProperty = (globalItems:GlobalRadialMenuItem[], indexes:strictTuple, keyStr:'name'|'label'|'command'):string => {
        if (indexes[1]) {
            // 处理 RadialMenuItem 的 label
            const [globalIndex, itemId] = indexes;
            const globalItem = globalItems[globalIndex];

            const radialItem = globalItem.items.find(item => item.id === itemId);
            if(!radialItem) {
                console.log(indexes)
                console.trace(`输入item的id错误`)
                throw new Error(`输入item的id错误`);
            }
            if (keyStr === "label") {
                return radialItem[keyStr]; // 直接返回 label
            } else {
                throw new Error(`GlobalRadialMenuItem 没有属性 ${keyStr}`);
            }
        } else if (typeof (indexes[0]) === 'number') {
            // 处理 GlobalRadialMenuItem 的属性
            const [globalIndex] = indexes;
            const globalItem = globalItems[globalIndex];
            if (keyStr === "name" || keyStr === "command") {
                return globalItem[keyStr]; // 安全访问 name 或 command
            } else {
                throw new Error(`RadialMenuItem 没有属性 ${keyStr}`);
            }
        } else {
            throw new Error("无效的 indexes 长度");
        }
    }

    const showText = getProperty(globalMenuItems, indexes, keyStr);

    const updateGlobalItems = (
        setGlobalItems: (
            updater: GlobalRadialMenuItem[] | ((prev: GlobalRadialMenuItem[]) => GlobalRadialMenuItem[])
        ) => void,
        params: updateParams
    )=> {
        const {newValue, indexes, keyStr} = params;
        setGlobalItems((prev) => {
            const newItems = [...prev]

            // 1. 处理 RadialMenuItem 层级的修改
            if (indexes[1]) {
                const [globalIndex, itemId] = indexes;
                const globalItem = newItems[globalIndex];

                if (!globalItem) throw new Error("全局项不存在");
                if (keyStr !== "label") {
                    throw new Error(`RadialMenuItem 不允许修改字段 ${keyStr}`);
                }

                // 更新子项属性
                const newRadialItemIndex = globalItem.items.findIndex(item => item.id === itemId);
                const newRadialItems = [...globalItem.items];
                newRadialItems[newRadialItemIndex] = {
                    ...newRadialItems[newRadialItemIndex],
                    [keyStr]: newValue,
                };

                // 更新全局项的子列表
                newItems[globalIndex] = {
                    ...globalItem,
                    items: newRadialItems,
                };
            }
            // 2. 处理 GlobalRadialMenuItem 层级的修改
            else if (typeof (indexes[0]) === 'number') {
                const [globalIndex] = indexes;
                const globalItem = newItems[globalIndex];

                if (!globalItem) throw new Error("全局项不存在");
                if (keyStr !== "name" && keyStr !== "command") {
                    throw new Error(`GlobalRadialMenuItem 不允许修改字段 ${keyStr}`);
                }

                // 更新全局项的属性
                newItems[globalIndex] = {
                    ...globalItem,
                    [keyStr]: newValue,
                };

                //修改listItems


            } else {
                throw new Error("无效的层级路径");
            }

            return newItems;
        });
    }



    // 重点：使用 useEffect 监听编辑状态变化
    useEffect(() => {
        if (isEditing && divRef.current) {
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
        setOpen(false);
        if(!divRef.current) return;

        divRef.current.focus({
            preventScroll: true,
        });
    }

    const handleBlur = () => {
        setEditing(false);
        setOpen(false);
        divRef.current?.blur()
        // console.log('保存内容:', divRef.current?.textContent);
        updateGlobalItems(setGlobalMenuItems, {
            newValue: divRef.current?.textContent || "",
            indexes,
            keyStr,
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // 阻止默认换行
            handleBlur() // 手动触发失焦
        }
    };

    return (
        <div className={`group gap-2 items-baseline ${className?className:''}`}>
            <Tooltip
                title={t('editTextTooltips')}
                placement={tooltipPlacement}
                color={'#4d179a'}
                open={isOpen&&!isEditing}
                onOpenChange={setOpen}
            >
                <div
                    ref={divRef}
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    className={`inline ${publicClassNames} ${isEditing?editableClassNames:normalClassNames}`}
                    onDoubleClick={handleNameDbClick}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                >
                    {t(showText)}
                </div>
            </Tooltip>
            <EditOutlined className={`pl-1 opacity-0 cursor-pointer ${isEditing?'':'group-hover:opacity-100'}`}
                          onClick={handleNameDbClick}/>
        </div>
    )
}

export default EditableText;