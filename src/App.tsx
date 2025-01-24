import { useState } from 'react'
import RadialMenu from "@/components/radial-menu";
import {RadialMenuItem} from "@/types/type";
import './App.css'

function App() {
    const [menuItems, setMenuItems] = useState<RadialMenuItem[]>([
        { label: 'Home', color: '#4ECDC4', value: 'home' },
        { label: 'Settings', color: '#45B7D1', value: 'settings' },
        { label: 'Profile', color: '#FF6B6B', value: 'profile' },
        { label: 'Docs', color: '#96CEB4', value: 'docs' },
        { label: 'Docs2', color: '#96CEB4', value: 'docs2' }
    ]);

    const handleItemClick = (item: RadialMenuItem) => {
        console.log('Selected:', item);
        // 在此处添加点击处理逻辑
    };

  return (
      <>
          <div className="app-container">
              <h1>Dynamic Radial Menu</h1>

              {/* 环形菜单 */}
              <RadialMenu
                  items={menuItems}
                  radius={150}
                  onItemClick={handleItemClick}
                  style={{margin: '20px auto'}}
              />

              {/* 动态控制示例 */}
              <div className="controls">
                  <button
                      onClick={() => setMenuItems([...menuItems, {
                          label: `Item ${menuItems.length + 1}`,
                          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                          value: `item-${menuItems.length + 1}`
                      }])}
                  >
                      Add Item
                  </button>

                  <button
                      onClick={() => setMenuItems(menuItems.slice(0, -1))}
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
