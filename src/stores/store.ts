import { create } from 'zustand'
import { GlobalRadialMenuItem, listItem} from "@/types/type";

interface GlobalRadialMenuState {
    globalMenuItems: GlobalRadialMenuItem[];
    setGlobalMenuItems: (
        updater: GlobalRadialMenuItem[] | ((prev: GlobalRadialMenuItem[]) => GlobalRadialMenuItem[])
    ) => void
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

const useGlobalMenuItemStore = create<GlobalRadialMenuState>((set) => ({
    globalMenuItems: [
        {
            name: 'Default Menu',
            command: 'user:default-menu',
            items: [
                { id: 'radMenu-151', label: 'Selection mode: set control-point', label_zh:"选择模式：设置控制点", icon: 'selection-mode-set-control-point', command: 'selection:mode:set:control-point' },
                { id: 'radMenu-152', label: 'Selection mode: set edge', label_zh:"选择模式：设置边", icon: 'selection-mode-set-edge', command: 'selection:mode:set:edge' },
                { id: 'radMenu-153', label: 'Selection mode: set face', label_zh:"选择模式：设置面", icon: 'selection-mode-set-face', command: 'selection:mode:set:face' },
                { id: 'radMenu-154', label: 'Selection mode: set solid', label_zh:"选择模式：设置实体", icon: 'selection-mode-set-solid', command: 'selection:mode:set:solid' },
            ]
        }
    ],
    setGlobalMenuItems: (updater)=>
        set((state) => ({
            globalMenuItems: typeof  updater === 'function' ? updater(state.globalMenuItems): updater
        })),
}))

const useListItemStore = create<ListItemState>((set) => ({
    listItems: [{
        commandType: 'Radial Menus',
        commandType_zh: '环形菜单类',
        items: []
    },{
        commandType: 'Commands',
        commandType_zh: '命令类',
        items: [
            { id: 1, label: 'Alternative Duplicate', icon: 'alternative-duplicate', command: 'command:alternative-duplicate', label_zh:"选择复制/替代副本", isAdd: false },
            { id: 2, label: 'Boolean', icon: 'boolean', command: 'command:boolean', label_zh:"布尔", isAdd: false},
            { id: 3, label: 'Bridge', icon: 'bridge', command: 'command:bridge', label_zh:"桥接", isAdd: false},
            { id: 4, label: 'Bridge Curve', icon: 'bridge', command: 'command:bridge-curve', label_zh:"桥接曲线", isAdd: false},
            { id: 5, label: 'Bridge Surface', icon: 'bridge', command: 'command:bridge-surface', label_zh:"桥接曲面", isAdd: false},
            { id: 6, label: 'Center Box', icon: 'center-box', command: 'command:center-box', label_zh:"中心盒体", isAdd: false},
            { id: 7, label: 'Center Circle', icon: 'center-circle', command: 'command:center-circle', label_zh:"中心圆", isAdd: false},
            { id: 8, label: 'Center Point Arc', icon: 'center-point-arc', command: 'command:center-point-arc', label_zh:"中心点圆弧", isAdd: false},
            { id: 9, label: 'Center Rectangle', icon: 'center-rectangle', command: 'command:center-rectangle', label_zh:"中心矩形", isAdd: false},
            { id: 10, label: 'Check', icon: 'check', command: 'command:check', label_zh:"检查", isAdd: false},
            { id: 11, label: 'Complete-Edge', icon: 'complete-edge', command: 'command:complete-edge', label_zh:"完整边线", isAdd: false},
            { id: 12, label: 'Constrained Surface', icon: 'constrained-surface', command: 'command:constrained-surface', label_zh:"约束曲面", isAdd: false},
            { id: 13, label: 'Control Point Curve', icon: 'control-point-curve', command: 'command:control-point-curve', label_zh:"控制点曲线", isAdd: false},
            { id: 14, label: 'Convert Vertex', icon: 'convert-vertex', command: 'command:convert-vertex', label_zh:"转换顶点", isAdd: false},
            { id: 15, label: 'Copy With Placement', icon: 'copy-with-placement', command: 'command:copy-with-placement', label_zh:"带位置复制", isAdd: false},
            { id: 16, label: 'Corner Box', icon: 'corner-box', command: 'command:corner-box', label_zh:"角点长方体", isAdd: false},
            { id: 17, label: 'Corner Rectangle', icon: 'corner-rectangle', command: 'command:corner-rectangle', label_zh:"角点矩形", isAdd: false},
            { id: 18, label: 'Create Outline', icon: 'create-outline', command: 'command:create-outline', label_zh:"创建轮廓", isAdd: false},
            { id: 19, label: 'Create Viewspace Construction Plane', icon: 'create-viewspace-construction-plane', command: 'command:create-viewspace-construction-plane', label_zh:"创建视图空间构造平面", isAdd: false},
            { id: 20, label: 'Create Viewspace Construction Plane Origin', icon: 'create-viewspace-construction-plane', command: 'command:create-viewspace-construction-plane-at-origin', label_zh:"在原点创建视图空间构造平面", isAdd: false},
            { id: 21, label: 'Curve', icon: 'curve', command: 'command:curve', label_zh:"曲线", isAdd: false},
            { id: 22, label: 'Curve Array', icon: 'curve-array', command: 'command:curve-array', label_zh:"曲线阵列", isAdd: false},
            { id: 23, label: 'Cut', icon: 'cut', command: 'command:cut', label_zh:"剪切", isAdd: false},
            { id: 24, label: 'Cut Curve', icon: 'cut-curve', command: 'command:cut-curve', label_zh:"剪切曲线", isAdd: false},
            { id: 25, label: 'Cylinder', icon: 'cylinder', command: 'command:cylinder', label_zh:"圆柱体", isAdd: false},
            { id: 26, label: 'Deform', icon: 'deform', command: 'command:deform', label_zh:"变形", isAdd: false},
            { id: 27, label: 'Delete', icon: 'delete', command: 'command:delete', label_zh:"删除", isAdd: false},
            { id: 28, label: 'Delete Redundant Topology', icon: 'delete-redundant-topology', command: 'command:delete-redundant-topology', label_zh:"删除冗余拓扑", isAdd: false},
            { id: 29, label: 'Deselect All', icon: 'deselect-all', command: 'command:deselect-all', label_zh:"取消全选", isAdd: false},
            { id: 30, label: 'Dimension', icon: 'dimension', command: 'command:dimension', label_zh:"尺寸标注", isAdd: false},
            { id: 31, label: 'Dissolve', icon: 'dissolve', command: 'command:dissolve', label_zh:"解构", isAdd: false},
            { id: 32, label: 'Draft Face', icon: 'draft-face', command: 'command:draft-face', label_zh:"拔模面", isAdd: false},
            { id: 33, label: 'Duplicate', icon: 'duplicate', command: 'command:duplicate', label_zh:"复制", isAdd: false},
            { id: 34, label: 'Export Obj', icon: 'export-obj', command: 'command:export-obj', label_zh:"导出OBJ", isAdd: false},
            { id: 35, label: 'Export Stl', icon: 'export-stl', command: 'command:export-stl', label_zh:"导出STL", isAdd: false},
            { id: 36, label: 'Export 3mf', icon: 'export-3mf', command: 'command:export3mf', label_zh:"导出3MF", isAdd: false},
            { id: 37, label: 'Extend', icon: 'extend', command: 'command:extend', label_zh:"延伸", isAdd: false},
            { id: 38, label: 'Extrude', icon: 'extrude', command: 'command:extrude', label_zh:"挤出", isAdd: false},
            { id: 39, label: 'Fillet', icon: 'fillet', command: 'command:fillet', label_zh:"倒圆角", isAdd: false},
            { id: 40, label: 'Fillet Shell', icon: 'fillet-shell', command: 'command:fillet-shell', label_zh:"壳体倒圆角", isAdd: false},
            { id: 41, label: 'Find Boundary Edges', icon: 'find-boundary-edges', command: 'command:find-boundary-edges', label_zh:"查找边界边", isAdd: false},
            { id: 42, label: 'Freestyle Mirror', icon: 'freestyle-mirror', command: 'command:freestyle-mirror', label_zh:"自由式镜像", isAdd: false},
            { id: 43, label: 'Freestyle Move', icon: 'freestyle-move', command: 'command:freestyle-move', label_zh:"自由式移动", isAdd: false},
            { id: 44, label: 'Freestyle Offset Planar Curve', icon: 'freestyle-offset-planar-curve', command: 'command:freestyle-offset-planar-curve', label_zh:"自由式偏移平面曲线", isAdd: false},
            { id: 45, label: 'Freestyle Rotate', icon: 'freestyle-rotate', command: 'command:freestyle-rotate', label_zh:"自由式旋转", isAdd: false},
            { id: 46, label: 'Freestyle Scale', icon: 'freestyle-scale', command: 'command:freestyle-scale', label_zh:"自由式缩放", isAdd: false},
            { id: 47, label: 'Group Selected', icon: 'group-selected', command: 'command:group-selected', label_zh:"成组选中对象", isAdd: false},
            { id: 48, label: 'Hide Selected', icon: 'hide-selected', command: 'command:hide-selected', label_zh:"隐藏选中对象", isAdd: false},
            { id: 49, label: 'Hide Unselected', icon: 'hide-unselected', command: 'command:hide-unselected', label_zh:"隐藏未选中对象", isAdd: false},
            { id: 50, label: 'Hollow', icon: 'hollow', command: 'command:hollow', label_zh:"抽壳", isAdd: false},
            { id: 51, label: 'Imprint', icon: 'imprint', command: 'command:imprint', label_zh:"压印", isAdd: false},
            { id: 52, label: 'Insert Knot', icon: 'insert-knot', command: 'command:insert-knot', label_zh:"插入控制点", isAdd: false},
            { id: 53, label: 'Invert Hidden', icon: 'invert-hidden', command: 'command:invert-hidden', label_zh:"反显隐藏对象", isAdd: false},
            { id: 54, label: 'Invert Selection', icon: 'invert-selection', command: 'command:invert-selection', label_zh:"反选", isAdd: false},
            { id: 55, label: 'Isolate', icon: 'isolate', command: 'command:isolate', label_zh:"隔离", isAdd: false},
            { id: 56, label: 'Isoparam', icon: 'isoparam', command: 'command:isoparam', label_zh:"等参线", isAdd: false},
            { id: 57, label: 'Join', icon: 'join', command: 'command:join', label_zh:"合并", isAdd: false},
            { id: 58, label: 'Line', icon: 'line', command: 'command:line', label_zh:"直线", isAdd: false},
            { id: 59, label: 'Lock Selected', icon: 'lock-selected', command: 'command:lock-selected', label_zh:"锁定选中对象", isAdd: false},
            { id: 60, label: 'Loft', icon: 'loft', command: 'command:loft', label_zh:"放样", isAdd: false},
            { id: 61, label: 'Loft Guide', icon: 'loft-guide', command: 'command:loft-guide', label_zh:"放样引导线", isAdd: false},
            { id: 62, label: 'Match Face', icon: 'match-face', command: 'command:match-face', label_zh:"匹配面", isAdd: false},
            { id: 63, label: 'Measure', icon: 'measure', command: 'command:measure', label_zh:"测量", isAdd: false},
            { id: 64, label: 'Mirror', icon: 'mirror', command: 'command:mirror', label_zh:"镜像", isAdd: false},
            { id: 65, label: 'Move', icon: 'move', command: 'command:move', label_zh:"移动", isAdd: false},
            { id: 66, label: 'Offset Curve', icon: 'offset-curve', command: 'command:offset-curve', label_zh:"偏移曲线", isAdd: false},
            { id: 67, label: 'Paste With Placement', icon: 'paste-with-placement', command: 'command:paste-with-placement', label_zh:"带位置粘贴", isAdd: false},
            { id: 68, label: 'Patch', icon: 'patch', command: 'command:patch', label_zh:"补面", isAdd: false},
            { id: 69, label: 'Pipe', icon: 'pipe', command: 'command:pipe', label_zh:"管道", isAdd: false},
            { id: 70, label: 'Place', icon: 'place', command: 'command:place', label_zh:"放置", isAdd: false},
            { id: 71, label: 'Polygon', icon: 'polygon', command: 'command:polygon', label_zh:"多边形", isAdd: false},
            { id: 72, label: 'Project', icon: 'project', command: 'command:project', label_zh:"投影", isAdd: false},
            { id: 73, label: 'Push Face', icon: 'push-face', command: 'command:push-face', label_zh:"推挤面", isAdd: false},
            { id: 74, label: 'Radial Array', icon: 'radial-array', command: 'command:radial-array', label_zh:"径向阵列", isAdd: false},
            { id: 75, label: 'Raise Degree', icon: 'raise-degree', command: 'command:raise-degree', label_zh:"提升阶数", isAdd: false},
            { id: 76, label: 'Rebuild', icon: 'rebuild', command: 'command:rebuild', label_zh:"重建", isAdd: false},
            { id: 77, label: 'Rectangular Array', icon: 'rectangular-array', command: 'command:rectangular-array', label_zh:"矩形阵列", isAdd: false},
            { id: 78, label: 'Remove Fillets From Shell', icon: 'remove-fillets-from-shell', command: 'command:remove-fillets-from-shell', label_zh:"移除壳体圆角", isAdd: false},
            { id: 79, label: 'Remove Material', icon: 'remove-material', command: 'command:remove-material', label_zh:"移除材料", isAdd: false},
            { id: 80, label: 'Remove Nominal Surface', icon: 'remove-nominal-surface', command: 'command:remove-nominal-surface', label_zh:"移除标称曲面", isAdd: false},
            { id: 81, label: 'Reverse', icon: 'reverse', command: 'command:reverse', label_zh:"反转", isAdd: false},
            { id: 82, label: 'Revolve', icon: 'revolve', command: 'command:revolve', label_zh:"旋转成型", isAdd: false},
            { id: 83, label: 'Rotate', icon: 'rotate', command: 'command:rotate', label_zh:"旋转", isAdd: false},
            { id: 84, label: 'Scale', icon: 'scale', command: 'command:scale', label_zh:"缩放", isAdd: false},
            { id: 85, label: 'Section Analysis', icon: 'section-analysis', command: 'command:section-analysis', label_zh:"截面分析", isAdd: false},
            { id: 86, label: 'Select Adjacent', icon: 'select-adjacent', command: 'command:select-adjacent', label_zh:"选择相邻对象", isAdd: false},
            { id: 87, label: 'Select All', icon: 'select-all', command: 'command:select-all', label_zh:"全选", isAdd: false},
            { id: 88, label: 'Select All Curves', icon: 'select-all-curves', command: 'command:select-all-curves', label_zh:"全选曲线", isAdd: false},
            { id: 89, label: 'Select Next Entity Collection', icon: 'select-next-entity-collection', command: 'command:select-next-entity-collection', label_zh:"选择下一个实体集合", isAdd: false},
            { id: 90, label: 'Select Previous Entity Collection', icon: 'select-previous-entity-collection', command: 'command:select-previous-entity-collection', label_zh:"选择上一个实体集合", isAdd: false},
            { id: 91, label: 'Set Material', icon: 'set-material', command: 'command:set-material', label_zh:"设置材质", isAdd: false},
            { id: 92, label: 'Slide', icon: 'slide', command: 'command:slide', label_zh:"滑动", isAdd: false},
            { id: 93, label: 'Smart Command', icon: 'smart-command', command: 'command:smart-command', label_zh:"智能命令", isAdd: false},
            { id: 94, label: 'Sphere', icon: 'sphere', command: 'command:sphere', label_zh:"球体", isAdd: false},
            { id: 95, label: 'Spiral', icon: 'spiral', command: 'command:spiral', label_zh:"螺旋线", isAdd: false},
            { id: 96, label: 'Split Segment', icon: 'split-segment', command: 'command:split-segment', label_zh:"分割段", isAdd: false},
            { id: 97, label: 'Square', icon: 'square', command: 'command:square', label_zh:"正方形", isAdd: false},
            { id: 98, label: 'Subdivide', icon: 'subdivide', command: 'command:subdivide', label_zh:"细分", isAdd: false},
            { id: 99, label: 'Sweep', icon: 'sweep', command: 'command:sweep', label_zh:"扫掠", isAdd: false},
            { id: 100, label: 'Sweep Tool', icon: 'sweep-tool', command: 'command:sweep-tool', label_zh:"扫掠工具", isAdd: false},
            { id: 101, label: 'Tangent Arc', icon: 'tangent-arc', command: 'command:tangent-arc', label_zh:"相切弧", isAdd: false},
            { id: 102, label: 'Tangent Circle', icon: 'tangent-circle', command: 'command:tangent-circle', label_zh:"相切圆", isAdd: false},
            { id: 103, label: 'Text', icon: 'text', command: 'command:text', label_zh:"文字", isAdd: false},
            { id: 104, label: 'Thicken', icon: 'thicken', command: 'command:thicken', label_zh:"加厚", isAdd: false},
            { id: 105, label: 'Three Point Arc', icon: 'three-point-arc', command: 'command:three-point-arc', label_zh:"三点圆弧", isAdd: false},
            { id: 106, label: 'Three Point Box', icon: 'three-point-box', command: 'command:three-point-box', label_zh:"三点盒体", isAdd: false},
            { id: 107, label: 'Three Point Circle', icon: 'three-point-circle', command: 'command:three-point-circle', label_zh:"三点圆", isAdd: false},
            { id: 108, label: 'Three Point Rectangle', icon: 'three-point-rectangle', command: 'command:three-point-rectangle', label_zh:"三点矩形", isAdd: false},
            { id: 109, label: 'Toggle Point', icon: 'toggle-points', command: 'command:toggle-points', label_zh:"切换点显示", isAdd: false},
            { id: 110, label: 'Trim', icon: 'trim', command: 'command:trim', label_zh:"修剪", isAdd: false},
            { id: 111, label: 'Two Point Circle', icon: 'two-point-circle', command: 'command:two-point-circle', label_zh:"两点圆", isAdd: false},
            { id: 112, label: 'Ungroup Selected', icon: 'ungroup-selected', command: 'command:ungroup-selected', label_zh:"解组选中对象", isAdd: false},
            { id: 113, label: 'Unhide All', icon: 'unhide-all', command: 'command:unhide-all', label_zh:"显示全部", isAdd: false},
            { id: 114, label: 'Unisolate', icon: 'unisolate', command: 'command:unisolate', label_zh:"取消隔离", isAdd: false},
            { id: 115, label: 'Unjoin', icon: 'unjoin', command: 'command:unjoin', label_zh:"拆分", isAdd: false},
            { id: 116, label: 'Untrim', icon: 'untrim', command: 'command:untrim', label_zh:"取消修剪", isAdd: false},
            { id: 117, label: 'Unwrap Face', icon: 'unwrap-face', command: 'command:unwrap-face', label_zh:"展开面", isAdd: false},
            { id: 118, label: 'Xnurbs', icon: 'xnurbs', command: 'command:xnurbs', label_zh:"Xnurbs", isAdd: false},
        ]
    },{
        commandType: 'Construction Plane',
        commandType_zh: '构造平面类',
        items: [
            { id: 119, label: 'create construction plane', icon: 'create-viewspace-construction-plane', command: 'command:create-viewspace-construction-plane', label_zh:"创建构造平面", isAdd: false},
            { id: 120, label: 'create construction plane at origin', icon: 'create-viewspace-construction-plane-at-origin', command: 'command:create-viewspace-construction-plane-at-origin', label_zh:"在原点创建构造平面", isAdd: false},
            { id: 121, label: 'Reset construction plane', icon: 'reset', command: 'viewport:cplane:reset', label_zh:"重置构造平面", isAdd: false},
            { id: 122, label: 'Set construction plane to selection', icon: 'selection', command: 'viewport:cplane:selection', label_zh:"将构造平面设为选择对象", isAdd: false},
        ]
    },{
        commandType: 'File',
        commandType_zh: '文件类',
        items: [
            { id: 123, label: 'File: export', icon: 'file-export', command: 'file:export', label_zh:"文件：导出", isAdd: false},
            { id: 124, label: 'File: import', icon: 'file-import', command: 'file:import', label_zh:"文件：导入", isAdd: false},
            { id: 125, label: 'File: new', icon: 'file-new', command: 'file:new', label_zh:"文件：新建", isAdd: false},
            { id: 126, label: 'File: open', icon: 'file-open', command: 'file:open', label_zh:"文件：打开", isAdd: false},
            { id: 127, label: 'File: quick save version', icon: 'file-save-version', command: 'file:save-version', label_zh:"文件：快速保存版本", isAdd: false},
            { id: 128, label: 'File: save', icon: 'file-save', command: 'file:save', label_zh:"文件：保存", isAdd: false},
            { id: 129, label: 'File: save as', icon: 'file-save-as', command: 'file:save-as', label_zh:"文件：另存为", isAdd: false},
            { id: 130, label: 'File: save as startup', icon: 'file-save-as-startup', command: 'file:save-as-startup', label_zh:"文件：另存为启动文件", isAdd: false},
        ]
    },{
        commandType: 'Snaps',
        commandType_zh: '吸附类',
        items: [
            { id: 131, label: 'Grid: decrease grid size', icon: 'grid-decrease-grid-size', command: 'viewport:grid:decr', label_zh:"网格：减小网格尺寸", isAdd: false},
            { id: 132, label: 'Grid: increase grid size', icon: 'grid-increase-grid-size', command: 'viewport:grid:incr', label_zh:"网格：增大网格尺寸", isAdd: false},
            { id: 133, label: 'Grid: toggle grid snapping', icon: 'snaps-toggle-grid', command: 'snaps:toggle-grid', label_zh:"网格：切换网格捕捉", isAdd: false},
            { id: 134, label: 'Toggle object snapping', icon: 'snaps-toggle-snap', command: 'snaps:toggle-snap', label_zh:"切换对象吸附", isAdd: false},
        ]
    },{
        commandType: 'Misc',
        commandType_zh: '杂项类',
        items: [
            { id: 135, label: 'New window', icon: 'app-new-window', command: 'app:new-window', label_zh:"新建窗口", isAdd: false},
            { id: 136, label: 'Quit', icon: 'app-quit', command: 'app:quit', label_zh:"退出", isAdd: false},
            { id: 137, label: 'Repeat last command', icon: 'edit-repeat-last-command', command: 'edit:repeat-last-command', label_zh:"重复上一条命令", isAdd: false},
            { id: 138, label: 'Sidebar: toggle left', icon: 'sidebar-toggle-left', command: 'view:sidebar:toggle-left', label_zh:"侧边栏：切换左侧", isAdd: false},
            { id: 139, label: 'Sidebar: toggle right', icon: 'sidebar-toggle-right', command: 'view:sidebar:toggle-right', label_zh:"侧边栏：切换右侧", isAdd: false},
        ]
    },{
        commandType: 'Orbit',
        commandType_zh: '环绕观察类',
        items: [
            { id: 140, label: 'Orbit: dolly in', icon: 'orbit-dolly-in', command: 'orbit:dolly:in', label_zh:"环绕观察：推进", isAdd: false},
            { id: 141, label: 'Orbit: dolly out', icon: 'orbit-dolly-out', command: 'orbit:dolly:out', label_zh:"环绕观察：拉远", isAdd: false},
            { id: 142, label: 'Orbit: pan down', icon: 'orbit-pan-down', command: 'orbit:pan:down', label_zh:"环绕观察：向下平移", isAdd: false},
            { id: 143, label: 'Orbit: pan left', icon: 'orbit-pan-left', command: 'orbit:pan:left', label_zh:"环绕观察：向左平移", isAdd: false},
            { id: 144, label: 'Orbit: pan right', icon: 'orbit-pan-right', command: 'orbit:pan:right', label_zh:"环绕观察：向右平移", isAdd: false},
            { id: 145, label: 'Orbit: pan up', icon: 'orbit-pan-up', command: 'orbit:pan:up', label_zh:"环绕观察：向上平移", isAdd: false},
            { id: 146, label: 'Orbit: rotate down', icon: 'orbit-pan-up', command: 'orbit:pan:up', label_zh:"环绕观察：向下旋转", isAdd: false},
            { id: 147, label: 'Orbit: rotate left', icon: 'orbit-rotate-left', command: 'orbit:rotate:left', label_zh:"环绕观察：向左旋转", isAdd: false},
            { id: 148, label: 'Orbit: rotate right', icon: 'orbit-rotate-right', command: 'orbit:rotate:right', label_zh:"环绕观察：向右旋转", isAdd: false},
            { id: 149, label: 'Orbit: rotate up', icon: 'orbit-rotate-up', command: 'orbit:rotate:up', label_zh:"环绕观察：向上旋转", isAdd: false},
        ]
    },{
        commandType: 'Selection',
        commandType_zh: '选择类',
        items: [
            { id: 150, label: 'Selection mode: set all', icon: 'selection-mode-set-all', command: 'selection:mode:set:all', label_zh:"选择模式：设置全选", isAdd: false},
            { id: 151, label: 'Selection mode: set control-point', icon: 'selection-mode-set-control-point', command: 'selection:mode:set:control-point', label_zh:"选择模式：设置控制点", isAdd: false},
            { id: 152, label: 'Selection mode: set edge', icon: 'selection-mode-set-edge', command: 'selection:mode:set:edge', label_zh:"选择模式：设置边", isAdd: false},
            { id: 153, label: 'Selection mode: set face', icon: 'selection-mode-set-face', command: 'selection:mode:set:face', label_zh:"选择模式：设置面", isAdd: false},
            { id: 154, label: 'Selection mode: set solid', icon: 'selection-mode-set-solid', command: 'selection:mode:set:solid', label_zh:"选择模式：设置实体", isAdd: false},
            { id: 155, label: 'Selection: convert to control-points', icon: 'selection-convert-control-point', command: 'selection:convert:control-point', label_zh:"选择：转换为控制点", isAdd: false},
            { id: 156, label: 'Selection: convert to edges', icon: 'selection-convert-edge', command: 'selection:convert:edge', label_zh:"选择：转换为边", isAdd: false},
            { id: 157, label: 'Selection: convert to faces', icon: 'selection-convert-face', command: 'selection:convert:face', label_zh:"选择：转换为面", isAdd: false},
            { id: 158, label: 'Selection: convert to groups', icon: 'selection-convert-group-children', command: 'selection:convert:group-children', label_zh:"选择：转换为组", isAdd: false},
            { id: 159, label: 'Selection: convert to solids', icon: 'selection-convert-solid', command: 'selection:convert:solid', label_zh:"选择：转换为实体", isAdd: false},
            { id: 160, label: 'Selection: toggle control-point', icon: 'selection-toggle-control-point', command: 'selection:toggle:control-point', label_zh:"选择：切换控制点", isAdd: false},
            { id: 161, label: 'Selection: toggle edge', icon: 'selection-toggle-edge', command: 'selection:toggle:edge', label_zh:"选择：切换边", isAdd: false},
            { id: 162, label: 'Selection: toggle face', icon: 'selection-toggle-face', command: 'selection:toggle:face', label_zh:"选择：切换面", isAdd: false},
            { id: 163, label: 'Selection: toggle solid', icon: 'selection-toggle-solid', command: 'selection:toggle:solid', label_zh:"选择：切换实体", isAdd: false},
        ]
    },{
        commandType: 'Viewport',
        commandType_zh: '视口类',
        items: [
            { id: 164, label: 'Viewport: focus', icon: 'viewport-focus', command: 'viewport:focus', label_zh:"视口：聚焦", isAdd: false},
            { id: 165, label: 'Viewport: navigate to back', icon: 'viewport-navigate-back', command: 'viewport:navigate:back', label_zh:"视口：导航到后视图", isAdd: false},
            { id: 166, label: 'Viewport: navigate to bottom', icon: 'viewport-navigate-bottom', command: 'viewport:navigate:bottom', label_zh:"视口：导航到底视图", isAdd: false},
            { id: 167, label: 'Viewport: navigate to front', icon: 'viewport-navigate-front', command: 'viewport:navigate:front', label_zh:"视口：导航到前视图", isAdd: false},
            { id: 168, label: 'Viewport: navigate to left', icon: 'viewport-navigate-left', command: 'viewport:navigate:left', label_zh:"视口：导航到左视图", isAdd: false},
            { id: 169, label: 'Viewport: navigate to right', icon: 'viewport-navigate-right', command: 'viewport:navigate:right', label_zh:"视口：导航到右视图", isAdd: false},
            { id: 170, label: 'Viewport: navigate to selection', icon: 'viewport-navigate-selection', command: 'viewport:navigate:selection', label_zh:"视口：导航到选中对象", isAdd: false},
            { id: 171, label: 'Viewport: navigate to top', icon: 'viewport-navigate-top', command: 'viewport:navigate:top', label_zh:"视口：导航到顶视图", isAdd: false},
            { id: 172, label: 'Viewport: toggle curves', icon: 'viewport-toggle-curves', command: 'viewport:toggle-curves', label_zh:"视口：切换曲线显示", isAdd: false},
            { id: 173, label: 'Viewport: toggle edges', icon: 'viewport-toggle-edges', command: 'viewport:toggle-edges', label_zh:"视口：切换边显示", isAdd: false},
            { id: 174, label: 'Viewport: toggle faces', icon: 'viewport-toggle-faces', command: 'viewport:toggle-faces', label_zh:"视口：切换面显示", isAdd: false},
            { id: 175, label: 'Viewport: toggle orthographic camera', icon: 'viewport-toggle-orthographic', command: 'viewport:toggle-orthographic', label_zh:"视口：切换正交相机", isAdd: false},
            { id: 176, label: 'Viewport: toggle overlays', icon: 'viewport-toggle-overlays', command: 'viewport:toggle-overlays', label_zh:"视口：切换叠加层", isAdd: false},
            { id: 177, label: 'Viewport: toggle render mode', icon: 'viewport-toggle-render-mode', command: 'viewport:toggle-render-mode', label_zh:"视口：切换渲染模式", isAdd: false},
            { id: 178, label: 'Viewport: toggle x ray', icon: 'viewport-toggle-x-ray', command: 'viewport:toggle-x-ray', label_zh:"视口：切换X光模", isAdd: false},
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

export {useContainerStore, useListItemStore, useGlobalMenuItemStore}