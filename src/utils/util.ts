import {CollisionDetection, Modifier, DropAnimation, DropAnimationFunction} from '@dnd-kit/core';
import {useContainerStore} from "@/stores/store.ts";


const convertedObj2Table = (originalData:object) => Object.entries(originalData).map(([key, value]) => ({
    '属性名称': key,
    '值': value
}));

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
    sector: Sector,
    sortDisComp: number,
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
        distance>=68 && distance <= (sector.r+sortDisComp) && (
            // 情况1：未跨越360°
            (start <= end && angle >= start && angle <= end) ||
            // 情况2：跨越360°（拆分为两段判断）
            (start > end && (angle >= start || angle <= end))
        )
    );
};

const sectorCollisionDetection: CollisionDetection = ({
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
                sector,
                active.data.current?.sortable?200:0 //sortables时中心距离补偿
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

const radiusConstraint = ({x, y, cx, cy, radius}:{x: number, y: number, cx: number, cy: number, radius: number}) => {
    // 约束坐标到圆形区域
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (distance > radius) {
        const angle = Math.atan2(dy, dx);
        x = Math.round(cx + radius * Math.cos(angle));
        y = Math.round(cy + radius * Math.sin(angle));
    }
    // console.log({
    //     x: x,
    //     y: y,
    // })
    return {
        x: x,
        y: y,
    }
}


const rotateAround:Modifier = ({
                                   transform,
                                   windowRect,

                               }) => {
    // console.log(windowRect)

    return {
        ...transform,
        // x: 0,
        // y: 0
    }

}

const customDropAnimation: DropAnimationFunction = (args) => {
    console.log('args:', args);
}




export { convertedObj2Table, polarToCartesian, sectorCollisionDetection, rotateAround, customDropAnimation, radiusConstraint };