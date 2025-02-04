"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path$2 = require("path");
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const axios = require("axios");
const { dialog, globalShortcut } = require("electron");
function createGlobalShortcuts() {
  globalShortcut.register("CommandOrControl+Alt+I", () => {
    dialog.showMessageBox({
      type: "info",
      message: "Miaa : Medical Image AI Assistant by HCI@ISCAS",
      buttons: ["OK"]
    });
  });
}
class EventRouters {
  #api = {};
  #routers;
  constructor() {
    this.routers = new Array();
  }
  addRouter(router) {
    this.routers.push(router);
  }
  addRouters(routers2) {
    this.routers = this.routers.concat(routers2);
  }
  removeRouter(name) {
    for (let i = 0; i < this.routers.length; i++) {
      if (this.routers[i].name === name) {
        this.routers.splice(i, 1);
      }
    }
  }
  route(data) {
    for (let i = 0; i < this.routers.length; i++) {
      let _r = this.routers[i];
      if (data.name === _r.name && _r.callback) {
        _r.callback(this.#api, data);
      }
    }
  }
  async async_route(data) {
    for (let i = 0; i < this.routers.length; i++) {
      let _r = this.routers[i];
      if (data.name === _r.name && _r.callback) {
        const res = await _r.callback(this.#api, data);
        return res;
      }
    }
  }
  addApi(key, api) {
    this.#api[key] = api;
  }
}
class EventRouter {
  #name;
  #event;
  #callback;
  constructor(name, event, callback) {
    this.name = name;
    this.event = event;
    this.callback = callback;
  }
}
const fs$1 = require("fs");
const path$1 = require("path");
const yaml$1 = require("js-yaml");
async function loadExistedTestList() {
  try {
    const files = fs$1.readdirSync(path$1.join(configPath, "test_configs").replace(" ", " "));
    const fileNames = files.map((file) => path$1.basename(file));
    return fileNames;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}
async function loadConfig() {
  const config_file = path$1.join(configPath, "config.yml");
  try {
    if (!fs$1.existsSync(config_file)) {
      console.warn("Config file not found:", config_file);
      return {};
    }
    const file = fs$1.readFileSync(config_file, "utf8");
    const config = yaml$1.load(file);
    return config;
  } catch (error) {
    console.error("Error loading config:", error);
    return {};
  }
}
async function saveConfig(config) {
  const config_file = path$1.join(configPath, "config.yml");
  try {
    const yamlContent = yaml$1.dump(config);
    fs$1.writeFileSync(config_file, yamlContent, "utf8");
  } catch (error) {
    console.error("Error ensuring config file:", error);
  }
}
async function testAPI(data) {
  var res = "";
  await axios({
    url: data.apiURL,
    method: "POST",
    data: {
      ...data.request
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + data.apiKEY
    }
  }).then(function(response) {
    res = response.data.choices[0].message.content;
  }).catch(function(error) {
    const errs = error.response.data.error;
    res = error.status + "\n" + errs.code + " " + errs.message;
  });
  return res;
}
function createConfigWindow() {
  if (existedWindows.has("config")) {
    const existedConfig = existedWindows.get("config");
    existedConfig.focus();
    return -1;
  }
  const configWindow = new electron.BrowserWindow({
    // set the size of the window
    width: 600,
    height: 400,
    title: "Miaa Config",
    parent: existedWindows.get("main"),
    // Set the parent window
    // modal: true, // Makes the window modal
    alwaysOnTop: true,
    // Ensures the window stays on top
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path$2.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      // Ensure security
      sandbox: false
    }
  });
  configWindow.setResizable(false);
  configWindow.on("ready-to-show", () => {
    configWindow.show();
  });
  configWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    configWindow.loadURL(process.env["ELECTRON_RENDERER_URL"] + "#/config");
  } else {
    configWindow.loadFile(resolve(path$2.join(__dirname, "../renderer/index.html#/config")));
  }
  existedWindows.set("config", configWindow);
  configWindow.on("closed", () => {
    existedWindows.delete("config");
  });
}
function createAddCatWindow() {
  if (existedWindows.has("addcat")) {
    const existedAddCat = existedWindows.get("addcat");
    existedAddCat.focus();
    return -1;
  }
  const addCatWindow = new electron.BrowserWindow({
    // set the size of the window
    width: 1280,
    height: 720,
    title: "Miaa Create Image Catelog",
    parent: existedWindows.get("main"),
    // Set the parent window
    // modal: true, // Makes the window modal
    alwaysOnTop: true,
    // Ensures the window stays on top
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path$2.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      // Ensure security
      sandbox: false
    }
  });
  addCatWindow.setResizable(false);
  addCatWindow.on("ready-to-show", () => {
    addCatWindow.show();
  });
  addCatWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    addCatWindow.loadURL(process.env["ELECTRON_RENDERER_URL"] + "#/addcat");
  } else {
    addCatWindow.loadFile(resolve(path$2.join(__dirname, "../renderer/index.html#/addcat")));
  }
  existedWindows.set("addcat", addCatWindow);
  addCatWindow.on("closed", () => {
    existedWindows.delete("addcat");
  });
}
const routers = new Array();
routers.push(
  new EventRouter(
    "show-info",
    // name
    "event",
    // evnet
    (api, data = {}) => {
      api.dialog.showMessageBox({
        type: "info",
        message: "HCI@ISCAS : MedImageAssistant",
        buttons: ["OK"]
      });
    }
  )
);
routers.push(
  new EventRouter(
    "testlist-get",
    // name
    "asyncevent",
    // evnet
    async (api, data = {}) => {
      const testList = await loadExistedTestList();
      return testList;
    }
  )
);
routers.push(
  new EventRouter(
    "create-config",
    "event",
    (api, data = {}) => {
      createConfigWindow();
    }
  )
);
routers.push(
  new EventRouter(
    "create-addcat",
    "event",
    (api, data = {}) => {
      createAddCatWindow();
    }
  )
);
routers.push(
  new EventRouter(
    "request-config",
    "asyncevent",
    // evnet
    async (api, data = {}) => {
      const config = await loadConfig();
      return config;
    }
  )
);
routers.push(
  new EventRouter(
    "save-config",
    "event",
    (api, data) => {
      saveConfig(data.data);
    }
  )
);
routers.push(
  new EventRouter(
    "test-api",
    "asyncevent",
    // evnet
    async (api, data) => {
      const res = await testAPI(data.data);
      return res;
    }
  )
);
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
function createFolder(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log("Folder created successfully:", folderPath);
    } else {
      console.log("Folder already exists:", folderPath);
    }
  } catch (error) {
    console.error("Error creating folder:", error);
  }
}
const defaultConfig = {
  apiKEY: "NEED_YOUR_API_KEY",
  apiURL: "NEED_YOUR_API_URL",
  MODEL: "NEED_YOUR_MODEL"
};
function ensureConfigFile() {
  const config_file = path.join(configPath, "config.yml");
  try {
    if (!fs.existsSync(config_file)) {
      console.log("Config file not found. Creating a new one...");
      const yamlContent = yaml.dump(defaultConfig);
      fs.writeFileSync(config_file, yamlContent, "utf8");
      console.log("Config file created successfully.");
    } else {
      console.log("Config file exists:", config_file);
    }
  } catch (error) {
    console.error("Error ensuring config file:", error);
  }
}
const basePath = electron.app.isPackaged ? electron.app.getAppPath() : __dirname;
const configPath = path$2.join(electron.app.getPath("appData"), ".medai");
const existedWindows = /* @__PURE__ */ new Map();
function initRunning() {
  createFolder(configPath);
  createFolder(path$2.join(configPath, "test_configs"));
  ensureConfigFile();
}
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    // set the size of the window
    width: electron.screen.getPrimaryDisplay().workAreaSize.width,
    height: electron.screen.getPrimaryDisplay().workAreaSize.height,
    minWidth: 1280,
    minHeight: 720,
    maxWidth: 2160,
    maxHeight: 1440,
    title: "Miaa",
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path$2.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      // Ensure security
      sandbox: false
    }
  });
  mainWindow.setResizable(false);
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  existedWindows.set("main", mainWindow);
  const eventRouters = new EventRouters();
  eventRouters.addApi("app", electron.app);
  eventRouters.addApi("dialog", electron.dialog);
  eventRouters.addRouters(routers);
  electron.ipcMain.handle("renderer-to-main", (e, data) => {
    return eventRouters.route(data);
  });
  electron.ipcMain.handle("renderer-to-main-async", async (e, data) => {
    return eventRouters.async_route(data);
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path$2.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  initRunning();
  createGlobalShortcuts();
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
exports.basePath = basePath;
exports.configPath = configPath;
exports.existedWindows = existedWindows;
