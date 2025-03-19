interface RadialMenuItem {
    id: number | string;
    label: string;
    icon: string;
    command: string;
    color?: string;
    isAdd?: boolean;
}

interface flatListItem extends RadialMenuItem {
    type: string;
}

interface GlobalRadialMenuItem {
    name: string;
    command: string;
    items: RadialMenuItem[]
}

interface point {
    x: number;
    y: number;
}

interface listItem {
    commandType: string,
    items: RadialMenuItem[]
}

type strictTuple = [number, (number|string)?]

export {RadialMenuItem, GlobalRadialMenuItem, point, listItem, strictTuple, flatListItem}