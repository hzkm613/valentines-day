import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/valentines-day/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});