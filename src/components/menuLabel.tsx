import React, {useMemo, useRef, useState} from "react";
import {polarToCartesian} from "@/utils/util.ts";
import {RadialMenuItem} from "@/types/type";
import {DragEndEvent, DragStartEvent, useDndMonitor} from "@dnd-kit/core";

interface point {
    x: number;
    y: number;
}
interface menuLabelProps {
    items: RadialMenuItem[];
    center: point;
    radius?: number;
    spacing?: number;
}

const MenuLabel:React.FC<menuLabelProps> = ({
                                                items,
                                                center,
                                                radius = 155,
                                                spacing = 20,
                                            }) => {

    const containerRef = useRef<SVGSVGElement>(null);

    const [showLabel, setShowLabel] = useState(true);
    const [isOdd, setIsOdd] = useState(false);

    useDndMonitor({
        onDragStart(event: DragStartEvent) {

        },
        onDragEnd(event: DragEndEvent) {

        }
    })
    const midPointsPostion = useMemo(() => {
        const sectorAngle = 360/items.length;
        const isOdd = items.length%2 > 0;
        setIsOdd(isOdd);
        const sectorRadians = Math.PI*2/items.length;
        const halfIndex = Math.floor(items.length/2)
        const rightItems = items.slice(0, halfIndex+1)

        const gapsArray = rightItems.map((item, i) => {
            const currentPoint = polarToCartesian(center.x, center.y, radius+10, i*sectorAngle);
            const prevPoint = polarToCartesian(center.x, center.y, radius+10, (i-1)*sectorAngle);
            return i==0?0:Math.abs(currentPoint.y - prevPoint.y);
        })

        const labelsCenterRatio = isOdd?1/(Math.cos(sectorRadians/2)+1):0.5
        const initalLabelYPosition = 250 - labelsCenterRatio * gapsArray.reduce((acc, curr) => acc + curr + spacing, -spacing)

        const labelsYPosition = gapsArray.reduce((acc, curr, index) => index==0?[...acc]:[...acc, acc[index - 1] + curr + spacing] , [initalLabelYPosition])


        const midPointsRight = labelsYPosition.map((value, i) => {
            const labelRad = Math.PI/2 - i*sectorRadians
            const xOffest = labelRad===0?(250+spacing):(250-value)/Math.tan(Math.PI/2 - i*sectorRadians)
            // console.log(labelRad, xOffest)

            return {
                x: Math.round(250 + xOffest),
                y: Math.round(value),
            }
        })

        const midPointsLeft = midPointsRight.slice(1).map((point) => ({...point, x: 500-point.x})).reverse()

        const midPoints = midPointsRight.slice(0, isOdd?undefined:midPointsRight.length-1).concat(midPointsLeft)

        console.log(
            // labelsCenterRatio,
            // gapsArray,
            // labelsYPosition,
            // midPointsLeft,
            midPoints
        )

        return midPoints
    }, [items])



    return (
        <svg
            className="radial-menu-labels"
            ref={containerRef}
            viewBox="0 0 500 500"
        >
            <defs>
                <radialGradient id="radialStroke" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
                    <stop offset="40%" stop-color="transparent"/>
                    <stop offset="100%" stop-color="#ffffff"/>
                </radialGradient>

            </defs>
            {midPointsPostion.map((point, i) => {
                const isLeft = i>midPointsPostion.length/2
                const isRight = i>0&&i<midPointsPostion.length/2
                const isTop = i===0
                const isBottom = i===midPointsPostion.length/2

                return (
                    <path
                        key={`Line-${i}`}
                        stroke="url(#radialStroke)"
                        strokeWidth={1}
                        fill="none"
                        d={`M ${center.x} ${center.y} L ${point.x} ${point.y} L ${isTop||isBottom?250:(isLeft?0:500)} ${isLeft||isRight?point.y:(isTop?0:500)}`}
                    />
                )
            })}

        </svg>
    )
}

export default MenuLabel