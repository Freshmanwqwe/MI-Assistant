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
function createFolder(folderPath) {
  try {
    if (!fs$1.existsSync(folderPath)) {
      fs$1.mkdirSync(folderPath, { recursive: true });
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
  const config_file = path$1.join(configPath, "config.yml");
  try {
    if (!fs$1.existsSync(config_file)) {
      console.log("Config file not found. Creating a new one...");
      const yamlContent = yaml$1.dump(defaultConfig);
      fs$1.writeFileSync(config_file, yamlContent, "utf8");
      console.log("Config file created successfully.");
    } else {
      console.log("Config file exists:", config_file);
    }
  } catch (error) {
    console.error("Error ensuring config file:", error);
  }
}
function ensurePatientForlder(patient) {
  const patient_folder = path$1.join(configPath, "info/" + patient);
  try {
    if (!fs$1.existsSync(patient_folder)) {
      console.log("Patient folder not found. Creating a new one...");
      createFolder(patient_folder);
      console.log("Patient folder created successfully.");
    } else {
      console.log("Patient folder exists:", patient_folder);
    }
  } catch (error) {
    console.error("Error ensuring patient folder:", error);
  }
}
function ensureHistoryFile(patient) {
  ensurePatientForlder(patient);
  const history_file = path$1.join(configPath, "info/" + patient + "/history.json");
  try {
    if (!fs$1.existsSync(history_file)) {
      console.log("History file not found. Creating a new one...");
      const historyContent = JSON.stringify({});
      fs$1.writeFileSync(history_file, historyContent, "utf8");
      console.log("History file created successfully.");
    } else {
      console.log("History file exists:", history_file);
    }
  } catch (error) {
    console.error("Error ensuring history file:", error);
  }
}
function ensureReportFile(patient) {
  ensurePatientForlder(patient);
  const report_file = path$1.join(configPath, "info/" + patient + "/report.json");
  try {
    if (!fs$1.existsSync(report_file)) {
      console.log("Report file not found. Creating a new one...");
      const reportContent = JSON.stringify({});
      fs$1.writeFileSync(report_file, reportContent, "utf8");
      console.log("Report file created successfully.");
    } else {
      console.log("Report file exists:", report_file);
    }
  } catch (error) {
    console.error("Error ensuring report file:", error);
  }
}
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
async function loadExistedTestList() {
  try {
    const files = fs.readdirSync(path.join(configPath, "test_configs").replace(" ", " "));
    const fileNames = files.map((file) => path.basename(file));
    return fileNames;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}
async function loadConfig() {
  const config_file = path.join(configPath, "config.yml");
  try {
    if (!fs.existsSync(config_file)) {
      console.warn("Config file not found:", config_file);
      return {};
    }
    const file = fs.readFileSync(config_file, "utf8");
    const config = yaml.load(file);
    return config;
  } catch (error) {
    console.error("Error loading config:", error);
    return {};
  }
}
async function saveConfig(config) {
  const config_file = path.join(configPath, "config.yml");
  try {
    const yamlContent = yaml.dump(config);
    fs.writeFileSync(config_file, yamlContent, "utf8");
  } catch (error) {
    console.error("Error ensuring config file:", error);
  }
}
async function loadHistory(data) {
  ensureHistoryFile(data.patient);
  const history_file = path.join(configPath, "info/" + data.patient + "/history.json");
  try {
    if (!fs.existsSync(history_file)) {
      console.warn("History file not found:", history_file);
      return {};
    }
    const historyContent = fs.readFileSync(history_file, "utf-8");
    const history = JSON.parse(historyContent);
    return history;
  } catch (error) {
    console.error("Error loading history:", error);
    return {};
  }
}
async function saveHistory(data) {
  ensureHistoryFile(data.patient);
  const history_file = path.join(configPath, "info/" + data.patient + "/history.json");
  try {
    const historyContent = JSON.stringify(data.history);
    fs.writeFileSync(history_file, historyContent, "utf-8");
  } catch (error) {
    console.error("Error ensuring history file:", error);
  }
}
async function loadReport(data) {
  ensureReportFile(data.patient);
  const report_file = path.join(configPath, "info/" + data.patient + "/report.json");
  try {
    if (!fs.existsSync(report_file)) {
      console.warn("Report file not found:", report_file);
      return {};
    }
    const reportContent = fs.readFileSync(report_file, "utf-8");
    const report = JSON.parse(reportContent);
    return report;
  } catch (error) {
    console.error("Error loading report:", error);
    return {};
  }
}
async function saveReport(data) {
  ensureReportFile(data.patient);
  const report_file = path.join(configPath, "info/" + data.patient + "/report.json");
  try {
    const reportContent = JSON.stringify(data.report);
    fs.writeFileSync(report_file, reportContent, "utf-8");
  } catch (error) {
    console.error("Error ensuring report file:", error);
  }
}
async function savePoints(data) {
  const config_file = path.join(configPath, "test_configs/" + data.name + ".json");
  try {
    fs.writeFileSync(config_file, data.points, "utf8");
  } catch (error) {
    console.error("Error ensuring config file:", error);
  }
}
async function loadPoints(data) {
  const config_file = path.join(configPath, "test_configs/" + data.teatName);
  try {
    return JSON.parse(fs.readFileSync(config_file));
  } catch (error) {
    return { "error": true };
  }
}
const sys_msg_addcat = {
  "role": "system",
  "content": `You are a specialized medical imaging report assistant. Your task is to generate a JSON-formatted list of essential key points for a medical imaging report based on a provided catalog. At first, you are encouraged to ask question (1-3 rounds) to let the medical image catalog to be more specific. Once you can organize the key points, follow these guidelines and return the JSON output only: 
        1.Catalog Focus: Begin by reviewing the specific medical image catalog provided by the user. Tailor the key points to align with the characteristics and requirements of that catalog. 
        2. Evidence-Based Guidelines (for Reference in Formulation Only): When formulating each key point, refer to established rules and best practices from recognized medical resources e.g. 
        Fleischner Society Guidelines, ACR Appropriateness Criteria, Radiology: The Requisites, DICOM Standards, and so on. 
        Use these resources as inspiration to ensure that the key points are in line with accepted medical standards. 
        Note: You are encouraged to search for more reference for create the evidence guidelines. You do not need to include these reference names in your JSON output.
        3. Output requirement (JSON Structure): The final output must be in valid JSON format envaloped by <json></json> tag. The JSON should include a top-level field (e.g., "catalog") that echoes the provided catalog description.
        Include a "key_points" array where each key point is an object containing the following fields:
        "title": A brief title for the key point.
        "importance": A value indicating whether the key point is "required" or "optional".
        "explanation": A clear, concise explanation of the significance of the key point.
        4. Overall Tone: Maintain a neutral, professional tone throughout the response. Use precise and medically accurate language that is suitable for a professional audience (i.e., medical doctors).
        

Example Output:
        <json>
        {
        "catalog": "Example: Chest X-ray",
        "message" : "Thank you for the clarity, Zhang. Based on the specific focus on pancreatitis or pancreatic cancer during an EUS examination of the pancreas, here are the key points in JSON format",
        "key_points": [
            {
            "title": "Lung Fields",
            "importance": "required",
            "explanation": "Evaluate the lung parenchyma for opacities, consolidation, and interstitial patterns to detect pathologies such as pneumonia or interstitial lung disease."
            },
            {
            "title": "Cardiac Silhouette",
            "importance": "optional",
            "explanation": "Examine the size and contour of the heart to identify cardiomegaly or other cardiac abnormalities."
            }
        ]
        }</json>`
};
const sys_msg_summarize = {
  "role": "system",
  "content": `You are a specialized medical imaging report assistant.
    A medical imaging report and keypoints the report has to be mentioned are provided by user. Your task is to summarize the report with those keypoints(some of the key points might not be mentioned & keypoints might be empty) for the user.
    Follow these guidelines:
         1. The message you will receive is in json format. In the top-level field of the JSON, there exists two fields "report" and "keypoints". "report" contains the raw content of the medical imaging report, while "keypoints" is a array where each key point is an object containing the following fields:
        "title": A brief title for the key point.
        "importance": A value indicating whether the key point is "required" or "optional".
        "explanation": A clear, concise explanation of the significance of the key point.
        2. Ouput requirement: The final output has to be in valid json format envaloped by <json></json> tag. The ouput must include 2 fields: "message" and "summary".
        3. "summary" field has to include your summary for the report ONLY.
        4. Overall Tone: Maintain a neutral, professional tone throughout the response. Use precise and medically accurate language that is suitable for a professional audience (i.e., medical doctors).
        

Example Ouput:
        <json> {
            "message": "Thank you for the report and keypoints. According to the keypoints, here is the summary shared for you.",
            "summary": "blablabla"
        }</json>
        `
};
const sys_msg_updkeys = {
  "role": "system",
  "content": `You are a specialized medical imaging report assistant.
    A medical imaging report and a set of keypoints are provided by user. Your task is to determine whether those key points are mentioned in the report.
    Follow these guidelines:
        1. The message you will receive is in json format. In the top-level field of the JSON, there exists two fields "report" and "keypoints". "report" contains the raw content of the medical imaging report, while "keypoints" is a array where each key point is an object containing the following fields:
        "title": A brief title for the key point.
        "importance": A value indicating whether the key point is "required" or "optional".
        "explanation": A clear, concise explanation of the significance of the key point.
        2. For every single keypoint, according to its name and explanation, determine whether it is mentioned in the given report.
        3. Ouput requirement: The final output has to be in valid json format envaloped by <json></json> tag. Ouput JSON is based on the "keypoints" field in the input JSON. For every keypoint, if it is mentioned in the report, modify the value of "importance" field to "done", otherwise keep the value of "importance" field as what it was.
        4. A keypoint is mentioned doesnt mean the keypoint is mentioned exactly word-for-word or letter-for-letter.
        

Example Ouput:
        <json> {
            "message": "Thank you for your report. Let me check whether your report mentioned the provided keypoints."
            "key_points": [
                {
                "title": "Lung Fields",
                "importance": "done",
                "explanation": "Evaluate the lung parenchyma for opacities, consolidation, and interstitial patterns to detect pathologies such as pneumonia or interstitial lung disease."
                },
                {
                "title": "Cardiac Silhouette",
                "importance": "optional",
                "explanation": "Examine the size and contour of the heart to identify cardiomegaly or other cardiac abnormalities."
                },
                {
                "title": "Radiology",
                "importance": "required",
                "explanation": "Utilize various imaging technologies (such as X-ray, CT, MRI, ultrasound, etc.) for the visualization and diagnosis of internal structures of the human body."
                }
        ]
        }</json>
        `
};
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
async function AddCatChat(data) {
  var res = "";
  const req = {
    model: data.request.model,
    messages: [sys_msg_addcat, ...data.request.messages]
  };
  await axios({
    url: data.apiURL,
    method: "POST",
    data: {
      ...req
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
async function Summarize(data) {
  var res = "";
  const req = {
    model: data.request.model,
    messages: [sys_msg_summarize, ...data.request.messages]
  };
  await axios({
    url: data.apiURL,
    method: "POST",
    data: {
      ...req
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
async function Updkeys(data) {
  var res = "";
  const req = {
    model: data.request.model,
    messages: [sys_msg_updkeys, ...data.request.messages]
  };
  await axios({
    url: data.apiURL,
    method: "POST",
    data: {
      ...req
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
    existedWindows.get("main").webContents.send("main-to-renderer", { child: "addcat", action: "closed" });
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
    "load-history",
    "asyncevent",
    async (api, data = {}) => {
      const history = await loadHistory(data.data);
      return history;
    }
  )
);
routers.push(
  new EventRouter(
    "save-history",
    "event",
    (api, data) => {
      saveHistory(data.data);
    }
  )
);
routers.push(
  new EventRouter(
    "load-report",
    "asyncevent",
    async (api, data = {}) => {
      const report = await loadReport(data.data);
      return report;
    }
  )
);
routers.push(
  new EventRouter(
    "save-report",
    "event",
    (api, data) => {
      saveReport(data.data);
    }
  )
);
routers.push(
  new EventRouter(
    "save-points",
    "event",
    (api, data) => {
      savePoints(data.data);
    }
  )
);
routers.push(
  new EventRouter(
    "load-points",
    "asyncevent",
    async (api, data) => {
      const res = await loadPoints(data.data);
      return res;
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
routers.push(
  new EventRouter(
    "addcat-chat",
    // name
    "asyncevent",
    // evnet
    async (api, data = {}) => {
      const res = await AddCatChat(data.data);
      return res;
    }
  )
);
routers.push(
  new EventRouter(
    "summarize-chat",
    "asyncevent",
    async (api, data = {}) => {
      const res = await Summarize(data.data);
      return res;
    }
  )
);
routers.push(
  new EventRouter(
    "updkeys-chat",
    "asyncevent",
    async (api, data = {}) => {
      const res = await Updkeys(data.data);
      return res;
    }
  )
);
const basePath = electron.app.isPackaged ? electron.app.getAppPath() : __dirname;
const configPath = path$2.join(electron.app.getPath("appData"), ".medai");
const existedWindows = /* @__PURE__ */ new Map();
function initRunning() {
  createFolder(configPath);
  createFolder(path$2.join(configPath, "test_configs"));
  createFolder(path$2.join(configPath, "info"));
  ensureConfigFile();
}
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    // set the size of the window
    width: electron.screen.getPrimaryDisplay().workAreaSize.width,
    height: electron.screen.getPrimaryDisplay().workAreaSize.height,
    minWidth: 1280,
    minHeight: 720,
    maxWidth: 3860,
    maxHeight: 2160,
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
