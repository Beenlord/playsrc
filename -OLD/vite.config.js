import { defineConfig } from 'vite'


export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                computer: 'src/computer.html',
                phone: 'src/phone.html'
            }
        }
    }
})
