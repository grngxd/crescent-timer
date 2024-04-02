![](/assets/svelte_cap.png)
# SvelteKit + Capacitor (w/ live reload) Template

This is a project template for [SvelteKit](https://kit.svelte.dev) + [CapacitorJS](https://capacitorjs.com) apps with live reload, granting the ability to quickly build production ready applications for iOS and Android at near-native performance using JavaScript (Svelte).

## Changelog

**v1.0.0** - Based on [Svelte Capacitor by drannex42](https://github.com/drannex42/svelte-capacitor).
Has vite as the build manager, built in routing library, TypeScript, and aliases, all provided by sveltekit

## Setup

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

### Get started

Install the dependencies...

```bash
git clone "https://github.com/kesc23/sveltekit-capacitor.git"
cd sveltekit-capacitor
npm install
```

### Run local dev server (no capacitor)

```bash
npm run dev:start
```

### Add your Capacitor platform

```bash
npx cap add android // (or ios)
```

### Run local dev server (with capacitor)

Please see section below (Develop on your device with livereload)


### Develop on your device with livereload (hot reload)

If you're only targeting Android, you only need to change the `server.url` section in `capacitor.config.json` to use `http://10.0.2.2:5001`, since [Android Studio already adds a `localhost` proxy](https://stackoverflow.com/questions/9808560/why-do-we-use-10-0-2-2-to-connect-to-local-web-server-instead-of-using-computer). Just remember to remove it when building your app for production.

If you're targeting iOS or both, you will need to append your workstation IP to the `server.url` section in `capacitor.config.json` instead. To discover your workstation IP, just run `ifconfig` or find it on the network settings.

Tip: Remember you will need the `http://` before the server IP.

Back in the root folder:

`npm run dev:android` or `npm run dev:ios`

This will run the capacitor/svelte project with a web view pointing to your workstation's IP. You should see the message `Welcome to Sveltekit!` if svelte loaded correctly.

Try to change something in `src/routes/+page.svelte`, and you should see the content reload on your device.

* You need to have an emulator/device connected to adb
* Your device has to be connected to the same wifi network as your workstation.

### Change Splash screen and app icon:

* Add icon.png and splash.png to resources dir
* Recomended size:
  * Icon - 512x512
  * Splash - 1920x1920
* Next, run the following to generate all images then copy them into the native projects:

```bash
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

### To build a production application:

**Remember to remove the `server.url` in `capacitor.config.json`**

`npm run build:android` or `npm run build:ios`

## Quick Tips

### Developer Tools

You can use any Chromium-based browser and use their Developer Tools (for Android atleast, have not tested iOS) to debug and access console commands on your personal device, by going to chrome://inspect#devices., edge://inspect#devices., vivaldi://inspect#devices., brave://inspect#devices, &c.

The standard web inspector will also work for debugging and rewriting styling and html without using your IDE just like when building a normal website. This may have some issues with some forms of SVG-related svelte templating (I have had issues with using some chart libraries displaying in the web inspector), they will still show up on the device but not in the preview.

You may use the address bar in the developer tools to navigate to direct views in your application, even without any tappable links to do so. This allows you to create hidden routes for testing.

### Accessing Device APIs

CapacitorJS is/was based on Cordova and has *complete* backwards compatibility with cordova plugins. To find plugins that allow you to access the device api's easier, attempt to find cordova or capacitor plugins. You will need to view their (capacitorjs) docs to learn how to properly accesss those.

### Are you using this project! Let us know!

I would love to keep a collection of all the projects using this!

-----

This template was created by [Kevin Campos (Kesc23)](https://kevincampos.com.br/) based on [Svelte Capacitor by drannex42](https://github.com/drannex42/svelte-capacitor).
