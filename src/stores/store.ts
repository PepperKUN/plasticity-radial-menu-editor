import { create } from 'zustand'
import {RadialMenuItem} from "@/types/type";

interface MenuItemState {
    menuItems: RadialMenuItem[];
    setMenuItems: (newMenuItems:RadialMenuItem[])=>void;
}

interface ContainerState {
    rect: DOMRect | null;
    setRect: (rect: DOMRect) => void;
}

const useMenuItemStore = create<MenuItemState>((set) => ({
    menuItems: [
        { label: 'Home', color: '#4ECDC4', value: 'home' },
        { label: 'Settings', color: '#45B7D1', value: 'settings' },
        { label: 'Profile', color: '#FF6B6B', value: 'profile' },
    ],
    setMenuItems: (newMenuItems:RadialMenuItem[]) => set(()=>({menuItems: newMenuItems})),
}))

const useContainerStore = create<ContainerState>((set) => ({
    rect: null,
    setRect: (rect) => set({ rect }),
}));

export {useMenuItemStore, useContainerStore}