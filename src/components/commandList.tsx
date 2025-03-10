import React, {useState, useMemo} from "react";
import { useDraggable } from "@dnd-kit/core";
import { RadialMenuItem, listItem } from "@/types/type";
import { useMenuItemStore } from "@/stores/store";
import Fuse from "fuse.js";

interface flatListItem extends RadialMenuItem {
    type: string;
}




const DraggableItem = ( {id, children}: {id:number|string, children: React.ReactNode} ) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id:id,
    })
    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
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




    return (
        <div className='flex flex-col p-6'>
            { listItemsWithAdd.map((category) => (
                <>
                    {category.items.length>0&&<span key={category.commandType}>{category.commandType}</span>}
                    { category.items.map((item) => (
                    <DraggableItem key={item.id} id={item.id}>
                        <div className='select-none'>{item.label}</div>
                    </DraggableItem>
                    ))}
                </>
            ))}
        </div>
    )
}

export default CommandList;