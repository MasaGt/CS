import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { browserslistToTargets } from 'lightningcss'
import browserslist from 'browserslist';
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths({
      projects: ["./tsconfig.app.json"]
    })
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist("last 2 versions"))
    }
  },
  build: {
    cssMinify: 'lightningcss',
  }
})
