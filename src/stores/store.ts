import { create } from 'zustand'
import {RadialMenuItem} from "@/types/type";

interface MenuItemState {
    menuItems: RadialMenuItem[];
    setMenuItems: (
      updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])
    ) => void;
}

interface ContainerState {
    rect: DOMRect | null;
    setRect: (rect: DOMRect) => void;
}

const useMenuItemStore = create<MenuItemState>((set) => ({
    menuItems: [
        { id: 1, label: 'Home', color: '#4ECDC4', icon: 'home', command: '' },
        { id: 2, label: 'Settings', color: '#45B7D1', icon: 'settings', command: ''},
        { id: 3, label: 'Profile', color: '#FF6B6B', icon: 'profile', command: ''},
    ],
    setMenuItems: (updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])) =>
        set((state) => ({
          menuItems: typeof updater === 'function' ? updater(state.menuItems) : updater,
    })),
}))

const useContainerStore = create<ContainerState>((set) => ({
    rect: null,
    setRect: (rect) => set({ rect }),
}));

export {useMenuItemStore, useContainerStore}