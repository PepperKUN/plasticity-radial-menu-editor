import { create } from 'zustand'
import {RadialMenuItem ,listItem} from "@/types/type";

interface MenuItemState {
    menuItems: RadialMenuItem[];
    setMenuItems: (
      updater: RadialMenuItem[] | ((prev: RadialMenuItem[]) => RadialMenuItem[])
    ) => void;
}

interface ListItemState {
    listItems: listItem[];
    setListItems: (
      updater: listItem[] | ((prev: listItem[]) => listItem[])
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
    listItems: [{
        commandType: 'Radial Menus',
        items: []
    },{
        commandType: 'Commands',
        items: [
            { id: 1, label: 'Alternative Duplicate', icon: 'alternative-duplicate', command: 'command:alternative-duplicate', isAdd: false },
            { id: 2, label: 'Boolean', icon: 'boolean', command: 'command:boolean', isAdd: false},
            { id: 3, label: 'Bridge', icon: 'bridge', command: 'command:bridge', isAdd: false},
            { id: 4, label: 'Bridge Curve', icon: 'bridge', command: 'command:bridge-curve', isAdd: false},
            { id: 5, label: 'Bridge Surface', icon: 'bridge', command: 'command:bridge-surface', isAdd: false},
            { id: 6, label: 'Center Box', icon: 'center-box', command: 'command:center-box', isAdd: false},
            { id: 7, label: 'Center Circle', icon: 'center-circle', command: 'command:center-circle', isAdd: false},
            { id: 8, label: 'Center Point Arc', icon: 'center-point-arc', command: 'command:center-point-arc', isAdd: false},
            { id: 9, label: 'Center Rectangle', icon: 'center-rectangle', command: 'command:center-rectangle', isAdd: false},
            { id: 10, label: 'Check', icon: 'check', command: 'command:check', isAdd: false},
            { id: 11, label: 'Complete-Edge', icon: 'complete-edge', command: 'command:complete-edge', isAdd: false},
            { id: 12, label: 'Constrained Surface', icon: 'constrained-surface', command: 'command:constrained-surface', isAdd: false},
            { id: 13, label: 'Control Point Curve', icon: 'control-point-curve', command: 'command:control-point-curve', isAdd: false},
            { id: 14, label: 'Convert Vertex', icon: 'convert-vertex', command: 'command:convert-vertex', isAdd: false},
            { id: 15, label: 'Copy With Placement', icon: 'copy-with-placement', command: 'command:copy-with-placement', isAdd: false},
            { id: 16, label: 'Corner Box', icon: 'corner-box', command: 'command:corner-box', isAdd: false},
            { id: 17, label: 'Corner Rectangle', icon: 'corner-rectangle', command: 'command:corner-rectangle', isAdd: false},
            { id: 18, label: 'Create Outline', icon: 'create-outline', command: 'command:create-outline', isAdd: false},
            { id: 19, label: 'Create Viewspace Construction Plane', icon: 'create-viewspace-construction-plane', command: 'command:create-viewspace-construction-plane', isAdd: false},
            { id: 20, label: 'Create Viewspace Construction Plane Origin', icon: 'create-viewspace-construction-plane', command: 'command:create-viewspace-construction-plane-at-origin', isAdd: false},
            { id: 21, label: 'Curve', icon: 'curve', command: 'command:curve', isAdd: false},
            { id: 22, label: 'Curve Array', icon: 'curve-array', command: 'command:curve-array', isAdd: false},
            { id: 23, label: 'Cut', icon: 'cut', command: 'command:cut', isAdd: false},
            { id: 24, label: 'Cut Curve', icon: 'cut-curve', command: 'command:cut-curve', isAdd: false},
            { id: 25, label: 'Cylinder', icon: 'cylinder', command: 'command:cylinder', isAdd: false},
            { id: 26, label: 'Deform', icon: 'deform', command: 'command:deform', isAdd: false},
            { id: 27, label: 'Delete', icon: 'delete', command: 'command:delete', isAdd: false},
            { id: 28, label: 'Delete Redundant Topology', icon: 'delete-redundant-topology', command: 'command:delete-redundant-topology', isAdd: false},
            { id: 29, label: 'Deselect All', icon: 'deselect-all', command: 'command:deselect-all', isAdd: false},
            { id: 30, label: 'Dimension', icon: 'dimension', command: 'command:dimension', isAdd: false},
            { id: 31, label: 'Dissolve', icon: 'dissolve', command: 'command:dissolve', isAdd: false},
            { id: 32, label: 'Draft Face', icon: 'draft-face', command: 'command:draft-face', isAdd: false},
            { id: 33, label: 'Duplicate', icon: 'duplicate', command: 'command:duplicate', isAdd: false},
            { id: 34, label: 'Export Obj', icon: 'export-obj', command: 'command:export-obj', isAdd: false},
            { id: 35, label: 'Export Stl', icon: 'export-stl', command: 'command:export-stl', isAdd: false},
            { id: 36, label: 'Export 3mf', icon: 'export3mf', command: 'command:export3mf', isAdd: false},
            { id: 37, label: 'Extend', icon: 'extend', command: 'command:extend', isAdd: false},
            { id: 38, label: 'Extrude', icon: 'extrude', command: 'command:extrude', isAdd: false},
            { id: 39, label: 'Fillet', icon: 'fillet', command: 'command:fillet', isAdd: false},
            { id: 40, label: 'Fillet Shell', icon: 'fillet-shell', command: 'command:fillet-shell', isAdd: false},
            { id: 41, label: 'Find Boundary Edges', icon: 'find-boundary-edges', command: 'command:find-boundary-edges', isAdd: false},
            { id: 42, label: 'Freestyle Mirror', icon: 'freestyle-mirror', command: 'command:freestyle-mirror', isAdd: false},
            { id: 43, label: 'Freestyle Move', icon: 'freestyle-move', command: 'command:freestyle-move', isAdd: false},
            { id: 44, label: 'Freestyle Offset Planar Curve', icon: 'freestyle-offset-planar-curve', command: 'command:freestyle-offset-planar-curve', isAdd: false},
            { id: 45, label: 'Freestyle Rotate', icon: 'freestyle-rotate', command: 'command:freestyle-rotate', isAdd: false},
            { id: 46, label: 'Freestyle Scale', icon: 'freestyle-scale', command: 'command:freestyle-scale', isAdd: false},
            { id: 47, label: 'Group Selected', icon: 'group-selected', command: 'command:group-selected', isAdd: false},
            { id: 48, label: 'Hide Selected', icon: 'hide-selected', command: 'command:hide-selected', isAdd: false},
            { id: 49, label: 'Hide Unselected', icon: 'hide-unselected', command: 'command:hide-unselected', isAdd: false},
            { id: 50, label: 'Hollow', icon: 'hollow', command: 'command:hollow', isAdd: false},
            { id: 51, label: 'Imprint', icon: 'imprint', command: 'command:imprint', isAdd: false},
            { id: 52, label: 'Insert Knot', icon: 'insert-knot', command: 'command:insert-knot', isAdd: false},
            { id: 53, label: 'Invert Hidden', icon: 'invert-hidden', command: 'command:invert-hidden', isAdd: false},
            { id: 54, label: 'Invert Selection', icon: 'invert-selection', command: 'command:invert-selection', isAdd: false},
            { id: 55, label: 'Isolate', icon: 'isolate', command: 'command:isolate', isAdd: false},
            { id: 56, label: 'Isoparam', icon: 'isoparam', command: 'command:isoparam', isAdd: false},
            { id: 57, label: 'Join', icon: 'join', command: 'command:join', isAdd: false},
            { id: 58, label: 'Line', icon: 'line', command: 'command:line', isAdd: false},
            { id: 59, label: 'Lock Selected', icon: 'lock-selected', command: 'command:lock-selected', isAdd: false},
            { id: 60, label: 'Loft', icon: 'loft', command: 'command:loft', isAdd: false},
            { id: 61, label: 'Loft Guide', icon: 'loft-guide', command: 'command:loft-guide', isAdd: false},
            { id: 62, label: 'Match Face', icon: 'match-face', command: 'command:match-face', isAdd: false},
            { id: 63, label: 'Measure', icon: 'measure', command: 'command:measure', isAdd: false},
            { id: 64, label: 'Mirror', icon: 'mirror', command: 'command:mirror', isAdd: false},
            { id: 65, label: 'Move', icon: 'move', command: 'command:move', isAdd: false},
            { id: 66, label: 'Offset Curve', icon: 'offset-curve', command: 'command:offset-curve', isAdd: false},
            { id: 67, label: 'Paste With Placement', icon: 'paste-with-placement', command: 'command:paste-with-placement', isAdd: false},
            { id: 68, label: 'Patch', icon: 'patch', command: 'command:patch', isAdd: false},
            { id: 69, label: 'Pipe', icon: 'pipe', command: 'command:pipe', isAdd: false},
            { id: 70, label: 'Place', icon: 'place', command: 'command:place', isAdd: false},
            { id: 71, label: 'Polygon', icon: 'polygon', command: 'command:polygon', isAdd: false},
            { id: 72, label: 'Project', icon: 'project', command: 'command:project', isAdd: false},
            { id: 73, label: 'Push Face', icon: 'push-face', command: 'command:push-face', isAdd: false},
            { id: 74, label: 'Radial Array', icon: 'radial-array', command: 'command:radial-array', isAdd: false},
            { id: 75, label: 'Raise Degree', icon: 'raise-degree', command: 'command:raise-degree', isAdd: false},
            { id: 76, label: 'Rebuild', icon: 'rebuild', command: 'command:rebuild', isAdd: false},
            { id: 77, label: 'Rectangular Array', icon: 'rectangular-array', command: 'command:rectangular-array', isAdd: false},
            { id: 78, label: 'Remove Fillets From Shell', icon: 'remove-fillets-from-shell', command: 'command:remove-fillets-from-shell', isAdd: false},
            { id: 79, label: 'Remove Material', icon: 'remove-material', command: 'command:remove-material', isAdd: false},
            { id: 80, label: 'Remove Nominal Surface', icon: 'remove-nominal-surface', command: 'command:remove-nominal-surface', isAdd: false},
            { id: 81, label: 'Reverse', icon: 'reverse', command: 'command:reverse', isAdd: false},
            { id: 82, label: 'Revolve', icon: 'revolve', command: 'command:revolve', isAdd: false},
            { id: 83, label: 'Rotate', icon: 'rotate', command: 'command:rotate', isAdd: false},
            { id: 84, label: 'Scale', icon: 'scale', command: 'command:scale', isAdd: false},
            { id: 85, label: 'Section Analysis', icon: 'section-analysis', command: 'command:section-analysis', isAdd: false},
            { id: 86, label: 'Select Adjacent', icon: 'select-adjacent', command: 'command:select-adjacent', isAdd: false},
            { id: 87, label: 'Select All', icon: 'select-all', command: 'command:select-all', isAdd: false},
            { id: 88, label: 'Select All Curves', icon: 'select-all-curves', command: 'command:select-all-curves', isAdd: false},
            { id: 89, label: 'Select Next Entity Collection', icon: 'select-next-entity-collection', command: 'command:select-next-entity-collection', isAdd: false},
            { id: 90, label: 'Select Previous Entity Collection', icon: 'select-previous-entity-collection', command: 'command:select-previous-entity-collection', isAdd: false},
            { id: 91, label: 'Set Material', icon: 'set-material', command: 'command:set-material', isAdd: false},
            { id: 92, label: 'Slide', icon: 'slide', command: 'command:slide', isAdd: false},
            { id: 93, label: 'Smart Command', icon: 'smart-command', command: 'command:smart-command', isAdd: false},
            { id: 94, label: 'Sphere', icon: 'sphere', command: 'command:sphere', isAdd: false},
            { id: 95, label: 'Spiral', icon: 'Spiral', command: 'command:spiral', isAdd: false},
            { id: 96, label: 'Split Segment', icon: 'split-segment', command: 'command:split-segment', isAdd: false},
            { id: 97, label: 'Square', icon: 'square', command: 'command:square', isAdd: false},
            { id: 98, label: 'Subdivide', icon: 'subdivide', command: 'command:subdivide', isAdd: false},
            { id: 99, label: 'Sweep', icon: 'sweep', command: 'command:sweep', isAdd: false},
            { id: 100, label: 'Sweep Tool', icon: 'sweep-tool', command: 'command:sweep-tool', isAdd: false},
            { id: 101, label: 'Tangent Arc', icon: 'tangent-arc', command: 'command:tangent-arc', isAdd: false},
            { id: 102, label: 'Tangent Circle', icon: 'tangent-circle', command: 'command:tangent-circle', isAdd: false},
            { id: 103, label: 'Text', icon: 'text', command: 'command:text', isAdd: false},
            { id: 104, label: 'Thicken', icon: 'thicken', command: 'command:thicken', isAdd: false},
            { id: 105, label: 'Three Point Arc', icon: 'three-point-arc', command: 'command:three-point-arc', isAdd: false},
            { id: 106, label: 'Three Point Box', icon: 'three-point-box', command: 'command:three-point-box', isAdd: false},
            { id: 107, label: 'Three Point Circle', icon: 'three-point-circle', command: 'command:three-point-circle', isAdd: false},
            { id: 108, label: 'Three Point Rectangle', icon: 'three-point-rectangle', command: 'command:three-point-rectangle', isAdd: false},
            { id: 109, label: 'Toggle Point', icon: 'toggle-points', command: 'command:toggle-points', isAdd: false},
            { id: 110, label: 'Trim', icon: 'trim', command: 'command:trim', isAdd: false},
            { id: 111, label: 'Two Point Circle', icon: 'two-point-circle', command: 'command:two-point-circle', isAdd: false},
            { id: 112, label: 'Ungroup Selected', icon: 'ungroup-selected', command: 'command:ungroup-selected', isAdd: false},
            { id: 113, label: 'Unhide All', icon: 'unhide-all', command: 'command:unhide-all', isAdd: false},
            { id: 114, label: 'Unisolate', icon: 'unisolate', command: 'command:unisolate', isAdd: false},
            { id: 115, label: 'Unjoin', icon: 'unjoin', command: 'command:unjoin', isAdd: false},
            { id: 116, label: 'Untrim', icon: 'untrim', command: 'command:untrim', isAdd: false},
            { id: 117, label: 'Unwrap Face', icon: 'unwrap-face', command: 'command:unwrap-face', isAdd: false},
            { id: 118, label: 'Xnurbs', icon: 'xnurbs', command: 'command:xnurbs', isAdd: false},
        ]
    },{
        commandType: 'Construction Plane',
        items: [
            { id: 119, label: 'create construction plane', icon: 'create-viewspace-construction-plane', command: 'command:create-viewspace-construction-plane', isAdd: false},
            { id: 120, label: 'create construction plane at origin', icon: 'create-viewspace-construction-plane-at-origin', command: 'command:create-viewspace-construction-plane-at-origin', isAdd: false},
            { id: 121, label: 'Reset construction plane', icon: 'reset', command: 'viewport:cplane:reset', isAdd: false},
            { id: 122, label: 'Set construction plane to selection', icon: 'selection', command: 'viewport:cplane:selection', isAdd: false},
        ]
    },{
        commandType: 'File',
        items: [
            { id: 123, label: 'File: export', icon: 'file-export', command: 'file:export', isAdd: false},
            { id: 124, label: 'File: import', icon: 'file-import', command: 'file:import', isAdd: false},
            { id: 125, label: 'File: new', icon: 'file-new', command: 'file:new', isAdd: false},
            { id: 126, label: 'File: open', icon: 'file-open', command: 'file:open', isAdd: false},
            { id: 127, label: 'File: quick save version', icon: 'file-save-version', command: 'file:save-version', isAdd: false},
            { id: 128, label: 'File: save', icon: 'file-save', command: 'file:save', isAdd: false},
            { id: 129, label: 'File: save as', icon: 'file-save-as', command: 'file:save-as', isAdd: false},
            { id: 130, label: 'File: save as startup', icon: 'file-save-as-startup', command: 'file:save-as-startup', isAdd: false},
        ]
    },{
        commandType: 'Snaps',
        items: [
            { id: 131, label: 'Grid: decrease grid size', icon: 'grid-decrease-grid-size', command: 'viewport:grid:decr', isAdd: false},
            { id: 132, label: 'Grid: increase grid size', icon: 'grid-increase-grid-size', command: 'viewport:grid:incr', isAdd: false},
            { id: 133, label: 'Grid: toggle grid snapping', icon: 'snaps-toggle-grid', command: 'snaps:toggle-grid', isAdd: false},
            { id: 134, label: 'Toggle object snapping', icon: 'snaps-toggle-snap', command: 'snaps:toggle-snap', isAdd: false},
        ]
    },{
        commandType: 'Misc',
        items: [
            { id: 135, label: 'New window', icon: 'app-new-window', command: 'app:new-window', isAdd: false},
            { id: 136, label: 'Quit', icon: 'app-quit', command: 'app:quit', isAdd: false},
            { id: 137, label: 'Repeat last command', icon: 'edit-repeat-last-command', command: 'edit:repeat-last-command', isAdd: false},
            { id: 138, label: 'Sidebar: toggle left', icon: 'sidebar-toggle-left', command: 'view:sidebar:toggle-left', isAdd: false},
            { id: 139, label: 'Sidebar: toggle right', icon: 'sidebar-toggle-right', command: 'view:sidebar:toggle-right', isAdd: false},
        ]
    },{
        commandType: 'Orbit',
        items: [
            { id: 140, label: 'Orbit: dolly in', icon: 'orbit-dolly-in', command: 'orbit:dolly:in', isAdd: false},
            { id: 141, label: 'Orbit: dolly out', icon: 'orbit-dolly-out', command: 'orbit:dolly:out', isAdd: false},
            { id: 142, label: 'Orbit: pan down', icon: 'Orbit-pan-down', command: 'orbit:pan:down', isAdd: false},
            { id: 143, label: 'Orbit: pan left', icon: 'Orbit-pan-left', command: 'orbit:pan:left', isAdd: false},
            { id: 144, label: 'Orbit: pan right', icon: 'Orbit-pan-right', command: 'orbit:pan:right', isAdd: false},
            { id: 145, label: 'Orbit: pan up', icon: 'Orbit-pan-up', command: 'orbit:pan:up', isAdd: false},
            { id: 146, label: 'Orbit: rotate down', icon: 'Orbit-pan-up', command: 'orbit:pan:up', isAdd: false},
            { id: 147, label: 'Orbit: rotate left', icon: 'Orbit-rotate-left', command: 'orbit:rotate:left', isAdd: false},
            { id: 148, label: 'Orbit: rotate right', icon: 'Orbit-rotate-right', command: 'orbit:rotate:right', isAdd: false},
            { id: 149, label: 'Orbit: rotate up', icon: 'Orbit-rotate-up', command: 'orbit:rotate:up', isAdd: false},
        ]
    },{
        commandType: 'Selection',
        items: [
            { id: 150, label: 'Selection mode: set all', icon: 'selection-mode-set-all', command: 'selection:mode:set:all', isAdd: false},
            { id: 151, label: 'Selection mode: set control-point', icon: 'selection-mode-control-point', command: 'selection:mode:set:control-point', isAdd: false},
            { id: 152, label: 'Selection mode: set edge', icon: 'selection-mode-set-edge', command: 'selection:mode:set:edge', isAdd: false},
            { id: 153, label: 'Selection mode: set face', icon: 'selection-mode-set-face', command: 'selection:mode:set:face', isAdd: false},
            { id: 154, label: 'Selection mode: set solid', icon: 'selection-mode-set-solid', command: 'selection:mode:set:solid', isAdd: false},
            { id: 155, label: 'Selection: convert to control-points', icon: 'selection-convert-control-point', command: 'selection:convert:control-point', isAdd: false},
            { id: 156, label: 'Selection: convert to edges', icon: 'selection-convert-edge', command: 'selection:convert:edge', isAdd: false},
            { id: 157, label: 'Selection: convert to faces', icon: 'selection-convert-face', command: 'selection:convert:face', isAdd: false},
            { id: 158, label: 'Selection: convert to groups', icon: 'selection-convert-group-children', command: 'selection:convert:group-children', isAdd: false},
            { id: 159, label: 'Selection: convert to solids', icon: 'selection-convert-solid', command: 'selection:convert:solid', isAdd: false},
            { id: 160, label: 'Selection: toggle control-point', icon: 'selection-toggle-control-point', command: 'selection:toggle:control-point', isAdd: false},
            { id: 161, label: 'Selection: toggle edge', icon: 'selection-toggle-edge', command: 'selection:toggle:edge', isAdd: false},
            { id: 162, label: 'Selection: toggle face', icon: 'selection-toggle-face', command: 'selection:toggle:face', isAdd: false},
            { id: 163, label: 'Selection: toggle solid', icon: 'selection-toggle-solid', command: 'selection:toggle:solid', isAdd: false},
        ]
    },{
        commandType: 'Viewport',
        items: [
            { id: 164, label: 'Viewport: focus', icon: 'viewport-focus', command: 'viewport:focus', isAdd: false},
            { id: 165, label: 'Viewport: navigate to back', icon: 'viewport-navigate-back', command: 'viewport:navigate:back', isAdd: false},
            { id: 166, label: 'Viewport: navigate to bottom', icon: 'viewport-navigate-bottom', command: 'viewport:navigate:bottom', isAdd: false},
            { id: 167, label: 'Viewport: navigate to front', icon: 'viewport-navigate-front', command: 'viewport:navigate:front', isAdd: false},
            { id: 168, label: 'Viewport: navigate to left', icon: 'viewport-navigate-left', command: 'viewport:navigate:left', isAdd: false},
            { id: 169, label: 'Viewport: navigate to right', icon: 'viewport-navigate-right', command: 'viewport:navigate:right', isAdd: false},
            { id: 170, label: 'Viewport: navigate to selection', icon: 'viewport-navigate-selection', command: 'viewport:navigate:selection', isAdd: false},
            { id: 171, label: 'Viewport: navigate to top', icon: 'viewport-navigate-top', command: 'viewport:navigate:top', isAdd: false},
            { id: 172, label: 'Viewport: navigate to top', icon: 'viewport-navigate-top', command: 'viewport:navigate:top', isAdd: false},
            { id: 173, label: 'Viewport: toggle curves', icon: 'viewport-toggle-curves', command: 'viewport:toggle-curves', isAdd: false},
            { id: 174, label: 'Viewport: toggle edges', icon: 'viewport-toggle-edges', command: 'viewport:toggle-edges', isAdd: false},
            { id: 175, label: 'Viewport: toggle faces', icon: 'viewport-toggle-faces', command: 'viewport:toggle-faces', isAdd: false},
            { id: 176, label: 'Viewport: toggle orthographic camera', icon: 'viewport-toggle-orthographic', command: 'viewport:toggle-orthographic', isAdd: false},
            { id: 177, label: 'Viewport: toggle overlays', icon: 'viewport-toggle-overlays', command: 'viewport:toggle-overlays', isAdd: false},
            { id: 178, label: 'Viewport: toggle render mode', icon: 'viewport-toggle-render-mode', command: 'viewport:toggle-render-mode', isAdd: false},
            { id: 179, label: 'Viewport: toggle x ray', icon: 'viewport-toggle-x-ray', command: 'viewport:toggle-x-ray', isAdd: false},
        ]
    }],
    setListItems: (updater: listItem[] | ((prev: listItem[]) => listItem[])) =>
        set((state) => ({
          listItems: typeof updater === 'function' ? updater(state.listItems) : updater,
    })),
}))

const useContainerStore = create<ContainerState>((set) => ({
    rect: null,
    setRect: (rect) => set({ rect }),
}));

export {useMenuItemStore, useContainerStore, useListItemStore}