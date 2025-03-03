import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 @ 映射到 src 目录
      // 可添加更多别名（可选）
      '@components': path.resolve(__dirname, './src/components')
    }
  },

  plugins: [
      react(),
      tailwindcss(),
  ],
})
