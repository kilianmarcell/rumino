import { defineConfig } from 'vite';
import dns from 'node:dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    allowedHosts: ['d68642d821d8.ngrok-free.app'],
  },
});
