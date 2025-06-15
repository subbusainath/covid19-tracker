import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Base URL for GitHub Pages - replace 'covid19-tracker' with your actual repo name
    base: '/covid19-tracker/',
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        // Optimize for production
        minify: 'terser',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mui: ['@mui/material', '@mui/icons-material'],
                    charts: ['chart.js', 'react-chartjs-2'],
                    maps: ['leaflet', 'react-leaflet']
                }
            }
        }
    },
    // Ensure public assets are copied
    publicDir: 'public',
    test: {
        globals: true,
        environment: 'jsdom'
    }
}) 