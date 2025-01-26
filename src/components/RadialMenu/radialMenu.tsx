// src/components/RadialMenu/RadialMenu.tsx
import React, { CSSProperties, useRef, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMenuItemStore, useContainerStore } from "@/stores/store.ts";
import { RadialMenuItem } from "@/types/type";
import { sectorCollisionDetection } from "@/utils/dnd.ts";
import { throttle } from 'lodash-es';
import './RadialMenu.scss'

// 类型定义

interface RadialMenuProps {
    items: RadialMenuItem[];
    radius?: number;
    onItemClick?: (item: RadialMenuItem) => void;
    onItemsChange?: (items: RadialMenuItem[]) => void;
    className?: string;
    style?: CSSProperties;
}

// 极坐标转笛卡尔坐标
const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
): { x: number; y: number } => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad)
    };
};

// 生成扇形路径描述
const describeSector = (
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
): string => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", x, y,
        "L", start.x, start.y,
        "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
    ].join(" ");
};

//截取圆中心到边长的直线
const describeLine = (
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
):string => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);

    return [
        "M", start.x, start.y,
        "L", x, y,
        "L", end.x, end.y,
    ].join(" ");
}

//截取圆弧路径
const describleArc = (
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number,
): string => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
    ].join(" ");
};

// 可拖拽的扇区组件
const SortableSector: React.FC<{
    item: RadialMenuItem;
    radius: number;
    startAngle: number;
    endAngle: number;
    outerWidth: number;
    onItemClick?: (item: RadialMenuItem) => void;
}> = ({ item, radius, startAngle, endAngle, outerWidth, onItemClick }) => {
    const center = radius;
    const pathD = describeSector(center, center, radius - outerWidth, startAngle, endAngle);
    const pathL = describeLine(center, center, radius - outerWidth, startAngle, endAngle);
    const pathA = describleArc(center, center, radius - outerWidth/2, startAngle, endAngle);
    const pathA2 = describleArc(center, center, radius - outerWidth + 2, startAngle, endAngle);
    const labelAngle = startAngle + (endAngle - startAngle) / 2;
    const textPos = polarToCartesian(center, center, radius * 0.7, labelAngle);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: item.value,
        data: {
            sector: {
                cx: center,        // 圆心 X
                cy: center,        // 圆心 Y
                r: radius - outerWidth,   // 扇形半径（留出边缘空隙）
                startAngle,        // 起始角度
                endAngle           // 结束角度
            }
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        outline: "none",
    };

    return (
        <g ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <path
                d={pathA}
                strokeWidth={outerWidth}
                stroke="#ffffff"
                fill="none"
                className="sector_arc"
            />
            <path
                d={pathA2}
                strokeWidth={6}
                stroke="#000000"
                fill="none"
                className="sector_arc"
            />
            <path
                d={pathD}
                fill={item.color}
                className="sector"
                onClick={() => onItemClick?.(item)}
            />
            <path
                d={pathL}
                strokeWidth="1"
                stroke="#ffffff"
                fill="none"
                className="sector_line"
            />
            <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="menu-label"
            >
                {item.label}
            </text>
        </g>
    );
};


const RadialMenu: React.FC<RadialMenuProps> = ({
                                                   radius = 200,
                                                   onItemClick,
                                                   onItemsChange,
                                                   className,
                                                   style
                                               }) => {
    const { menuItems, setMenuItems } = useMenuItemStore();
    const containerRef = useRef<SVGAElement>(null);
    const setRect = useContainerStore((state) => state.setRect);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 节流更新函数
        const updateRect = throttle(() => {
            const rect = container.getBoundingClientRect();
            setRect(rect);
        }, 100);

        // 初始测量
        updateRect();

        // 监听变化
        const resizeObserver = new ResizeObserver(updateRect);
        resizeObserver.observe(container);

        window.addEventListener('scroll', updateRect, { passive: true });
        window.addEventListener('resize', updateRect);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', updateRect);
            window.removeEventListener('resize', updateRect);
        };
    }, [setRect]);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = menuItems.findIndex((item) => item.value === active.id);
            const newIndex = menuItems.findIndex((item) => item.value === over?.id);


            // 直接交换元素位置
            const newItems = [...menuItems];
            [newItems[oldIndex], newItems[newIndex]] =
                [newItems[newIndex], newItems[oldIndex]];

            // // 列表变动
            // const newItems = arrayMove(menuItems, oldIndex, newIndex);


            setMenuItems(newItems);
            onItemsChange?.(newItems);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={sectorCollisionDetection}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={menuItems}>
                <svg
                    ref={containerRef}
                    className={`radial-menu ${className?className:''}`}
                    style={{
                        width: radius * 2,
                        height: radius * 2,
                        ...style
                    }}
                    viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                >
                    {menuItems.map((item, index) => {
                        const angle = 360 / menuItems.length;
                        const startAngle = -angle/2  + index * angle;
                        const endAngle = startAngle + angle;

                        return (
                            <SortableSector
                                key={item.value}
                                item={item}
                                radius={radius}
                                startAngle={startAngle}
                                endAngle={endAngle}
                                outerWidth={12}
                                onItemClick={onItemClick}
                            />
                        );
                    })}
                    <circle cx={radius} cy={radius} r="68" />
                </svg>
            </SortableContext>
        </DndContext>
    );
};

export default RadialMenu;