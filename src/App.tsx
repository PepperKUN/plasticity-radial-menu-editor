import { useState, useMemo } from "react";

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
import {ConfigProvider, theme, Segmented, Button} from 'antd';
import {DragMoveEvent, DragStartEvent} from "@dnd-kit/core/dist/types/events";
import './App.css'
import {RadialMenuItem} from "@/types/type";
import OperatedPanel from "@/components/operatedPanel";
import RadialMenuName from "@/components/radialName";
import {PlusOutlined, EditOutlined} from "@ant-design/icons";
import { AnimatePresence } from 'motion/react'

const itemTemplate: RadialMenuItem[] = [
    { id: 'radMenu-151', label: 'Selection mode: set control-point', icon: 'selection-mode-set-control-point', command: 'selection:mode:set:control-point' },
    { id: 'radMenu-152', label: 'Selection mode: set edge', icon: 'selection-mode-set-edge', command: 'selection:mode:set:edge' },
    { id: 'radMenu-153', label: 'Selection mode: set face', icon: 'selection-mode-set-face', command: 'selection:mode:set:face' },
    { id: 'radMenu-154', label: 'Selection mode: set solid', icon: 'selection-mode-set-solid', command: 'selection:mode:set:solid' },
]

function App() {

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

    const segmentOptions = useMemo(() => {
        return globalMenuItems.map(item => item.name)
    }, [globalMenuItems.length, globalMenuItems.map(item => item.name)])



    const handleDragStart = (event: DragStartEvent) => {
        const {active, activatorEvent} = event;
        console.log("active", active, activatorEvent);
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

            setGlobalMenuItems(prev => prev.map((item, index) => index === activeIndex?{...item, items: newItems}:item));
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


                setGlobalMenuItems(prev => prev.map((item, index) => index === activeIndex?{...item, items: newItems}:item));
            }
        } else {
            if(items.length>2) {
                setGlobalMenuItems(prev => prev.map((item, index) => index === activeIndex?{...item, items: item.items.filter(menuItem => menuItem.id !== active.id)}:item));
            }
            console.log(listItems);
        }
    };

    const handleAddNewMenu = () => {
        setGlobalMenuItems(prev => [...prev, {
            name: `New Radial Menu-${prev.length}`,
            command: `radial: menu-${prev.length}`,
            items: itemTemplate
        }])
    }

    const handleSwitchMenu = (value: string) => {
        const newIndex = segmentOptions.findIndex(el => el === value);
        const newDirection = (newIndex - activeIndex)>0?-1:1;
        setActiveIndex(newIndex)
        setDirection(newDirection);
    }



    return (
        <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#7A3DE8',
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
                      {/*<div className="flex flex-1 self-stretch max-w-8xl">*/}
                      <div className="flex h-full flex-1 flex-col justify-center items-center">
                          <div className="pt-8 flex justify-between items-center gap-4">
                              <Segmented size="large" options={segmentOptions} onChange={handleSwitchMenu}
                                         className='select-none gabarito-regular'/>
                              <Button size="large" type="primary" onClick={handleAddNewMenu} icon={<PlusOutlined/>}/>
                          </div>
                          <div
                              className="w-full h-full flex flex-col justify-center items-center self-stretch overflow-hidden">
                              <AnimatePresence
                                  custom={direction}
                                  mode="wait"
                              >
                                  <OperatedPanel
                                      key={activeIndex}
                                      items={items}
                                      size={size}
                                  />
                              </AnimatePresence>
                          </div>
                          <RadialMenuName index={activeIndex}/>
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
                              <div className='p-2 text-sm bg-violet-700 cursor-grabbing gabarito-bold text-white rounded-sm'>
                                  {overlayText}
                              </div>
                          </DragOverlay>}
                      {/*</div>*/}
                  </SortableContext>
              </DndContext>
            </div>
        </ConfigProvider>
    )
}

export default App
