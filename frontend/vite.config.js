import { defineConfig } from 'vite';
import dns from 'node:dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    allowedHosts: ['f5227c623f65.ngrok-free.app'],
  },
});
