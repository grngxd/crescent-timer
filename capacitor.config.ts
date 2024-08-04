import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cc.grng.crescent.timer',
  appName: 'Crescent Timer',
  webDir: 'dist',
  server: {
    url: 'http://localhost:5173',
    cleartext: true
  }
};

export default config;
