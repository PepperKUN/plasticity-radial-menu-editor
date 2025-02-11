import React, {useState, CSSProperties} from "react";
import { useDraggable } from "@dnd-kit/core";
import { RadialMenuItem } from "@/types/type";

const DraggableItem = ( {id, children} ) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id:id,
    })
    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            {children}
        </div>
    )
}
const CommandList:React.FC<{
    items: RadialMenuItem[]
}> =  ({items}) => {
    return (
        <div style={{ display: "flex", flexDirection: 'column', padding: 16}}>
            {items.map((item) => (
                <DraggableItem key={item.id} id={item.id}>
                    <div style={{userSelect: 'none'}}>{item.label}</div>
                </DraggableItem>
            ))}
        </div>
    )
}

export default CommandList;