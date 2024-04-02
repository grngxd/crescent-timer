import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'cc.grng.crescent', // TODO: add your app id
	appName: 'Crescent Timer',
	webDir: 'build',
	bundledWebRuntime: false,
	plugins: {
		"SplashScreen": {
			"launchShowDuration": 0
		}
	},
	// remove server section before making production build
	server: {
		"url": "http://192.168.1.19:5001",
		"cleartext": true
	}
};

export default config;
