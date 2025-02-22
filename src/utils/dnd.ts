import { CollisionDetection } from '@dnd-kit/core';
import {useContainerStore} from "@/stores/store.ts";
// import {convertedObj2Table} from "@/utils/util.ts";

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
    // const offestAngle = (sector.endAngle - sector.startAngle)/2
    const start = (sector.startAngle + 360) % 360;
    const end = (sector.endAngle + 360) % 360;

    //判断逻辑
    return (
        distance>=68 && distance <= (sector.r+200) && (
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

    const activeSector = active.data.current?.sector
    let distance = -1;
    if(activeSector) {
        const dx = relativeX - activeSector.cx;
        const dy = relativeY - activeSector.cy;
        distance = Math.sqrt(dx * dx + dy * dy);
    }



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
    // console.log('targetContainer:', targetContainer, {relativeX,relativeY}, distance);

    if(targetContainer.length>0) {
        // console.log(targetContainer.map((container) => ({ id: container.id })))
        return targetContainer.map((container) => ({ id: container.id }));
    } else if (distance >0 && distance < 68 ) {
        return [{id: 'trashBin'}];
    } else {
        // console.log(1)
        return []
    }
};

