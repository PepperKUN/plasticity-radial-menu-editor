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

export {RadialMenuItem, point}