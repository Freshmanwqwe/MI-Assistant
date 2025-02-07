import { join } from 'path'

import { shell, BrowserWindow, ipcMain } from 'electron'
import { is } from '@electron-toolkit/utils'

import {existedWindows} from './main'

export function createAddCatWindow () {
    if (existedWindows.has("addcat")){
        const existedAddCat = existedWindows.get("addcat");
        existedAddCat.focus();
        return -1;
    }

    const addCatWindow = new BrowserWindow({
        // set the size of the window
        width: 1280,
        height: 720,
        title: "Miaa Create Image Catelog",

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

    addCatWindow.setResizable(false);

    addCatWindow.on('ready-to-show', () => {
        addCatWindow.show()
    })


    addCatWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        addCatWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + "#/addcat")
    } else {
        addCatWindow.loadFile(resolve(join(__dirname, '../renderer/index.html#/addcat')))
    }

    existedWindows.set("addcat", addCatWindow)

    addCatWindow.on('closed', () => {
        existedWindows.delete("addcat");
        existedWindows.get("main").webContents.send("main-to-renderer", {child:"addcat", action: "closed" });
    });
}
