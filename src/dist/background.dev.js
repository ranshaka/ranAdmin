/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _electron = require("electron");

var _lib = require("vue-cli-plugin-electron-builder/lib");

var _electronDevtoolsInstaller = _interopRequireWildcard(require("electron-devtools-installer"));

var _updata = require("./updata.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isDevelopment = process.env.NODE_ENV !== 'production'; // 自动更新

// 自动更新地址
var UPDATA_URL = process.env.VUE_APP_ELECTRON_UPDATA_URL; // Scheme must be registered before the app is ready

_electron.protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}]);

function createWindow() {
  var _webPreferences;

  var win;
  return regeneratorRuntime.async(function createWindow$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Create the browser window.
          win = new _electron.BrowserWindow({
            width: 1200,
            height: 500,
            webPreferences: (_webPreferences = {
              // Use pluginOptions.nodeIntegration, leave this alone
              // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
              nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
              contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
            }, _defineProperty(_webPreferences, "nodeIntegration", true), _defineProperty(_webPreferences, "contextIsolation", false), _defineProperty(_webPreferences, "webSecurity", false), _defineProperty(_webPreferences, "preload", __dirname + '\\preload.js'), _webPreferences)
          });

          if (!process.env.WEBPACK_DEV_SERVER_URL) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(win.loadURL(process.env.WEBPACK_DEV_SERVER_URL));

        case 4:
          if (!process.env.IS_TEST) win.webContents.openDevTools();
          _context.next = 10;
          break;

        case 7:
          (0, _lib.createProtocol)('app'); // Load the index.html when not in development

          win.loadURL('app://./index.html');
          win.webContents.openDevTools();

        case 10:
          (0, _updata.updateHandle)(win, UPDATA_URL);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
} // Quit when all windows are closed.


_electron.app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (_electron.BrowserWindow.getAllWindows().length === 0) createWindow();
}); // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


_electron.app.on('ready', function _callee() {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // if (isDevelopment && !process.env.IS_TEST) {
          //   // Install Vue Devtools
          //   try {
          //     await installExtension(VUEJS3_DEVTOOLS)
          //   } catch (e) {
          //     console.error('Vue Devtools failed to install:', e.toString())
          //   }
          // }
          createWindow();

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Exit cleanly on request from parent process in development mode.


if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', function (data) {
      if (data === 'graceful-exit') {
        _electron.app.quit();
      }
    });
  } else {
    process.on('SIGTERM', function () {
      _electron.app.quit();
    });
  }
}