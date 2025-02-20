import React, { useEffect } from "react";

interface SvgIconProps {
    name: string;         // 图标名称（对应 Iconfont 的 symbol id）
    // className?: string;
    style?: React.CSSProperties;
    x: number;
    y: number;
    size: number
}

const SvgIcon:React.FC<SvgIconProps> = ({ name, x, y, style, size }) =>{
    // 动态加载 iconfont 脚本（同之前方案）
    useEffect(() => {
        const scriptId = 'iconfont-symbol-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js';
            script.id = scriptId;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <g className="icon" style={style}>
            <use  xlinkHref={`#icon-${name}`}  x={x} y={y} width={size} height={size}/>
        </g>
    )
}

export default SvgIcon;