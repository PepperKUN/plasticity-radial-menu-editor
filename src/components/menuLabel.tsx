import React, {useMemo, useRef, useState} from "react";
import {polarToCartesian, convertedObj2Table} from "@/utils/util.ts";
import {GlobalRadialMenuItem, point, RadialMenuItem} from "@/types/type";
import {DragEndEvent, DragStartEvent, useDndMonitor} from "@dnd-kit/core";
import EditableText from "@/components/editableText.tsx";
import { useGlobalMenuItemStore } from "@/stores/store";

enum Direction {
    Up = "Top",
    Down = "Bottom",
    Left = "Left",
    Right = "Right"
}

interface menuLabelProps {
    menuItem: GlobalRadialMenuItem;
    labelMaxWidth?: number;
    radius?: number;
    spacing?: number;
    sparsityRatio?: number;
    size?: {width: number, height: number};
    extendLength?:number;
}

interface menuLabelItem {
    id: string|number,
    label: string,
    command: string,
    icon: string,
    direction: Direction,
    mid: point,
    end: point
}

const MenuLabel:React.FC<menuLabelProps> = ({
                                                menuItem,
                                                labelMaxWidth=400,
                                                radius = 155,
                                                spacing = 10,
                                                sparsityRatio = 0,
                                                size = {width:500,height:500},
                                                extendLength = 10,
                                            }) => {
    const { globalMenuItems} = useGlobalMenuItemStore();
    const containerRef = useRef<SVGSVGElement>(null);

    const items = useMemo(() => menuItem.items, [menuItem])
    const parentIndex = useMemo(() => {
        return globalMenuItems.findIndex((item) => item.command === menuItem.command)
    },[menuItem.name, menuItem.command])

    const center = {x: size.width / 2, y: size.height / 2};

    const [isOdd, setIsOdd] = useState(false);

    const paddingY = 10;


    const menuLabels = useMemo<menuLabelItem[]>(() => {
        const sectorAngle = 360/items.length;
        const isOdd = items.length%2 > 0;
        setIsOdd(isOdd);
        const sectorRadians = Math.PI*2/items.length;
        const halfIndex = Math.floor(items.length/2)
        const rightItems = items.slice(0, halfIndex+1)

        const gapsArrayMin = rightItems.map((_, i) => {
            const currentPoint = polarToCartesian(center.x, center.y, radius, i*sectorAngle);
            const prevPoint = polarToCartesian(center.x, center.y, radius, (i-1)*sectorAngle);
            return i==0?0:Math.abs(currentPoint.y - prevPoint.y);
        })

        const maxGap = Math.max(...gapsArrayMin)

        const gapsArray = gapsArrayMin.map((gap, i) => i==0?0:(maxGap-gap)*sparsityRatio+gap)

        const labelsCenterRatio = isOdd?1/(Math.cos(sectorRadians/2)+1):0.5
        const initalLabelYPosition = size.height/2 - labelsCenterRatio * gapsArray.reduce((acc, curr) => acc + curr + spacing, -spacing)

        const labelsYPosition = gapsArray.reduce((acc, curr, index) => {
            const heightSum = acc[index - 1] + curr + spacing
            return index==0?[...acc]:[...acc, heightSum]
        } , [initalLabelYPosition])


        const midPointsRight = labelsYPosition.map((value, i) => {

            let uniFormPosY = value

            if(value<0) {
                uniFormPosY = 0 + paddingY
            } else if(value>size.height) {
                uniFormPosY = size.height - paddingY
            }

            const labelRad = Math.PI/2 - i*sectorRadians
            const xOffest = labelRad===0?(radius+spacing):(size.height/2-uniFormPosY)/Math.tan(labelRad)
            const posY = xOffest>size.width/2?size.height/2-Math.tan(labelRad)*size.width/2:uniFormPosY
            // console.log(labelRad, xOffest)

            return {
                x: Math.round(size.width/2 + Math.min(xOffest, size.width/2)),
                y: Math.round(posY),
            }
        })

        const midPointsLeft = midPointsRight.slice(1).map((point) => ({...point, x: size.width-point.x})).reverse()

        const midPoints = midPointsRight.slice(0, isOdd?undefined:midPointsRight.length-1).concat(midPointsLeft)

        const linePoints:menuLabelItem[] = midPoints.map((point, i) => {
            let direction = Direction.Right
            direction = i>items.length/2?Direction.Left:direction
            // const isRight = i>0&&i<items.length/2
            direction = i===0?Direction.Up:direction
            direction = i===items.length/2?Direction.Down:direction

            const getEndPos = () => {
                switch(direction) {
                    case Direction.Left:
                        return {x: Math.max(point.x - extendLength, 0), y: point.y};
                    case Direction.Right:
                        return {x: Math.min(point.x + extendLength, size.width), y: point.y};
                    case Direction.Up:
                        return {x: size.width/2, y: 0};
                    case Direction.Down:
                        return {x: size.width/2, y: size.height};
                }

            }

            return {
                id: items[i].id,
                label: items[i].label,
                command: items[i].command,
                icon: items[i].icon,
                direction,
                mid: {
                    x: point.x,
                    y: Math.max(point.y, 0), //最上方中心点Y坐标clamp
                },
                end: getEndPos()
            }
        })

        // console.table(
        //     convertedObj2Table({
        //         // labelsCenterRatio,
        //         items,
        //         // gapsArrayMin,
        //         // gapsArray,
        //         // maxGap,
        //         // labelsYPosition,
        //         // midPointsLeft,
        //         // midPoints,
        //         linePoints
        //     })
        //
        // )

        return linePoints.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            } else if (a.id < b.id) {
                return  -1;
            } else {
                return 0
            }
        });
    }, [items])

    const getLabelStyle = (item:menuLabelItem) => {
        const position = {
            top: item.end.y+'px',
            left: item.end.x+'px',

        }
        switch (item.direction) {
            case Direction.Left:
                return {
                    ...position,
                    transform: `translate(-100%, -50%)`,
                    borderRightWidth: 1,
                    paddingInline: 'calc(var(--spacing)* 2)',
                    paddingBlock: 0,
                    maxWidth: labelMaxWidth,
                }
            case Direction.Right:
                return {
                    ...position,
                    transform: `translate(0%, -50%)`,
                    borderLeftWidth: 1,
                    paddingInline: 'calc(var(--spacing)* 2)',
                    paddingBlock: 0,
                    maxWidth: labelMaxWidth,
                }
            case Direction.Up:
                return {
                    ...position,
                    transform: `translate(-50%, -100%)`,
                    borderBottomWidth: 1,
                    paddingBlock: 'calc(var(--spacing)* 2)',
                    paddingInline: 0,
                }
            case Direction.Down:
                return {
                    ...position,
                    transform: `translate(-50%, 0%)`,
                    borderTopWidth: 1,
                    paddingBlock: 'calc(var(--spacing)* 2)',
                    paddingInline: 0,
                }
        }
    }

    return (
        <>
            <svg
                className="radial-menu-label-lines"
                ref={containerRef}
                viewBox={`0 0 ${size.width} ${size.height}`}
            >
                <defs>
                    <radialGradient id="radialStroke" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
                        <stop offset={`${200/Math.min(size.width, size.height)*100}%`} stopColor='transparent'/>
                        <stop offset="100%" stopColor="#ffffff"/>
                    </radialGradient>

                </defs>
                {menuLabels.map((label) => {
                    return (
                        <path
                            key={label.id}
                            stroke="url(#radialStroke)"
                            strokeWidth={1}
                            fill="none"
                            d={`M ${center.x} ${center.y} L ${label.mid.x} ${label.mid.y} L ${label.end.x} ${label.end.y}`}
                        />
                    )
                })}
            </svg>
            <ul className="radial-menu-labels">
                {menuLabels.map((label) => {
                    return (
                        <li key={label.id} className="menu-label inline-flex w-max flex-col items-start gap-1.5 text-neutral-400" style={getLabelStyle(label)}>
                            <EditableText
                                keyStr='label'
                                indexes={[parentIndex, label.id]}
                                publicClassNames='gabarito-bold text-neutral-400 text-lg/5 border-b-1 w-fit'
                                editableClassNames='border-b-neutral-500 outline-0'
                                normalClassNames='border-transparent'
                                // tooltipPlacement='bottom'
                            />
                            {/*<h4 className='text-lg/5 gabarito-bold font-bold w-fit text-neutral-400'>{label.label}</h4>*/}
                            <div className="inline-flex icon_wrap gap-1 items-baseline font-mono">
                                <span className='flex items-start bg-neutral-700 px-1 py-0.5 rounded-sm text-xs'>icon</span>
                                <span className='text-sm/4 text-neutral-500'>{label.icon}</span>
                            </div>
                        </li>
                    )
                })}

            </ul>
        </>
    )
}

export default MenuLabel