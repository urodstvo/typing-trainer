/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    base: '/typing-trainer/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTest.ts'],
    },
});

/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
