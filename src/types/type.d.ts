interface RadialMenuItem {
    id: number | string;
    label: string;
    color: string;
    icon: string;
    command: string;
}

interface point {
    x: number;
    y: number;
}

export {RadialMenuItem, point}