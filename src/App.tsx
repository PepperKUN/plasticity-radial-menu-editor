import { useState } from 'react'
import OperaPanel from '@/components/operatedPanel';
import {RadialMenuItem} from "@/types/type";
import {useMenuItemStore} from "@/stores/store.ts";
import './App.css'

function App() {
    const {menuItems, setMenuItems} = useMenuItemStore()

    // const handleItemClick = (item: RadialMenuItem) => {
    //     console.log('Selected:', item);
    //     // 在此处添加点击处理逻辑
    // };

    const handleItemAdd = () => {
        const newMenuItems = [...menuItems, {
            id: `add_${menuItems.length + 1}`,
            label: `Item ${menuItems.length + 1}`,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            icon: `item-${menuItems.length + 1}`,
            command: ` `,
        }];
        setMenuItems(newMenuItems)
    }

    const handleItemRemove = () => {
        const newMenuItems = menuItems.slice(0, -1)
        console.log(newMenuItems)
        setMenuItems(newMenuItems)
    }

  return (
      <>
          <div className="app-container">
              <h1>Dynamic Radial Menu</h1>

              {/* 环形菜单 */}
              <OperaPanel/>

              {/* 动态控制示例 */}
              <div className="controls">
                  <button
                      onClick={handleItemAdd}
                      disabled={menuItems.length >= 12}
                  >
                      Add Item
                  </button>

                  <button
                      onClick={handleItemRemove}
                      disabled={menuItems.length <= 2}
                  >
                      Remove Item
                  </button>
              </div>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
              <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
              </p>
          </div>
          <p className="read-the-docs">
              Click on the Vite and React logos to learn more
          </p>
      </>
  )
}

export default App
