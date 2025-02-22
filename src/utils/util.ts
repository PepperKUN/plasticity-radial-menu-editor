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

export { convertedObj2Table, polarToCartesian };