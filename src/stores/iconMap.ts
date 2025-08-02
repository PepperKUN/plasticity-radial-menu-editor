import {IconGroup} from '@/types/type'
export const ICON_MAP = Object.freeze([
    {
        generalIcon: 'bridge',
        items: ['bridge-curve', 'bridge-surface']
    },{
        generalIcon: 'create-viewspace-construction-plane',
        items: ['create-viewspace-construction-plane', 'create-viewspace-construction-plane-at-origin', 'create-construction-plane', 'create-construction-plane-at-origin']
    },{
        generalIcon: 'complete-edge',
        items: ['extend']
    },{
        generalIcon: 'fillet',
        items: ['fillet-shell']
    },{
        generalIcon: 'loft',
        items: ['loft-guide']
    },{
        generalIcon: 'freestyle-move',
        items: ['move']
    },{
        generalIcon: 'rotate',
        items: ['freestyle-rotate']
    },{
        generalIcon: 'freestyle-scale',
        items: ['scale']
    },{
        generalIcon: 'sweep',
        items: ['sweep-tool']
    },{
        generalIcon: 'reset',
        items: ['selection', 'viewport-toggle-overlays']
    },{
        generalIcon: 'file-import',
        items: ['file-open']
    },{
        generalIcon: 'file-save',
        items: ['file-save-version', 'file-save-as', 'file-save-as-startup']
    },{
        generalIcon: 'selection-mode-set-control-point',
        items: ['selection-convert-control-point', 'selection-toggle-control-point']
    },{
        generalIcon: 'selection-mode-set-edge',
        items: ['selection-convert-edge', 'viewport-toggle-curves', 'viewport-toggle-edges', 'selection-toggle-edge']
    },{
        generalIcon: 'selection-mode-set-face',
        items: ['selection-convert-face', 'selection-toggle-face', 'viewport-toggle-faces']
    },{
        generalIcon: 'selection-mode-set-solid',
        items: ['selection-convert-solid', 'selection-toggle-solid']
    },{
        generalIcon: 'viewport-focus',
        items: ['viewport-navigate-selection']
    },{
        generalIcon: 'selection-mode-set-all',
        items: ['selection-convert-group-children']
    },{
        generalIcon: 'set-material',
        items: ['set-material', 'fork-material']
    },{
        generalIcon: 'others',
        items: ['select-all-measurements', 'select-all-sheets', 'select-all-solids', 'unlock-all']
    }
]) as IconGroup[]