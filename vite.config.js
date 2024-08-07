import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        proxy: {
            '/api': {
                target: 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com',
                changeOrigin: true,
                secure: false,
                headers: {
                    'Origin': 'http://localhost:5175'
                }
            },
        },
    },
});
