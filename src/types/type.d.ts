interface RadialMenuItem {
    id: number | string;
    label: string;
    icon: string;
    command: string;
    label_zh?: string;
    color?: string;
    isAdd?: boolean;
}

interface flatListItem extends RadialMenuItem {
    type: string;
    label_pinyin: string;
    type_pinyin: string;
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
    commandType_zh: string,
    items: RadialMenuItem[]
}

interface IconGroup {
    generalIcon: string;
    items: string[];
}

type strictTuple = [number, (number|string)?]

export {RadialMenuItem, GlobalRadialMenuItem, point, listItem, strictTuple, flatListItem, IconGroup}