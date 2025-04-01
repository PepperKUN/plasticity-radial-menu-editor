import React, {useState, useMemo, useEffect} from "react";

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
import ParallaxText from "./components/ParallaxText";
import {GithubOutlined, TranslationOutlined} from "@ant-design/icons"
import TransBtn from "@/components/TransBtn.tsx";

const App:React.FC = () => {


    const { listItems, setListItems } = useListItemStore();
    const { globalMenuItems, setGlobalMenuItems } = useGlobalMenuItemStore();

    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [overlayText, setOverlayText] = useState("Curve");
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [speed, setSpeed] = useState(1);

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
        const rads:RadialMenuItem[] = radialMenuCommands.map(item => ({id: 'radMenu_'+item.command, label: item.name, icon: 'radial', command: 'view:radial:'+item.command}))
        const listItemsWithoutRads = listItems.slice(1)
        const newListItems = [
            {
                commandType: 'Radial Menus',
                items: rads.filter((_, index) => index !== activeIndex)
            },
            ...listItemsWithoutRads
        ]
        setListItems(newListItems)
        // setActiveIndex(prev => prev+1)
        // setTimeout(() => {
        //
        // }, 10)

    },[globalMenuItems.length, radialMenuCommands, activeIndex])

    const flatListItems= useMemo(() => listItems.flatMap((item) => item.items), [listItems])



    // console.log('radialMenuCommands', listItems[0])


    const handleSwitch = (index: number) => {
        const newDirection = (index - activeIndex)>0?-1:1;
        setDirection(newDirection);
        setActiveIndex(prev => {
            if(prev!==index) setSpeed(36)
            return index
        })
    }

    const handleItemsChange = (newItems: GlobalRadialMenuItem[]) => {

        // console.trace("调用追踪标记", listItems[0]);
        setGlobalMenuItems(newItems)
        if(newItems.length< globalMenuItems.length) {
            //删除
            if(activeIndex>0) {
                handleSwitch(newItems.length-1)
                
            }
            
        } else {
            const currentCommand = globalMenuItems[activeIndex].command;
            const newIndex = newItems.findIndex((item)=>item.command === currentCommand);
            if(newIndex>-1) {
                if(globalMenuItems.length<newItems.length){
                    // 新增环形菜单

                    handleSwitch(newIndex+1)
                } else {
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
            <div className="app-container relative bg-neutral-800 flex w-screen h-screen box-border p-6 justify-center items-center selection:bg-violet-900 selection:text-neutral-200 overflow-hidden">
                <div className="w-screen h-screen flex flex-col justify-center items-center absolute left-0 top-0 z-1 overflow-hidden text-neutral-900/50">
                    <ParallaxText className="gabarito-regular text-6xl" baseVelocity={0-speed}>Plasticity Radial Menu Editor</ParallaxText>
                    <ParallaxText className="gabarito-black text-9xl" baseVelocity={speed}>{globalMenuItems[activeIndex].name}</ParallaxText>
                    <ParallaxText className="gabarito-regular text-6xl" baseVelocity={0-speed}>Plasticity Radial Menu Editor</ParallaxText>
                    <ParallaxText className="gabarito-black text-9xl" baseVelocity={speed}>{globalMenuItems[activeIndex].name}</ParallaxText>
                    <ParallaxText className="gabarito-regular text-6xl" baseVelocity={0-speed}>Plasticity Radial Menu Editor</ParallaxText>
                </div>
              {/* 环形菜单 */}
              <DndContext
                  collisionDetection={sectorCollisionDetection}
                  onDragStart={handleDragStart}
                  // onDragMove={handleDragMove}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}

              >
                  <SortableContext items={currentRadialItems}>
                      <div className="flex flex-1 self-stretch max-w-[1440px] z-10">
                        <div className="flex h-full flex-1 flex-col justify-center items-center">
                            <div className="flex self-stretch text-neutral-500 gap-4 text-xl">
                                <GithubOutlined />
                                <TranslationOutlined />
                                <TransBtn/>
                            </div>
                            <div className="flex flex-col pt-6 pb-6">
                                <EditableText
                                    keyStr='name'
                                    indexes={[activeIndex]}
                                    className='text-white'
                                    publicClassNames='text-4xl gabarito-bold border-b-1'
                                    editableClassNames='border-b-neutral-500 outline-0'
                                    normalClassNames='border-transparent'
                                />
                                <div className="flex items-baseline gap-1">
                                    <span className='py-1 px-1 rounded-sm text-neutral-300 bg-neutral-700 text-xs'>Command:</span>
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
                            </div>
                            <AnimatePresence
                                custom={{direction, menuItems: globalMenuItems[activeIndex]}}
                                mode="popLayout"
                                onExitComplete={()=>setSpeed(1)}
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
