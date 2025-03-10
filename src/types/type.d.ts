interface RadialMenuItem {
    id: number | string;
    label: string;
    icon: string;
    command: string;
    color?: string;
    isAdd?: boolean;
}

interface point {
    x: number;
    y: number;
}

interface listItem {
    commandType: string,
    items: RadialMenuItem[]
}

export {RadialMenuItem, point, listItem}