import { create } from 'zustand'
import {RadialMenuItem} from "@/types/type";

interface MenuItemState {
    menuItems: RadialMenuItem[];
    setMenuItems: (
      updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])
    ) => void;
}

interface ListItemState {
    listItems: RadialMenuItem[];
    setListItems: (
      updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])
    ) => void;
}

interface ContainerState {
    rect: DOMRect | null;
    setRect: (rect: DOMRect) => void;
}

const useMenuItemStore = create<MenuItemState>((set) => ({
    menuItems: [
        { id: 'radMenu-1', label: 'Home', color: '#4ECDC4', icon: 'home', command: '' },
        { id: 'radMenu-2', label: 'Settings', color: '#45B7D1', icon: 'settings', command: ''},
        { id: 'radMenu-3', label: 'Profile', color: '#FF6B6B', icon: 'profile', command: ''},
    ],
    setMenuItems: (updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])) =>
        set((state) => ({
          menuItems: typeof updater === 'function' ? updater(state.menuItems) : updater,
    })),
}))

const useListItemStore = create<ListItemState>((set) => ({
    listItems: [
        { id: 4, label: 'Home1', icon: 'home', command: '', isAdd: false },
        { id: 5, label: 'Settings2', icon: 'settings', command: '', isAdd: false},
        { id: 6, label: 'Profile3', icon: 'profile', command: '', isAdd: false},
    ],
    setListItems: (updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])) =>
        set((state) => ({
          listItems: typeof updater === 'function' ? updater(state.listItems) : updater,
    })),
}))

const useContainerStore = create<ContainerState>((set) => ({
    rect: null,
    setRect: (rect) => set({ rect }),
}));

export {useMenuItemStore, useContainerStore, useListItemStore}