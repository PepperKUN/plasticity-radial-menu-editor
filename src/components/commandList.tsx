import React, {useState, useMemo} from "react";
import { useDraggable } from "@dnd-kit/core";
import { RadialMenuItem, listItem } from "@/types/type";
import { useMenuItemStore } from "@/stores/store";
import { Input, Divider } from 'antd';
import Fuse from "fuse.js";

interface flatListItem extends RadialMenuItem {
    type: string;
}


const { Search } = Input;



const DraggableItem = ( {id, children}: {id:number|string, children: React.ReactNode} ) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id:id,
    })
    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className='px-2 py-1  cursor-grab rounded-sm border border-transparent  hover:border-purple-900 hover:bg-purple-950'>
            {children}
        </div>
    )
}

const CommandList:React.FC<{
    items: listItem[]
}> =  ({items}) => {

    const { menuItems } = useMenuItemStore();
    const menuCommands = new Set(menuItems.map((item) => item.command))

    const flatData: flatListItem[] = useMemo(() => items.flatMap((category) => category.items.map((item) => ({
        ...item,
        type: category.commandType,
        isAdd: menuCommands.has(item.command)
    }))
    ),[items])

    const listItemsWithAdd: listItem[] = useMemo(() => items.map((category) => ({commandType: category.commandType, items: category.items.map((item) => ({...item, isAdd: menuCommands.has(item.command)}))})
    ),[items])

    const onSearch = (value: string) => {

    }




    return (
        <div className='flex flex-col p-2 h-full bg-neutral-900 rounded-sm'>
            <Search placeholder='Search Commands' onSearch={onSearch}/>
            <Divider />
            <div className="overflow-auto flex flex-col">
                { listItemsWithAdd.map((category) => (
                    <>
                        {category.items.length>0&&<span className='p-2 text-xs bg-neutral-950 text-neutral-500' key={category.commandType}>{category.commandType}</span>}
                        { category.items.map((item) => (
                        <DraggableItem key={item.id} id={item.id}>
                            <span className='select-none text-sm text-neutral-400'>{item.label}</span>
                        </DraggableItem>
                        ))}
                    </>
                ))}
            </div>
        </div>
    )
}

export default CommandList;