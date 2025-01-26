import { CollisionDetection } from '@dnd-kit/core';
import {useContainerStore} from "@/stores/store.ts";
import {convertedObj2Table} from "@/utils/util.ts";

interface Sector {
    cx: number;
    cy: number;
    r: number;
    startAngle: number; // 单位：度
    endAngle: number;
}

/**
 * 判断点 (x, y) 是否在扇形区域内
 */

const isPointInSector = (
    x: number,
    y: number,
    sector: Sector
): boolean => {
    // 转换为圆心相对坐标
    const dx = x - sector.cx;
    const dy = y - sector.cy;

    // 计算距离和角度（正上方为0°，顺时针增加）
    const distance = Math.sqrt(dx * dx + dy * dy);
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // [-180°, 180°] => [-90°, 270°]
    angle = angle < 0 ? angle + 360 : angle; // 转换为 [0°, 360°)

    // 标准化角度范围
    const start = (sector.startAngle+360) % 360;
    let end = (sector.endAngle+360) % 360;
    // if (end < start) end += 360; // 处理跨360°的情况

    console.table(convertedObj2Table({
        angle: angle,
        start: start,
        end: end
    }))

    // 判断逻辑
    return (
        distance <= sector.r && (
            // 情况1：未跨越360°
            (start <= end && angle >= start && angle <= end) ||
            // 情况2：跨越360°（拆分为两段判断）
            (start > end && (angle >= start || angle <= end))
        )
    );
};

export const sectorCollisionDetection: CollisionDetection = ({
                                                                 active,
                                                                 droppableContainers,
                                                                 pointerCoordinates,
                                                             }) => {
    const rect = useContainerStore.getState().rect;
    if (!pointerCoordinates || !rect) return [];

    // 转换为相对坐标
    const relativeX = pointerCoordinates.x - rect.left;
    const relativeY = pointerCoordinates.y - rect.top;



    const targetContainer = droppableContainers
        .filter((container) => {
            const sector = container.data.current?.sector as Sector | undefined;
            if (!sector) return false;

            return isPointInSector(
                relativeX,
                relativeY,
                sector
            );
        })
    console.log('targetContainer:', targetContainer)

    return targetContainer.map((container) => ({ id: container.id }));
};

