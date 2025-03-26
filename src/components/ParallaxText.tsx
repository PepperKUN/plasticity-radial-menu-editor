import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, wrap } from "motion/react";

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    className?: string
}

const ParallaxText:React.FC<ParallaxProps>  = ({
    className,
    children,
    baseVelocity=1
}) => {


    const baseX = useMotionValue(0);
    const velocityFactor = useTransform(baseX, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(6.25, -6.25, v)}%`);

    const directionFactor = useRef(1);

    // 使用useSpring来平滑过渡baseVelocity的变化
    const animatedVelocity = useSpring(baseVelocity, {
        stiffness: 300,
        damping: 50,
    });

    useAnimationFrame((_, delta) => {
        let moveBy = directionFactor.current * animatedVelocity.get() * (delta / 2000);
        
        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
        */
       if (velocityFactor.get() < 0) {
           directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }
        
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        
        baseX.set(baseX.get() + (directionFactor.current * moveBy));
    });

    useEffect(() => {
        animatedVelocity.set(baseVelocity)
    }, [baseVelocity, animatedVelocity])

    return (
        <motion.div className={`flex rotate-[-15deg] whitespace-nowrap ${className}`} style={{ x }}>
            {Array.from({length: 8}).map((_, index) => (
                <React.Fragment key={index}>
                    <span className="mx-4 uppercase">{children}</span>
                </React.Fragment>
            ))}
        </motion.div>
    )
}

export default ParallaxText;