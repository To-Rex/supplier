import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          utils: ['web-vitals']
        }
      }
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Asset optimization
    assetsInlineLimit: 4096
  },
  server: {
    // Enable compression
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  preview: {
    port: 4173,
    cors: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'web-vitals'],
    exclude: []
  },
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  // Enable experimental features for better performance
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none'
  }
})
