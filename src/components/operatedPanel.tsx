import React, { CSSProperties, useRef, useEffect, useState } from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    Active,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMenuItemStore, useContainerStore } from "@/stores/store.ts";
import { sectorCollisionDetection } from "@/utils/dnd.ts";
import RadialMenu from "@/components/RadialMenu/radialMenu";
import CommandList from "@/components/commandList";
import { RadialMenuItem } from "@/types/type";

const OperaPanel: React.FC= () => {

    const { menuItems, setMenuItems } = useMenuItemStore();

    const listItems:RadialMenuItem[] = [
        { id: 11, label: 'Home1', color: '#7d4ecd', icon: 'home1', command: '' },
        { id: 21, label: 'Settings1', color: '#ff385d', icon: 'settings1', command: ''},
        { id: 31, label: 'Profile1', color: '#ebff6b', icon: 'profile1', command: ''},
    ]

    const sensors = useSensors(
        useSensor(PointerSensor),
        // useSensor(KeyboardSensor, {
        //     coordinateGetter: sortableKeyboardCoordinates
        // })
    );

    const handleDragOver = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log(
            listItems.some((item)=>item.id === active.id),
            over?.id,
            over);
        
        if(listItems.some((item)=>item.id === active.id)
            &&over?.id
        ) {
            const draggedItem = listItems.find((item) => item.id === active.id);
            const overIndex = menuItems.findIndex((item) => item.id === over.id);

            if (!draggedItem) return;

            // 创建去重后的新数组（移除可能存在的重复项）
            const filteredItems = menuItems.filter(item => item.id !== draggedItem.id);

            // 插入到目标位置
            const newItems = [
                ...filteredItems.slice(0, overIndex),
                draggedItem,
                ...filteredItems.slice(overIndex)
            ];

            setMenuItems(newItems);
        } else {
            console.log("filter");
            
            // setMenuItems(prev => prev.filter(item => item.id !== active.id));
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        // if (active.id !== over?.id) {
        //     const oldIndex = menuItems.findIndex((item) => item.id === active.id);
        //     const newIndex = menuItems.findIndex((item) => item.id === over?.id);
        //
        //     // 列表变动
        //     const newItems = arrayMove(menuItems, oldIndex, newIndex);
        //
        //
        //     setMenuItems(newItems);
        // }
    };
    const handleCommandDragOver = (event: DragEndEvent) => {
        console.log('handleCommandDragOver')
    }
    const handleCommandDragEnd = (event: DragEndEvent) => {
        console.log('handleCommandDragEnd')
    }

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={sectorCollisionDetection}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={menuItems}>
                    <RadialMenu/>
                    <CommandList items={listItems}/>
                </SortableContext>
                {/*<SortableContext items={listItems}>*/}
                {/*</SortableContext>*/}
                {/* <DragOverlay> {activeItem?<div>{activeItem.id}</div>: null}</DragOverlay> */}
            </DndContext>
            {/*<DndContext*/}
            {/*    sensors={sensors}*/}
            {/*    onDragOver={handleCommandDragOver}  // 单独处理 CommandList 的拖拽*/}
            {/*    onDragEnd={handleCommandDragEnd}*/}
            {/*>*/}
            {/*    <SortableContext items={listItems}>*/}
            {/*        <CommandList items={listItems}/>*/}
            {/*    </SortableContext>*/}
            {/*</DndContext>*/}
        </>
    );
};

export default OperaPanel;