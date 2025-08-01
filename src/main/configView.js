import { join, resolve } from 'path'

import { shell, BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'

import {existedWindows} from './main'

export function createConfigWindow () {
    if (existedWindows.has("config")){
        const existedConfig = existedWindows.get("config");
        existedConfig.focus();
        return -1;
    }

    const configWindow = new BrowserWindow({
        // set the size of the window
        width: 600,
        height: 400,
        title: "Miaa Config",

        parent: existedWindows.get("main"), // Set the parent window
        // modal: true, // Makes the window modal
        alwaysOnTop: true, // Ensures the window stays on top
        show: false,
        autoHideMenuBar: true,
        // ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            contextIsolation: true, // Ensure security
            sandbox: false
        }
    })

    configWindow.setResizable(false);

    configWindow.on('ready-to-show', () => {
        configWindow.show()
    })


    configWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        configWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + "#/config")
    } else {
        // configWindow.loadFile(resolve(join(__dirname, '../renderer/index.html#/config')))
        configWindow.loadFile(resolve(join(__dirname, '../renderer/index.html')))
        .then(() => {
            // Navigate to the hash route after the file loads
            configWindow.webContents.executeJavaScript(`
                window.location.hash = '#/config';
            `);
        });
    }

    existedWindows.set("config", configWindow)

    configWindow.on('closed', () => {
        existedWindows.delete("config");
    });
}
