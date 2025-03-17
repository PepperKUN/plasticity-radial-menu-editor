import React, {useState, useMemo, ChangeEvent} from "react";
import { useDraggable } from "@dnd-kit/core";
import { RadialMenuItem, listItem } from "@/types/type";
import { Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Fuse from "fuse.js";
import { Scrollbars } from 'react-custom-scrollbars-2';
import {motion} from "motion/react";

interface flatListItem extends RadialMenuItem {
    type: string;
}

const variants = {
    enter: () => ({
        transform: `translateY(10%)`,
        // x: direction>0?-20:20,
        opacity: 0,
    }),
    center: {
        transform: "translateY(0%)",
        // x: 0,
        opacity: 1,
    },
    exit: () => ({
        transform: `translateY(10%)`,
        // x: direction>0?20:-20,
        opacity: 0,
    })
}



const DraggableItem = ( {id, label, children}: {id:number|string, label: string, children: React.ReactNode} ) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id:id,
        data: {
            label: label
        }
    })
    return (
        <div ref={setNodeRef} {...listeners} {...attributes}
             className='p-2 flex justify-between gap-2 cursor-grab rounded-sm text-neutral-400 hover:bg-neutral-300/10 hover:text-white'
        >
            {children}
        </div>
    )
}

const CommandList:React.FC<{
    items: listItem[]
    refItems: RadialMenuItem[]
}> =  ({items, refItems}) => {

    const menuCommands = new Set(refItems.map((item) => item.command))

    const flatData: flatListItem[] = useMemo(() => items.flatMap((category) => category.items.map((item) => ({
        ...item,
        type: category.commandType,
        isAdd: menuCommands.has(item.command)
    }))
    ),[items])

    const listItemsWithAdd: listItem[] = useMemo(() => items.map((category) => ({commandType: category.commandType, items: category.items.map((item) => ({...item, isAdd: menuCommands.has(item.command)}))})
    ),[items, refItems])

    const onSearch = (event:ChangeEvent) => {
        console.log('onSearch', event)
    }

    const ThumbVertical = ({style, ...props}: any) => {
        return (
            <div {...props} className='bg-neutral-300/20 rounded-full' style={{
                ...style,
            }} />);
    };

    const ScrollView =({style, ...props}:any) => {
        return (
            <div {...props} className='flex flex-col' style={{
                ...style,
                position: "relative"
            }} />);
    }




    return (
        <div
            className='self-stretch flex'
            style={{width: 390}}
        >
            <motion.div
                layout
                // key={Math.random()*1000}
                className=' flex-1 flex flex-col p-2 mt-8 bg-neutral-900 rounded-sm gap-2 contain-content'
                variants={variants}
                initial='enter'
                animate='center'
                // exit='exit'
                transition={{
                    type: "spring",
                    mass: 0.5,
                    stiffness: 300,
                    damping: 15,
                    duration: 0.2
                }}
            >


            <Input size='large' placeholder='Search Commands' prefix={<SearchOutlined />} onChange={onSearch} variant='underlined'/>
            <Scrollbars
                className='flex flex-col'
                renderThumbVertical={ThumbVertical}
                renderView={ScrollView}
                autoHide
            >
                { listItemsWithAdd.map((category) => (
                    <React.Fragment key={category.commandType}>
                        {category.items.length>0&&<span className='p-2 pl-1 text-xs bg-neutral-900 text-neutral-500 sticky top-0 font-mono' key={category.commandType}>{category.commandType}</span>}
                        { category.items.map((item) => (
                        <DraggableItem key={item.id} id={item.id} label={item.label}>
                            <span className='select-none text-sm gabarito-regular '>{item.label}</span>
                            {item.isAdd&&<span className='px-1 py-0.5 flex self-baseline font-mono text-xs bg-violet-700 rounded-sm text-white'>Added</span>}
                        </DraggableItem>
                        ))}
                    </React.Fragment>
                ))}
            </Scrollbars>
            </motion.div>
        </div>
    )
}

export default CommandList;