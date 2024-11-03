import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@assets": path.resolve(__dirname,"./src/assets"),
      "@components": path.resolve(__dirname,"./src/components"),
      "@hooks": path.resolve(__dirname,"./src/hooks"),
      "@pages": path.resolve(__dirname,"./src/pages"),
      "@routes": path.resolve(__dirname,"./src/routes"),
      "@store": path.resolve(__dirname,"./src/store"),
      "@styles": path.resolve(__dirname,"./src/styles"),
      "@layouts": path.resolve(__dirname,"./src/layouts"),
      "@utilities": path.resolve(__dirname,"./src/utilities"),
      "@services": path.resolve(__dirname,"./src/services"),
      "@customTypes": path.resolve(__dirname,"./src/types"),
      "@validations": path.resolve(__dirname,"./src/Validations"),
      
    },
  },
  plugins: [react(),svgr()],
})
