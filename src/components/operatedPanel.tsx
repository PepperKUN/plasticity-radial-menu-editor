import React, { useState, useRef } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
} from "@dnd-kit/sortable";

import { useMenuItemStore, useListItemStore } from "@/stores/store";
import {sectorCollisionDetection, rotateAround, customDropAnimation, radiusConstraint} from "@/utils/util"
import RadialMenu from "@/components/RadialMenu/radialMenu";
import CommandList from "@/components/commandList";
import { RadialMenuItem } from "@/types/type";
import MenuLabel from "@/components/menuLabel.tsx";
import {DragMoveEvent} from "@dnd-kit/core/dist/types/events";

const OperaPanel: React.FC= () => {

    const { menuItems, setMenuItems } = useMenuItemStore();
    const { listItems, setListItems } = useListItemStore();

    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const nodeRef = useRef<HTMLDivElement>(null);


    // console.log('sensors:', sensors)
    const size = {
        width: 600,
        height: 480,
    }

    const handleDragMove = (e: DragMoveEvent) => {
        // console.log("handleDragMove", e.activatorEvent, nodeRef.current?.getBoundingClientRect());
        const rect = nodeRef.current?.getBoundingClientRect()
        const moveEvent = e.activatorEvent as MouseEvent
        if(rect) {
            const pos = radiusConstraint({
                x: moveEvent.clientX - rect.x +e.delta.x,
                y: moveEvent.clientY - rect.y + e.delta.y,
                cx: size.width/2,
                cy: size.height/2,
                radius: 180
            })
            setPosition(pos)

        }
    }

    const handleDragOver = (event: DragEndEvent) => {
        const { active, over } = event;
        // console.log(
        //     "handleDragOver:",
        //     // listItems.some((item)=>item.id === active.id),
        //     over?.id,
        //     over,
        //     menuItems);
        //
        if(!menuItems.some((item)=>item.id === `radMenu-${active.id}`)
            &&over?.id
        ) {
            const draggedItem = listItems.find((item) => item.id === active.id);
            const overIndex = menuItems.findIndex((item) => item.id === over.id);

            if (!draggedItem) return;
            const addItem = {...draggedItem, id:`radMenu-${draggedItem.id}` };
            // console.log(addItem)

            // 创建去重后的新数组（移除可能存在的重复项）
            const filteredItems = menuItems.filter(item => item.id !== draggedItem.id);

            // 插入到目标位置
            const newItems = [
                ...filteredItems.slice(0, overIndex),
                addItem,
                ...filteredItems.slice(overIndex)
            ];

            setMenuItems(newItems);
        } else {
            // console.log("filter");
            
            // setMenuItems(prev => prev.filter(item => item.id !== active.id));
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        // console.log("handleDragEnd:", active, over);
        if(over?.id !== 'trashBin') {
            if (active.id !== over?.id) {
                const oldIndex = menuItems.findIndex((item) => item.id === active.id);
                const newIndex = menuItems.findIndex((item) => item.id === over?.id);

                let newItems = menuItems;
                // 列表变动
                if(newIndex>-1&&oldIndex>-1) {
                    newItems = arrayMove(menuItems, oldIndex, newIndex);
                }


                setMenuItems(newItems);
            }
        } else {
            if(menuItems.length>2) {
                setMenuItems(prev => prev.filter(item => item.id !== active.id));
            }
            console.log(listItems);
        }
    };
    

    return (
        <>
            <DndContext
                collisionDetection={sectorCollisionDetection}
                onDragMove={handleDragMove}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={menuItems}>
                    <div className="radial-wrap" ref={nodeRef} style={{ width: size.width , height: size.height }}>
                        <MenuLabel
                            items={menuItems}
                            size={size}
                            radius={180}
                            sparsityRatio={0.2}
                            spacing={20}
                            extendLength={1000}
                        />
                        <RadialMenu/>
                        {/*<DragOverlay*/}
                        {/*    style={{position: 'absolute', top: `${position.y}px`, width: 0, height: 0, left: `${position.x}px`, transform: `translate3d(0px, 0px, 0px)`}}*/}
                        {/*    dropAnimation={customDropAnimation}*/}
                        {/*    modifiers={[rotateAround]}*/}
                        {/*>*/}
                        {/*    <div>*/}
                        {/*        111*/}
                        {/*    </div>*/}
                        {/*</DragOverlay>*/}
                    </div>
                    <CommandList items={listItems}/>
                </SortableContext>
            </DndContext>
        </>
    );
};

export default OperaPanel;