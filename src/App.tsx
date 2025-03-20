import React, { useState, useMemo } from "react";

import {
    DndContext,
    DragEndEvent, DragOverlay,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
} from "@dnd-kit/sortable";

import { useListItemStore, useGlobalMenuItemStore } from "@/stores/store";
import {customDropAnimation, sectorCollisionDetection} from "@/utils/util"
import CommandList from "@/components/commandList";
import {ConfigProvider, theme} from 'antd';
import {DragStartEvent} from "@dnd-kit/core/dist/types/events";
import './App.css'
import {GlobalRadialMenuItem} from "@/types/type";
import OperatedPanel from "@/components/operatedPanel";
import { AnimatePresence } from 'motion/react'
import EditableText from "@/components/EditableText.tsx";
import TabTitle from "@/components/TabTitle.tsx";

const App:React.FC = () => {

    const { listItems, setListItems } = useListItemStore();
    const { globalMenuItems, setGlobalMenuItems } = useGlobalMenuItemStore();

    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [overlayText, setOverlayText] = useState("Curve");
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1)


    const items = globalMenuItems[activeIndex].items



    const flatListItems= useMemo(() => listItems.flatMap((item) => item.items), [listItems])


    // console.log('sensors:', sensors)
    const size = {
        width: 500,
        height: 500,
    }

    const handleSwitch = (index: number) => {
        const newDirection = (index - activeIndex)>0?-1:1;
        setActiveIndex(index)
        setDirection(newDirection);
    }

    const handleItemsChange = (items: GlobalRadialMenuItem[]) => {
        if(items.length <= activeIndex) {
            setActiveIndex(items.length-1)
            handleSwitch(items.length-1)
        } else {
            const currentCommand = globalMenuItems[activeIndex].command;
            const newIndex = items.findIndex((item)=>item.command === currentCommand);
            if(globalMenuItems.length<items.length) {
                handleSwitch(newIndex)
            } else {
                handleSwitch(newIndex+1)
            }
        }
        setGlobalMenuItems(items)
    }

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event;
        // console.log("active", active, activatorEvent);
        if(active.data.current?.label) {
            setShowOverlay(true)
            setOverlayText(active.data.current.label)
        } else {
            setShowOverlay(false)
        }
    }

    const handleDragOver = (event: DragEndEvent) => {
        const { active, over } = event;
        if(!items.some((item)=>item.id === `radMenu-${active.id}`)
            &&over?.id
        ) {
            const draggedItem = flatListItems.find((item) => item.id === active.id);
            const overIndex = items.findIndex((item) => item.id === over.id);

            if (!draggedItem) return;
            const addItem = {...draggedItem, id:`radMenu-${draggedItem.id}` };
            // console.log(addItem)

            // 创建去重后的新数组（移除可能存在的重复项）
            const filteredItems = items.filter(item => item.id !== draggedItem.id);

            // 插入到目标位置
            const newItems = [
                ...filteredItems.slice(0, overIndex),
                addItem,
                ...filteredItems.slice(overIndex)
            ];

            handleItemsChange(globalMenuItems.map((item, index) => index === activeIndex?{...item, items: newItems}:item))
            setShowOverlay(false)
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
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                let newItems = items;
                // 列表变动
                if(newIndex>-1&&oldIndex>-1) {
                    newItems = arrayMove(items, oldIndex, newIndex);
                }


                handleItemsChange(globalMenuItems.map((item, index) => index === activeIndex?{...item, items: newItems}:item))
            }
        } else {
            if(items.length>2) {
                setGlobalMenuItems(prev => prev.map((item, index) => index === activeIndex?{...item, items: item.items.filter(menuItem => menuItem.id !== active.id)}:item));
            }
            console.log(listItems);
        }
    };


    return (
        <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#7A3DE8',
            },
            components: {
                Segmented:{
                    itemSelectedBg: 'rgba(255, 255, 255, 0.2)',
                    itemHoverBg: 'rgba(255, 255, 255, 0.15)',
                },
            },
            algorithm: theme.darkAlgorithm,
        }}
        >
            <div className="app-container bg-neutral-800 flex w-screen h-screen box-border p-6 justify-center items-center selection:bg-violet-900 selection:text-neutral-200 overflow-hidden">
              {/* 环形菜单 */}
              <DndContext
                  collisionDetection={sectorCollisionDetection}
                  onDragStart={handleDragStart}
                  // onDragMove={handleDragMove}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}

              >
                  <SortableContext items={items}>
                      <div className="flex flex-1 self-stretch max-w-[1440px]">
                      <div className="flex h-full flex-1 flex-col justify-center items-center">
                          <div className="flex flex-col pt-12 pb-6">
                              <EditableText
                                  keyStr='name'
                                  indexes={[activeIndex]}
                                  className='text-white'
                                  publicClassNames='text-4xl gabarito-bold border-b-1'
                                  editableClassNames='border-b-neutral-500 outline-0'
                                  normalClassNames='border-transparent'
                              />
                              <EditableText
                                  keyStr='command'
                                  indexes={[activeIndex]}
                                  className='text-neutral-400'
                                  publicClassNames='gabarito-regular text-lg border-b-1'
                                  editableClassNames='border-b-neutral-500 outline-0'
                                  normalClassNames='border-transparent'
                                  tooltipPlacement='bottom'
                              />
                          </div>
                          <div
                              className="w-full h-full flex flex-col justify-center items-center self-stretch overflow-hidden">
                              <AnimatePresence
                                  custom={direction}
                                  mode="wait"
                              >
                                  <OperatedPanel
                                      key={activeIndex}
                                      menuItem={globalMenuItems[activeIndex]}
                                      size={size}
                                  />
                              </AnimatePresence>
                          </div>
                          <TabTitle
                              index={activeIndex}
                              globalItems={globalMenuItems}
                              onItemsChange={handleItemsChange}
                              onSwitch={handleSwitch}
                          />
                      </div>
                      <AnimatePresence
                          mode="wait"
                      >
                          <CommandList key={`commandList-${activeIndex}`} items={listItems} refItems={items}/>
                      </AnimatePresence>
                      {showOverlay && <DragOverlay
                          dropAnimation={customDropAnimation}
                          // modifiers={[rotateAround]}
                      >
                          <div
                              className='p-2 text-sm bg-violet-700 cursor-grabbing gabarito-bold text-white rounded-sm'>
                              {overlayText}
                          </div>
                      </DragOverlay>}
                      </div>
                  </SortableContext>
              </DndContext>
            </div>
        </ConfigProvider>
    )
}

export default App
