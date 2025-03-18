import React, { useRef, useEffect, useState } from "react";
import RadialMenuPie from "@/components/RadialMenu/radialMenuPie";
import MenuLabel from "@/components/menuLabel.tsx";
import {GlobalRadialMenuItem, RadialMenuItem} from "@/types/type";
import {motion, usePresenceData} from "motion/react";


interface IProps {
    menuItem: GlobalRadialMenuItem,
    size: {
        width: number,
        height: number,
    },
}


const variants = {
    enter: (direction: number) => ({
        transform: `translateX(${direction>0?'-100':'100'}%)`,
        // x: direction>0?-20:20,
        opacity: 0,
    }),
    center: {
        transform: "translateX(0%)",
        // x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        transform: `translateX(${direction>0?'100':'-100'}%)`,
        // x: direction>0?20:-20,
        opacity: 0,
    })
}

const OperatedPanel: React.FC<IProps>= ({
    menuItem,
    size,
}) => {

    const direction = usePresenceData()

    // const wrapRef = useRef<HTMLDivElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);

    const [maxWidth, setMaxWidth] = useState<number>(400);

    useEffect(() => {
        const wrapper = nodeRef.current?.parentElement as HTMLElement;
        const menu = nodeRef.current
        if(wrapper&&menu) {
            const calculateStretch = () => {
                const wrapWidth = wrapper.offsetWidth;
                const menuWidth = menu.offsetWidth;
                const stretchedAmount = (wrapWidth - menuWidth)/2;
                setMaxWidth(stretchedAmount);
                // console.log(wrapWidth, menuWidth, stretchedAmount);
            }

            calculateStretch()

            const resizeObserver = new ResizeObserver(calculateStretch)
            resizeObserver.observe(wrapper)

            return () => resizeObserver.disconnect();
        }
    }, []);


    return (
        <motion.div
            // layout
            // key={Math.random()*1000}
            className="radial-wrap"
            ref={nodeRef}
            style={{ width: size.width , height: size.height }}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            // exit='exit'
            transition={{
                type: "spring",
                mass: 0.5,
                stiffness: 300,
                damping: 15,
                duration: 0.2
            }}

        >
            <MenuLabel
                menuItem={menuItem}
                labelMaxWidth={maxWidth}
                size={size}
                radius={180}
                sparsityRatio={0.1}
                spacing={20}
                extendLength={1000}
            />
            <RadialMenuPie items={menuItem.items}/>
            <h2></h2>
        </motion.div>
    );
};

export default OperatedPanel;