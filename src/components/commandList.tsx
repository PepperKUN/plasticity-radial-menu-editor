import React, {useState, useEffect, useMemo, ChangeEvent} from "react";
import type {CSSProperties} from "react";
import { useDraggable } from "@dnd-kit/core";
import { RadialMenuItem, flatListItem } from "@/types/type";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Fuse from "fuse.js";
import { Scrollbars } from 'react-custom-scrollbars-2';
import {motion} from "motion/react";
import SvgIcon from "@/components/RadialMenu/SvgIcon.tsx";
import {convertFlat2ListItems} from "@/utils/util.ts";
import {useListItemStore} from "@/stores/store.ts";


type ThumbVerticalProps = {
    style: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const variants = {
    enter: () => ({
        transform: `translateY(40%) scale(1.2)`,
        opacity: 0,
    }),
    center: {
        transform: "translateY(0%) scale(1)",
        opacity: 1,
    },
    exit: () => ({
        transform: `translateY(-40%) scale(0.8)`,
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
    // items: listItem[]
    refItems: RadialMenuItem[]
}> =  ({refItems}) => {
    const {listItems} = useListItemStore()

    console.log('CommandList', listItems[0])
    const menuCommands = new Set(refItems.map((item) => item.command))

    const flatData: flatListItem[] = useMemo(() => listItems.flatMap((category) => category.items.map((item) => ({
            ...item,
            type: category.commandType,
            isAdd: menuCommands.has(item.command)
        }))
    ),[listItems, refItems])

    const [searchTerm, setSearchTerm] = useState('')
    const [listComItems, setListComItems] = useState(listItems)


    useEffect(() => {

        const fuse = new Fuse(flatData, {
            keys: ['label', 'type'],
            threshold: 0.3,
            // includeScore: true,
            // includeMatches: true,
        });

        const flatResults = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : flatData;

        setListComItems(convertFlat2ListItems(flatResults))


    }, [searchTerm, flatData])

    const onSearch = (event:ChangeEvent) => {
        const e = event as React.ChangeEvent<HTMLTextAreaElement>
        console.log('onSearch', e, e.currentTarget.value)
        setSearchTerm(e.currentTarget.value)
    }

    const ThumbVertical = ({style, ...props}: ThumbVerticalProps) => {
        return (
            <div {...props} className='bg-neutral-300/20 rounded-full' style={{
                ...style,
            }} />);
    };

    const ScrollView =({style, ...props}:ThumbVerticalProps) => {
        return (
            <div {...props} className='flex flex-col h-full' style={{
                ...style,
                overflowX: "hidden",
                position: "relative",
            }} />);
    }




    return (
        <motion.div
            // key={Math.random()*1000}
            className=' flex-1 flex flex-col p-2 bg-neutral-900 rounded-sm gap-2 contain-content origin-bottom'
            variants={variants}
            initial='enter'
            animate='center'
            // exit='exit'
            transition={{
                type: "spring",
                mass: 0.5,
                stiffness: 300,
                damping: 15,
                duration: 0.4
            }}
        >


            <Input
                className='bg-transparent!'
                value={searchTerm}
                size='large'
                placeholder='Search Commands'
                prefix={<SearchOutlined />}
                onChange={onSearch}
                variant='underlined'
                allowClear
            />
            <Scrollbars
                className='flex flex-col'
                renderThumbVertical={ThumbVertical}
                renderView={ScrollView}
                autoHide
            >
                { listComItems.length>0?listComItems.map((category) => (
                    <React.Fragment key={category.commandType}>
                        {category.items.length>0&&<span className='p-2 pl-1 text-xs bg-neutral-900 text-neutral-500 sticky top-0 font-mono' key={category.commandType}>{category.commandType}</span>}
                        { category.items.map((item) => (
                        <DraggableItem key={item.id} id={item.id} label={item.label}>
                            <div className="flex gap-2">
                                <SvgIcon name={item.icon}/>
                                <span className='select-none text-sm gabarito-regular '>{item.label}</span>
                            </div>
                            {item.isAdd&&<span className='px-1 py-0.5 flex self-baseline font-mono text-xs bg-violet-700 rounded-sm text-white'>Added</span>}
                        </DraggableItem>
                        ))}
                    </React.Fragment>
                )):<div className='flex flex-col items-center justify-center gabarito-regular p-12'>
                    <span className='text-neutral-500'>No Results</span>
                </div>
                }
            </Scrollbars>
        </motion.div>
    )
}

export default CommandList;