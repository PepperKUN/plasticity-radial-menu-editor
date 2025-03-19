import React, { useEffect } from "react";

interface SvgIconProps {
    name: string;         // 图标名称（对应 Iconfont 的 symbol id）
    // className?: string;
    inSvg?: boolean;
    style?: React.CSSProperties;
    x?: number;
    y?: number;
    size?: number
}

const SvgIcon:React.FC<SvgIconProps> = ({
                                            name,
                                            inSvg,
                                            x=0,
                                            y=0,
                                            style,
                                            size=16,
}) =>{
    // 动态加载 iconfont 脚本（同之前方案）
    useEffect(() => {
        const scriptId = 'iconfont-symbol-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = '/static/iconfont/font.js';
            script.id = scriptId;
            document.body.appendChild(script);
        }
    }, []);

    const core = (
        <g className="icon" style={style}>
            <use xlinkHref={`#icon-${name}`} x={x} y={y} width={size} height={size}/>
        </g>
    )


    return (
        inSvg?core : <svg width={size} height={size}>{core}</svg>
    )
}

export default SvgIcon;