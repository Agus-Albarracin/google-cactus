// cliente/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Configuraciones de Vite para el cliente
  build: {
    // No es necesario un punto de entrada HTML
    emptyOutDir: true,
    outDir: '../dist', // Carpeta de salida para el bundle
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'empty.js') // Punto de entrada vacío
      }
    }
  },
  optimizeDeps: {
    // Evita que Vite intente procesar estos módulos
    exclude: ['path']
  },
  server: {
    // Ignora la carpeta 'srv'
    watch: {
      exclude: '../srv/**'
    }
  }
});