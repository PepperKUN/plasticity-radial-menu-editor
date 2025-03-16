interface RadialMenuItem {
    id: number | string;
    label: string;
    icon: string;
    command: string;
    color?: string;
    isAdd?: boolean;
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

export {RadialMenuItem, GlobalRadialMenuItem, point, listItem}