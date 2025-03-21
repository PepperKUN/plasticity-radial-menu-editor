import React, {useState, useMemo, useEffect, useRef} from "react";

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
import {GlobalRadialMenuItem, RadialMenuItem} from "@/types/type";
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

    const currentRadialItems = globalMenuItems[activeIndex].items






    // console.log('sensors:', sensors)
    const size = {
        width: 500,
        height: 500,
    }

    // const radialMenuCommands = globalMenuItems.map(item => ({name: item.name, command: item.command}))
    const radialMenuCommands = useMemo(() => {
        return globalMenuItems.map(item => ({name: item.name, command: item.command}))
    },[globalMenuItems])
    useEffect(() => {

        const rads:RadialMenuItem[] = radialMenuCommands.map(item => ({id: 'radMenu_'+item.command, label: item.name, icon: 'radial-menu', command: item.command}))
        const listItemsWithoutRads = listItems.slice(1)
        const newListItems = [
            {
                commandType: 'Radial Menus',
                items: rads.filter((_, index) => index !== activeIndex)
            },
            ...listItemsWithoutRads
        ]
        console.log('App.tsx', newListItems[0], [globalMenuItems.length, radialMenuCommands, activeIndex])
            setListItems(newListItems)
        // setActiveIndex(prev => prev+1)
        // setTimeout(() => {
        //
        // }, 10)

    },[globalMenuItems.length, radialMenuCommands, activeIndex])

    const flatListItems= useMemo(() => listItems.flatMap((item) => item.items), [listItems])



    // console.log('radialMenuCommands', listItems[0])


    const handleSwitch = (index: number) => {
        console.log('App.tsx - index', index, listItems[0])
        const newDirection = (index - activeIndex)>0?-1:1;
        setDirection(newDirection);
        setActiveIndex(index)
    }

    const handleItemsChange = (newItems: GlobalRadialMenuItem[]) => {
        setGlobalMenuItems(newItems)
        console.trace("调用追踪标记", listItems[0]);
        if(newItems.length <= activeIndex) {
            handleSwitch(newItems.length-1)
        } else {
            const currentCommand = globalMenuItems[activeIndex].command;
            const newIndex = newItems.findIndex((item)=>item.command === currentCommand);
            if(newIndex>-1) {
                if(globalMenuItems.length<newItems.length){
                    // console.log(newIndex+1)
                    handleSwitch(newIndex+1)
                } else {
                    // console.log(newIndex)
                    handleSwitch(newIndex)
                }
            } else {
                if(activeIndex>0) handleSwitch(activeIndex-1)
                else handleSwitch(0)
            }
        }
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
        if(!currentRadialItems.some((item)=>item.id === `radMenu-${active.id}`)
            &&over?.id
            &&currentRadialItems.length<12
        ) {
            const draggedItem = flatListItems.find((item) => item.id === active.id);
            const overIndex = currentRadialItems.findIndex((item) => item.id === over.id);

            if (!draggedItem) return;
            const addItem = {...draggedItem, id:`radMenu-${draggedItem.id}` };
            // console.log(addItem)

            // 创建去重后的新数组（移除可能存在的重复项）
            const filteredItems = currentRadialItems.filter(item => item.id !== draggedItem.id);

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
                const oldIndex = currentRadialItems.findIndex((item) => item.id === active.id);
                const newIndex = currentRadialItems.findIndex((item) => item.id === over?.id);

                let newItems = currentRadialItems;
                // 列表变动
                if(newIndex>-1&&oldIndex>-1) {
                    newItems = arrayMove(currentRadialItems, oldIndex, newIndex);
                }


                handleItemsChange(globalMenuItems.map((item, index) => index === activeIndex?{...item, items: newItems}:item))
            }
        } else {
            if(currentRadialItems.length>2) {
                setGlobalMenuItems(prev => prev.map((item, index) => index === activeIndex?{...item, items: item.items.filter(menuItem => menuItem.id !== active.id)}:item));
            }
            // console.log(listItems);
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
                  <SortableContext items={currentRadialItems}>
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
                          <AnimatePresence
                              custom={direction}
                              mode="popLayout"
                          >
                              <div
                                  key={`parent-${activeIndex}`}
                                  className="relative w-full h-full flex flex-col justify-center items-center self-stretch overflow-hidden">
                                      <OperatedPanel
                                          // key={activeIndex}
                                          menuItem={globalMenuItems[activeIndex]}
                                          size={size}
                                      />
                              </div>
                          </AnimatePresence>
                          <TabTitle
                              index={activeIndex}
                              globalItems={globalMenuItems}
                              onItemsChange={handleItemsChange}
                              onSwitch={handleSwitch}
                          />
                      </div>
                      <AnimatePresence
                          mode="popLayout"
                      >
                          <div
                              key={`parent-commandList-${activeIndex}-`}
                              className='self-stretch flex relative'
                              style={{width: 390}}
                          >
                              <CommandList refItems={currentRadialItems}/>
                          </div>
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
