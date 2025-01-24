// src/components/RadialMenu/RadialMenu.tsx
import React, { CSSProperties } from "react";
import {RadialMenuItem} from "@/types/type";

// 类型定义

interface RadialMenuProps {
    items: RadialMenuItem[];
    radius?: number;
    onItemClick?: (item: RadialMenuItem) => void;
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
const describeArc = (
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

const RadialMenu: React.FC<RadialMenuProps> = ({
                                                   items,
                                                   radius = 200,
                                                   onItemClick,
                                                   className,
                                                   style
                                               }) => {
    const center = radius;
    let startAngle = -90; // 起始角度（12点钟方向）

    return (
        <svg
            className={`radial-menu ${className}`}
            style={{
                width: radius * 2,
                height: radius * 2,
                ...style
            }}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
            {items.map((item, index) => {
                const angle = 360 / items.length;
                const endAngle = startAngle + angle;
                const pathD = describeArc(center, center, radius * 0.9, startAngle, endAngle);

                // 计算标签位置
                const labelAngle = startAngle + angle / 2;
                const textPos = polarToCartesian(
                    center,
                    center,
                    radius * 0.6,
                    labelAngle
                );

                const currentStart = startAngle;
                startAngle = endAngle;

                return (
                    <g key={item.value}>
                        <path
                            d={pathD}
                            fill={item.color}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="sector"
                            onClick={() => onItemClick?.(item)}
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
            })}
        </svg>
    );
};

export default RadialMenu;