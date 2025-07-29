// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"aAtWW":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "2a830a53e3fc7154";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"bGah5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setCurUserToNull", ()=>setCurUserToNull);
var _webImmediateJs = require("core-js/modules/web.immediate.js");
var _runtime = require("regenerator-runtime/runtime");
var _userModelJs = require("./models/UserModel.js");
var _userModelJsDefault = parcelHelpers.interopDefault(_userModelJs);
var _helpersJs = require("./helpers.js");
var _helpersJsDefault = parcelHelpers.interopDefault(_helpersJs);
var _entireAppView = require("./views/entireAppView");
var _entireAppViewDefault = parcelHelpers.interopDefault(_entireAppView);
var _loginFormViewJs = require("./views/loginFormView.js");
var _loginFormViewJsDefault = parcelHelpers.interopDefault(_loginFormViewJs);
var _loginForgotPasswordViewJs = require("./views/loginForgotPasswordView.js");
var _loginForgotPasswordViewJsDefault = parcelHelpers.interopDefault(_loginForgotPasswordViewJs);
var _loginScrollViewJs = require("./views/loginScrollView.js");
var _loginScrollViewJsDefault = parcelHelpers.interopDefault(_loginScrollViewJs);
var _loginBottomHalfViewJs = require("./views/loginBottomHalfView.js");
var _loginBottomHalfViewJsDefault = parcelHelpers.interopDefault(_loginBottomHalfViewJs);
var _loginWholeViewJs = require("./views/loginWholeView.js");
var _loginWholeViewJsDefault = parcelHelpers.interopDefault(_loginWholeViewJs);
var _overlayAppExplanationAboutThisWebViewJs = require("./views/overlayAppExplanationAboutThisWebView.js");
var _overlayAppExplanationAboutThisWebViewJsDefault = parcelHelpers.interopDefault(_overlayAppExplanationAboutThisWebViewJs);
var _mainWholeViewJs = require("./views/mainWholeView.js");
var _mainWholeViewJsDefault = parcelHelpers.interopDefault(_mainWholeViewJs);
var _mainTopSectionViewJs = require("./views/mainTopSectionView.js");
var _mainTopSectionViewJsDefault = parcelHelpers.interopDefault(_mainTopSectionViewJs);
var _overlaySliderViewJs = require("./views/overlaySliderView.js");
var _overlaySliderViewJsDefault = parcelHelpers.interopDefault(_overlaySliderViewJs);
var _overlayRoomsViewJs = require("./views/overlayRoomsView.js");
var _overlayRoomsViewJsDefault = parcelHelpers.interopDefault(_overlayRoomsViewJs);
var _mainDaysCounterContainerViewJs = require("./views/mainDaysCounterContainerView.js");
var _mainDaysCounterContainerViewJsDefault = parcelHelpers.interopDefault(_mainDaysCounterContainerViewJs);
var _overlayAppExplanationHowToUseViewJs = require("./views/overlayAppExplanationHowToUseView.js");
var _overlayAppExplanationHowToUseViewJsDefault = parcelHelpers.interopDefault(_overlayAppExplanationHowToUseViewJs);
var _settingsViewJs = require("./views/settingsView.js");
var _settingsViewJsDefault = parcelHelpers.interopDefault(_settingsViewJs);
var _contenteditableViewJs = require("./views/contenteditableView.js");
var _contenteditableViewJsDefault = parcelHelpers.interopDefault(_contenteditableViewJs);
var _overlayViewJs = require("./views/overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
var _overlayMessageSpinnerViewJs = require("./views/overlayMessageSpinnerView.js");
var _overlayMessageSpinnerViewJsDefault = parcelHelpers.interopDefault(_overlayMessageSpinnerViewJs);
var _idRoomsSliderViewJs = require("./views/idRoomsSliderView.js");
var _idRoomsSliderViewJsDefault = parcelHelpers.interopDefault(_idRoomsSliderViewJs);
// if (model.hot) {
//   model.hot.accept();
// }
let curUser;
const setCurUserToNull = function() {
    curUser = null;
};
// curUser = UserManageApi._curUser;
// curUser = {
//   _id: "hkshdjs63s8****u23h3j",
//   username: "leichan",
//   email: "",
//   goals: [
//     {
//       title: "Too long title here! How to handle it",
//       date: "07/05/2025",
//       comments: [],
//       doToList: [],
//     },
//     { title: "ahaha", date: "07/10/2025", comments: [], doToList: [] },
//   ],
//   remainingDaysPrev: [12876, 30],
//   remainingDaysNow: [23, 20],
//   howManyTimesClick: [],
//   remainingDaysNowRooms: [],
//   remainingDaysPrevRooms: [],
//   howManyTimesClickRooms: [],
//   rooms: [
//     {
//       roomId: "hkshdjs63s8****u23h3j",
//       title: "tanabata",
//       date: "07/07/2025",
//       comments: [],
//       doToList: [],
//       usernames: ["leichan", "hhhh", "fofofofof", "heheheheheh", "nununununun"],
//     },
//   ],
// };
// mainTopSectionView.type =
//   mainDaysCounterContainerView.type =
//   mainWholeView.type =
//     "goals";
// loginWholeView.close();
// mainTopSectionView.renderPartialToParentEle("beforeend", curUser);
// mainDaysCounterContainerView.renderToParentEle(curUser);
// mainWholeView.init(curUser);
// mainWholeView.open();
// overlayMessageSpinnerView._asyncInit(
//   "message",
//   "message",
//   overlayMessageSpinnerView._messageSessionTimeout
// );
// overlaySliderView.type = "goals";
// overlaySliderView.init(curUser);
// overlaySliderView.open();
// overlayCreateRoomsView.renderToParentEle();
// overlayCreateRoomsView.open();
// (async function () {
//   loginWholeView.close();
//   await overlayMessageSpinnerView._asyncInit("spinner");
//   overlayMessageSpinnerView.open();
// })();
const pageMainInit = function(type) {
    (0, _mainTopSectionViewJsDefault.default).type = (0, _mainDaysCounterContainerViewJsDefault.default).type = (0, _mainWholeViewJsDefault.default).type = type;
    (0, _mainTopSectionViewJsDefault.default).renderToParentEle(curUser);
    (0, _mainTopSectionViewJsDefault.default)._changeSwitch();
    (0, _mainDaysCounterContainerViewJsDefault.default).renderToParentEle(curUser);
    (0, _mainDaysCounterContainerViewJsDefault.default).init();
    (0, _mainWholeViewJsDefault.default).init(curUser);
};
const controlAboutThisWeb = function() {
    (0, _overlayAppExplanationAboutThisWebViewJsDefault.default).open();
    (0, _overlayAppExplanationAboutThisWebViewJsDefault.default)._addEvents();
};
const controlHowToUse = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlayAppExplanationHowToUseViewJsDefault.default).open();
    (0, _overlayAppExplanationHowToUseViewJsDefault.default)._addEvents();
};
const controlLogin = async function(username, password) {
    try {
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        await (0, _userModelJsDefault.default).login(username, password);
        curUser = (0, _userModelJsDefault.default)._curUser;
        (0, _loginFormViewJsDefault.default)._resetLogingForm();
        (0, _loginWholeViewJsDefault.default).close();
        pageMainInit("goals");
        (0, _overlayMessageSpinnerViewJsDefault.default).close();
        (0, _mainWholeViewJsDefault.default).open();
        (0, _helpersJsDefault.default)._setTimeoutLogout();
    } catch (err) {
        (0, _overlayMessageSpinnerViewJsDefault.default).close();
        if (err.statusCode === 404) return (0, _loginFormViewJsDefault.default).renderError((0, _loginFormViewJsDefault.default)._errorMessageWrong);
        if (err.statusCode === 429) return (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", err.message);
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
const controlForgotPasswordOpen = function() {
    (0, _loginWholeViewJsDefault.default).close();
    (0, _loginForgotPasswordViewJsDefault.default).openSlow();
};
const controlForgotPasswordClose = function() {
    (0, _loginForgotPasswordViewJsDefault.default).closeSlow();
    (0, _loginWholeViewJsDefault.default).open();
};
const controlForgotPasswordSubmit = function(emailInput) {
    console.log("email input sent", emailInput);
};
const controlScroll = function() {
    (0, _loginBottomHalfViewJsDefault.default).open();
    (0, _loginBottomHalfViewJsDefault.default).renderInit();
};
const controlCreateAcc = async function(username, password, email) {
    try {
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        await (0, _userModelJsDefault.default).createUser({
            username,
            password,
            email
        });
        curUser = (0, _userModelJsDefault.default)._curUser;
        (0, _mainTopSectionViewJsDefault.default).type = (0, _mainDaysCounterContainerViewJsDefault.default).type = (0, _mainWholeViewJsDefault.default).type = "goals";
        (0, _mainTopSectionViewJsDefault.default).renderToParentEle(curUser);
        (0, _mainDaysCounterContainerViewJsDefault.default).renderToParentEle(curUser);
        (0, _mainWholeViewJsDefault.default).init(curUser);
        (0, _loginWholeViewJsDefault.default).close();
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", (0, _overlayMessageSpinnerViewJsDefault.default)._messageCreateAcc);
        (0, _mainWholeViewJsDefault.default).open();
        (0, _helpersJsDefault.default)._setTimeoutLogout();
    } catch (err) {
        (0, _overlayMessageSpinnerViewJsDefault.default).close();
        if (err.name === "ValidationError" || err.name === "ExpressValidatorError" || err.name === "DuplicateUserInfo") return (0, _loginBottomHalfViewJsDefault.default).renderError(err.message);
        if (err.statusCode === 429) return (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", err.message);
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
const controlSwitch = function(type) {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    pageMainInit(type);
};
const controlLogout = async function() {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        await (0, _userModelJsDefault.default).logout();
        setCurUserToNull();
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", (0, _overlayMessageSpinnerViewJsDefault.default)._messageLogout);
        (0, _settingsViewJsDefault.default).close();
        (0, _overlayViewJsDefault.default).close();
        (0, _mainWholeViewJsDefault.default).close();
        (0, _loginWholeViewJsDefault.default).open();
    } catch (err) {
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessageLogout);
    }
};
const controlEditDaysCounter = function(editGoalRoomIndex, type) {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).type = type;
    if (type === "rooms") (0, _overlaySliderViewJsDefault.default).roomType = "create";
    (0, _overlaySliderViewJsDefault.default).init(curUser, editGoalRoomIndex);
    (0, _overlaySliderViewJsDefault.default)._changeGoalRoomForEdit(editGoalRoomIndex);
    (0, _overlaySliderViewJsDefault.default).open();
};
const controlEditGoalRoom = async function(goalRoomIndex, editedGoalRoomInfo, type) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        await (0, _userModelJsDefault.default).editGoalRoom(goalRoomIndex, editedGoalRoomInfo, type);
        curUser = (0, _userModelJsDefault.default)._curUser;
        pageMainInit(type);
        // overlayMessageSpinnerView.close();
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", `${type.at(0).toUpperCase() + type.slice(1, 4)} updated successfully!`);
        (0, _overlaySliderViewJsDefault.default).init(curUser);
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
const controlDeleteGoalRoom = async function(deleteGoalRoomIndex, type, selectedGoal = null, daysCounterOrSlide) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        ///remove selected mark from selected goal
        if (type === "rooms" && selectedGoal) await (0, _userModelJsDefault.default).removeSelected(selectedGoal);
        type === "goals" ? await (0, _userModelJsDefault.default).deleteGoal(deleteGoalRoomIndex) : await (0, _userModelJsDefault.default).deleteRoom(deleteGoalRoomIndex);
        curUser = (0, _userModelJsDefault.default)._curUser;
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", `${type.at(0).toUpperCase() + type.slice(1, 4)} deleted successfully!`);
        if (daysCounterOrSlide === "daysCounter") return pageMainInit(type);
        (0, _overlaySliderViewJsDefault.default).init(curUser);
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
const controlSaveContenteditable = async function(type, modifiedCard, toDoLists = null, checkedOrNotArr = null, comments = null) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        await (0, _userModelJsDefault.default).saveToDoListsComments(type, modifiedCard, toDoLists, checkedOrNotArr, comments);
        curUser = (0, _userModelJsDefault.default)._curUser;
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", `Server error while saving ${toDoLists ? "To-Do lists" : "comments"} \u{1F647}\u{200D}\u{2642}\u{FE0F} <br> Please try again this later!`);
    }
};
const controlDaysCounter = async function(type) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        await (0, _userModelJsDefault.default).updateRemainingDaysPrev(type);
        await (0, _userModelJsDefault.default).saveHowManyTimesClick(type);
        curUser = (0, _userModelJsDefault.default)._curUser;
        (0, _mainTopSectionViewJsDefault.default).renderToParentEle(curUser);
        (0, _mainDaysCounterContainerViewJsDefault.default).renderToParentEle(curUser);
        (0, _mainDaysCounterContainerViewJsDefault.default)._handleHidden();
        (0, _mainWholeViewJsDefault.default).init(curUser);
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
/////////////Goals/Rooms/////////////////
const controlSetGoals = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).type = "goals";
    (0, _overlaySliderViewJsDefault.default).init(curUser);
    (0, _overlaySliderViewJsDefault.default).open();
};
const controlCreateRooms = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).type = "rooms";
    (0, _overlayRoomsViewJsDefault.default).renderToParentEle();
    (0, _overlayRoomsViewJsDefault.default).open();
};
const controlCloseOverlay = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).close();
    // mainDaysCounterContainerView._data = curUser;
    (0, _mainDaysCounterContainerViewJsDefault.default).init(curUser);
    (0, _contenteditableViewJsDefault.default)._resetAllToFirst((0, _mainDaysCounterContainerViewJsDefault.default)._parentElement);
};
const controlRoomsScratch = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).roomType = "create";
    (0, _overlaySliderViewJsDefault.default).init(curUser);
    (0, _overlaySliderViewJsDefault.default).open();
};
const controlRoomsSelect = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).roomType = "select";
    (0, _overlaySliderViewJsDefault.default).init(curUser);
    (0, _overlaySliderViewJsDefault.default).open();
};
const controlRoomsId = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _overlaySliderViewJsDefault.default).roomType = "id";
    (0, _overlaySliderViewJsDefault.default).init(curUser);
    (0, _overlaySliderViewJsDefault.default).open();
};
const controlRoomsSaveSelected = async function(selectedGoalsIndex) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        await (0, _userModelJsDefault.default).saveSelectedGoals(selectedGoalsIndex);
        curUser = (0, _userModelJsDefault.default)._curUser;
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", `Server error while creating room${goalsOrRoomsInfo.length >= 2 ? "s" : ""} \u{1F647}\u{200D}\u{2642}\u{FE0F} <br> Please try again this later!`);
    }
};
const controlGoalsRoomsSubmit = async function(goalsOrRoomsInfo1, type, roomType = null) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        type === "goals" ? await (0, _userModelJsDefault.default).saveGoalsInfo(goalsOrRoomsInfo1) : await (0, _userModelJsDefault.default).saveRoomsInfo(goalsOrRoomsInfo1, roomType);
        curUser = (0, _userModelJsDefault.default)._curUser;
        pageMainInit(type);
        (0, _overlaySliderViewJsDefault.default).type = type;
        if (roomType) (0, _overlaySliderViewJsDefault.default).roomType = roomType;
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", `${type.at(0).toUpperCase()}${goalsOrRoomsInfo1.length >= 2 ? type.slice(1) : type.slice(1, 4)} created successfully!`);
        (0, _overlaySliderViewJsDefault.default).init(curUser);
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        if (err.statusCode === 404) return (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessageRoomNotFound);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", `Server error while creating ${goalsOrRoomsInfo1.length >= 2 ? type : type.slice(0, 4)} \u{1F647}\u{200D}\u{2642}\u{FE0F} <br> Please try again this later!`);
    }
};
//////////////Settings////////////////
const controlSettings = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _mainWholeViewJsDefault.default).close();
    (0, _settingsViewJsDefault.default).renderInit(curUser);
    (0, _settingsViewJsDefault.default).open();
};
const controlCloseSettings = function() {
    (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
    (0, _settingsViewJsDefault.default).close();
    (0, _mainWholeViewJsDefault.default).open();
};
const controlUpdatePassword = async function(curPassword, newPassword, curPasswordInputField, newPasswordInputField) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        await (0, _userModelJsDefault.default)._updatePassword(curPassword, newPassword);
        (0, _settingsViewJsDefault.default).renderInit(curUser);
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", (0, _settingsViewJsDefault.default)._message);
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        if (err.name === "ValidationError" || err.name === "ExpressValidatorError") {
            (0, _overlayMessageSpinnerViewJsDefault.default).close();
            (0, _settingsViewJsDefault.default).renderError(err.message);
            (0, _settingsViewJsDefault.default).renderErrorInputField(curPasswordInputField);
            return (0, _settingsViewJsDefault.default).renderErrorInputField(newPasswordInputField);
        }
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
//section is username or email
const controlUpdateUsernameEmail = async function(updateInput, section, inputField) {
    try {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("spinner");
        await (0, _userModelJsDefault.default)._updateUsernameEmail(updateInput, section);
        curUser = (0, _userModelJsDefault.default)._curUser;
        (0, _settingsViewJsDefault.default).renderInit(curUser);
        (0, _settingsViewJsDefault.default).renderMessage();
        await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", (0, _settingsViewJsDefault.default)._message);
        // overlayMessageSpinnerView.open();
        if (section !== "username") return;
        (0, _mainTopSectionViewJsDefault.default).renderToParentEle(curUser);
    } catch (err) {
        (0, _helpersJsDefault.default)._resetSetTimeoutLogout();
        if (err.name === "ValidationError" || err.name === "ExpressValidatorError" || err.name === "DuplicateUserInfo") {
            (0, _overlayMessageSpinnerViewJsDefault.default).close();
            (0, _settingsViewJsDefault.default).renderError(err.message);
            return (0, _settingsViewJsDefault.default).renderErrorInputField(inputField);
        }
        console.error(err);
        (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessage);
    }
};
const init = function() {
    (0, _entireAppViewDefault.default)._addEventClickPasswordVisibility();
    (0, _loginWholeViewJsDefault.default)._addHandlerClickAppExplanation(controlAboutThisWeb);
    (0, _loginFormViewJsDefault.default).addHandlerSubmit(controlLogin);
    (0, _loginFormViewJsDefault.default).addHandlerClickForgotPassword(controlForgotPasswordOpen);
    (0, _loginForgotPasswordViewJsDefault.default).addHandlerClickClose(controlForgotPasswordClose);
    (0, _loginForgotPasswordViewJsDefault.default).addHandlerSubmit(controlForgotPasswordSubmit);
    (0, _loginScrollViewJsDefault.default).addHandlerClick(controlScroll);
    (0, _loginBottomHalfViewJsDefault.default).addHandlerSubmit(controlCreateAcc);
    (0, _mainWholeViewJsDefault.default).addHandlerClickCounter(controlDaysCounter);
    (0, _mainWholeViewJsDefault.default)._addHandlerClickHowToUse(controlHowToUse);
    (0, _mainWholeViewJsDefault.default).addHandlerClickSetting(controlSettings);
    (0, _mainTopSectionViewJsDefault.default).addHandlerClickSwitch(controlSwitch);
    (0, _mainTopSectionViewJsDefault.default).addHandlerClickGoals(controlSetGoals);
    (0, _mainTopSectionViewJsDefault.default).addHandlerClickRooms(controlCreateRooms);
    (0, _mainTopSectionViewJsDefault.default)._addEventClickLogout();
    (0, _mainTopSectionViewJsDefault.default)._addHandlerClickIAmSure(controlLogout);
    (0, _mainDaysCounterContainerViewJsDefault.default)._addEvents();
    (0, _mainDaysCounterContainerViewJsDefault.default)._addHandlerClickEdit(controlEditDaysCounter);
    (0, _mainDaysCounterContainerViewJsDefault.default)._addHandlerIAmSure(controlDeleteGoalRoom);
    (0, _mainDaysCounterContainerViewJsDefault.default).addHandlerClickOutside(controlSaveContenteditable);
    (0, _overlaySliderViewJsDefault.default)._addEvents();
    (0, _overlaySliderViewJsDefault.default).addHandlerClickX(controlCloseOverlay);
    (0, _overlaySliderViewJsDefault.default).addHandlerClickOutside(controlCloseOverlay);
    (0, _overlaySliderViewJsDefault.default)._addHandlerClickEscapeClose(controlCloseOverlay);
    (0, _overlaySliderViewJsDefault.default)._addHandlerClickFinishEditing(controlEditGoalRoom);
    (0, _overlaySliderViewJsDefault.default)._addHandlerIAmSure(controlDeleteGoalRoom);
    (0, _overlaySliderViewJsDefault.default).addHandlerClickOutsideContenteditable(controlSaveContenteditable);
    (0, _overlaySliderViewJsDefault.default).addHandlerSubmit(controlGoalsRoomsSubmit, controlRoomsSaveSelected);
    (0, _overlayRoomsViewJsDefault.default).addHandlerClick(controlRoomsScratch, controlRoomsSelect, controlRoomsId);
    (0, _settingsViewJsDefault.default).addHandlerClickX(controlCloseSettings);
    (0, _settingsViewJsDefault.default).addEventClickChange();
    (0, _settingsViewJsDefault.default).addHandlerClickFinish(controlUpdatePassword, controlUpdateUsernameEmail);
    (0, _overlayMessageSpinnerViewJsDefault.default)._addEvents();
};
init();

},{"core-js/modules/web.immediate.js":"bzsBv","regenerator-runtime/runtime":"f6ot0","./models/UserModel.js":"gHvsa","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./views/loginFormView.js":"5EeQT","./views/loginScrollView.js":"hfNtw","./views/loginBottomHalfView.js":"lva0d","./views/loginWholeView.js":"8d4a4","./views/mainWholeView.js":"d7In2","./views/mainTopSectionView.js":"5Hh2X","./views/mainDaysCounterContainerView.js":"deT27","./views/entireAppView":"l8oQV","./views/overlaySliderView.js":"dip5k","./views/settingsView.js":"8HJNM","./views/loginForgotPasswordView.js":"3mZuB","./views/contenteditableView.js":"3MXPk","./views/overlayRoomsView.js":"gsWnq","./views/overlayView.js":"4fl36","./views/overlayMessageSpinnerView.js":"gern0","./views/idRoomsSliderView.js":"jL5KG","./helpers.js":"7nL9P","./views/overlayAppExplanationAboutThisWebView.js":"9C9jA","./views/overlayAppExplanationHowToUseView.js":"2OlBh"}],"bzsBv":[function(require,module,exports,__globalThis) {
'use strict';
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require("52e9b3eefbbce1ed");
require("292fa64716f5b39e");

},{"52e9b3eefbbce1ed":"6n7Wj","292fa64716f5b39e":"cpv3g"}],"6n7Wj":[function(require,module,exports,__globalThis) {
'use strict';
var $ = require("79389288a80b279c");
var globalThis = require("e4d64249a0133d14");
var clearImmediate = require("84ba5ca62b8b14c9").clear;
// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: globalThis.clearImmediate !== clearImmediate
}, {
    clearImmediate: clearImmediate
});

},{"79389288a80b279c":"7Vckd","e4d64249a0133d14":"6xMjU","84ba5ca62b8b14c9":"9fjiV"}],"7Vckd":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("23dea28abc8414d1");
var getOwnPropertyDescriptor = require("2ec751f39e500b85").f;
var createNonEnumerableProperty = require("b4567636b28a3b3a");
var defineBuiltIn = require("50460aa43dd4048a");
var defineGlobalProperty = require("581238c99f8c2c30");
var copyConstructorProperties = require("566a383894c688bc");
var isForced = require("f0e2e697f04e8ad9");
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/ module.exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) target = globalThis;
    else if (STATIC) target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
    else target = globalThis[TARGET] && globalThis[TARGET].prototype;
    if (target) for(key in source){
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || targetProperty && targetProperty.sham) createNonEnumerableProperty(sourceProperty, 'sham', true);
        defineBuiltIn(target, key, sourceProperty, options);
    }
};

},{"23dea28abc8414d1":"6xMjU","2ec751f39e500b85":"dqLxA","b4567636b28a3b3a":"i7bgu","50460aa43dd4048a":"es56c","581238c99f8c2c30":"48kcX","566a383894c688bc":"i7gI0","f0e2e697f04e8ad9":"3rvW8"}],"6xMjU":[function(require,module,exports,__globalThis) {
var global = arguments[3];
'use strict';
var check = function(it) {
    return it && it.Math === Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || check(typeof this == 'object' && this) || // eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || Function('return this')();

},{}],"dqLxA":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("c04e6fb248689dba");
var call = require("553ec943aa2a4554");
var propertyIsEnumerableModule = require("bbc5e69071aa2fbd");
var createPropertyDescriptor = require("1d2ffbfd99e01f41");
var toIndexedObject = require("c4ea69a78a643d87");
var toPropertyKey = require("8ab18ff766aa2ab9");
var hasOwn = require("3761c5d34b7aa48f");
var IE8_DOM_DEFINE = require("c4dfcc26308f1b4a");
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"c04e6fb248689dba":"5AxuF","553ec943aa2a4554":"3v9g9","bbc5e69071aa2fbd":"U03h7","1d2ffbfd99e01f41":"dOb5l","c4ea69a78a643d87":"58zOi","8ab18ff766aa2ab9":"lGuA3","3761c5d34b7aa48f":"9CekL","c4dfcc26308f1b4a":"kwjpQ"}],"5AxuF":[function(require,module,exports,__globalThis) {
'use strict';
var fails = require("735b783268fd06c0");
// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
        get: function() {
            return 7;
        }
    })[1] !== 7;
});

},{"735b783268fd06c0":"7Gv5z"}],"7Gv5z":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};

},{}],"3v9g9":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_BIND = require("44e025d030d66023");
var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function() {
    return call.apply(call, arguments);
};

},{"44e025d030d66023":"5U5xz"}],"5U5xz":[function(require,module,exports,__globalThis) {
'use strict';
var fails = require("2642aa7619056f20");
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function() {}).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
});

},{"2642aa7619056f20":"7Gv5z"}],"U03h7":[function(require,module,exports,__globalThis) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
    1: 2
}, 1);
// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"dOb5l":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

},{}],"58zOi":[function(require,module,exports,__globalThis) {
'use strict';
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require("9d8f8f50ac9468eb");
var requireObjectCoercible = require("f7224aed72953ac4");
module.exports = function(it) {
    return IndexedObject(requireObjectCoercible(it));
};

},{"9d8f8f50ac9468eb":"gXe04","f7224aed72953ac4":"7cHwm"}],"gXe04":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("7ba7e65983d7b662");
var fails = require("df551e12a7c872dd");
var classof = require("1d34ea813cebff9c");
var $Object = Object;
var split = uncurryThis(''.split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object('z').propertyIsEnumerable(0);
}) ? function(it) {
    return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;

},{"7ba7e65983d7b662":"aAate","df551e12a7c872dd":"7Gv5z","1d34ea813cebff9c":"fKrQp"}],"aAate":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_BIND = require("829dd7a4e960cf9e");
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
    return function() {
        return call.apply(fn, arguments);
    };
};

},{"829dd7a4e960cf9e":"5U5xz"}],"fKrQp":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("1c71c3f6daac476c");
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);
module.exports = function(it) {
    return stringSlice(toString(it), 8, -1);
};

},{"1c71c3f6daac476c":"aAate"}],"7cHwm":[function(require,module,exports,__globalThis) {
'use strict';
var isNullOrUndefined = require("74607922ed30019f");
var $TypeError = TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function(it) {
    if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
    return it;
};

},{"74607922ed30019f":"gHvvU"}],"gHvvU":[function(require,module,exports,__globalThis) {
'use strict';
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function(it) {
    return it === null || it === undefined;
};

},{}],"lGuA3":[function(require,module,exports,__globalThis) {
'use strict';
var toPrimitive = require("53a3a67ac381c4e8");
var isSymbol = require("b992ca9cdcf7937b");
// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function(argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
};

},{"53a3a67ac381c4e8":"hyNfR","b992ca9cdcf7937b":"8EQ8A"}],"hyNfR":[function(require,module,exports,__globalThis) {
'use strict';
var call = require("70235907dc93b4b0");
var isObject = require("46fb53dace408c8e");
var isSymbol = require("677bdc4d74d2f983");
var getMethod = require("80395bcde336a28b");
var ordinaryToPrimitive = require("49552a7324952190");
var wellKnownSymbol = require("aea01c71276624bf");
var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw new $TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
};

},{"70235907dc93b4b0":"3v9g9","46fb53dace408c8e":"5rTge","677bdc4d74d2f983":"8EQ8A","80395bcde336a28b":"9TreM","49552a7324952190":"cUIZh","aea01c71276624bf":"lzelE"}],"5rTge":[function(require,module,exports,__globalThis) {
'use strict';
var isCallable = require("f87cee1cb79cbcca");
module.exports = function(it) {
    return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"f87cee1cb79cbcca":"2KfBB"}],"2KfBB":[function(require,module,exports,__globalThis) {
'use strict';
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function(argument) {
    return typeof argument == 'function' || argument === documentAll;
} : function(argument) {
    return typeof argument == 'function';
};

},{}],"8EQ8A":[function(require,module,exports,__globalThis) {
'use strict';
var getBuiltIn = require("6b6c481cdfb7df35");
var isCallable = require("2af44fcbdbf14c83");
var isPrototypeOf = require("76e903e830c40e7c");
var USE_SYMBOL_AS_UID = require("7e2fe930b3598e22");
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == 'symbol';
} : function(it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"6b6c481cdfb7df35":"h2CMt","2af44fcbdbf14c83":"2KfBB","76e903e830c40e7c":"jkNHH","7e2fe930b3598e22":"fSbH5"}],"h2CMt":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("e057fc33d60763c1");
var isCallable = require("f1d62079325906cb");
var aFunction = function(argument) {
    return isCallable(argument) ? argument : undefined;
};
module.exports = function(namespace, method) {
    return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};

},{"e057fc33d60763c1":"6xMjU","f1d62079325906cb":"2KfBB"}],"jkNHH":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("83f14842ef67e16a");
module.exports = uncurryThis({}.isPrototypeOf);

},{"83f14842ef67e16a":"aAate"}],"fSbH5":[function(require,module,exports,__globalThis) {
'use strict';
/* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = require("da4a972af0214ea0");
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

},{"da4a972af0214ea0":"2fu84"}],"2fu84":[function(require,module,exports,__globalThis) {
'use strict';
/* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = require("53b951dfb9de4d22");
var fails = require("b37df495bcdc1d99");
var globalThis = require("e5929e9affd2affc");
var $String = globalThis.String;
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"53b951dfb9de4d22":"cePh9","b37df495bcdc1d99":"7Gv5z","e5929e9affd2affc":"6xMjU"}],"cePh9":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("d049c1c2aa0eee5b");
var userAgent = require("4eb5796bbafe334d");
var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}
module.exports = version;

},{"d049c1c2aa0eee5b":"6xMjU","4eb5796bbafe334d":"qxRHs"}],"qxRHs":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("888bcb4c75dc4ad");
var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;
module.exports = userAgent ? String(userAgent) : '';

},{"888bcb4c75dc4ad":"6xMjU"}],"9TreM":[function(require,module,exports,__globalThis) {
'use strict';
var aCallable = require("bbfed17b24e215f4");
var isNullOrUndefined = require("492a86e2970f6a26");
// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function(V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"bbfed17b24e215f4":"dxhWU","492a86e2970f6a26":"gHvvU"}],"dxhWU":[function(require,module,exports,__globalThis) {
'use strict';
var isCallable = require("4094667126ecac05");
var tryToString = require("fce2a7573db493fa");
var $TypeError = TypeError;
// `Assert: IsCallable(argument) is true`
module.exports = function(argument) {
    if (isCallable(argument)) return argument;
    throw new $TypeError(tryToString(argument) + ' is not a function');
};

},{"4094667126ecac05":"2KfBB","fce2a7573db493fa":"fPD2p"}],"fPD2p":[function(require,module,exports,__globalThis) {
'use strict';
var $String = String;
module.exports = function(argument) {
    try {
        return $String(argument);
    } catch (error) {
        return 'Object';
    }
};

},{}],"cUIZh":[function(require,module,exports,__globalThis) {
'use strict';
var call = require("abe9ca006f56626e");
var isCallable = require("c96b3a89fec6248a");
var isObject = require("551615fda0214f1b");
var $TypeError = TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function(input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    throw new $TypeError("Can't convert object to primitive value");
};

},{"abe9ca006f56626e":"3v9g9","c96b3a89fec6248a":"2KfBB","551615fda0214f1b":"5rTge"}],"lzelE":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("ad5ef4474219c101");
var shared = require("6a2cda01df6b4c79");
var hasOwn = require("dccc28ffa5beeb54");
var uid = require("48d6af1225853d44");
var NATIVE_SYMBOL = require("9f762329148684");
var USE_SYMBOL_AS_UID = require("1ce268781e409df2");
var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function(name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
    return WellKnownSymbolsStore[name];
};

},{"ad5ef4474219c101":"6xMjU","6a2cda01df6b4c79":"6SeRV","dccc28ffa5beeb54":"9CekL","48d6af1225853d44":"dePDt","9f762329148684":"2fu84","1ce268781e409df2":"fSbH5"}],"6SeRV":[function(require,module,exports,__globalThis) {
'use strict';
var store = require("84eeed9891aafe14");
module.exports = function(key, value) {
    return store[key] || (store[key] = value || {});
};

},{"84eeed9891aafe14":"29eKX"}],"29eKX":[function(require,module,exports,__globalThis) {
'use strict';
var IS_PURE = require("7b43004672b1879f");
var globalThis = require("bc8329e77dc2c1cc");
var defineGlobalProperty = require("dfb72a1d809f7b02");
var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
(store.versions || (store.versions = [])).push({
    version: '3.42.0',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: "\xa9 2014-2025 Denis Pushkarev (zloirock.ru)",
    license: 'https://github.com/zloirock/core-js/blob/v3.42.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
});

},{"7b43004672b1879f":"cpju0","bc8329e77dc2c1cc":"6xMjU","dfb72a1d809f7b02":"48kcX"}],"cpju0":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = false;

},{}],"48kcX":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("2d1c29655635b9ea");
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function(key, value) {
    try {
        defineProperty(globalThis, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        globalThis[key] = value;
    }
    return value;
};

},{"2d1c29655635b9ea":"6xMjU"}],"9CekL":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("f5dcaa60a713971f");
var toObject = require("ab17c4f45fcf0841");
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
};

},{"f5dcaa60a713971f":"aAate","ab17c4f45fcf0841":"fTIhz"}],"fTIhz":[function(require,module,exports,__globalThis) {
'use strict';
var requireObjectCoercible = require("f45a7b5dcdc4a410");
var $Object = Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function(argument) {
    return $Object(requireObjectCoercible(argument));
};

},{"f45a7b5dcdc4a410":"7cHwm"}],"dePDt":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("5da0fe4507da20a3");
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);
module.exports = function(key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"5da0fe4507da20a3":"aAate"}],"kwjpQ":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("9b4278b13c076bf");
var fails = require("8aee5d88a5f9b6b5");
var createElement = require("1db4d60148afcf21");
// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
        get: function() {
            return 7;
        }
    }).a !== 7;
});

},{"9b4278b13c076bf":"5AxuF","8aee5d88a5f9b6b5":"7Gv5z","1db4d60148afcf21":"eF8HX"}],"eF8HX":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("845bcece0e6d354");
var isObject = require("824df78b2e007250");
var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function(it) {
    return EXISTS ? document.createElement(it) : {};
};

},{"845bcece0e6d354":"6xMjU","824df78b2e007250":"5rTge"}],"i7bgu":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("a8753383ef98ee18");
var definePropertyModule = require("189ab650b8f71085");
var createPropertyDescriptor = require("1168c8162aa30435");
module.exports = DESCRIPTORS ? function(object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};

},{"a8753383ef98ee18":"5AxuF","189ab650b8f71085":"aBGsi","1168c8162aa30435":"dOb5l"}],"aBGsi":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("ca50eb9163928400");
var IE8_DOM_DEFINE = require("d482f9e5478795e8");
var V8_PROTOTYPE_DEFINE_BUG = require("b6ad7537efb06f4b");
var anObject = require("16365a73399e7fe7");
var toPropertyKey = require("fab1d366c47796d9");
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';
// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false
            };
        }
    }
    return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {}
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
};

},{"ca50eb9163928400":"5AxuF","d482f9e5478795e8":"kwjpQ","b6ad7537efb06f4b":"8Gm1h","16365a73399e7fe7":"jFjFb","fab1d366c47796d9":"lGuA3"}],"8Gm1h":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("b22a5a2de93e3ad2");
var fails = require("249a5b857c2dfccd");
// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function() {}, 'prototype', {
        value: 42,
        writable: false
    }).prototype !== 42;
});

},{"b22a5a2de93e3ad2":"5AxuF","249a5b857c2dfccd":"7Gv5z"}],"jFjFb":[function(require,module,exports,__globalThis) {
'use strict';
var isObject = require("2b6c6258a0a6082f");
var $String = String;
var $TypeError = TypeError;
// `Assert: Type(argument) is Object`
module.exports = function(argument) {
    if (isObject(argument)) return argument;
    throw new $TypeError($String(argument) + ' is not an object');
};

},{"2b6c6258a0a6082f":"5rTge"}],"es56c":[function(require,module,exports,__globalThis) {
'use strict';
var isCallable = require("99ee13632b3fa68");
var definePropertyModule = require("9ebb3e3004fccc0a");
var makeBuiltIn = require("f10cc812a3094053");
var defineGlobalProperty = require("d354802d852d9c2b");
module.exports = function(O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn(value, name, options);
    if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty(key, value);
    } else {
        try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
        } catch (error) {}
        if (simple) O[key] = value;
        else definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
        });
    }
    return O;
};

},{"99ee13632b3fa68":"2KfBB","9ebb3e3004fccc0a":"aBGsi","f10cc812a3094053":"6JWCA","d354802d852d9c2b":"48kcX"}],"6JWCA":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("ca84677f1ebd1804");
var fails = require("13360f2842eba261");
var isCallable = require("103e488c0928755a");
var hasOwn = require("cbf9b0e0779cc368");
var DESCRIPTORS = require("3f2eb7efeae2f72b");
var CONFIGURABLE_FUNCTION_NAME = require("548b10f284264c72").CONFIGURABLE;
var inspectSource = require("358f00f3103bd55b");
var InternalStateModule = require("9b2ce14119fd2412");
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
    return defineProperty(function() {}, 'length', {
        value: 8
    }).length !== 8;
});
var TEMPLATE = String(String).split('String');
var makeBuiltIn = module.exports = function(value, name, options) {
    if (stringSlice($String(name), 0, 7) === 'Symbol(') name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS) defineProperty(value, 'name', {
            value: name,
            configurable: true
        });
        else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) defineProperty(value, 'length', {
        value: options.arity
    });
    try {
        if (options && hasOwn(options, 'constructor') && options.constructor) {
            if (DESCRIPTORS) defineProperty(value, 'prototype', {
                writable: false
            });
        } else if (value.prototype) value.prototype = undefined;
    } catch (error) {}
    var state = enforceInternalState(value);
    if (!hasOwn(state, 'source')) state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    return value;
};
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

},{"ca84677f1ebd1804":"aAate","13360f2842eba261":"7Gv5z","103e488c0928755a":"2KfBB","cbf9b0e0779cc368":"9CekL","3f2eb7efeae2f72b":"5AxuF","548b10f284264c72":"d1uzf","358f00f3103bd55b":"aXOzF","9b2ce14119fd2412":"hbwRd"}],"d1uzf":[function(require,module,exports,__globalThis) {
'use strict';
var DESCRIPTORS = require("8ad2bacb0e20b95c");
var hasOwn = require("4eabfd8f83afc9d5");
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() {}).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};

},{"8ad2bacb0e20b95c":"5AxuF","4eabfd8f83afc9d5":"9CekL"}],"aXOzF":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("26e26db98367212e");
var isCallable = require("40ed9a4f6ae66648");
var store = require("485d48d6f4c6739e");
var functionToString = uncurryThis(Function.toString);
// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) store.inspectSource = function(it) {
    return functionToString(it);
};
module.exports = store.inspectSource;

},{"26e26db98367212e":"aAate","40ed9a4f6ae66648":"2KfBB","485d48d6f4c6739e":"29eKX"}],"hbwRd":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_WEAK_MAP = require("d3f0c9f3327b2fd6");
var globalThis = require("28c3574d0c39fe7e");
var isObject = require("f82e6cc0ac249fa5");
var createNonEnumerableProperty = require("c0ae163eea4ef97");
var hasOwn = require("6dea7358344877bb");
var shared = require("3e035a1241da2f0");
var sharedKey = require("88d6ccc27e779e5a");
var hiddenKeys = require("d40b9b3abdbb956e");
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;
var enforce = function(it) {
    return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
        return state;
    };
};
if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */ store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */ set = function(it, metadata) {
        if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
    };
    get = function(it) {
        return store.get(it) || {};
    };
    has = function(it) {
        return store.has(it);
    };
} else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function(it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
    };
    get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function(it) {
        return hasOwn(it, STATE);
    };
}
module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};

},{"d3f0c9f3327b2fd6":"6z7Mo","28c3574d0c39fe7e":"6xMjU","f82e6cc0ac249fa5":"5rTge","c0ae163eea4ef97":"i7bgu","6dea7358344877bb":"9CekL","3e035a1241da2f0":"29eKX","88d6ccc27e779e5a":"fDnL8","d40b9b3abdbb956e":"2sYlt"}],"6z7Mo":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("8b1a8c1dbfd18eb5");
var isCallable = require("aa77fff8d5ef0565");
var WeakMap = globalThis.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"8b1a8c1dbfd18eb5":"6xMjU","aa77fff8d5ef0565":"2KfBB"}],"fDnL8":[function(require,module,exports,__globalThis) {
'use strict';
var shared = require("dbc8182adeb8c92f");
var uid = require("90b4ffb58508a6e5");
var keys = shared('keys');
module.exports = function(key) {
    return keys[key] || (keys[key] = uid(key));
};

},{"dbc8182adeb8c92f":"6SeRV","90b4ffb58508a6e5":"dePDt"}],"2sYlt":[function(require,module,exports,__globalThis) {
'use strict';
module.exports = {};

},{}],"i7gI0":[function(require,module,exports,__globalThis) {
'use strict';
var hasOwn = require("d91d786cc71453ce");
var ownKeys = require("88cb809f98beddc6");
var getOwnPropertyDescriptorModule = require("10ea642aad5f7c21");
var definePropertyModule = require("39ff598ce822187e");
module.exports = function(target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
};

},{"d91d786cc71453ce":"9CekL","88cb809f98beddc6":"dDsbC","10ea642aad5f7c21":"dqLxA","39ff598ce822187e":"aBGsi"}],"dDsbC":[function(require,module,exports,__globalThis) {
'use strict';
var getBuiltIn = require("3cc1e4329d869e34");
var uncurryThis = require("2b8e77cbdbe3db7a");
var getOwnPropertyNamesModule = require("d703bcb62fcda216");
var getOwnPropertySymbolsModule = require("157674bad2772c6d");
var anObject = require("a09e060b9cae3c6c");
var concat = uncurryThis([].concat);
// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"3cc1e4329d869e34":"h2CMt","2b8e77cbdbe3db7a":"aAate","d703bcb62fcda216":"kdCGz","157674bad2772c6d":"5fq5o","a09e060b9cae3c6c":"jFjFb"}],"kdCGz":[function(require,module,exports,__globalThis) {
'use strict';
var internalObjectKeys = require("6d8591e17a49376c");
var enumBugKeys = require("2c933f93dd98f385");
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};

},{"6d8591e17a49376c":"gRwJ4","2c933f93dd98f385":"6IITF"}],"gRwJ4":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("363ee0e6bb4f46a7");
var hasOwn = require("3183fe0b0bf6f6ac");
var toIndexedObject = require("28192ac12e934672");
var indexOf = require("a5f9c5d8e993ccd6").indexOf;
var hiddenKeys = require("57775908f1581bc6");
var push = uncurryThis([].push);
module.exports = function(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if (hasOwn(O, key = names[i++])) ~indexOf(result, key) || push(result, key);
    return result;
};

},{"363ee0e6bb4f46a7":"aAate","3183fe0b0bf6f6ac":"9CekL","28192ac12e934672":"58zOi","a5f9c5d8e993ccd6":"kvmnR","57775908f1581bc6":"2sYlt"}],"kvmnR":[function(require,module,exports,__globalThis) {
'use strict';
var toIndexedObject = require("d5dcbcd68ac5acd0");
var toAbsoluteIndex = require("212b13aecfa48226");
var lengthOfArrayLike = require("e5a8b3e1da4c5637");
// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        if (length === 0) return !IS_INCLUDES && -1;
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el !== el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value !== value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
};

},{"d5dcbcd68ac5acd0":"58zOi","212b13aecfa48226":"hMPua","e5a8b3e1da4c5637":"132UY"}],"hMPua":[function(require,module,exports,__globalThis) {
'use strict';
var toIntegerOrInfinity = require("72fe0a53ad43912c");
var max = Math.max;
var min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"72fe0a53ad43912c":"hfRnH"}],"hfRnH":[function(require,module,exports,__globalThis) {
'use strict';
var trunc = require("3403cba02b5f61d8");
// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
};

},{"3403cba02b5f61d8":"bZw4A"}],"bZw4A":[function(require,module,exports,__globalThis) {
'use strict';
var ceil = Math.ceil;
var floor = Math.floor;
// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
};

},{}],"132UY":[function(require,module,exports,__globalThis) {
'use strict';
var toLength = require("23d9716c54a2ab90");
// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function(obj) {
    return toLength(obj.length);
};

},{"23d9716c54a2ab90":"8PIfI"}],"8PIfI":[function(require,module,exports,__globalThis) {
'use strict';
var toIntegerOrInfinity = require("c48d3a8b8ac52b0b");
var min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function(argument) {
    var len = toIntegerOrInfinity(argument);
    return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"c48d3a8b8ac52b0b":"hfRnH"}],"6IITF":[function(require,module,exports,__globalThis) {
'use strict';
// IE8- don't enum bug keys
module.exports = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
];

},{}],"5fq5o":[function(require,module,exports,__globalThis) {
'use strict';
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"3rvW8":[function(require,module,exports,__globalThis) {
'use strict';
var fails = require("10299561ea0c7870");
var isCallable = require("8b1ecdaf59f07210");
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
    return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

},{"10299561ea0c7870":"7Gv5z","8b1ecdaf59f07210":"2KfBB"}],"9fjiV":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("629a4d99f4fe5b2e");
var apply = require("e574be68c288c7c8");
var bind = require("df212787338802d3");
var isCallable = require("afdf018c2d01bbc6");
var hasOwn = require("35a3e849940fd612");
var fails = require("b8bf5434d2248ca7");
var html = require("731f9370cc21fc3b");
var arraySlice = require("ec358060964e4bde");
var createElement = require("907adb6d219da7a3");
var validateArgumentsLength = require("f398561ebd49a798");
var IS_IOS = require("8a8e342aaad83bb");
var IS_NODE = require("6eef8b4e43dd6731");
var set = globalThis.setImmediate;
var clear = globalThis.clearImmediate;
var process = globalThis.process;
var Dispatch = globalThis.Dispatch;
var Function = globalThis.Function;
var MessageChannel = globalThis.MessageChannel;
var String = globalThis.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;
fails(function() {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = globalThis.location;
});
var run = function(id) {
    if (hasOwn(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
    }
};
var runner = function(id) {
    return function() {
        run(id);
    };
};
var eventListener = function(event) {
    run(event.data);
};
var globalPostMessageDefer = function(id) {
    // old engines have not location.origin
    globalThis.postMessage(String(id), $location.protocol + '//' + $location.host);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
    set = function setImmediate(handler) {
        validateArgumentsLength(arguments.length, 1);
        var fn = isCallable(handler) ? handler : Function(handler);
        var args = arraySlice(arguments, 1);
        queue[++counter] = function() {
            apply(fn, undefined, args);
        };
        defer(counter);
        return counter;
    };
    clear = function clearImmediate(id) {
        delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) defer = function(id) {
        process.nextTick(runner(id));
    };
    else if (Dispatch && Dispatch.now) defer = function(id) {
        Dispatch.now(runner(id));
    };
    else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = eventListener;
        defer = bind(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (globalThis.addEventListener && isCallable(globalThis.postMessage) && !globalThis.importScripts && $location && $location.protocol !== 'file:' && !fails(globalPostMessageDefer)) {
        defer = globalPostMessageDefer;
        globalThis.addEventListener('message', eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) defer = function(id) {
        html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
        };
    };
    else defer = function(id) {
        setTimeout(runner(id), 0);
    };
}
module.exports = {
    set: set,
    clear: clear
};

},{"629a4d99f4fe5b2e":"6xMjU","e574be68c288c7c8":"9A5Vw","df212787338802d3":"l8jub","afdf018c2d01bbc6":"2KfBB","35a3e849940fd612":"9CekL","b8bf5434d2248ca7":"7Gv5z","731f9370cc21fc3b":"2ac6V","ec358060964e4bde":"kGYHC","907adb6d219da7a3":"eF8HX","f398561ebd49a798":"elQJL","8a8e342aaad83bb":"9HLc7","6eef8b4e43dd6731":"3ENS9"}],"9A5Vw":[function(require,module,exports,__globalThis) {
'use strict';
var NATIVE_BIND = require("d07466971ded2aca");
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
    return call.apply(apply, arguments);
});

},{"d07466971ded2aca":"5U5xz"}],"l8jub":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("92f6f475baa85665");
var aCallable = require("547ee4f9dab0cc76");
var NATIVE_BIND = require("5acd31cba656d393");
var bind = uncurryThis(uncurryThis.bind);
// optional / simple context binding
module.exports = function(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};

},{"92f6f475baa85665":"1401W","547ee4f9dab0cc76":"dxhWU","5acd31cba656d393":"5U5xz"}],"1401W":[function(require,module,exports,__globalThis) {
'use strict';
var classofRaw = require("8e77093015e1e67f");
var uncurryThis = require("9daa4dbbca634c9e");
module.exports = function(fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};

},{"8e77093015e1e67f":"fKrQp","9daa4dbbca634c9e":"aAate"}],"2ac6V":[function(require,module,exports,__globalThis) {
'use strict';
var getBuiltIn = require("14cb391fa4a0dda8");
module.exports = getBuiltIn('document', 'documentElement');

},{"14cb391fa4a0dda8":"h2CMt"}],"kGYHC":[function(require,module,exports,__globalThis) {
'use strict';
var uncurryThis = require("5250b5c9324ccbe");
module.exports = uncurryThis([].slice);

},{"5250b5c9324ccbe":"aAate"}],"elQJL":[function(require,module,exports,__globalThis) {
'use strict';
var $TypeError = TypeError;
module.exports = function(passed, required) {
    if (passed < required) throw new $TypeError('Not enough arguments');
    return passed;
};

},{}],"9HLc7":[function(require,module,exports,__globalThis) {
'use strict';
var userAgent = require("88313d0d5d3e28c");
// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"88313d0d5d3e28c":"qxRHs"}],"3ENS9":[function(require,module,exports,__globalThis) {
'use strict';
var ENVIRONMENT = require("5fac34e3c4c0e043");
module.exports = ENVIRONMENT === 'NODE';

},{"5fac34e3c4c0e043":"k2Sud"}],"k2Sud":[function(require,module,exports,__globalThis) {
'use strict';
/* global Bun, Deno -- detection */ var globalThis = require("7dc361f46ecde901");
var userAgent = require("9f6e24ecbba66a9e");
var classof = require("a008a59fdc341842");
var userAgentStartsWith = function(string) {
    return userAgent.slice(0, string.length) === string;
};
module.exports = function() {
    if (userAgentStartsWith('Bun/')) return 'BUN';
    if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
    if (userAgentStartsWith('Deno/')) return 'DENO';
    if (userAgentStartsWith('Node.js/')) return 'NODE';
    if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
    if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
    if (classof(globalThis.process) === 'process') return 'NODE';
    if (globalThis.window && globalThis.document) return 'BROWSER';
    return 'REST';
}();

},{"7dc361f46ecde901":"6xMjU","9f6e24ecbba66a9e":"qxRHs","a008a59fdc341842":"fKrQp"}],"cpv3g":[function(require,module,exports,__globalThis) {
'use strict';
var $ = require("33581c362196ed1f");
var globalThis = require("503bb555249cad41");
var setTask = require("4219ce460223bd08").set;
var schedulersFix = require("738dc378e6a94c64");
// https://github.com/oven-sh/bun/issues/1633
var setImmediate = globalThis.setImmediate ? schedulersFix(setTask, false) : setTask;
// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: globalThis.setImmediate !== setImmediate
}, {
    setImmediate: setImmediate
});

},{"33581c362196ed1f":"7Vckd","503bb555249cad41":"6xMjU","4219ce460223bd08":"9fjiV","738dc378e6a94c64":"fRRu2"}],"fRRu2":[function(require,module,exports,__globalThis) {
'use strict';
var globalThis = require("aa6765693e58a0fe");
var apply = require("a68ecfcbf29c46f6");
var isCallable = require("7087588d33667af2");
var ENVIRONMENT = require("864edee099e8affb");
var USER_AGENT = require("3a3a5a2cfab86f21");
var arraySlice = require("cff2c830bdea4f24");
var validateArgumentsLength = require("58a74f00cee1ac64");
var Function = globalThis.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENVIRONMENT === 'BUN' && function() {
    var version = globalThis.Bun.version.split('.');
    return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
}();
// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function(scheduler, hasTimeArg) {
    var firstParamIndex = hasTimeArg ? 2 : 1;
    return WRAP ? function(handler, timeout /* , ...arguments */ ) {
        var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
        var fn = isCallable(handler) ? handler : Function(handler);
        var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
        var callback = boundArgs ? function() {
            apply(fn, this, params);
        } : fn;
        return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
    } : scheduler;
};

},{"aa6765693e58a0fe":"6xMjU","a68ecfcbf29c46f6":"9A5Vw","7087588d33667af2":"2KfBB","864edee099e8affb":"k2Sud","3a3a5a2cfab86f21":"qxRHs","cff2c830bdea4f24":"kGYHC","58a74f00cee1ac64":"elQJL"}],"f6ot0":[function(require,module,exports,__globalThis) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var runtime = function(exports) {
    "use strict";
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        });
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
    });
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
    });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        defineProperty(this, "_invoke", {
            value: enqueue
        });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per GeneratorResume behavior specified since ES2015:
                // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
                // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method, or a missing .next method, always terminate the
            // yield* loop.
            context.delegate = null;
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (methodName === "throw" && delegate.iterator["return"]) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
            }
            if (methodName !== "return") {
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable != null) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        throw new TypeError(typeof iterable + " is not iterable");
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(0, module.exports));
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
    else Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"gHvsa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
const health = async function() {
    try {
        const res = await fetch(`${(0, _configJs.BASE_URL)}/user/health`);
        if (!res.ok) return {
            success: false
        };
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Server not connected");
    }
};
class UserManageApi {
    _accessToken;
    _curUser;
    _removeCurUserInfo() {
        this._accessToken = null;
        this._curUser = null;
    }
    async _apiCall(url, options) {
        try {
            let res;
            res = await fetch(`${(0, _configJs.BASE_URL)}${url}`, options);
            //If token expired, try to refresh once
            if (res.status === 403 || res.status === 401) {
                await this._refreshAccessToken();
                res = await fetch(`${(0, _configJs.BASE_URL)}${url}`, options);
            }
            return res;
        } catch (err) {
            console.error("Error while using _apiCall", err);
            throw err;
        }
    }
    async _refreshAccessToken() {
        try {
            const res = await this._apiCall("/user/refresh", {
                method: "POST",
                credentials: "include"
            });
            if (!res.ok) throw new Error("Refresh failed");
            const data = await res.json();
            this._accessToken = data.accessToken;
            return data.accessToken;
        } catch (err) {
            console.error("Error while refreshing token:", err);
            throw err;
        }
    }
    async login(username, password) {
        try {
            const res = await this._apiCall("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await res.json();
            if (!res.ok) {
                const err = new Error(data.message);
                err.statusCode = res.status;
                throw err;
            }
            this._accessToken = data.accessToken;
            this._curUser = await this.getCurrentUser();
            const newRemainingDaysNow = this._calcRemainingDays("goals");
            const newRemainingDaysNowRooms = this._calcRemainingDays("rooms");
            const roomIds = this._curUser.rooms.length && this._curUser.rooms.map((room)=>room.roomId);
            const updatedRooms = roomIds && await this._getRooms(roomIds);
            await this.updateUser({
                remainingDaysNow: newRemainingDaysNow,
                remainingDaysNowRooms: newRemainingDaysNowRooms,
                rooms: updatedRooms
            });
            const newHowManyTimesClick = this._calcHowManyTimesClick("goals");
            const newHowManyTimesClickRooms = this._calcHowManyTimesClick("rooms");
            await this.updateUser({
                howManyTimesClick: newHowManyTimesClick,
                howManyTimesClickRooms: newHowManyTimesClickRooms
            });
            return data.message;
        } catch (err) {
            throw err;
        }
    }
    //UserInfo = { username, password, email=''}
    async createUser({ email, ...others }) {
        try {
            const userInfo = email ? {
                ...others,
                email
            } : {
                ...others
            };
            const res = await this._apiCall("/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(userInfo)
            });
            const data = await res.json();
            if (!res.ok) {
                const err = new Error(data.message);
                err.statusCode = res.status;
                err.name = data.name;
                throw err;
            }
            this._accessToken = data.accessToken;
            this._curUser = await this.getCurrentUser();
            return data.message;
        } catch (err) {
            throw err;
        }
    }
    async getCurrentUser() {
        try {
            if (!this._accessToken) await this._refreshAccessToken();
            const res = await this._apiCall("/user/get", {
                headers: {
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include"
            });
            const data = await res.json();
            if (!res.ok) return {
                success: false,
                message: data.message,
                statusCode: res.status
            };
            return data.user;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    //updateInfo = { updateField: updateValue }
    async updateUser(updateInfo) {
        try {
            if (!this._accessToken) await this._refreshAccessToken();
            const res = await this._apiCall("/user/update/general", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include",
                body: JSON.stringify(updateInfo)
            });
            const data = await res.json();
            if (!res.ok) {
                const err = new Error(data.message);
                err.statusCode = res.status;
                err.name = data.name;
                throw err;
            }
            this._curUser = data.user;
            return data;
        } catch (err) {
            throw err;
        }
    }
    async logout() {
        try {
            const res = await this._apiCall("/user/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include"
            });
            const data = await res.json();
            if (!res.ok) return {
                success: false,
                message: data.message,
                statusCode: res.status
            };
            this._removeCurUserInfo();
        } catch (err) {
            throw err;
        }
    }
    async deleteUser(password) {
        try {
            if (!this._accessToken) await this._refreshAccessToken();
            const res = await this._apiCall("/user/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include",
                body: JSON.stringify({
                    password
                })
            });
            const data = await res.json();
            if (!res.ok) return {
                success: false,
                message: data.message,
                statusCode: res.status
            };
            this._curUser = null;
            return data.message;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    async saveToDoListsComments(type, modifiedCard, newToDoLists, checkedOrNotArr, newComments) {
        try {
            //update user
            const updateFor = type === "goals" ? this._curUser.goals[modifiedCard] : this._curUser.rooms[modifiedCard];
            let updatedGoalRoom;
            if (newToDoLists || newToDoLists === "") {
                const { toDoLists, toDoListsCheckbox, ...others } = updateFor;
                updatedGoalRoom = {
                    toDoLists: newToDoLists,
                    toDoListsCheckbox: checkedOrNotArr || [],
                    ...others
                };
            }
            if (newComments || newComments === "") {
                const { comments, ...others } = updateFor;
                updatedGoalRoom = {
                    comments: newComments,
                    ...others
                };
            }
            if (type === "goals") {
                const newGoals = this._curUser.goals.toSpliced(modifiedCard, 1, updatedGoalRoom);
                await this.updateUser({
                    goals: newGoals
                });
            }
            if (type === "rooms") {
                const newRooms = this._curUser.rooms.toSpliced(modifiedCard, 1, updatedGoalRoom);
                await this.updateUser({
                    rooms: newRooms
                });
                ///Update room
                const modifiedRoomId = this._curUser.rooms[modifiedCard].roomId;
                newToDoLists || newToDoLists === "" ? await this.updateRoom(modifiedRoomId, {
                    toDoLists: newToDoLists,
                    toDoListsCheckbox: checkedOrNotArr || []
                }) : await this.updateRoom(modifiedRoomId, {
                    comments: newComments
                });
            }
            console.log("To-Do lists / comments saved successfully!");
        } catch (err) {
            throw err;
        }
    }
    async saveGoalsInfo(goalsInfo) {
        try {
            const type = "goals";
            const newRemainingDaysPrev = [
                ...this._curUser.remainingDaysPrev,
                ...this._calcRemainingDays(type, goalsInfo)
            ];
            const newRemainingDaysNow = [
                ...this._curUser.remainingDaysNow,
                ...this._calcRemainingDays(type, goalsInfo)
            ];
            await this.updateUser({
                goals: [
                    ...this._curUser.goals,
                    ...goalsInfo
                ],
                remainingDaysPrev: newRemainingDaysPrev,
                remainingDaysNow: newRemainingDaysNow
            });
            await this._changeOrders(type);
            await this.saveHowManyTimesClick(type);
            return {
                message: `${type.at(0).toUpperCase + type.slice(1)} updated successfully!`
            };
        } catch (err) {
            throw err;
        }
    }
    async saveRoomsInfo(roomsInfo, roomType) {
        try {
            const type = "rooms";
            const sharingUserNames = await this.findUsersRooms(roomsInfo, roomType);
            if (roomType !== "id") await this._roomsCreateSelect(type, roomsInfo, sharingUserNames);
            if (roomType === "id") await this._roomsJoinId(type, roomsInfo, sharingUserNames);
            await this._changeOrders(type);
            await this.saveHowManyTimesClick(type);
        } catch (err) {
            throw err;
        }
    }
    async _roomsCreateSelect(type, roomsInfo, sharingUserNames) {
        try {
            const newRoomsWithUsernames = roomsInfo.map(function(room, i) {
                return {
                    ...room,
                    usernames: sharingUserNames[i]
                };
            });
            await this.createRooms(newRoomsWithUsernames);
            ///Update userInfo
            const newRemainingDaysPrevRooms = [
                ...this._curUser.remainingDaysPrevRooms,
                ...this._calcRemainingDays(type, roomsInfo)
            ];
            const newRemainingDaysNowRooms = [
                ...this._curUser.remainingDaysNowRooms,
                ...this._calcRemainingDays(type, roomsInfo)
            ];
            await this.updateUser({
                rooms: [
                    ...this._curUser.rooms,
                    ...newRoomsWithUsernames
                ],
                remainingDaysPrevRooms: newRemainingDaysPrevRooms,
                remainingDaysNowRooms: newRemainingDaysNowRooms
            });
        } catch (err) {
            throw err;
        }
    }
    async _roomsJoinId(type, roomIds, sharingUserNames) {
        try {
            for (const roomId of roomIds)await this.updateRoom(roomId, {
                usernames: sharingUserNames
            });
            const rooms = await this._getRooms(roomIds);
            ///Update userInfo
            const newRemainingDaysPrevRooms = [
                ...this._curUser.remainingDaysPrevRooms,
                ...this._calcRemainingDays(type, rooms)
            ];
            const newRemainingDaysNowRooms = [
                ...this._curUser.remainingDaysNowRooms,
                ...this._calcRemainingDays(type, rooms)
            ];
            await this.updateUser({
                rooms: [
                    ...this._curUser.rooms,
                    ...rooms
                ],
                remainingDaysPrevRooms: newRemainingDaysPrevRooms,
                remainingDaysNowRooms: newRemainingDaysNowRooms
            });
        } catch (err) {
            throw err;
        }
    }
    async createRooms(newRoomsWithUsernames) {
        try {
            let rooms = [];
            for(let i = 0; i < newRoomsWithUsernames.length; i++){
                const room = newRoomsWithUsernames[i];
                const res = await this._apiCall("/room/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(room)
                });
                const data = await res.json();
                if (!res.ok) {
                    const err = new Error(data.message);
                    err.statusCode = res.status;
                    throw err;
                }
                rooms.push(data.room);
            }
            return {
                message: "Room created successfully",
                rooms
            };
        } catch (err) {
            console.error("Error while creaing room", err);
            throw err;
        }
    }
    async _getRooms(roomIds) {
        try {
            if (!this._accessToken) await this._refreshAccessToken();
            let rooms = [];
            for (const roomId of roomIds){
                const res = await this._apiCall(`/room/${roomId}`, {
                    headers: {
                        Authorization: `Bearer ${this._accessToken}`
                    },
                    credentials: "include"
                });
                const data = await res.json();
                if (!res.ok) {
                    const err = new Error(data.message);
                    err.statusCode = res.status;
                    throw err;
                }
                rooms.push(data.room);
            }
            return rooms;
        } catch (err) {
            console.error("Error while getting rooms with ids");
            throw err;
        }
    }
    async findUsersRooms(roomsInfo, roomType) {
        try {
            let sharingUsernames = [];
            const formattedRoomsInfo = Array.isArray(roomsInfo) ? roomsInfo : [
                roomsInfo
            ];
            const roomIds = roomType === "id" ? formattedRoomsInfo : formattedRoomsInfo.map((room)=>room.roomId);
            for (const roomId of roomIds){
                const res = await this._apiCall(`/room/findUsers/${roomId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();
                if (!res.ok) {
                    const err = new Error(data.message);
                    err.statusCode = res.status;
                    throw err;
                }
                sharingUsernames.push(...data.usernames, this._curUser.username);
            }
            return sharingUsernames;
        } catch (err) {
            console.error("Error while finding users for room", err);
            throw err;
        }
    }
    async updateRoom(roomId, updateInfo) {
        try {
            if (!this._accessToken) await this._refreshAccessToken();
            const res = await this._apiCall(`/room/update/${roomId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include",
                body: JSON.stringify(updateInfo)
            });
            const data = await res.json();
            if (!res.ok) {
                const err = new Error(data.message);
                err.statusCode = res.status;
                throw err;
            }
            return data.room;
        } catch (err) {
            throw err;
        }
    }
    async editGoalRoom(editGoalRoomIndex, editedGoalRoomInfo, type) {
        try {
            if (type === "goals") {
                const newGoals = this._curUser.goals.fill(editedGoalRoomInfo, editGoalRoomIndex, editGoalRoomIndex + 1);
                const newRemainingDaysPrev = this._curUser.remainingDaysPrev.fill(...this._calcRemainingDays(type, editedGoalRoomInfo), editGoalRoomIndex, editGoalRoomIndex + 1);
                const newRemainingDaysNow = this._curUser.remainingDaysNow.fill(...this._calcRemainingDays(type, editedGoalRoomInfo), editGoalRoomIndex, editGoalRoomIndex + 1);
                await this.updateUser({
                    goals: newGoals,
                    remainingDaysPrev: newRemainingDaysPrev,
                    remainingDaysNow: newRemainingDaysNow
                });
            // await this.updateUser({
            //   remainingDaysPrev: newRemainingDaysPrev,
            //   remainingDaysNow: this._calcRemainingDays(type),
            // });
            }
            if (type === "rooms") {
                const newRooms = this._curUser.rooms.fill(editedGoalRoomInfo, editGoalRoomIndex, editGoalRoomIndex + 1);
                const newRemainingDaysPrevRooms = this._curUser.remainingDaysPrevRooms.fill(...this._calcRemainingDays(type, editedGoalRoomInfo), editGoalRoomIndex, editGoalRoomIndex + 1);
                const newRemainingDaysNowRooms = this._curUser.remainingDaysNowRooms.fill(...this._calcRemainingDays(type, editedGoalRoomInfo), editGoalRoomIndex, editGoalRoomIndex + 1);
                await this.updateUser({
                    rooms: newRooms,
                    remainingDaysPrevRooms: newRemainingDaysPrevRooms,
                    remainingDaysNowRooms: newRemainingDaysNowRooms
                });
                await this.updateRoom(editedGoalRoomInfo.roomId, editedGoalRoomInfo);
            }
            await this._changeOrders(type);
            await this.saveHowManyTimesClick(type);
        } catch (err) {
            throw err;
        }
    }
    async deleteGoal(deleteGoalIndex) {
        try {
            const newGoals = this._curUser.goals.toSpliced(deleteGoalIndex, 1);
            const newRemainingDaysPrev = this._curUser.remainingDaysPrev.toSpliced(deleteGoalIndex, 1);
            const newRemainingDaysNow = this._curUser.remainingDaysNow.toSpliced(deleteGoalIndex, 1);
            const newHowManyTimesClick = this._curUser.howManyTimesClick.toSpliced(deleteGoalIndex, 1);
            await this.updateUser({
                goals: newGoals,
                remainingDaysPrev: newRemainingDaysPrev,
                remainingDaysNow: newRemainingDaysNow,
                howManyTimesClick: newHowManyTimesClick
            });
        } catch (err) {
            throw err;
        }
    }
    async deleteRoom(deleteRoomIndex) {
        try {
            const deleteRoom = this._curUser.rooms[deleteRoomIndex];
            const deleteRoomId = deleteRoom.roomId;
            const sharingUsernames = deleteRoom.usernames;
            const newUsernames = sharingUsernames.filter((username)=>username !== this._curUser.username);
            ///delete room if no other users are in it / update room's usernames when user removed the room
            newUsernames.length ? await this.updateRoom(deleteRoomId, {
                usernames: newUsernames
            }) : await this.deleteRoomDatabase(deleteRoomId);
            const newRooms = this._curUser.rooms.toSpliced(deleteRoomIndex, 1);
            const newRemainingDaysPrevRooms = this._curUser.remainingDaysPrevRooms.toSpliced(deleteRoomIndex, 1);
            const newRemainingDaysNowRooms = this._curUser.remainingDaysNowRooms.toSpliced(deleteRoomIndex, 1);
            const newHowManyTimesClickRooms = this._curUser.howManyTimesClickRooms.toSpliced(deleteRoomIndex, 1);
            await this.updateUser({
                rooms: newRooms,
                remainingDaysPrevRooms: newRemainingDaysPrevRooms,
                remainingDaysNowRooms: newRemainingDaysNowRooms,
                howManyTimesClickRooms: newHowManyTimesClickRooms
            });
        } catch (err) {
            throw err;
        }
    }
    async deleteRoomDatabase(roomId) {
        try {
            if (!this._accessToken) await this._refreshAccessToken();
            const res = await this._apiCall(`/room/delete/${roomId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include"
            });
            const data = await res.json();
            if (!res.ok) {
                const err = new Error(data.message);
                err.statusCode = res.status;
                throw err;
            }
            return data;
        } catch (err) {
            throw err;
        }
    }
    async removeSelected(selectedGoal) {
        try {
            const selectedGoalIndex = this._curUser.goals.findIndex((goal)=>goal === selectedGoal);
            const { selected, ...others } = selectedGoal;
            const newGoals = this._curUser.goals.fill({
                ...others
            }, selectedGoalIndex, selectedGoalIndex + 1);
            await this.updateUser({
                goals: newGoals
            });
        } catch (err) {
            throw err;
        }
    }
    //////////add selected for selected goals
    async saveSelectedGoals(selectedGoalsIndex) {
        try {
            let goalsWithSelected = this._curUser.goals;
            selectedGoalsIndex.forEach((index)=>goalsWithSelected = this._curUser.goals.fill({
                    ...this._curUser.goals[index],
                    selected: true
                }, index, index + 1));
            await this.updateUser({
                goals: goalsWithSelected
            });
        } catch (err) {
            throw err;
        }
    }
    //when !goalRoom, _curUser's goals/rooms' dates are calculated, when goalRoom,  exists goalRoom's date is calculated
    _calcRemainingDays(type, goalRoom) {
        let calcFor;
        if (goalRoom) calcFor = Array.isArray(goalRoom) ? goalRoom : [
            goalRoom
        ];
        if (!goalRoom) calcFor = type === "goals" ? this._curUser.goals : this._curUser.rooms;
        const remainingDays = calcFor.map((goalRoom)=>goalRoom.date ? Math.ceil((new Date(goalRoom.date) - new Date()) / 86400000) : undefined);
        return remainingDays;
    }
    ///remainingDaysNow, remainingDaysPrev, or remainingDaysBoth
    // async _saveRemainingDays(option, type = "goals") {
    //   try {
    //     if (option === "remainingDaysNow")
    //       type === "goals"
    //         ? await this.updateUser({
    //             remainingDaysNow: this._calcRemainingDays(type),
    //           })
    //         : await this.updateUser({
    //             remainingDaysNowRooms: this._calcRemainingDays(type),
    //           });
    //     if (option === "remainingDaysPrev")
    //       type === "goals"
    //         ? await this.updateUser({
    //             remainingDaysPrev: this._calcRemainingDays(type),
    //           })
    //         : await this.updateUser({
    //             remainingDaysPrevRooms: this._calcRemainingDays(type),
    //           });
    //     if (option === "remainingDaysBoth")
    //       type === "goals"
    //         ? await this.updateUser({
    //             remainingDaysNow: this._calcRemainingDays(type),
    //             remainingDaysPrev: this._calcRemainingDays(type),
    //           })
    //         : await this.updateUser({
    //             remainingDaysNowRooms: this._calcRemainingDays(type),
    //             remainingDaysPrevRooms: this._calcRemainingDays(type),
    //           });
    //     return {
    //       message: `Updated ${option} for ${type} successfully`,
    //     };
    //   } catch (err) {
    //     throw err;
    //   }
    // }
    async updateRemainingDaysPrev(type) {
        try {
            type === "goals" ? await this.updateUser({
                remainingDaysPrev: this._calcUpdatedRemainingDaysPrev(type)
            }) : await this.updateUser({
                remainingDaysPrevRooms: this._calcUpdatedRemainingDaysPrev(type)
            });
            return `RemainingDaysPrev for ${type} updated successfully`;
        } catch (err) {
            throw err;
        }
    }
    _calcUpdatedRemainingDaysPrev(type) {
        const remainingDaysNow = type === "goals" ? this._curUser.remainingDaysNow : this._curUser.remainingDaysNowRooms;
        const remainingDaysPrev = type === "goals" ? this._curUser.remainingDaysPrev : this._curUser.remainingDaysPrevRooms;
        const updatedRemainingDaysPrev = remainingDaysPrev.map((daysPrev, i)=>{
            const daysNow = remainingDaysNow[i];
            //1) User can still click for the goal
            if (daysPrev !== daysNow) return --daysPrev;
            //2) User can nont click anymore
            if (daysPrev === daysNow) return daysPrev;
        });
        return updatedRemainingDaysPrev;
    }
    async saveHowManyTimesClick(type) {
        try {
            type === "goals" ? await this.updateUser({
                howManyTimesClick: this._calcHowManyTimesClick(type)
            }) : await this.updateUser({
                howManyTimesClickRooms: this._calcHowManyTimesClick(type)
            });
            return `howManyTimesClick for ${type} updated successfully`;
        } catch (err) {
            throw err;
        }
    }
    _calcHowManyTimesClick(type) {
        const remainingDaysNow = type === "goals" ? this._curUser.remainingDaysNow : this._curUser.remainingDaysNowRooms;
        const remainingDaysPrev = type === "goals" ? this._curUser.remainingDaysPrev : this._curUser.remainingDaysPrevRooms;
        const howManyTimesClick = remainingDaysPrev.map((daysPrev, i)=>{
            const daysNow = remainingDaysNow[i];
            //1) User can not click for the goal
            if (daysPrev === daysNow) return 0;
            //2) User can click for the goal
            return daysPrev - daysNow;
        });
        return howManyTimesClick;
    }
    async _changeOrders(type = "goals") {
        try {
            const goals = type === "goals" ? this._curUser.goals : this._curUser.rooms;
            const sortedGoals = this._changeOrderGoals(goals);
            const [sortedRemainingDaysPrev, sortedRemainingDaysNow] = this._changeOrderRemainingDays(goals, sortedGoals, type);
            if (type === "goals") {
                await this.updateUser({
                    goals: sortedGoals
                });
                await this.updateUser({
                    remainingDaysPrev: sortedRemainingDaysPrev,
                    remainingDaysNow: sortedRemainingDaysNow
                });
            }
            if (type === "rooms") {
                await this.updateUser({
                    rooms: sortedGoals
                });
                await this.updateUser({
                    remainingDaysPrevRooms: sortedRemainingDaysPrev,
                    remainingDaysNowRooms: sortedRemainingDaysNow
                });
            }
            return {
                message: `${type.at(0).toUpperCase + type.slice(1)} and remainingDaysBoth updated successfully`
            };
        } catch (err) {
            throw err;
        }
    }
    _changeOrderGoals(goals) {
        //Create array with undefined goal dates
        const undefinedDates = goals.filter((goal)=>!goal.date);
        //Sort goals in chronological order
        const sortedGoalsWithDates = goals.filter((goal)=>goal.date).toSorted((a, b)=>{
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const dateAFormatted = dateA.getFullYear() + `${dateA.getMonth()}`.padStart(2, 0) + `${dateA.getDate()}`.padStart(2, 0);
            const dateBFormatted = dateB.getFullYear() + `${dateB.getMonth()}`.padStart(2, 0) + `${dateB.getDate()}`.padStart(2, 0);
            return dateAFormatted - dateBFormatted;
        });
        //Put undefined dates at the end of sorted goals
        const sortedGoals = [
            ...sortedGoalsWithDates,
            ...undefinedDates
        ];
        return sortedGoals;
    }
    _changeOrderRemainingDays(originalGoals, sortedGoals, type) {
        const remainingDaysNow = type === "goals" ? this._curUser.remainingDaysNow : this._curUser.remainingDaysNowRooms;
        const remainingDaysPrev = type === "goals" ? this._curUser.remainingDaysPrev : this._curUser.remainingDaysPrevRooms;
        //Create empty arrays with the same length of remainingDays arrays
        let sortedRemainingDaysPrev = new Array(remainingDaysPrev.length);
        let sortedRemainingDaysNow = new Array(remainingDaysNow.length);
        originalGoals.forEach((originalGoal, i)=>{
            //Goal index in the current goals array is ...↓
            const curIndex = sortedGoals.findIndex((sortedGoal)=>sortedGoal === originalGoal);
            //Putting remaining days for the goal to the goal index place in the current goals array
            sortedRemainingDaysPrev.fill(remainingDaysPrev[i], curIndex, curIndex + 1);
            sortedRemainingDaysNow.fill(remainingDaysNow[i], curIndex, curIndex + 1);
        });
        return [
            sortedRemainingDaysPrev,
            sortedRemainingDaysNow
        ];
    }
    async _updateUsernameEmail(updateInput, section) {
        try {
            const updateInfo = section === "username" ? {
                username: updateInput
            } : {
                email: updateInput
            };
            const data = await this.updateUser(updateInfo);
            return data.updatedFields;
        } catch (err) {
            throw err;
        }
    }
    async _updatePassword(curPassword, newPassword) {
        try {
            const res = await this._apiCall("/user/update/password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._accessToken}`
                },
                credentials: "include",
                body: JSON.stringify({
                    curPassword,
                    newPassword
                })
            });
            const data = await res.json();
            if (!res.ok) {
                const err = new Error(data.message);
                err.statusCode = res.status;
                throw err;
            }
            return data.message;
        } catch (err) {
            throw err;
        }
    }
    //For dev
    async deleteAll() {
        try {
            const deletedUsers = await this._deleteAllUsers();
            const deletedTokens = await this._deleteAllTokens();
            const deletedRooms = await this._deleteAllRooms();
            console.log("deletedUsers", deletedUsers);
            console.log("deletedTokens", deletedTokens);
            console.log("deletedRooms", deletedRooms);
        } catch (err) {
            console.error("Error while deleting Users, tokens, and Rooms", err);
        }
    }
    async _deleteAllUsers() {
        try {
            const res = await this._apiCall("/user/deleteAll", {
                method: "DELETE"
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
    async _deleteAllTokens() {
        try {
            const res = await this._apiCall("/user/deleteTokens", {
                method: "DELETE"
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
    async _deleteAllRooms() {
        try {
            const res = await this._apiCall("/room/deleteAll", {
                method: "DELETE"
            });
            const data = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
}
exports.default = new UserManageApi();
(async function() {
    console.log(await health());
})();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","../config.js":"2hPh4"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"2hPh4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BASE_URL", ()=>BASE_URL);
parcelHelpers.export(exports, "USERNAME_MAX_LENGTH", ()=>USERNAME_MAX_LENGTH);
parcelHelpers.export(exports, "PASSWORD_MIN_LENGTH", ()=>PASSWORD_MIN_LENGTH);
parcelHelpers.export(exports, "PASSWORD_MIN_UPPERCASE", ()=>PASSWORD_MIN_UPPERCASE);
parcelHelpers.export(exports, "PASSWORD_MIN_LOWERCASE", ()=>PASSWORD_MIN_LOWERCASE);
parcelHelpers.export(exports, "PASSWORD_MIN_DIGIT", ()=>PASSWORD_MIN_DIGIT);
parcelHelpers.export(exports, "PASSWORD_MIN_SPECIAL_CHARACTER", ()=>PASSWORD_MIN_SPECIAL_CHARACTER);
parcelHelpers.export(exports, "GOAL_LIMIT", ()=>GOAL_LIMIT);
parcelHelpers.export(exports, "ROOM_LIMIT", ()=>ROOM_LIMIT);
parcelHelpers.export(exports, "SLIDER_WIDTH", ()=>SLIDER_WIDTH);
parcelHelpers.export(exports, "ROOM_ID_LENGTH", ()=>ROOM_ID_LENGTH);
parcelHelpers.export(exports, "MESSAGE_TIMEOUT", ()=>MESSAGE_TIMEOUT);
parcelHelpers.export(exports, "LOGOUNT_TIMEOUT", ()=>LOGOUNT_TIMEOUT);
const BASE_URL = "http://localhost:3000/api";
const USERNAME_MAX_LENGTH = 12;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MIN_UPPERCASE = 1;
const PASSWORD_MIN_LOWERCASE = 1;
const PASSWORD_MIN_DIGIT = 1;
const PASSWORD_MIN_SPECIAL_CHARACTER = 1;
const GOAL_LIMIT = 10;
const ROOM_LIMIT = 10;
const SLIDER_WIDTH = 100; // %
const ROOM_ID_LENGTH = 21;
const MESSAGE_TIMEOUT = 3; //seconds
const LOGOUNT_TIMEOUT = 30; //minites

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5EeQT":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
class LoginFormView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".login--form");
    _messageContainer = document.querySelector(".login--error");
    _errorMessageNoInput = "The field is empty! Please fill both fields!";
    _errorMessageWrong = "This account doesn't exist! Please try again!";
    _resetLogingForm() {
        this._clearInputField(document.getElementById("login--input_username"));
        this._clearInputField(document.getElementById("login--input_password"));
        this._messageContainer.classList.add("hidden");
    }
    addHandlerSubmit(handler) {
        this._parentElement.addEventListener("submit", (e)=>{
            e.preventDefault();
            const usernameField = document.getElementById("login--input_username");
            const passwordField = document.getElementById("login--input_password");
            const usernameInput = usernameField.value.trim();
            const passwordInput = passwordField.value.trim();
            if (!usernameInput) this.renderErrorInputField(usernameField);
            if (!passwordInput) this.renderErrorInputField(passwordField);
            if (!usernameInput || !passwordInput) {
                this.addEventRemoveErrorInputField();
                return this.renderError(this._errorMessageNoInput);
            }
            handler(usernameInput, passwordInput);
        });
    }
    addHandlerClickForgotPassword(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const link = e.target.closest(".link--forgot_password");
            if (!link) return;
            handler();
        });
    }
}
exports.default = new LoginFormView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jSw21":[function(require,module,exports,__globalThis) {
// import { mark } from "regenerator-runtime";
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
class View {
    open(element = this._parentElement) {
        element.classList.remove("hidden");
    }
    close(element = this._parentElement) {
        element.classList.add("hidden");
    }
    openSlow(element = this._parentElement) {
        element.style.opacity = 1;
    }
    closeSlow(element = this._parentElement) {
        element.style.opacity = 0;
    }
    _clearInputField(field) {
        field.value = "";
    }
    _clearHTML(element) {
        element.innerHTML = "";
    }
    renderToParentEle(data) {
        if (data) this._data = data;
        const markup = this._generateMarkup();
        this._clearHTML(this._parentElement);
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    renderPartialToParentEle(position, data) {
        if (data) this._data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML(position, markup);
    }
    renderInit(data) {
        if (data) this._data = data;
        const markup = this._generateMarkup();
        this._clearHTML(this._renderInitContainer);
        this._renderInitContainer.insertAdjacentHTML("afterbegin", markup);
    }
    render(container, markup) {
        this._clearHTML(container);
        container.insertAdjacentHTML("afterbegin", markup);
    }
    renderError(message = this._errorMessage) {
        this._messageContainer.innerHTML = message;
        this._messageContainer.style.backgroundColor = "#fa7304";
        this.open(this._messageContainer);
    }
    renderMessage(message = this._message) {
        this._messageContainer.innerHTML = message;
        this._messageContainer.style.backgroundColor = "#a4b600";
        this.open(this._messageContainer);
    }
    renderErrorInputField(inputField) {
        inputField.style.borderColor = "red";
    }
    addEventRemoveErrorInputField() {
        this._parentElement.addEventListener("click", (e)=>{
            const inputField = e.target.closest("input");
            if (!inputField) return;
            inputField.style.borderColor = "#bbbbbb";
        });
    }
    _setTimeout(seconds = (0, _configJs.MESSAGE_TIMEOUT)) {
        return new Promise((resolve)=>setTimeout(resolve, seconds * 1000));
    }
    _addEventClickEscapeClose(keyEventRemoveFocus, handler) {
        document.addEventListener("keydown", (e)=>{
            if (this._parentElement.classList.contains("hidden")) return;
            ///Remove focused btns behind the overlay
            keyEventRemoveFocus();
            if (e.key !== "Escape") return;
            this.close();
            if (!handler) return;
            handler();
        });
    }
}
exports.default = View;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","../config.js":"2hPh4"}],"hfNtw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class LoginScrollView {
    _parentElement = document.querySelector(".btn_scroll");
    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const id = e.target.getAttribute("href");
            handler();
            this._scroll(id);
        });
    }
    _scroll(id) {
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
}
exports.default = new LoginScrollView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lva0d":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
var _configJs = require("../config.js");
///////Validate password a user sets//////
var _core = require("@password-validator/core");
class LoginBottomHalfView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".bottom_half");
    _renderInitContainer = document.querySelector(".bottom_half--inputs");
    _messageContainer = document.querySelector(".bottom_half--warning");
    _errorMessage = "Username and password are required!";
    addHandlerSubmit(handler) {
        this._parentElement.addEventListener("submit", (e)=>{
            e.preventDefault();
            const usernameField = document.getElementById("bottom_half--input_username");
            const passwordField = document.getElementById("bottom_half--input_password");
            const emailField = document.getElementById("bottom_half--input_email");
            const usernameInput = usernameField.value?.trim();
            const passwordInput = passwordField.value?.trim();
            const emailInput = emailField.value?.trim();
            if (!usernameInput) this.renderErrorInputField(usernameField);
            if (!passwordInput) this.renderErrorInputField(passwordField);
            this.addEventRemoveErrorInputField();
            if (!usernameInput || !passwordInput) return this.renderError();
            handler(usernameInput, passwordInput, emailInput);
            this._clearInputField(usernameField);
            this._clearInputField(passwordField);
            this._clearInputField(emailField);
        });
    }
    _generateMarkup() {
        return `
        <p class="bottom_half--warning hidden">????</p>
        <h2 class="bottom_half--username_explanation">username (required)</h2>
        <div>
        <span class="username_explanation--tiny">
        Use ${0, _configJs.USERNAME_MAX_LENGTH} letters at maximum</span></div>
        <input id="bottom_half--input_username" type="text" placeholder="username" maxlength="${0, _configJs.USERNAME_MAX_LENGTH}">

        <h2 class="bottom_half--password_explanation">password (required)</h2>
        <p class="password_explanation--tiny">
        ${0, _configJs.PASSWORD_MIN_LENGTH} letters at minimum:  Include more than ${0, _configJs.PASSWORD_MIN_UPPERCASE} uppercase, <br>${0, _configJs.PASSWORD_MIN_LOWERCASE} lowercase, ${0, _configJs.PASSWORD_MIN_DIGIT} digit, and ${0, _configJs.PASSWORD_MIN_SPECIAL_CHARACTER} special character!</p>
        <input class="input--password" id="bottom_half--input_password" type="password" placeholder="password" minlength="${0, _configJs.PASSWORD_MIN_LENGTH}"><button class="btn--password_visibility btn_password_visibility--login_bottom" type="button"></button>
        <h2 class="bottom_half--email_explanation">email address (optional)</h2>
        <span class="email_explanation--tiny">
        You can set email address in case you forget the password</span>
        <input id="bottom_half--input_email" type="email" placeholder="email address"></input>
        `;
    }
}
exports.default = new LoginBottomHalfView();

},{"./View":"jSw21","@password-validator/core":"8mUTO","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","../config.js":"2hPh4"}],"8mUTO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilJs = require("../validator/Util.js");
parcelHelpers.exportAll(_utilJs, exports);
var _validatorJs = require("../validator/Validator.js");
parcelHelpers.exportAll(_validatorJs, exports);
var _digitValidatorJs = require("../validator/DigitValidator.js");
parcelHelpers.exportAll(_digitValidatorJs, exports);
var _validationResultJs = require("../validator/ValidationResult.js");
parcelHelpers.exportAll(_validationResultJs, exports);
var _validatorManagerJs = require("../validator/ValidatorManager.js");
parcelHelpers.exportAll(_validatorManagerJs, exports);
var _validatorCategoryJs = require("../validator/ValidatorCategory.js");
parcelHelpers.exportAll(_validatorCategoryJs, exports);
var _passwordValidatorJs = require("../validator/PasswordValidator.js");
parcelHelpers.exportAll(_passwordValidatorJs, exports);
var _lowerCaseValidatorJs = require("../validator/LowerCaseValidator.js");
parcelHelpers.exportAll(_lowerCaseValidatorJs, exports);
var _maxLengthValidatorJs = require("../validator/MaxLengthValidator.js");
parcelHelpers.exportAll(_maxLengthValidatorJs, exports);
var _upperCaseValidatorJs = require("../validator/UpperCaseValidator.js");
parcelHelpers.exportAll(_upperCaseValidatorJs, exports);
var _minLengthValidatorJs = require("../validator/MinLengthValidator.js");
parcelHelpers.exportAll(_minLengthValidatorJs, exports);
var _passwordValidatorManagerJs = require("./standard/PasswordValidatorManager.js");
parcelHelpers.exportAll(_passwordValidatorManagerJs, exports);
var _noSpaceCharacterValidatorJs = require("../validator/NoSpaceCharacterValidator.js");
parcelHelpers.exportAll(_noSpaceCharacterValidatorJs, exports);
var _specialCharacterValidatorJs = require("../validator/SpecialCharacterValidator.js");
parcelHelpers.exportAll(_specialCharacterValidatorJs, exports);
var _passwordValidatorConflictExceptionJs = require("../validator/PasswordValidatorConflictException.js");
parcelHelpers.exportAll(_passwordValidatorConflictExceptionJs, exports);

},{"../validator/Util.js":"369Xi","../validator/Validator.js":"awM8e","../validator/DigitValidator.js":"am68e","../validator/ValidationResult.js":"kMVlb","../validator/ValidatorManager.js":"cjhYN","../validator/ValidatorCategory.js":"dpvSh","../validator/PasswordValidator.js":"1v3EC","../validator/LowerCaseValidator.js":"61Vtz","../validator/MaxLengthValidator.js":"8stw4","../validator/UpperCaseValidator.js":"8iBOg","../validator/MinLengthValidator.js":"8PNIB","./standard/PasswordValidatorManager.js":"7jYYD","../validator/NoSpaceCharacterValidator.js":"4fqJG","../validator/SpecialCharacterValidator.js":"880iH","../validator/PasswordValidatorConflictException.js":"hJhhj","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"369Xi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Util", ()=>Util);
class Util {
    static SPACE_CHARACTER = " ";
    static SPECIAL_CHARACTERS = "!@#$%^&*()_+-=[]{}|;':\",.<>/?`~";
    static removeNonAlphabeticCharacterFrom(word) {
        return word.split("").filter((char)=>isNaN(Number(char))).filter((char)=>char !== this.SPACE_CHARACTER).filter((char)=>!this.SPECIAL_CHARACTERS.includes(char)).join("");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"awM8e":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"am68e":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DigitValidator", ()=>DigitValidator);
var _validationResultJs = require("./ValidationResult.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
class DigitValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    constructor(passwordRule){
        super((0, _validatorCategoryJs.ValidatorCategory).LENGTH_EXPANDER, passwordRule);
    }
    validate(password) {
        if (this.numberOfDigitsIn(password) < this.passwordRule()) {
            const message = `must contains at least ${this.passwordRule()} digits.`;
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(message));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    numberOfDigitsIn(password) {
        return password.split("").filter((char)=>!isNaN(Number(char))).length;
    }
}

},{"./ValidationResult.js":"kMVlb","./PasswordValidator.js":"1v3EC","./ValidatorCategory.js":"dpvSh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kMVlb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ValidationResult", ()=>ValidationResult);
class ValidationResult {
    valid;
    messages;
    constructor(valid, messages){
        this.valid = valid;
        this.messages = messages;
    }
    isValid() {
        return this.valid;
    }
    getMessages() {
        return this.messages;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1v3EC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PasswordValidator", ()=>PasswordValidator);
class PasswordValidator {
    rule;
    validatorCategory;
    constructor(category, passwordRule){
        this.rule = passwordRule;
        this.validatorCategory = category;
    }
    passwordRule() {
        return this.rule;
    }
    category() {
        return this.validatorCategory;
    }
    conflictsWith(validator) {
        return Array.of();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dpvSh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ValidatorCategory", ()=>ValidatorCategory);
var ValidatorCategory;
(function(ValidatorCategory) {
    ValidatorCategory["LENGTH_EXPANDER"] = "LENGTH_EXPANDER";
    ValidatorCategory["TOTAL_LENGTH_LIMITER"] = "TOTAL_LENGTH_LIMITER";
    ValidatorCategory["LENGTH_MINIMIZER"] = "LENGTH_MINIMIZER";
    ValidatorCategory["PATTERN_MATCHER"] = "PATTER_MATCHER";
})(ValidatorCategory || (ValidatorCategory = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"cjhYN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"61Vtz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LowerCaseValidator", ()=>LowerCaseValidator);
var _utilJs = require("./Util.js");
var _validationResultJs = require("./ValidationResult.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
class LowerCaseValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    constructor(passwordRule){
        super((0, _validatorCategoryJs.ValidatorCategory).LENGTH_EXPANDER, passwordRule);
    }
    validate(password) {
        if (this.numberOfLowercaseCharactersIn(password) < this.passwordRule()) {
            const message = `must contain at least ${this.passwordRule()} lowercase letters.`;
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(message));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    numberOfLowercaseCharactersIn(password) {
        return (0, _utilJs.Util).removeNonAlphabeticCharacterFrom(password).split("").filter((char)=>char.toLowerCase() === char).length;
    }
}

},{"./Util.js":"369Xi","./ValidationResult.js":"kMVlb","./ValidatorCategory.js":"dpvSh","./PasswordValidator.js":"1v3EC","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8stw4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MaxLengthValidator", ()=>MaxLengthValidator);
var _validationResultJs = require("./ValidationResult.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
class MaxLengthValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    maxCount = 0;
    constructor(passwordRule){
        super((0, _validatorCategoryJs.ValidatorCategory).TOTAL_LENGTH_LIMITER, passwordRule);
    }
    validate(password) {
        if (password.length > this.passwordRule()) {
            const message = `must not be greater than ${this.passwordRule()} maximum characters`;
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(message));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    conflictsWith(validator) {
        const conflictMsg = [];
        switch(validator.category()){
            case (0, _validatorCategoryJs.ValidatorCategory).LENGTH_MINIMIZER:
                this.handleLengthMinimizerConflicts(validator, conflictMsg);
                break;
            case (0, _validatorCategoryJs.ValidatorCategory).LENGTH_EXPANDER:
                this.maxCount += validator.passwordRule();
                break;
            default:
                return Array.of();
        }
        this.validateLengthExpanderConflicts(conflictMsg);
        return conflictMsg;
    }
    validateLengthExpanderConflicts(conflictMsg) {
        if (this.maxCount > this.passwordRule()) conflictMsg.push("cannot exceed password maxLength");
    }
    handleLengthMinimizerConflicts(validator, conflictMsg) {
        if (validator.passwordRule() > this.passwordRule()) conflictMsg.push("maxLength cannot be less than minLength.");
    }
}

},{"./ValidationResult.js":"kMVlb","./PasswordValidator.js":"1v3EC","./ValidatorCategory.js":"dpvSh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8iBOg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UpperCaseValidator", ()=>UpperCaseValidator);
var _utilJs = require("./Util.js");
var _validationResultJs = require("./ValidationResult.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
class UpperCaseValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    constructor(passwordRule){
        super((0, _validatorCategoryJs.ValidatorCategory).LENGTH_EXPANDER, passwordRule);
    }
    validate(password) {
        if (this.numberOfUpperCaseLettersIn(password) < this.passwordRule()) {
            const message = `must contain at least ${this.passwordRule()} uppercase letters.`;
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(message));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    numberOfUpperCaseLettersIn(password) {
        return (0, _utilJs.Util).removeNonAlphabeticCharacterFrom(password).split("").filter((char)=>char.toUpperCase() === char).length;
    }
}

},{"./Util.js":"369Xi","./ValidationResult.js":"kMVlb","./PasswordValidator.js":"1v3EC","./ValidatorCategory.js":"dpvSh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8PNIB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MinLengthValidator", ()=>MinLengthValidator);
var _validationResultJs = require("./ValidationResult.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
class MinLengthValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    constructor(passwordRule){
        super((0, _validatorCategoryJs.ValidatorCategory).LENGTH_MINIMIZER, passwordRule);
    }
    validate(password) {
        if (password.length < this.passwordRule()) {
            const validationMsg = `must not be less than ${this.passwordRule()} minimum characters.`;
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(validationMsg));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    conflictsWith(validator) {
        const conflictMsg = Array.of();
        switch(validator.category()){
            case (0, _validatorCategoryJs.ValidatorCategory).TOTAL_LENGTH_LIMITER:
                if (validator.passwordRule() < this.passwordRule()) conflictMsg.push("minLength cannot be greater than maxLength");
                break;
            default:
                return Array.of();
        }
        return conflictMsg;
    }
}

},{"./ValidationResult.js":"kMVlb","./PasswordValidator.js":"1v3EC","./ValidatorCategory.js":"dpvSh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7jYYD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PasswordValidatorManager", ()=>PasswordValidatorManager);
var _validationResultJs = require("../../validator/ValidationResult.js");
var _fluentPasswordValidatorJs = require("../fluent/FluentPasswordValidator.js");
var _passwordValidatorConflictExceptionJs = require("../../validator/PasswordValidatorConflictException.js");
class PasswordValidatorManager {
    registeredValidators = Array.of();
    constructor(){}
    static standard() {
        return new PasswordValidatorManager();
    }
    static fluent() {
        return new (0, _fluentPasswordValidatorJs.FluentPasswordValidator)();
    }
    register(...validators) {
        const conflictMessages = Array.of();
        this.verifyEachValidatorAgainstThemselves(validators, conflictMessages);
        for (const validator of validators){
            this.verifyAgainstOtherValidators(validator, conflictMessages);
            this.registerValidatorWithNoConflict(conflictMessages, validator);
        }
        this.handleConflicts(conflictMessages);
    }
    verifyEachValidatorAgainstThemselves(validators, conflictMessages) {
        for(let i = 0; i < validators.length; i++)for(let j = i + 1; j < validators.length; j++){
            const conflictMsg = validators[i].conflictsWith(validators[j]);
            if (conflictMsg.length > 0) conflictMessages.push(...conflictMsg);
        }
    }
    verifyAgainstOtherValidators(validator, conflictMessages) {
        for (const registeredValidator of this.registeredValidators){
            const conflictMsg = validator.conflictsWith(registeredValidator);
            if (this.hasConflict(conflictMsg)) {
                conflictMessages.push(...conflictMsg);
                break;
            }
        }
    }
    registerValidatorWithNoConflict(conflictMessages, validator) {
        if (!this.hasConflict(conflictMessages)) this.registeredValidators.push(validator);
    }
    handleConflicts(conflictMessages) {
        if (this.hasConflict(conflictMessages)) {
            let message = "";
            let errorCount = 0;
            for (const conflictMessage of conflictMessages){
                errorCount++;
                message += `${errorCount}: ${conflictMessage}\n`;
            }
            throw new (0, _passwordValidatorConflictExceptionJs.PasswordValidatorConflictException)(message);
        }
    }
    hasConflict(conflictMsg) {
        return conflictMsg.length > 0;
    }
    validators() {
        return this.registeredValidators;
    }
    validate(password) {
        const messages = Array.of();
        let isValid = true;
        for (const validator of this.registeredValidators){
            const result = validator.validate(password);
            if (result.isValid()) continue;
            isValid = false;
            messages.push(...result.getMessages());
        }
        return new (0, _validationResultJs.ValidationResult)(isValid, messages);
    }
}

},{"../../validator/ValidationResult.js":"kMVlb","../fluent/FluentPasswordValidator.js":"fCDfI","../../validator/PasswordValidatorConflictException.js":"hJhhj","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fCDfI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FluentPasswordValidator", ()=>FluentPasswordValidator);
var _digitValidatorJs = require("../../validator/DigitValidator.js");
var _upperCaseValidatorJs = require("../../validator/UpperCaseValidator.js");
var _minLengthValidatorJs = require("../../validator/MinLengthValidator.js");
var _maxLengthValidatorJs = require("../../validator/MaxLengthValidator.js");
var _lowerCaseValidatorJs = require("../../validator/LowerCaseValidator.js");
var _passwordValidatorManagerJs = require("../standard/PasswordValidatorManager.js");
var _noSpaceCharacterValidatorJs = require("../../validator/NoSpaceCharacterValidator.js");
var _specialCharacterValidatorJs = require("../../validator/SpecialCharacterValidator.js");
class FluentPasswordValidator {
    digitValidator;
    lowerCaseValidator;
    minLengthValidator;
    maxLengthValidator;
    upperCaseValidator;
    noSpaceCharacterValidator;
    specialCharacterValidator;
    min(passwordRule) {
        this.minLengthValidator = new (0, _minLengthValidatorJs.MinLengthValidator)(passwordRule);
        return this;
    }
    max(passwordRule) {
        this.maxLengthValidator = new (0, _maxLengthValidatorJs.MaxLengthValidator)(passwordRule);
        return this;
    }
    lower(passwordRule) {
        this.lowerCaseValidator = new (0, _lowerCaseValidatorJs.LowerCaseValidator)(passwordRule);
        return this;
    }
    upper(passwordRule) {
        this.upperCaseValidator = new (0, _upperCaseValidatorJs.UpperCaseValidator)(passwordRule);
        return this;
    }
    digit(passwordRule) {
        this.digitValidator = new (0, _digitValidatorJs.DigitValidator)(passwordRule);
        return this;
    }
    noSpace() {
        this.noSpaceCharacterValidator = new (0, _noSpaceCharacterValidatorJs.NoSpaceCharacterValidator)();
        return this;
    }
    specialCharacter(passwordRule) {
        this.specialCharacterValidator = new (0, _specialCharacterValidatorJs.SpecialCharacterValidator)(passwordRule);
        return this;
    }
    validate(password) {
        const validators = [
            this.digitValidator,
            this.minLengthValidator,
            this.maxLengthValidator,
            this.lowerCaseValidator,
            this.upperCaseValidator,
            this.noSpaceCharacterValidator,
            this.specialCharacterValidator
        ];
        const pm = (0, _passwordValidatorManagerJs.PasswordValidatorManager).standard();
        for (const validator of validators){
            if (!validator) continue;
            pm.register(validator);
        }
        return pm.validate(password);
    }
}

},{"../../validator/DigitValidator.js":"am68e","../../validator/UpperCaseValidator.js":"8iBOg","../../validator/MinLengthValidator.js":"8PNIB","../../validator/MaxLengthValidator.js":"8stw4","../../validator/LowerCaseValidator.js":"61Vtz","../standard/PasswordValidatorManager.js":"7jYYD","../../validator/NoSpaceCharacterValidator.js":"4fqJG","../../validator/SpecialCharacterValidator.js":"880iH","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4fqJG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NoSpaceCharacterValidator", ()=>NoSpaceCharacterValidator);
var _utilJs = require("./Util.js");
var _validationResultJs = require("./ValidationResult.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
class NoSpaceCharacterValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    constructor(){
        super((0, _validatorCategoryJs.ValidatorCategory).PATTERN_MATCHER, 0);
    }
    validate(password) {
        if (this.containsSpaceCharacter(password)) {
            const message = "must not contain any space.";
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(message));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    containsSpaceCharacter(password) {
        return password.split((0, _utilJs.Util).SPACE_CHARACTER).length > 1;
    }
}

},{"./Util.js":"369Xi","./ValidationResult.js":"kMVlb","./PasswordValidator.js":"1v3EC","./ValidatorCategory.js":"dpvSh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"880iH":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpecialCharacterValidator", ()=>SpecialCharacterValidator);
var _utilJs = require("./Util.js");
var _validationResultJs = require("./ValidationResult.js");
var _passwordValidatorJs = require("./PasswordValidator.js");
var _validatorCategoryJs = require("./ValidatorCategory.js");
class SpecialCharacterValidator extends (0, _passwordValidatorJs.PasswordValidator) {
    constructor(passwordRule){
        super((0, _validatorCategoryJs.ValidatorCategory).LENGTH_EXPANDER, passwordRule);
    }
    validate(password) {
        if (this.numberOfSpecialCharactersIn(password) < this.passwordRule()) {
            const message = `must contain at least ${this.passwordRule()} special characters.`;
            return new (0, _validationResultJs.ValidationResult)(false, Array.of(message));
        }
        return new (0, _validationResultJs.ValidationResult)(true, Array.of());
    }
    numberOfSpecialCharactersIn(password) {
        return password.split("").filter((char)=>(0, _utilJs.Util).SPECIAL_CHARACTERS.includes(char)).length;
    }
}

},{"./Util.js":"369Xi","./ValidationResult.js":"kMVlb","./PasswordValidator.js":"1v3EC","./ValidatorCategory.js":"dpvSh","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"hJhhj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PasswordValidatorConflictException", ()=>PasswordValidatorConflictException);
class PasswordValidatorConflictException extends Error {
    constructor(message){
        super(message);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8d4a4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
class LoginWholeView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".page--login");
    _addHandlerClickAppExplanation(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--app_explanation");
            if (!btn) return;
            handler();
        });
    }
}
exports.default = new LoginWholeView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"d7In2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
class MainWholeView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".page--main");
    // _renderInitContainer = document.querySelector(".btn_warning_container");
    _messageContainer = this._parentElement.querySelector(".warning--counter");
    _data;
    type;
    _errorMessage = "You can not click the button anymore! <br> Wait for another day ;)";
    addHandlerClickCounter(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--count");
            if (!btn) return;
            //If user can not click anymore
            const howManyTimesClick = this.type === "goals" ? this._data.howManyTimesClick : this._data.howManyTimesClickRooms;
            if (!Math.max(...howManyTimesClick)) return this.renderError();
            handler(this.type);
        });
    }
    _addHandlerClickHowToUse(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--app_explanation");
            if (!btn) return;
            handler();
        });
    }
    addHandlerClickSetting(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--settings");
            if (!btn) return;
            handler();
        });
    }
    _handleHiddenBtnWarning() {
        const btnContainer = this._parentElement.querySelector(".btn_warning_container");
        //If there are no goals
        const length = this.type === "goals" ? this._data.goals.length : this._data.rooms.length;
        !length ? btnContainer.classList.add("hidden") : btnContainer.classList.remove("hidden");
        this._messageContainer.classList.add("hidden");
    }
    init(curUser) {
        this._data = curUser;
        this._handleHiddenBtnWarning();
    // this._messageContainer.classList.add("hidden");
    }
}
exports.default = new MainWholeView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"5Hh2X":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
var _overlayMessageSpinnerViewJs = require("./overlayMessageSpinnerView.js");
var _overlayMessageSpinnerViewJsDefault = parcelHelpers.interopDefault(_overlayMessageSpinnerViewJs);
class MainTopSectionView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".top_section");
    _btnSwitchStyleLeft;
    _data;
    type;
    addHandlerClickSwitch(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--switch");
            if (!btn) return;
            btn.style.left = btn.style.left === "50%" ? "0%" : "50%";
            this._btnSwitchStyleLeft = btn.style.left;
            const type = btn.style.left === "50%" ? "goals" : "rooms";
            handler(type);
        });
    }
    _changeSwitch() {
        this._parentElement.querySelector(".btn--switch").style.left = this.type === "goals" ? "50%" : "0%";
    }
    addHandlerClickGoals(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const btn = e.target.closest(".btn--set_goal");
            if (!btn) return;
            handler();
        });
    }
    addHandlerClickRooms(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const btn = e.target.closest(".btn--create_room");
            if (!btn) return;
            handler();
        });
    }
    _addEventClickLogout() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--logout");
            if (!btn) return;
            (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "question", (0, _overlayMessageSpinnerViewJsDefault.default)._questionLogout, "logout");
        });
    }
    _addHandlerClickIAmSure(handler) {
        (0, _overlayMessageSpinnerViewJsDefault.default)._addHandlerClickIAmSure(null, ()=>{
            if ((0, _overlayMessageSpinnerViewJsDefault.default)._lastClickedForIAmSure !== "logout") return;
            handler();
        }, null);
    }
    _generateMarkup() {
        const howManyTimesClick = this.type === "goals" ? this._data.howManyTimesClick : this._data.howManyTimesClickRooms;
        const howManyTimesClickMax = howManyTimesClick.length ? Math.max(...howManyTimesClick) : 0;
        return `
       <div class="switch--goals_rooms">
        <div class="switch--goals">goals</div>
        <div class="switch--rooms">rooms</div>
        <button class="btn--switch" style="left: ${this._btnSwitchStyleLeft ? this._btnSwitchStyleLeft : "50%"}"></button>
      </div>
      <p class="welcome">Welcome<br>${this._data.username}</p>
      <h1 class="title">${// this.type === "rooms"
        //   ? "".padStart(2, "\u00A0") + this._data.username
        //   : this._data.username
        this._data.username}'s ${this.type === "rooms" ? "".padStart(1, "\u00A0") + "Rooms" : "Days Counter"}</h1>
      <div class="times_to_click">You can click <br>${howManyTimesClickMax} times!</div>
      <button class="btn--set_goal">Goals</button>
      <button class="btn--create_room">Rooms</button>
      <button class="btn--logout">Logout</button>
    `;
    }
}
exports.default = new MainTopSectionView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./overlayMessageSpinnerView.js":"gern0","./View":"jSw21"}],"gern0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class OverlayMessageSpinnerView extends (0, _viewJsDefault.default) {
    _parentElement = document.querySelector(".overlay--message_spinner");
    _messageSpinnerType;
    _messageType;
    _lastClickedForIAmSure;
    _message;
    _questionLogout = "Are you sure you want to log out?";
    _questionCloseAccount = "Are you sure you want to close your account?<br>(\u26A0\uFE0F Once you close your account, you can not recover it!)";
    _messageCreateAcc = "Welcome to Days counter \uD83D\uDE01 <br>Your account created successfully!";
    _messageLogout = "Logged out successfully!<br>See you again soon \uD83D\uDE0A<br>Have a wonderful day!";
    _messageSessionTimeout = "Session Timeout!<br>There were no actions for while.<br>Redirecting to the login page...";
    _errorMessageUnableToCopy = "Something went wrong \uD83D\uDE47\u200D\u2642\uFE0F<br>Unabled to copy the room ID!<br>Please manually copy it";
    _errorMessageInvalidId = "Please enter valid Room IDs!";
    _errorMessageRoomAlreadyExists = "Please enter Room IDs for rooms you haven't joined yet!";
    _errorMessageRoomNotFound = "Room ID that doesn't exist was entered! Please enter valid IDs";
    _errorMessageLogout = "Server error \uD83D\uDE47\u200D\u2642\uFE0F<br>Please try this again later<br>(You will still be automatically logged out in 30 minutes)";
    _errorMessage = "Server error \uD83D\uDE47\u200D\u2642\uFE0F <br>Please try this again later";
    _addEvents() {
        this._addEventClickX();
        this._addEventClickOk();
    }
    _addEventClickX() {
        this._parentElement.addEventListener("click", (e)=>{
            e.preventDefault();
            const btn = e.target.closest(".btn_x--message");
            if (!btn) return;
            this.close();
        });
    }
    _addEventClickOk() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--ok");
            if (!btn) return;
            this.close();
        });
    }
    _addHandlerClickIAmSure(handlerDelete = null, handlerLogout = null, handlerCloseAccount = null) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--i_am_sure");
            if (!btn) return;
            if (handlerDelete) return handlerDelete();
            if (handlerLogout) return handlerLogout();
            handlerCloseAccount();
        });
    }
    _generateMarkup() {
        if (this._messageSpinnerType === "spinner") return `<div class="spinner"></div>`;
        let header;
        let button;
        if (this._messageType === "question") {
            header = "Are you sure?";
            button = `<button class='btn--bottom btn--i_am_sure'>I'm sure</button>`;
        }
        if (this._messageType === "message") {
            header = "Success!";
            button = "";
        }
        if (this._messageType === "error") {
            header = "Error!";
            button = "<button class='btn--bottom btn--ok'>OK</button>";
        }
        return `
    <div class="message_container message_container--${this._messageType === "question" ? "" : this._messageType}">
    <button class="btn--x btn_x--message">&times;</button>
    <h3 class="message_header message_header--${this._messageType === "question" ? "" : this._messageType}">
      ${header}</h3>
    <p>${this._message}</p>
    ${button}
    </div>
    `;
    }
    //async only when messageType is 'message'
    async _asyncInit(messageSpinnnerType = "spinner", messageType = "question", message, lastClickedForIAmSure = null) {
        try {
            this._messageSpinnerType = messageSpinnnerType;
            this._messageType = messageType;
            this._message = message;
            if (messageType === "question") this._lastClickedForIAmSure = lastClickedForIAmSure;
            this.renderToParentEle();
            // if (
            //   message === this._errorMessageLogout ||
            //   this._errorMessageUnableToCopy
            // )
            //   this._parentElement.querySelector(
            //     ".message_container"
            //   ).style.aspectRatio = "1 / 0.57";
            this.open();
            if (messageType !== "message") return;
            await this._setTimeout();
            this.close();
        } catch (err) {
            throw err;
        }
    }
}
exports.default = new OverlayMessageSpinnerView();

},{"./View.js":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"deT27":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
var _mainWholeViewJs = require("./mainWholeView.js");
var _mainWholeViewJsDefault = parcelHelpers.interopDefault(_mainWholeViewJs);
var _contenteditableViewJs = require("./contenteditableView.js");
var _contenteditableViewJsDefault = parcelHelpers.interopDefault(_contenteditableViewJs);
var _overlayMessageSpinnerViewJs = require("./overlayMessageSpinnerView.js");
var _overlayMessageSpinnerViewJsDefault = parcelHelpers.interopDefault(_overlayMessageSpinnerViewJs);
class MainDaysCounterContainerView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".days_counter--container");
    _deleteGoalRoomIndex;
    // _eventListenerAttachedGoals;
    // _eventListenerAttachedRooms;
    _eventAttached;
    _data;
    type;
    _addEvents() {
        this._addEventClickCopy();
        this._addEventMouseoverUsers();
        this._addEventMouseoutUsers();
        this._addEventClickDelete();
        this._addEventClickCard();
    }
    _addEventClickCopy() {
        this._parentElement.addEventListener("click", async (e)=>{
            try {
                const btn = e.target.closest(".btn--room_id_copy");
                if (!btn) return;
                const clickedCard = btn.closest(".card");
                const clickedCardIndex = +clickedCard.dataset.card;
                const roomId = this._data.rooms[clickedCardIndex].roomId;
                await navigator.clipboard.writeText(roomId);
                const copiedExplanation = clickedCard.querySelector(".copied_explanation");
                btn.classList.add("room_id--copied");
                this.open(copiedExplanation);
                await this._setTimeout();
                btn.classList.remove("room_id--copied");
                this.close(copiedExplanation);
            } catch (err) {
                (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessageUnableToCopy);
            }
        });
    }
    _addEventMouseoverUsers() {
        this._parentElement.addEventListener("mouseover", (e)=>{
            this._usernamesContainers = Array.from(this._parentElement.querySelectorAll(".usernames_container"));
            const btn = e.target.closest(".btn--usernames");
            if (!btn) return;
            const cardNumber = +btn.dataset.btnUsernames;
            this._usernamesContainers[cardNumber].style.opacity = 1;
        });
    }
    _addEventMouseoutUsers() {
        this._parentElement.addEventListener("mouseout", (e)=>{
            const btn = e.target.closest(".btn--usernames");
            if (!btn) return;
            const cardNumber = +btn.dataset.btnUsernames;
            this._usernamesContainers[cardNumber].style.opacity = 0;
        });
    }
    _addHandlerClickEdit(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--edit");
            if (!btn) return;
            const editGoalRoomIndex = +btn.closest(".card").dataset.card;
            handler(editGoalRoomIndex, this.type);
        });
    }
    _addEventClickDelete() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--delete");
            if (!btn) return;
            const deleteGoalRoomIndex = +btn.closest(".card").dataset.card;
            this._deleteGoalRoomIndex = deleteGoalRoomIndex;
            (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "question", `Are you sure you want to delete this ${this.type === "goals" ? "goal" : "room"}?`, "delete");
        });
    }
    _addHandlerIAmSure(handler) {
        (0, _overlayMessageSpinnerViewJsDefault.default)._addHandlerClickIAmSure(()=>{
            if ((0, _overlayMessageSpinnerViewJsDefault.default)._lastClickedForIAmSure !== "delete") return;
            if (!this._deleteGoalRoomIndex && this._deleteGoalRoomIndex !== 0) return;
            //check if delete room was selected by existing goal
            let selectedGoal;
            if (this.type === "rooms") {
                const deleteRoom = this._data.rooms[this._deleteGoalRoomIndex];
                selectedGoal = this._data.goals.find((goal)=>goal.title === deleteRoom.title && goal.date === deleteRoom.date && goal.selected);
            }
            handler(this._deleteGoalRoomIndex, this.type, selectedGoal, "daysCounter");
        });
    }
    _addEventClickCard() {
        this._parentElement.addEventListener("click", (e)=>{
            const clickedCard = e.target.closest(".card");
            if (!clickedCard || e.target.closest(".usernames_container") || e.target.closest(".room_id_container")) return;
            (0, _contenteditableViewJsDefault.default)._eventClickCardSlide(e, clickedCard);
        });
    }
    _addEventModifiedInside() {
        this._parentElement.addEventListener("input", (e)=>{
            (0, _contenteditableViewJsDefault.default)._inputEventModifiedInside(e);
        });
    }
    addHandlerClickOutside(handler) {
        (0, _mainWholeViewJsDefault.default)._parentElement.addEventListener("click", (e)=>{
            (0, _contenteditableViewJsDefault.default)._clickOutside(e, handler);
        });
    }
    _handleHidden() {
        const roomIds = this._parentElement.querySelectorAll(".room_id_container");
        const btnUsernames = Array.from(this._parentElement.querySelectorAll(".btn--usernames"));
        roomIds.forEach((roomId, i)=>{
            const btnUsername = btnUsernames[i];
            //add/remove hidden for room Id & btn username
            this.type === "goals" ? roomId.classList.add("hidden") : roomId.classList.remove("hidden");
            this.type === "goals" ? btnUsername.classList.add("hidden") : btnUsername.classList.remove("hidden");
        });
    }
    _generateMarkup() {
        const calcFor = this.type === "goals" ? this._data.goals : this._data.rooms;
        this._setDaysCounterStyle(calcFor.length);
        if (!calcFor.length) return `
         <p class="start_explanation">Let's first start by setting your ${this.type}!</p>`;
        const markup = calcFor.map((goal, i)=>{
            const remainingDaysPrev = this.type === "goals" ? this._data.remainingDaysPrev[i] : this._data.remainingDaysPrevRooms[i];
            const roomIdUsernames = `
        <div class="room_id_container hidden">
          <span class="room_id">Room ID: ${goal?.roomId}</span> 
          <button class="btn--room_id_copy"></button>
          <span class="copied_explanation hidden">copied!</span>
        </div>
        <div class="usernames_container" data-usernames="${i}">
        <p class="usernames_explanation">There are ${goal?.usernames?.length} users in this room </p>
        <span class="usernames"> ${goal?.usernames?.join(", ")} </span>
        </div>
        <button class="btn--usernames hidden" data-btn-usernames="${i}">users</button>
        `;
            return `
        <div class="card" data-card="${i}">
            ${roomIdUsernames}
            
            <div class="title--outer">
            <h2>${goal?.title ? goal.title : "No title is set!"}</h2>
            </div>
      
            <div class="btns--edit_delete btns_edit_delete--days_counter">
            <button class="btn--edit" data-edit="${i}">Edit</button>
            <button class="btn--delete" data-delete="${i}">Delete</button>
            </div>
            <div class="bottom_content  bottom_content--days_counter">
            <div class="remaining_days--outer">
            <div class="remaining_days">${remainingDaysPrev || remainingDaysPrev === 0 ? remainingDaysPrev : "  "}</div>
            </div>
            <p>days</p>
            <div class="details--outer">
            <div class="details details--card">
                <span>${remainingDaysPrev || remainingDaysPrev === 0 ? `${remainingDaysPrev} days are ${(remainingDaysPrev / 7).toFixed(1)} weeks` : ""}</span>
                <span>${remainingDaysPrev || remainingDaysPrev === 0 ? `${remainingDaysPrev} days are ${(remainingDaysPrev / (365 / 12)).toFixed(1)} months` : "No date is set!"}</span>
                <spam>${remainingDaysPrev || remainingDaysPrev === 0 ? `${remainingDaysPrev} days are ${(remainingDaysPrev / 365).toFixed(1)} years` : ""}</spam>
            </div>
            </div>
          </div>
          <div class="to_do_lists to_do_lists--days_counter  hidden" contenteditable="true">
            <div class="checkbox_container">
            <input type="checkbox" id="checkbox0">
            Let's add To-Do lists here!
            </div>
          </div>
          <div class="comments comments--days_counter hidden" contenteditable="true">
            Let's add comments here!
          </div>
          </div>
       `;
        }).join("");
        return markup;
    }
    _setDaysCounterStyle(length) {
        this._parentElement.style.display = length ? "grid" : "block";
        this._parentElement.style.gridTemplateColumns = length ? "repeat(2, 1fr)" : "none";
    }
    //after render
    //attach eventListener for user first time set goal or room
    init(curUser) {
        if (curUser) this._data = curUser;
        this._handleHidden();
        (0, _contenteditableViewJsDefault.default)._init(this.type, "daysCounter", this._data);
        (0, _contenteditableViewJsDefault.default)._toDoListsContainers = this._parentElement.querySelectorAll(".to_do_lists");
        (0, _contenteditableViewJsDefault.default)._commentsContainers = this._parentElement.querySelectorAll(".comments");
        (0, _contenteditableViewJsDefault.default)._renderContenteditable();
        if (this._eventAttached) return;
        (0, _contenteditableViewJsDefault.default)._addEventCheckbox();
        this._addEventModifiedInside();
        this._eventAttached = true;
    }
}
exports.default = new MainDaysCounterContainerView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./mainWholeView.js":"d7In2","./contenteditableView.js":"3MXPk","./overlayMessageSpinnerView.js":"gern0"}],"3MXPk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mainDaysCounterContainerViewJs = require("./mainDaysCounterContainerView.js");
var _mainDaysCounterContainerViewJsDefault = parcelHelpers.interopDefault(_mainDaysCounterContainerViewJs);
var _overlaySliderViewJs = require("./overlaySliderView.js");
var _overlaySliderViewJsDefault = parcelHelpers.interopDefault(_overlaySliderViewJs);
class ContentedidableView {
    _maxPage = 2;
    _toDoListsContainers;
    _commentsContainers;
    _curCard;
    _curCardPage;
    _pages;
    _lastModifiedCardToDoLists;
    _lastModifiedCardComments;
    _checkedOrNotArr;
    _contenteditableType;
    _data;
    type;
    _eventClickCardSlide(e, clicked) {
        if (e.target.closest('[contenteditable="true"]') || e.target.closest("button")) return;
        if (this._lastModifiedCardToDoLists || this._lastModifiedCardToDoLists === 0 || this._lastModifiedCardComments || this._lastModifiedCardComments === 0) return;
        this._curCard = this._contenteditableType === "daysCounter" ? +clicked.dataset.card : +clicked.dataset.slide;
        this._curCardPage = this._pages[this._curCard];
        this._changePages();
        this._changeTitle(clicked);
        this._handleHidden(clicked);
    }
    _changePages() {
        //when max page or user clicks different card
        this._curCardPage = this._curCardPage === this._maxPage ? 0 : ++this._curCardPage;
        this._pages.fill(this._curCardPage, this._curCard, this._curCard + 1);
    }
    _changeTitle(clicked) {
        if (this._contenteditableType === "slide") return;
        let title;
        const changeTitle = this.type === "goals" ? this._data.goals[this._curCard].title : this._data.rooms[this._curCard].title;
        if (this._curCardPage === 0) title = changeTitle || "No title is set!";
        if (this._curCardPage === 1) title = "To-Do lists";
        if (this._curCardPage === 2) title = "Comments";
        clicked.querySelector("h2").textContent = title;
    }
    _handleHidden(clicked) {
        const first = clicked.querySelector(".bottom_content");
        const second = clicked.querySelector(".to_do_lists");
        const third = clicked.querySelector(".comments");
        [
            first,
            second,
            third
        ].forEach((content, i)=>{
            content.classList.remove("hidden");
            if (this._curCardPage !== i) content.classList.add("hidden");
        });
        const clickedBtnEdit = clicked.querySelector(".btn--edit");
        this._curCardPage === 0 ? clickedBtnEdit.classList.remove("hidden") : clickedBtnEdit.classList.add("hidden");
    }
    _inputEventModifiedInside(e) {
        this._setLastModifiedAndCheckedArr(e);
        this._removeUnecessaryBrCheckbox(e);
    }
    _setLastModifiedAndCheckedArr(e) {
        const toDoListsContainer = e.target.closest(".to_do_lists");
        const commentsContainer = e.target.closest(".comments");
        if (!toDoListsContainer && !commentsContainer) return;
        if (this._contenteditableType === "daysCounter") {
            if (toDoListsContainer) this._lastModifiedCardToDoLists = +toDoListsContainer.closest(".card").dataset.card;
            if (commentsContainer) this._lastModifiedCardComments = +commentsContainer.closest(".card").dataset.card;
        }
        if (this._contenteditableType === "slide") {
            if (toDoListsContainer) this._lastModifiedCardToDoLists = +toDoListsContainer.closest(".slide").dataset.slide;
            if (commentsContainer) this._lastModifiedCardComments = +commentsContainer.closest(".slide").dataset.slide;
        }
        if (!toDoListsContainer) return;
        this._setCheckedOrNotArr(toDoListsContainer);
    }
    _setCheckedOrNotArr(toDoListsContainer) {
        const checkboxesArr = Array.from(toDoListsContainer.querySelectorAll('input[type="checkbox"]'));
        this._checkedOrNotArr = checkboxesArr.map((checkbox)=>checkbox.checked);
    }
    _removeUnecessaryBrCheckbox(e) {
        const checkboxContainers = e.target.querySelectorAll(".checkbox_container");
        checkboxContainers.forEach((container)=>{
            if (container.innerHTML === "<br>") container.remove();
        });
    }
    _addEventCheckbox() {
        this._toDoListsContainers.forEach((container)=>{
            container.addEventListener("keydown", (e)=>{
                if (e.key !== "Enter" || this._curCardPage !== 1) return;
                const texts = container.textContent;
                this._generateCheckbox(texts, container, this._checkedOrNotArr);
            });
        });
    }
    _generateCheckbox(texts, container, checkedOrNotArr) {
        // if (!texts) return;
        //separate texts into each line
        const textsArr = texts.split("\n");
        ////get rid of unecessary spaces and empty string
        const newTexts = textsArr.map((text)=>text.trim()).filter((text)=>text);
        newTexts.push("");
        container.innerHTML = "";
        const markup = newTexts.map((text, i)=>`
      <div class="checkbox_container">
      <input type="checkbox" id="checkbox${i}"  ${checkedOrNotArr?.at(i) ? "checked" : ""}>
      ${text}
      </div>
      `).join("");
        container.insertAdjacentHTML("afterbegin", markup);
        this._highlightLastLine(container.lastChild);
    }
    _highlightLastLine(highlightPoint) {
        const range = document.createRange();
        range.setStartAfter(highlightPoint);
        range.setEndAfter(highlightPoint);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    _clickOutside(e, handler) {
        const clicked = this._contenteditableType === "daysCounter" ? e.target.closest(".page--main") : e.target.closest(".overlay");
        if (!clicked) return;
        if (e.target.closest('[contenteditable="true"]')) return;
        if (!this._lastModifiedCardToDoLists && this._lastModifiedCardToDoLists !== 0 && !this._lastModifiedCardComments && this._lastModifiedCardComments !== 0) return;
        const toDoLists = this._toDoListsContainers[this._lastModifiedCardToDoLists];
        const comments = this._commentsContainers[this._lastModifiedCardComments];
        const modifiedCard = toDoLists ? this._lastModifiedCardToDoLists : this._lastModifiedCardComments;
        handler(this.type, modifiedCard, toDoLists?.textContent, this._checkedOrNotArr, comments?.innerHTML);
        this._lastModifiedCardToDoLists = null;
        this._lastModifiedCardComments = null;
    }
    _renderContenteditable() {
        const renderFor = this.type === "goals" ? this._data.goals : this._data.rooms;
        renderFor.forEach((goalRoom, i)=>{
            this._generateCheckbox(goalRoom.toDoLists, this._toDoListsContainers[i], goalRoom.toDoListsCheckbox);
            this._renderComments(goalRoom.comments, this._commentsContainers[i]);
        });
    }
    _renderComments(texts, container) {
        // //I will remove it later
        if (!texts) return;
        container.innerHTML = texts;
        this._highlightLastLine(container.lastChild);
    }
    _resetAllToFirst(parentElement) {
        this._resetAllCardsToFirst(parentElement);
        this._resetAllTitleToFirst(parentElement);
        this._resetAllBtnEditToFirst(parentElement);
    }
    _resetAllCardsToFirst(parentElement) {
        const first = parentElement.querySelectorAll(".bottom_content");
        const second = parentElement.querySelectorAll(".to_do_lists");
        const third = parentElement.querySelectorAll(".comments");
        first.forEach((content, i)=>{
            content.classList.remove("hidden");
            second[i].classList.add("hidden");
            third[i].classList.add("hidden");
        });
    }
    _resetAllTitleToFirst(parentElement) {
        if (this._contenteditableType === "slide") return;
        const changeFor = this.type === "goals" ? this._data.goals : this._data.rooms;
        const titles = changeFor.map((goalRoom)=>goalRoom?.title);
        const titleContainers = parentElement.querySelectorAll("h2");
        titleContainers.forEach((container, i)=>{
            const title = titles[i];
            container.textContent = title || "No title is set!";
        });
    }
    _resetAllBtnEditToFirst(parentElement) {
        parentElement.querySelectorAll(".btn--edit").forEach((btnEdit)=>btnEdit.classList.remove("hidden"));
    }
    _init(type, contenteditableType, data) {
        this.type = type;
        this._contenteditableType = contenteditableType;
        this._data = data;
        this._pages = new Array(this.type === "goals" ? this._data.goals.length : this._data.rooms.length).fill(0);
    }
}
exports.default = new ContentedidableView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./mainDaysCounterContainerView.js":"deT27","./overlaySliderView.js":"dip5k"}],"dip5k":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _airDatepicker = require("air-datepicker");
var _airDatepickerDefault = parcelHelpers.interopDefault(_airDatepicker);
var _airDatepickerCss = require("air-datepicker/air-datepicker.css");
var _en = require("air-datepicker/locale/en");
var _enDefault = parcelHelpers.interopDefault(_en);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _overlayViewJs = require("./overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
var _overlayMessageSpinnerViewJs = require("./overlayMessageSpinnerView.js");
var _overlayMessageSpinnerViewJsDefault = parcelHelpers.interopDefault(_overlayMessageSpinnerViewJs);
var _contenteditableViewJs = require("./contenteditableView.js");
var _contenteditableViewJsDefault = parcelHelpers.interopDefault(_contenteditableViewJs);
var _setGoalsSliderViewJs = require("./setGoalsSliderView.js");
var _setGoalsSliderViewJsDefault = parcelHelpers.interopDefault(_setGoalsSliderViewJs);
var _createRoomsSliderViewJs = require("./createRoomsSliderView.js");
var _createRoomsSliderViewJsDefault = parcelHelpers.interopDefault(_createRoomsSliderViewJs);
var _selectRoomsSliderViewJs = require("./selectRoomsSliderView.js");
var _selectRoomsSliderViewJsDefault = parcelHelpers.interopDefault(_selectRoomsSliderViewJs);
var _idRoomsSliderViewJs = require("./idRoomsSliderView.js");
var _idRoomsSliderViewJsDefault = parcelHelpers.interopDefault(_idRoomsSliderViewJs);
var _regeneratorRuntime = require("regenerator-runtime");
var _nanoid = require("nanoid");
var _mainWholeViewJs = require("./mainWholeView.js");
var _mainWholeViewJsDefault = parcelHelpers.interopDefault(_mainWholeViewJs);
class OverlaySliderView extends (0, _viewJsDefault.default) {
    _parentElement = (0, _overlayViewJsDefault.default)._parentElement;
    _allSlides;
    _currentSlide;
    _curAccGoalLength;
    _editGoalRoomIndex;
    _deleteGoalRoomIndex;
    _message;
    _errorMessage = "Something went wrong. Please try again this later!";
    _eventAttached;
    _data;
    type;
    roomType;
    _addEvents() {
        this._addEventClickSlide();
        this._addEventClickRight();
        this._addEventClickLeft();
        this._addEventArrowKey();
        this._addEventClickDot();
        this._addEventClickEdit();
        this._addEventClickDelete();
        this._addEventClickSelect();
    }
    _addEventClickSlide() {
        this._parentElement.addEventListener("click", (e)=>{
            const clickedSlide = e.target.closest(".slide");
            if (!clickedSlide || this.roomType === "select" || this.roomType === "id" || clickedSlide.querySelector(".btn--finish")) return;
            //when the slide doesn't have set goal/room
            const clickedSlideIndex = +clickedSlide.dataset.slide;
            if (this.type === "goals" && !this._data.goals[clickedSlideIndex] || this.type === "rooms" && !this._data.rooms[clickedSlideIndex]) return;
            if (e.target.closest('input[type="text"]')) return;
            (0, _contenteditableViewJsDefault.default)._eventClickCardSlide(e, clickedSlide);
        });
    }
    _addEventClickRight() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--right");
            if (!btn) return;
            this._goToNext();
        });
    }
    _addEventClickLeft() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--left");
            if (!btn) return;
            this._goToPrev();
        });
    }
    _addEventArrowKey() {
        document.addEventListener("keydown", (e)=>{
            const inputFields = Array.from(this._parentElement.querySelectorAll("input")).filter((input)=>input.type !== "checkbox");
            const ifInputFieldFocused = inputFields.map((input)=>document.activeElement === input).some((ifFocused)=>ifFocused === true);
            if (ifInputFieldFocused) return;
            if (e.key === "ArrowRight") this._goToNext();
            if (e.key === "ArrowLeft") this._goToPrev();
        });
    }
    _addEventClickDot() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".dots_dot");
            if (!btn) return;
            this._currentSlide = +btn.dataset.dot;
            this._goToSlide(+btn.dataset.dot);
            this._activeDot();
        });
    }
    _addEventClickEdit() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--edit");
            if (!btn) return;
            const curSlide = btn.closest(".slide");
            const editGoalRoomIndex = +curSlide.dataset.slide;
            this._changeGoalRoomForEdit(editGoalRoomIndex);
        });
    }
    _changeGoalRoomForEdit(editGoalRoomIndex) {
        this._editGoalRoomIndex = editGoalRoomIndex;
        const curSlide = this._allSlides[editGoalRoomIndex];
        const goalOrRoom = this.type.slice(0, 4);
        const curSlideTitle = curSlide.querySelector(".set_goal_title").textContent;
        const curSlideDate = curSlide.querySelector(".set_goal_date").textContent;
        const markup = `
      <h2>${this.type === "goals" ? "Goal" : "Room"} No.${editGoalRoomIndex + 1}</h2>
      <div class="btns--edit_delete btns_edit_delete--slide">
      <button class="btn--finish" data-finish="${editGoalRoomIndex}" type="button">Finish</button>
      <button class="btn--delete" data-delete="${editGoalRoomIndex}" type="button">Delete</button>
      </div>
      <div class="bottom_content">
      <div class="goal_title">
        <p>Edit the name of your ${goalOrRoom} No.${editGoalRoomIndex + 1}!</p>
        <input id="input--goal_title" type="text" placeholder="${goalOrRoom} title"></input>
      </div>
      <div class="goal_date">
        <p>Edit the date of your ${goalOrRoom} No.${editGoalRoomIndex + 1}!</p>
        <input id="input--goal_date" class="datepicker${editGoalRoomIndex}" type="text" placeholder="Click here to select date"></input>
      </div>
      </div>`;
        this.render(curSlide, markup);
        curSlide.querySelector("#input--goal_title").value = curSlideTitle === "No title yet" ? "" : curSlideTitle;
        curSlide.querySelector("#input--goal_date").value = curSlideDate === "No date yet" ? "" : curSlideDate;
        this._setDatePickerOne(editGoalRoomIndex);
        ////hide submit button
        this._parentElement.querySelector(".slider--btn_next").classList.add("hidden");
    }
    _addHandlerClickFinishEditing(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--finish");
            if (!btn) return;
            const curSlide = btn.closest(".slide");
            const titleInput = curSlide.querySelector("#input--goal_title").value.trim();
            const dateInput = curSlide.querySelector("#input--goal_date").value.trim();
            if (!titleInput && !dateInput) return;
            const updateFor = this.type === "goals" ? this._data.goals[this._editGoalRoomIndex] : this._data.rooms[this._editGoalRoomIndex];
            let editedGoalRoomInfo = {
                title: titleInput || "",
                date: dateInput || "",
                comments: updateFor.comments || "",
                toDoLists: updateFor.toDoLists || "",
                toDoListsCheckbox: updateFor.toDoListsCheckbox || []
            };
            if (this.type === "rooms") editedGoalRoomInfo = {
                roomId: updateFor.roomId,
                usernames: updateFor.usernames || [],
                ...editedGoalRoomInfo
            };
            handler(this._editGoalRoomIndex, editedGoalRoomInfo, this.type);
            this._editGoalRoomIndex = null;
        });
    }
    _addEventClickDelete() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--delete");
            if (!btn) return;
            const deleteGoalRoomIndex = +btn.closest(".slide").dataset.slide;
            this._deleteGoalRoomIndex = deleteGoalRoomIndex;
            (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "question", `Are you sure you want to delete this ${this.type === "goals" ? "goal" : "room"}?`);
        });
    }
    _addEventClickSelect() {
        this._parentElement.addEventListener("click", function(e) {
            (0, _selectRoomsSliderViewJsDefault.default)._select(e);
        });
    }
    addHandlerClickX(handler) {
        (0, _overlayViewJsDefault.default).addHandlerClickX(()=>{
            handler();
            this._editGoalRoomIndex = null;
            this._deleteGoalRoomIndex = null;
        });
    }
    addHandlerClickOutside(handler) {
        (0, _overlayViewJsDefault.default).addHandlerClickOutside(()=>{
            handler();
            this._editGoalRoomIndex = null;
            this._deleteGoalRoomIndex = null;
        });
    }
    _addHandlerClickEscapeClose(handler) {
        this._addEventClickEscapeClose(this._keyEventRemoveFocus, handler);
    }
    _keyEventRemoveFocus() {
        const mainWholeViewParentEle = (0, _mainWholeViewJsDefault.default)._parentElement;
        const btns = mainWholeViewParentEle.querySelectorAll("button");
        btns.forEach((btn)=>btn.blur());
    }
    _addHandlerIAmSure(handler) {
        (0, _overlayMessageSpinnerViewJsDefault.default)._addHandlerClickIAmSure(()=>{
            if (!this._deleteGoalRoomIndex && this._deleteGoalRoomIndex !== 0) return;
            //check if delete room was selected by existing goal
            let selectedGoal;
            if (this.type === "rooms") {
                const deleteRoom = this._data.rooms[this._deleteGoalRoomIndex];
                selectedGoal = this._data.goals.find((goal)=>goal.title === deleteRoom.title && goal.date === deleteRoom.date && goal.selected);
            }
            handler(this._deleteGoalRoomIndex, this.type, selectedGoal, "slide");
            this._deleteGoalRoomIndex = null;
        });
    }
    addHandlerSubmit(handlerSubmit, handlerSaveSelected) {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".slider--btn_next");
            if (!btn) return;
            ///submit for goals
            if (this.type === "goals") return (0, _setGoalsSliderViewJsDefault.default)._submit(handlerSubmit);
            //submit for rooms created from scratch
            if (this.type === "rooms" && this.roomType === "create") return (0, _createRoomsSliderViewJsDefault.default)._submit(handlerSubmit);
            //submit for rooms created from existing goals
            if (this.type === "rooms" && this.roomType === "select") return (0, _selectRoomsSliderViewJsDefault.default)._submit(handlerSubmit, handlerSaveSelected);
            //submit for rooms created from id
            (0, _idRoomsSliderViewJsDefault.default)._submit(handlerSubmit);
        });
    }
    _addEventModifiedInside() {
        this._parentElement.addEventListener("input", (e)=>{
            (0, _contenteditableViewJsDefault.default)._inputEventModifiedInside(e);
        });
    }
    _addEventStopPropagationCheckbox() {
        this._parentElement.querySelectorAll('input[type="checkbox"]').forEach((checkbox)=>{
            checkbox.addEventListener("click", (e)=>{
                e.stopPropagation();
            });
        });
    }
    addHandlerClickOutsideContenteditable(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            (0, _contenteditableViewJsDefault.default)._clickOutside(e, handler);
        });
    }
    _slideMax() {
        //When create goals/rooms from scratch, or join rooms with ids  => GOAL_LIMIT
        //when select goals for rooms => goal length
        //when join rooms with ids => amount of rooms user can still set
        let slideMax;
        if (this.type === "goals" || this.type === "rooms" && this.roomType === "create") slideMax = (0, _configJs.GOAL_LIMIT);
        if (this.type === "rooms" && this.roomType === "select") slideMax = this._curAccGoalLength;
        if (this.type === "rooms" && this.roomType === "id") slideMax = (0, _configJs.ROOM_LIMIT) - this._data.rooms.length;
        return slideMax;
    }
    _goToNext() {
        //current slide is 0 base!
        if (this._currentSlide === this._slideMax() - 1) this._currentSlide = 0;
        else this._currentSlide++;
        this._goToSlide(this._currentSlide);
        this._activeDot();
    }
    _goToPrev() {
        //current slide is 0 base!
        if (this._currentSlide === 0) this._currentSlide = this._slideMax() - 1;
        else this._currentSlide--;
        this._goToSlide(this._currentSlide);
        this._activeDot();
    }
    _generateMarkup() {
        this._curAccGoalLength = this._data.goals.length;
        if (this.type === "goals") return (0, _setGoalsSliderViewJsDefault.default)._generateMarkup(this._data);
        if (this.type === "rooms" && this.roomType === "create") return (0, _createRoomsSliderViewJsDefault.default)._generateMarkup(this._data);
        if (this.type === "rooms" && this.roomType === "select") return (0, _selectRoomsSliderViewJsDefault.default)._generateMarkup(this._data);
        return (0, _idRoomsSliderViewJsDefault.default)._generateMarkup(this._data);
    }
    _goToSlide(slideIndex = this._currentSlide) {
        this._allSlides = document.querySelectorAll(".slide");
        this._allSlides.forEach((s, i)=>s.style.transform = `translateX(${(0, _configJs.SLIDER_WIDTH) * (i - slideIndex)}%)`);
    }
    _activeDot() {
        const allDots = document.querySelectorAll(".dots_dot");
        allDots.forEach((dot)=>{
            dot.classList.remove("dots_dot--active");
            dot.blur();
            if (this._currentSlide === +dot.dataset.dot) dot.classList.add("dots_dot--active");
        });
    }
    _setDatePicker() {
        for(let i = 0; i < (0, _configJs.GOAL_LIMIT); i++)new (0, _airDatepickerDefault.default)(`.datepicker${i}`, {
            startDate: new Date(),
            locale: (0, _enDefault.default),
            position: "top right"
        });
    }
    _setDatePickerOne(index) {
        new (0, _airDatepickerDefault.default)(`.datepicker${index}`, {
            startDate: new Date(),
            locale: (0, _enDefault.default),
            position: "top right"
        });
    }
    init(curAccount, clickedCardIndex) {
        this._currentSlide = 0;
        this.renderToParentEle(curAccount);
        this._goToSlide(clickedCardIndex);
        this._setDatePicker();
        this._activeDot();
        if (this.roomType === "select" || this.roomType === "id") return;
        (0, _contenteditableViewJsDefault.default)._init(this.type, "slide", this._data);
        (0, _contenteditableViewJsDefault.default)._toDoListsContainers = this._parentElement.querySelectorAll(".to_do_lists");
        (0, _contenteditableViewJsDefault.default)._commentsContainers = this._parentElement.querySelectorAll(".comments");
        (0, _contenteditableViewJsDefault.default)._renderContenteditable();
        if (this._eventAttached) return;
        (0, _contenteditableViewJsDefault.default)._addEventCheckbox();
        this._addEventStopPropagationCheckbox();
        this._addEventModifiedInside();
        this._eventAttached = true;
    }
}
exports.default = new OverlaySliderView();

},{"../config.js":"2hPh4","air-datepicker":"huelj","air-datepicker/air-datepicker.css":"aM9jX","air-datepicker/locale/en":"bG3Mq","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./overlayView.js":"4fl36","./View.js":"jSw21","./setGoalsSliderView.js":"dOQHp","./createRoomsSliderView.js":"in4HJ","./selectRoomsSliderView.js":"c0NbB","./idRoomsSliderView.js":"jL5KG","./contenteditableView.js":"3MXPk","regenerator-runtime":"f6ot0","nanoid":"328Fw","./overlayMessageSpinnerView.js":"gern0","./mainWholeView.js":"d7In2"}],"huelj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _airDatepicker = require("./air-datepicker");
var _airDatepickerDefault = parcelHelpers.interopDefault(_airDatepicker);
exports.default = (0, _airDatepickerDefault.default);

},{"./air-datepicker":"bTyyn","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bTyyn":[function(require,module,exports,__globalThis) {
!function(e, t) {
    module.exports = t();
}(this, function() {
    return function() {
        "use strict";
        var e = {
            d: function(t, i) {
                for(var s in i)e.o(i, s) && !e.o(t, s) && Object.defineProperty(t, s, {
                    enumerable: !0,
                    get: i[s]
                });
            },
            o: function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }
        }, t = {};
        e.d(t, {
            default: function() {
                return R;
            }
        });
        var i = {
            days: "days",
            months: "months",
            years: "years",
            day: "day",
            month: "month",
            year: "year",
            eventChangeViewDate: "changeViewDate",
            eventChangeCurrentView: "changeCurrentView",
            eventChangeFocusDate: "changeFocusDate",
            eventChangeSelectedDate: "changeSelectedDate",
            eventChangeTime: "changeTime",
            eventChangeLastSelectedDate: "changeLastSelectedDate",
            actionSelectDate: "selectDate",
            actionUnselectDate: "unselectDate",
            cssClassWeekend: "-weekend-"
        }, s = {
            classes: "",
            inline: !1,
            locale: {
                days: [
                    "\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435",
                    "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
                    "\u0412\u0442\u043E\u0440\u043D\u0438\u043A",
                    "\u0421\u0440\u0435\u0434\u0430",
                    "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
                    "\u041F\u044F\u0442\u043D\u0438\u0446\u0430",
                    "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"
                ],
                daysShort: [
                    "\u0412\u043E\u0441",
                    "\u041F\u043E\u043D",
                    "\u0412\u0442\u043E",
                    "\u0421\u0440\u0435",
                    "\u0427\u0435\u0442",
                    "\u041F\u044F\u0442",
                    "\u0421\u0443\u0431"
                ],
                daysMin: [
                    "\u0412\u0441",
                    "\u041F\u043D",
                    "\u0412\u0442",
                    "\u0421\u0440",
                    "\u0427\u0442",
                    "\u041F\u0442",
                    "\u0421\u0431"
                ],
                months: [
                    "\u042F\u043D\u0432\u0430\u0440\u044C",
                    "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
                    "\u041C\u0430\u0440\u0442",
                    "\u0410\u043F\u0440\u0435\u043B\u044C",
                    "\u041C\u0430\u0439",
                    "\u0418\u044E\u043D\u044C",
                    "\u0418\u044E\u043B\u044C",
                    "\u0410\u0432\u0433\u0443\u0441\u0442",
                    "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
                    "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
                    "\u041D\u043E\u044F\u0431\u0440\u044C",
                    "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
                ],
                monthsShort: [
                    "\u042F\u043D\u0432",
                    "\u0424\u0435\u0432",
                    "\u041C\u0430\u0440",
                    "\u0410\u043F\u0440",
                    "\u041C\u0430\u0439",
                    "\u0418\u044E\u043D",
                    "\u0418\u044E\u043B",
                    "\u0410\u0432\u0433",
                    "\u0421\u0435\u043D",
                    "\u041E\u043A\u0442",
                    "\u041D\u043E\u044F",
                    "\u0414\u0435\u043A"
                ],
                today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                clear: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C",
                dateFormat: "dd.MM.yyyy",
                timeFormat: "HH:mm",
                firstDay: 1
            },
            startDate: new Date,
            firstDay: "",
            weekends: [
                6,
                0
            ],
            dateFormat: "",
            altField: "",
            altFieldDateFormat: "T",
            toggleSelected: !0,
            keyboardNav: !0,
            selectedDates: !1,
            container: "",
            isMobile: !1,
            visible: !1,
            position: "bottom left",
            offset: 12,
            view: i.days,
            minView: i.days,
            showOtherMonths: !0,
            selectOtherMonths: !0,
            moveToOtherMonthsOnSelect: !0,
            showOtherYears: !0,
            selectOtherYears: !0,
            moveToOtherYearsOnSelect: !0,
            minDate: "",
            maxDate: "",
            disableNavWhenOutOfRange: !0,
            multipleDates: !1,
            multipleDatesSeparator: ", ",
            range: !1,
            dynamicRange: !0,
            buttons: !1,
            monthsField: "monthsShort",
            showEvent: "focus",
            autoClose: !1,
            fixedHeight: !1,
            prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
            nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
            navTitles: {
                days: "MMMM, <i>yyyy</i>",
                months: "yyyy",
                years: "yyyy1 - yyyy2"
            },
            timepicker: !1,
            onlyTimepicker: !1,
            dateTimeSeparator: " ",
            timeFormat: "",
            minHours: 0,
            maxHours: 24,
            minMinutes: 0,
            maxMinutes: 59,
            hoursStep: 1,
            minutesStep: 1,
            onSelect: !1,
            onChangeViewDate: !1,
            onChangeView: !1,
            onRenderCell: !1,
            onShow: !1,
            onHide: !1,
            onClickDayName: !1
        };
        function a(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
            return "string" == typeof e ? t.querySelector(e) : e;
        }
        function n() {
            let { tagName: e = "div", className: t = "", innerHtml: i = "", id: s = "", attrs: a = {} } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = document.createElement(e);
            return t && n.classList.add(...t.split(" ")), s && (n.id = s), i && (n.innerHTML = i), a && r(n, a), n;
        }
        function r(e, t) {
            for (let [i, s] of Object.entries(t))void 0 !== s && e.setAttribute(i, s);
            return e;
        }
        function h(e) {
            return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
        }
        function o(e) {
            let t = e.getHours(), { hours: i, dayPeriod: s } = l(t);
            return {
                year: e.getFullYear(),
                month: e.getMonth(),
                fullMonth: e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1,
                date: e.getDate(),
                fullDate: e.getDate() < 10 ? "0" + e.getDate() : e.getDate(),
                day: e.getDay(),
                hours: t,
                fullHours: d(t),
                hours12: i,
                dayPeriod: s,
                fullHours12: d(i),
                minutes: e.getMinutes(),
                fullMinutes: e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()
            };
        }
        function l(e) {
            return {
                dayPeriod: e > 11 ? "pm" : "am",
                hours: e % 12 == 0 ? 12 : e % 12
            };
        }
        function d(e) {
            return e < 10 ? "0" + e : e;
        }
        function c(e) {
            let t = 10 * Math.floor(e.getFullYear() / 10);
            return [
                t,
                t + 9
            ];
        }
        function u() {
            let e = [];
            for(var t = arguments.length, i = new Array(t), s = 0; s < t; s++)i[s] = arguments[s];
            return i.forEach((t)=>{
                if ("object" == typeof t) for(let i in t)t[i] && e.push(i);
                else t && e.push(t);
            }), e.join(" ");
        }
        function p(e, t) {
            let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.days;
            if (!e || !t) return !1;
            let a = o(e), n = o(t);
            return ({
                [i.days]: a.date === n.date && a.month === n.month && a.year === n.year,
                [i.months]: a.month === n.month && a.year === n.year,
                [i.years]: a.year === n.year
            })[s];
        }
        function m(e, t, i) {
            let s = g(e, !1).getTime(), a = g(t, !1).getTime();
            return i ? s >= a : s > a;
        }
        function v(e, t) {
            return !m(e, t, !0);
        }
        function g(e) {
            let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = new Date(e.getTime());
            return "boolean" != typeof t || t || function(e) {
                e.setHours(0, 0, 0, 0);
            }(i), i;
        }
        function D(e, t, i) {
            e.length ? e.forEach((e)=>{
                e.addEventListener(t, i);
            }) : e.addEventListener(t, i);
        }
        function y(e, t) {
            return !(!e || e === document || e instanceof DocumentFragment) && (e.matches(t) ? e : y(e.parentNode, t));
        }
        function f(e, t, i) {
            return e > i ? i : e < t ? t : e;
        }
        function w(e) {
            for(var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)i[s - 1] = arguments[s];
            return i.filter((e)=>e).forEach((t)=>{
                for (let [i, s] of Object.entries(t))if (void 0 !== s && "[object Object]" === s.toString()) {
                    let t = void 0 !== e[i] ? e[i].toString() : void 0, a = s.toString(), n = Array.isArray(s) ? [] : {};
                    e[i] = e[i] ? t !== a ? n : e[i] : n, w(e[i], s);
                } else e[i] = s;
            }), e;
        }
        function b(e) {
            let t = e;
            return e instanceof Date || ("string" == typeof e && /^\d{4}-\d{2}-\d{2}$/.test(e) && (e += "T00:00:00"), t = new Date(e)), isNaN(t.getTime()) && (console.log(`Unable to convert value "${e}" to Date object`), t = !1), t;
        }
        function $(e) {
            let t = "\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";
            return new RegExp("(^|>|" + t + ")(" + e + ")($|<|" + t + ")", "g");
        }
        function k(e, t, i) {
            return (t = function(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var i = e[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var s = i.call(e, "string");
                        if ("object" != typeof s) return s;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        class C {
            constructor(){
                let { type: e, date: t, dp: i, opts: s, body: a } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                k(this, "focus", ()=>{
                    this.$cell.classList.add("-focus-"), this.focused = !0;
                }), k(this, "removeFocus", ()=>{
                    this.$cell.classList.remove("-focus-"), this.focused = !1;
                }), k(this, "select", ()=>{
                    this.$cell.classList.add("-selected-"), this.selected = !0;
                }), k(this, "removeSelect", ()=>{
                    this.$cell.classList.remove("-selected-", "-range-from-", "-range-to-"), this.selected = !1;
                }), k(this, "onChangeSelectedDate", ()=>{
                    this.isDisabled || (this._handleSelectedStatus(), this.opts.range && this._handleRangeStatus());
                }), k(this, "onChangeFocusDate", (e)=>{
                    if (!e) return void (this.focused && this.removeFocus());
                    let t = p(e, this.date, this.type);
                    t ? this.focus() : !t && this.focused && this.removeFocus(), this.opts.range && this._handleRangeStatus();
                }), k(this, "render", ()=>(this.$cell.innerHTML = this._getHtml(), this._handleClasses(), this.$cell)), this.type = e, this.singleType = this.type.slice(0, -1), this.date = t, this.dp = i, this.opts = s, this.body = a, this.customData = !1, this.init();
            }
            init() {
                var e, t;
                let { onRenderCell: i } = this.opts;
                i && (this.customData = i({
                    date: this.date,
                    cellType: this.singleType,
                    datepicker: this.dp
                })), this._createElement(), this._bindDatepickerEvents(), null !== (e = this.customData) && void 0 !== e && e.disabled ? this.dp.disableDate(this.date) : !1 === (null === (t = this.customData) || void 0 === t ? void 0 : t.disabled) && this.dp.enableDate(this.date);
            }
            _bindDatepickerEvents() {
                this.dp.on(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.on(i.eventChangeFocusDate, this.onChangeFocusDate);
            }
            unbindDatepickerEvents() {
                this.dp.off(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.off(i.eventChangeFocusDate, this.onChangeFocusDate);
            }
            _createElement() {
                var e;
                let { year: t, month: i, fullMonth: s, date: a, fullDate: r } = o(this.date), h = (null === (e = this.customData) || void 0 === e ? void 0 : e.attrs) || {};
                this.$cell = n({
                    attrs: {
                        "data-year": t,
                        "data-month": i,
                        "data-date": a,
                        "data-iso-date": `${t}-${s}-${r}`,
                        ...h
                    }
                }), this.$cell.adpCell = this;
            }
            _getClassName() {
                var e;
                let t = new Date, { selectOtherMonths: s, selectOtherYears: a } = this.opts, { minDate: n, maxDate: r, isDateDisabled: h } = this.dp, { day: l } = o(this.date), d = this._isOutOfMinMaxRange(), c = h(this.date), m = u("air-datepicker-cell", `-${this.singleType}-`, {
                    "-current-": p(t, this.date, this.type),
                    "-min-date-": n && p(n, this.date, this.type),
                    "-max-date-": r && p(r, this.date, this.type)
                }), v = "";
                switch(this.type){
                    case i.days:
                        v = u({
                            "-weekend-": this.dp.isWeekend(l),
                            "-other-month-": this.isOtherMonth,
                            "-disabled-": this.isOtherMonth && !s || d || c
                        });
                        break;
                    case i.months:
                        v = u({
                            "-disabled-": d
                        });
                        break;
                    case i.years:
                        v = u({
                            "-other-decade-": this.isOtherDecade,
                            "-disabled-": d || this.isOtherDecade && !a
                        });
                }
                return u(m, v, null === (e = this.customData) || void 0 === e ? void 0 : e.classes).split(" ");
            }
            _getHtml() {
                var e;
                let { year: t, month: s, date: a } = o(this.date), { showOtherMonths: n, showOtherYears: r } = this.opts;
                if (null !== (e = this.customData) && void 0 !== e && e.html) return this.customData.html;
                switch(this.type){
                    case i.days:
                        return !n && this.isOtherMonth ? "" : a;
                    case i.months:
                        return this.dp.locale[this.opts.monthsField][s];
                    case i.years:
                        return !r && this.isOtherDecade ? "" : t;
                }
            }
            _isOutOfMinMaxRange() {
                let { minDate: e, maxDate: t } = this.dp, { type: s, date: a } = this, { month: n, year: r, date: h } = o(a), l = s === i.days, d = s === i.years, c = !!e && new Date(r, d ? e.getMonth() : n, l ? h : e.getDate()), u = !!t && new Date(r, d ? t.getMonth() : n, l ? h : t.getDate());
                return e && t ? v(c, e) || m(u, t) : e ? v(c, e) : t ? m(u, t) : void 0;
            }
            destroy() {
                this.unbindDatepickerEvents();
            }
            _handleRangeStatus() {
                const { selectedDates: e, focusDate: t, rangeDateTo: i, rangeDateFrom: s } = this.dp, a = e.length;
                if (this.$cell.classList.remove("-range-from-", "-range-to-", "-in-range-"), !a) return;
                let n = s, r = i;
                if (1 === a && t) {
                    const i = m(t, e[0]);
                    n = i ? e[0] : t, r = i ? t : e[0];
                }
                let h = u({
                    "-in-range-": n && r && (o = this.date, l = n, d = r, m(o, l) && v(o, d)),
                    "-range-from-": n && p(this.date, n, this.type),
                    "-range-to-": r && p(this.date, r, this.type)
                });
                var o, l, d;
                h && this.$cell.classList.add(...h.split(" "));
            }
            _handleSelectedStatus() {
                let e = this.dp._checkIfDateIsSelected(this.date, this.type);
                e ? this.select() : !e && this.selected && this.removeSelect();
            }
            _handleInitialFocusStatus() {
                p(this.dp.focusDate, this.date, this.type) && this.focus();
            }
            _handleClasses() {
                this.$cell.setAttribute("class", ""), this._handleInitialFocusStatus(), this.dp.hasSelectedDates && (this._handleSelectedStatus(), this.dp.opts.range && this._handleRangeStatus()), this.$cell.classList.add(...this._getClassName());
            }
            get isDisabled() {
                return this.$cell.matches(".-disabled-");
            }
            get isOtherMonth() {
                return this.dp.isOtherMonth(this.date);
            }
            get isOtherDecade() {
                return this.dp.isOtherDecade(this.date);
            }
        }
        function _(e, t, i) {
            return (t = function(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var i = e[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var s = i.call(e, "string");
                        if ("object" != typeof s) return s;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        let M = {
            [i.days]: `<div class="air-datepicker-body--day-names"></div><div class="air-datepicker-body--cells -${i.days}-"></div>`,
            [i.months]: `<div class="air-datepicker-body--cells -${i.months}-"></div>`,
            [i.years]: `<div class="air-datepicker-body--cells -${i.years}-"></div>`
        };
        const S = ".air-datepicker-cell";
        class T {
            constructor(e){
                let { dp: t, type: s, opts: a } = e;
                _(this, "handleClick", (e)=>{
                    let t = e.target.closest(S).adpCell;
                    if (t.isDisabled) return;
                    if (!this.dp.isMinViewReached) return void this.dp.down();
                    let i = this.dp._checkIfDateIsSelected(t.date, t.type);
                    i ? this.dp._handleAlreadySelectedDates(i, t.date) : this.dp.selectDate(t.date);
                }), _(this, "handleDayNameClick", (e)=>{
                    let t = e.target.getAttribute("data-day-index");
                    this.opts.onClickDayName({
                        dayIndex: Number(t),
                        datepicker: this.dp
                    });
                }), _(this, "onChangeCurrentView", (e)=>{
                    e !== this.type ? this.hide() : (this.show(), this.render());
                }), _(this, "onMouseOverCell", (e)=>{
                    let t = y(e.target, S);
                    this.dp.setFocusDate(!!t && t.adpCell.date);
                }), _(this, "onMouseOutCell", ()=>{
                    this.dp.setFocusDate(!1);
                }), _(this, "onClickBody", (e)=>{
                    let { onClickDayName: t } = this.opts, i = e.target;
                    i.closest(S) && this.handleClick(e), t && i.closest(".air-datepicker-body--day-name") && this.handleDayNameClick(e);
                }), _(this, "onMouseDown", (e)=>{
                    this.pressed = !0;
                    let t = y(e.target, S), i = t && t.adpCell;
                    p(i.date, this.dp.rangeDateFrom) && (this.rangeFromFocused = !0), p(i.date, this.dp.rangeDateTo) && (this.rangeToFocused = !0);
                }), _(this, "onMouseMove", (e)=>{
                    if (!this.pressed || !this.dp.isMinViewReached) return;
                    e.preventDefault();
                    let t = y(e.target, S), i = t && t.adpCell, { selectedDates: s, rangeDateTo: a, rangeDateFrom: n } = this.dp;
                    if (!i || i.isDisabled) return;
                    let { date: r } = i;
                    if (2 === s.length) {
                        if (this.rangeFromFocused && !m(r, a)) {
                            let { hours: e, minutes: t } = o(n);
                            r.setHours(e), r.setMinutes(t), this.dp.rangeDateFrom = r, this.dp.replaceDate(n, r);
                        }
                        if (this.rangeToFocused && !v(r, n)) {
                            let { hours: e, minutes: t } = o(a);
                            r.setHours(e), r.setMinutes(t), this.dp.rangeDateTo = r, this.dp.replaceDate(a, r);
                        }
                    }
                }), _(this, "onMouseUp", ()=>{
                    this.pressed = !1, this.rangeFromFocused = !1, this.rangeToFocused = !1;
                }), _(this, "onChangeViewDate", (e, t)=>{
                    if (!this.isVisible) return;
                    let s = c(e), a = c(t);
                    switch(this.dp.currentView){
                        case i.days:
                            if (p(e, t, i.months)) return;
                            break;
                        case i.months:
                            if (p(e, t, i.years)) return;
                            break;
                        case i.years:
                            if (s[0] === a[0] && s[1] === a[1]) return;
                    }
                    this.render();
                }), _(this, "render", ()=>{
                    this.destroyCells(), this._generateCells(), this.cells.forEach((e)=>{
                        this.$cells.appendChild(e.render());
                    });
                }), this.dp = t, this.type = s, this.opts = a, this.cells = [], this.$el = "", this.pressed = !1, this.isVisible = !0, this.init();
            }
            init() {
                this._buildBaseHtml(), this.type === i.days && this.renderDayNames(), this.render(), this._bindEvents(), this._bindDatepickerEvents();
            }
            _bindEvents() {
                let { range: e, dynamicRange: t } = this.opts;
                D(this.$el, "mouseover", this.onMouseOverCell), D(this.$el, "mouseout", this.onMouseOutCell), D(this.$el, "click", this.onClickBody), e && t && (D(this.$el, "mousedown", this.onMouseDown), D(this.$el, "mousemove", this.onMouseMove), D(window.document, "mouseup", this.onMouseUp));
            }
            _bindDatepickerEvents() {
                this.dp.on(i.eventChangeViewDate, this.onChangeViewDate), this.dp.on(i.eventChangeCurrentView, this.onChangeCurrentView);
            }
            _buildBaseHtml() {
                this.$el = n({
                    className: `air-datepicker-body -${this.type}-`,
                    innerHtml: M[this.type]
                }), this.$names = a(".air-datepicker-body--day-names", this.$el), this.$cells = a(".air-datepicker-body--cells", this.$el);
            }
            _getDayNamesHtml() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.dp.locale.firstDay, t = "", s = this.dp.isWeekend, { onClickDayName: a } = this.opts, n = e, r = 0;
                for(; r < 7;){
                    let e = n % 7;
                    t += `<div class="${u("air-datepicker-body--day-name", {
                        [i.cssClassWeekend]: s(e),
                        "-clickable-": !!a
                    })}" data-day-index='${e}'>${this.dp.locale.daysMin[e]}</div>`, r++, n++;
                }
                return t;
            }
            renderDayNames() {
                this.$names.innerHTML = this._getDayNamesHtml();
            }
            _generateCell(e) {
                let { type: t, dp: i, opts: s } = this;
                return new C({
                    type: t,
                    dp: i,
                    opts: s,
                    date: e,
                    body: this
                });
            }
            _generateCells() {
                T.getDatesFunction(this.type)(this.dp, (e)=>{
                    this.cells.push(this._generateCell(e));
                });
            }
            show() {
                this.isVisible = !0, this.$el.classList.remove("-hidden-");
            }
            hide() {
                this.isVisible = !1, this.$el.classList.add("-hidden-");
            }
            destroyCells() {
                this.cells.forEach((e)=>e.destroy()), this.cells = [], this.$cells.innerHTML = "";
            }
            destroy() {
                this.destroyCells(), this.dp.off(i.eventChangeViewDate, this.onChangeViewDate), this.dp.off(i.eventChangeCurrentView, this.onChangeCurrentView);
            }
            static getDaysDates(e, t) {
                let { viewDate: i, opts: { fixedHeight: s }, locale: { firstDay: a } } = e, n = h(i), { year: r, month: l } = o(i), d = new Date(r, l, 1), c = new Date(r, l, n), u = d.getDay() - a, p = 6 - c.getDay() + a;
                u = u < 0 ? u + 7 : u, p = p > 6 ? p - 7 : p;
                let m = function(e, t) {
                    let { year: i, month: s, date: a } = o(e);
                    return new Date(i, s, a - t);
                }(d, u), v = n + u + p, g = m.getDate(), { year: D, month: y } = o(m), f = 0;
                s && (v = 42);
                const w = [];
                for(; f < v;){
                    let e = new Date(D, y, g + f);
                    t && t(e), w.push(e), f++;
                }
                return w;
            }
            static getMonthsDates(e, t) {
                let { year: i } = e.parsedViewDate, s = 0, a = [];
                for(; s < 12;){
                    const e = new Date(i, s);
                    a.push(e), t && t(e), s++;
                }
                return a;
            }
            static getYearsDates(e, t) {
                let i = c(e.viewDate), s = i[0] - 1, a = i[1] + 1, n = s, r = [];
                for(; n <= a;){
                    const e = new Date(n, 0);
                    r.push(e), t && t(e), n++;
                }
                return r;
            }
            static getDatesFunction() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i.days;
                return ({
                    [i.days]: T.getDaysDates,
                    [i.months]: T.getMonthsDates,
                    [i.years]: T.getYearsDates
                })[e];
            }
        }
        function F(e, t, i) {
            return (t = function(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var i = e[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var s = i.call(e, "string");
                        if ("object" != typeof s) return s;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        class V {
            constructor(e){
                let { dp: t, opts: i } = e;
                F(this, "onClickNav", (e)=>{
                    let t = y(e.target, ".air-datepicker-nav--action");
                    if (!t) return;
                    let i = t.dataset.action;
                    this.dp[i]();
                }), F(this, "onChangeViewDate", ()=>{
                    this.render(), this._resetNavStatus(), this.handleNavStatus();
                }), F(this, "onChangeCurrentView", ()=>{
                    this.render(), this._resetNavStatus(), this.handleNavStatus();
                }), F(this, "onClickNavTitle", ()=>{
                    this.dp.isFinalView || this.dp.up();
                }), F(this, "update", ()=>{
                    let { prevHtml: e, nextHtml: t } = this.opts;
                    this.$prev.innerHTML = e, this.$next.innerHTML = t, this._resetNavStatus(), this.render(), this.handleNavStatus();
                }), F(this, "renderDelay", ()=>{
                    setTimeout(this.render);
                }), F(this, "render", ()=>{
                    this.$title.innerHTML = this._getTitle(), function(e, t) {
                        for(let i in t)t[i] ? e.classList.add(i) : e.classList.remove(i);
                    }(this.$title, {
                        "-disabled-": this.dp.isFinalView
                    });
                }), this.dp = t, this.opts = i, this.init();
            }
            init() {
                this._createElement(), this._buildBaseHtml(), this._defineDOM(), this.render(), this.handleNavStatus(), this._bindEvents(), this._bindDatepickerEvents();
            }
            _defineDOM() {
                this.$title = a(".air-datepicker-nav--title", this.$el), this.$prev = a('[data-action="prev"]', this.$el), this.$next = a('[data-action="next"]', this.$el);
            }
            _bindEvents() {
                this.$el.addEventListener("click", this.onClickNav), this.$title.addEventListener("click", this.onClickNavTitle);
            }
            _bindDatepickerEvents() {
                this.dp.on(i.eventChangeViewDate, this.onChangeViewDate), this.dp.on(i.eventChangeCurrentView, this.onChangeCurrentView), this.isNavIsFunction && (this.dp.on(i.eventChangeSelectedDate, this.renderDelay), this.dp.opts.timepicker && this.dp.on(i.eventChangeTime, this.render));
            }
            destroy() {
                this.dp.off(i.eventChangeViewDate, this.onChangeViewDate), this.dp.off(i.eventChangeCurrentView, this.onChangeCurrentView), this.isNavIsFunction && (this.dp.off(i.eventChangeSelectedDate, this.renderDelay), this.dp.opts.timepicker && this.dp.off(i.eventChangeTime, this.render));
            }
            _createElement() {
                this.$el = n({
                    tagName: "nav",
                    className: "air-datepicker-nav"
                });
            }
            _getTitle() {
                let { dp: e, opts: t } = this, i = t.navTitles[e.currentView];
                return "function" == typeof i ? i(e) : e.formatDate(e.viewDate, i);
            }
            handleNavStatus() {
                let { disableNavWhenOutOfRange: e } = this.opts, { minDate: t, maxDate: s } = this.dp;
                if (!t && !s || !e) return;
                let { year: a, month: n } = this.dp.parsedViewDate, r = !!t && o(t), h = !!s && o(s);
                switch(this.dp.currentView){
                    case i.days:
                        t && r.month >= n && r.year >= a && this._disableNav("prev"), s && h.month <= n && h.year <= a && this._disableNav("next");
                        break;
                    case i.months:
                        t && r.year >= a && this._disableNav("prev"), s && h.year <= a && this._disableNav("next");
                        break;
                    case i.years:
                        {
                            let e = c(this.dp.viewDate);
                            t && r.year >= e[0] && this._disableNav("prev"), s && h.year <= e[1] && this._disableNav("next");
                            break;
                        }
                }
            }
            _disableNav(e) {
                a('[data-action="' + e + '"]', this.$el).classList.add("-disabled-");
            }
            _resetNavStatus() {
                !function(e) {
                    for(var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)i[s - 1] = arguments[s];
                    e.length ? e.forEach((e)=>{
                        e.classList.remove(...i);
                    }) : e.classList.remove(...i);
                }(this.$el.querySelectorAll(".air-datepicker-nav--action"), "-disabled-");
            }
            _buildBaseHtml() {
                let { prevHtml: e, nextHtml: t } = this.opts;
                this.$el.innerHTML = `<div class="air-datepicker-nav--action" data-action="prev">${e}</div><div class="air-datepicker-nav--title"></div><div class="air-datepicker-nav--action" data-action="next">${t}</div>`;
            }
            get isNavIsFunction() {
                let { navTitles: e } = this.opts;
                return Object.keys(e).find((t)=>"function" == typeof e[t]);
            }
        }
        var x = {
            today: {
                content: (e)=>e.locale.today,
                onClick: (e)=>e.setViewDate(new Date)
            },
            clear: {
                content: (e)=>e.locale.clear,
                onClick: (e)=>e.clear()
            }
        };
        class H {
            constructor(e){
                let { dp: t, opts: i } = e;
                this.dp = t, this.opts = i, this.init();
            }
            init() {
                this.createElement(), this.render();
            }
            createElement() {
                this.$el = n({
                    className: "air-datepicker-buttons"
                });
            }
            destroy() {
                this.$el.parentNode.removeChild(this.$el);
            }
            clearHtml() {
                return this.$el.innerHTML = "", this;
            }
            generateButtons() {
                let { buttons: e } = this.opts;
                Array.isArray(e) || (e = [
                    e
                ]), e.forEach((e)=>{
                    let t = e;
                    "string" == typeof e && x[e] && (t = x[e]);
                    let i = this.createButton(t);
                    t.onClick && this.attachEventToButton(i, t.onClick), this.$el.appendChild(i);
                });
            }
            attachEventToButton(e, t) {
                e.addEventListener("click", ()=>{
                    t(this.dp);
                });
            }
            createButton(e) {
                let { content: t, className: i, tagName: s = "button", attrs: a = {} } = e;
                return n({
                    tagName: s,
                    innerHtml: `<span tabindex='-1'>${"function" == typeof t ? t(this.dp) : t}</span>`,
                    className: u("air-datepicker-button", i),
                    attrs: a
                });
            }
            render() {
                this.generateButtons();
            }
        }
        function E(e, t, i) {
            return (t = function(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var i = e[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var s = i.call(e, "string");
                        if ("object" != typeof s) return s;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        class L {
            constructor(){
                let { opts: e, dp: t } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                E(this, "toggleTimepickerIsActive", (e)=>{
                    this.dp.timepickerIsActive = e;
                }), E(this, "onChangeSelectedDate", (e)=>{
                    let { date: t, updateTime: i = !1 } = e;
                    t && (this.setMinMaxTime(t), this.setCurrentTime(!!i && t), this.addTimeToDate(t));
                }), E(this, "onChangeLastSelectedDate", (e)=>{
                    e && (this.setTime(e), this.render());
                }), E(this, "onChangeInputRange", (e)=>{
                    let t = e.target;
                    this[t.getAttribute("name")] = t.value, this.updateText(), this.dp.trigger(i.eventChangeTime, {
                        hours: this.hours,
                        minutes: this.minutes
                    });
                }), E(this, "onMouseEnterLeave", (e)=>{
                    let t = e.target.getAttribute("name"), i = this.$minutesText;
                    "hours" === t && (i = this.$hoursText), i.classList.toggle("-focus-");
                }), E(this, "onFocus", ()=>{
                    this.toggleTimepickerIsActive(!0);
                }), E(this, "onBlur", ()=>{
                    this.toggleTimepickerIsActive(!1);
                }), this.opts = e, this.dp = t;
                let { timeFormat: s } = this.dp.locale;
                s && (s.match($("h")) || s.match($("hh"))) && (this.ampm = !0), this.init();
            }
            init() {
                this.setTime(this.dp.lastSelectedDate || this.dp.viewDate), this.createElement(), this.buildHtml(), this.defineDOM(), this.render(), this.bindDatepickerEvents(), this.bindDOMEvents();
            }
            bindDatepickerEvents() {
                this.dp.on(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.on(i.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
            }
            bindDOMEvents() {
                let e = "input";
                navigator.userAgent.match(/trident/gi) && (e = "change"), D(this.$ranges, e, this.onChangeInputRange), D(this.$ranges, "mouseenter", this.onMouseEnterLeave), D(this.$ranges, "mouseleave", this.onMouseEnterLeave), D(this.$ranges, "focus", this.onFocus), D(this.$ranges, "mousedown", this.onFocus), D(this.$ranges, "blur", this.onBlur);
            }
            createElement() {
                this.$el = n({
                    className: u("air-datepicker-time", {
                        "-am-pm-": this.dp.ampm
                    })
                });
            }
            destroy() {
                this.dp.off(i.eventChangeSelectedDate, this.onChangeSelectedDate), this.dp.off(i.eventChangeLastSelectedDate, this.onChangeLastSelectedDate), this.$el.parentNode.removeChild(this.$el);
            }
            buildHtml() {
                let { ampm: e, hours: t, displayHours: i, minutes: s, minHours: a, minMinutes: n, maxHours: r, maxMinutes: h, dayPeriod: o, opts: { hoursStep: l, minutesStep: c } } = this;
                this.$el.innerHTML = `<div class="air-datepicker-time--current">   <span class="air-datepicker-time--current-hours">${d(i)}</span>   <span class="air-datepicker-time--current-colon">:</span>   <span class="air-datepicker-time--current-minutes">${d(s)}</span>   ` + (e ? `<span class='air-datepicker-time--current-ampm'>${o}</span>` : "") + '</div><div class="air-datepicker-time--sliders">   <div class="air-datepicker-time--row">' + `      <input type="range" name="hours" value="${t}" min="${a}" max="${r}" step="${l}"/>   </div>   <div class="air-datepicker-time--row">` + `      <input type="range" name="minutes" value="${s}" min="${n}" max="${h}" step="${c}"/>   </div></div>`;
            }
            defineDOM() {
                let e = (e)=>a(e, this.$el);
                this.$ranges = this.$el.querySelectorAll('[type="range"]'), this.$hours = e('[name="hours"]'), this.$minutes = e('[name="minutes"]'), this.$hoursText = e(".air-datepicker-time--current-hours"), this.$minutesText = e(".air-datepicker-time--current-minutes"), this.$ampm = e(".air-datepicker-time--current-ampm");
            }
            setTime(e) {
                this.setMinMaxTime(e), this.setCurrentTime(e);
            }
            addTimeToDate(e) {
                e && (e.setHours(this.hours), e.setMinutes(this.minutes));
            }
            setMinMaxTime(e) {
                if (this.setMinMaxTimeFromOptions(), e) {
                    let { minDate: t, maxDate: i } = this.dp;
                    t && p(e, t) && this.setMinTimeFromMinDate(t), i && p(e, i) && this.setMaxTimeFromMaxDate(i);
                }
            }
            setCurrentTime(e) {
                let { hours: t, minutes: i } = e ? o(e) : this;
                this.hours = f(t, this.minHours, this.maxHours), this.minutes = f(i, this.minMinutes, this.maxMinutes);
            }
            setMinMaxTimeFromOptions() {
                let { minHours: e, minMinutes: t, maxHours: i, maxMinutes: s } = this.opts;
                this.minHours = f(e, 0, 23), this.minMinutes = f(t, 0, 59), this.maxHours = f(i, 0, 23), this.maxMinutes = f(s, 0, 59);
            }
            setMinTimeFromMinDate(e) {
                let { lastSelectedDate: t } = this.dp;
                this.minHours = e.getHours(), t && t.getHours() > e.getHours() ? this.minMinutes = this.opts.minMinutes : this.minMinutes = e.getMinutes();
            }
            setMaxTimeFromMaxDate(e) {
                let { lastSelectedDate: t } = this.dp;
                this.maxHours = e.getHours(), t && t.getHours() < e.getHours() ? this.maxMinutes = this.opts.maxMinutes : this.maxMinutes = e.getMinutes();
            }
            updateSliders() {
                r(this.$hours, {
                    min: this.minHours,
                    max: this.maxHours
                }).value = this.hours, r(this.$minutes, {
                    min: this.minMinutes,
                    max: this.maxMinutes
                }).value = this.minutes;
            }
            updateText() {
                this.$hoursText.innerHTML = d(this.displayHours), this.$minutesText.innerHTML = d(this.minutes), this.ampm && (this.$ampm.innerHTML = this.dayPeriod);
            }
            set hours(e) {
                this._hours = e;
                let { hours: t, dayPeriod: i } = l(e);
                this.displayHours = this.ampm ? t : e, this.dayPeriod = i;
            }
            get hours() {
                return this._hours;
            }
            render() {
                this.updateSliders(), this.updateText();
            }
        }
        function A(e, t, i) {
            return (t = function(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var i = e[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var s = i.call(e, "string");
                        if ("object" != typeof s) return s;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        class O {
            constructor(e){
                let { dp: t, opts: i } = e;
                A(this, "pressedKeys", new Set), A(this, "hotKeys", new Map([
                    [
                        [
                            [
                                "Control",
                                "ArrowRight"
                            ],
                            [
                                "Control",
                                "ArrowUp"
                            ]
                        ],
                        (e)=>e.month++
                    ],
                    [
                        [
                            [
                                "Control",
                                "ArrowLeft"
                            ],
                            [
                                "Control",
                                "ArrowDown"
                            ]
                        ],
                        (e)=>e.month--
                    ],
                    [
                        [
                            [
                                "Shift",
                                "ArrowRight"
                            ],
                            [
                                "Shift",
                                "ArrowUp"
                            ]
                        ],
                        (e)=>e.year++
                    ],
                    [
                        [
                            [
                                "Shift",
                                "ArrowLeft"
                            ],
                            [
                                "Shift",
                                "ArrowDown"
                            ]
                        ],
                        (e)=>e.year--
                    ],
                    [
                        [
                            [
                                "Alt",
                                "ArrowRight"
                            ],
                            [
                                "Alt",
                                "ArrowUp"
                            ]
                        ],
                        (e)=>e.year += 10
                    ],
                    [
                        [
                            [
                                "Alt",
                                "ArrowLeft"
                            ],
                            [
                                "Alt",
                                "ArrowDown"
                            ]
                        ],
                        (e)=>e.year -= 10
                    ],
                    [
                        [
                            "Control",
                            "Shift",
                            "ArrowUp"
                        ],
                        (e, t)=>t.up()
                    ]
                ])), A(this, "handleHotKey", (e)=>{
                    let t = this.hotKeys.get(e), i = o(this.getInitialFocusDate());
                    t(i, this.dp);
                    let { year: s, month: a, date: n } = i, r = h(new Date(s, a));
                    r < n && (n = r);
                    let l = this.dp.getClampedDate(new Date(s, a, n));
                    this.dp.setFocusDate(l, {
                        viewDateTransition: !0
                    });
                }), A(this, "isHotKeyPressed", ()=>{
                    let e = !1, t = this.pressedKeys.size, i = (e)=>this.pressedKeys.has(e);
                    for (let [s] of this.hotKeys){
                        if (e) break;
                        if (Array.isArray(s[0])) s.forEach((a)=>{
                            e || t !== a.length || (e = a.every(i) && s);
                        });
                        else {
                            if (t !== s.length) continue;
                            e = s.every(i) && s;
                        }
                    }
                    return e;
                }), A(this, "isArrow", (e)=>e >= 37 && e <= 40), A(this, "onKeyDown", (e)=>{
                    if (!this.dp.visible && !this.dp.treatAsInline) return;
                    let { key: t, which: i } = e, { dp: s, dp: { focusDate: a }, opts: n } = this;
                    this.registerKey(t);
                    let r = this.isHotKeyPressed();
                    if (r) return e.preventDefault(), void this.handleHotKey(r);
                    if (this.isArrow(i)) return e.preventDefault(), void this.focusNextCell(t);
                    if ("Enter" === t) {
                        if (s.currentView !== n.minView) return void s.down();
                        if (a) {
                            let e = s._checkIfDateIsSelected(a);
                            return void (e ? s._handleAlreadySelectedDates(e, a) : s.selectDate(a));
                        }
                    }
                    "Escape" === t && this.dp.hide();
                }), A(this, "onKeyUp", (e)=>{
                    this.removeKey(e.key);
                }), this.dp = t, this.opts = i, this.init();
            }
            init() {
                this.bindKeyboardEvents();
            }
            bindKeyboardEvents() {
                let { $el: e } = this.dp;
                e.addEventListener("keydown", this.onKeyDown), e.addEventListener("keyup", this.onKeyUp);
            }
            destroy() {
                let { $el: e } = this.dp;
                e.removeEventListener("keydown", this.onKeyDown), e.removeEventListener("keyup", this.onKeyUp), this.hotKeys = null, this.pressedKeys = null;
            }
            getInitialFocusDate() {
                let { focusDate: e, currentView: t, selectedDates: s, parsedViewDate: { year: a, month: n } } = this.dp, r = e || s[s.length - 1];
                if (!r) switch(t){
                    case i.days:
                        r = new Date(a, n, (new Date).getDate());
                        break;
                    case i.months:
                        r = new Date(a, n, 1);
                        break;
                    case i.years:
                        r = new Date(a, 0, 1);
                }
                return r;
            }
            focusNextCell(e) {
                let t = this.getInitialFocusDate(), { currentView: s } = this.dp, { days: a, months: n, years: r } = i, h = o(t), l = h.year, d = h.month, c = h.date;
                switch(e){
                    case "ArrowLeft":
                        s === a && (c -= 1), s === n && (d -= 1), s === r && (l -= 1);
                        break;
                    case "ArrowUp":
                        s === a && (c -= 7), s === n && (d -= 3), s === r && (l -= 4);
                        break;
                    case "ArrowRight":
                        s === a && (c += 1), s === n && (d += 1), s === r && (l += 1);
                        break;
                    case "ArrowDown":
                        s === a && (c += 7), s === n && (d += 3), s === r && (l += 4);
                }
                let u = this.dp.getClampedDate(new Date(l, d, c));
                this.dp.setFocusDate(u, {
                    viewDateTransition: !0
                });
            }
            registerKey(e) {
                this.pressedKeys.add(e);
            }
            removeKey(e) {
                this.pressedKeys.delete(e);
            }
        }
        let N = {
            on (e, t) {
                this.__events || (this.__events = {}), this.__events[e] ? this.__events[e].push(t) : this.__events[e] = [
                    t
                ];
            },
            off (e, t) {
                this.__events && this.__events[e] && (this.__events[e] = this.__events[e].filter((e)=>e !== t));
            },
            removeAllEvents () {
                this.__events = {};
            },
            trigger (e) {
                for(var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)i[s - 1] = arguments[s];
                this.__events && this.__events[e] && this.__events[e].forEach((e)=>{
                    e(...i);
                });
            }
        };
        function I(e, t, i) {
            return (t = function(e) {
                var t = function(e, t) {
                    if ("object" != typeof e || null === e) return e;
                    var i = e[Symbol.toPrimitive];
                    if (void 0 !== i) {
                        var s = i.call(e, "string");
                        if ("object" != typeof s) return s;
                        throw new TypeError("@@toPrimitive must return a primitive value.");
                    }
                    return String(e);
                }(e);
                return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e;
        }
        let P = "", j = "", B = !1;
        class R {
            static buildGlobalContainer(e) {
                B = !0, P = n({
                    className: e,
                    id: e
                }), a("body").appendChild(P);
            }
            constructor(e, t){
                var r = this;
                if (I(this, "viewIndexes", [
                    i.days,
                    i.months,
                    i.years
                ]), I(this, "next", ()=>{
                    let { year: e, month: t } = this.parsedViewDate;
                    switch(this.currentView){
                        case i.days:
                            this.setViewDate(new Date(e, t + 1, 1));
                            break;
                        case i.months:
                            this.setViewDate(new Date(e + 1, t, 1));
                            break;
                        case i.years:
                            this.setViewDate(new Date(e + 10, 0, 1));
                    }
                }), I(this, "prev", ()=>{
                    let { year: e, month: t } = this.parsedViewDate;
                    switch(this.currentView){
                        case i.days:
                            this.setViewDate(new Date(e, t - 1, 1));
                            break;
                        case i.months:
                            this.setViewDate(new Date(e - 1, t, 1));
                            break;
                        case i.years:
                            this.setViewDate(new Date(e - 10, 0, 1));
                    }
                }), I(this, "_finishHide", ()=>{
                    this.hideAnimation = !1, this._destroyComponents(), this.$container.removeChild(this.$datepicker);
                }), I(this, "setPosition", function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if ("function" == typeof (e = e || r.opts.position)) return void (r.customHide = e({
                        $datepicker: r.$datepicker,
                        $target: r.$el,
                        $pointer: r.$pointer,
                        isViewChange: t,
                        done: r._finishHide
                    }));
                    let i, s, { isMobile: a } = r.opts, n = r.$el.getBoundingClientRect(), h = r.$el.getBoundingClientRect(), o = r.$datepicker.offsetParent, l = r.$el.offsetParent, d = r.$datepicker.getBoundingClientRect(), c = e.split(" "), u = window.scrollY, p = window.scrollX, m = r.opts.offset, v = c[0], g = c[1];
                    if (a) r.$datepicker.style.cssText = "left: 50%; top: 50%";
                    else {
                        if (o === l && o !== document.body && (h = {
                            top: r.$el.offsetTop,
                            left: r.$el.offsetLeft,
                            width: n.width,
                            height: r.$el.offsetHeight
                        }, u = 0, p = 0), o !== l && o !== document.body) {
                            let e = o.getBoundingClientRect();
                            h = {
                                top: n.top - e.top,
                                left: n.left - e.left,
                                width: n.width,
                                height: n.height
                            }, u = 0, p = 0;
                        }
                        switch(v){
                            case "top":
                                i = h.top - d.height - m;
                                break;
                            case "right":
                                s = h.left + h.width + m;
                                break;
                            case "bottom":
                                i = h.top + h.height + m;
                                break;
                            case "left":
                                s = h.left - d.width - m;
                        }
                        switch(g){
                            case "top":
                                i = h.top;
                                break;
                            case "right":
                                s = h.left + h.width - d.width;
                                break;
                            case "bottom":
                                i = h.top + h.height - d.height;
                                break;
                            case "left":
                                s = h.left;
                                break;
                            case "center":
                                /left|right/.test(v) ? i = h.top + h.height / 2 - d.height / 2 : s = h.left + h.width / 2 - d.width / 2;
                        }
                        r.$datepicker.style.cssText = `left: ${s + p}px; top: ${i + u}px`;
                    }
                }), I(this, "_setInputValue", ()=>{
                    let { opts: e, $altField: t, locale: { dateFormat: i } } = this, { altFieldDateFormat: s, altField: a } = e;
                    a && t && (t.value = this._getInputValue(s)), this.$el.value = this._getInputValue(i), this.$el.dispatchEvent(new Event("change"));
                }), I(this, "_getInputValue", (e)=>{
                    let { selectedDates: t, opts: i } = this, { multipleDates: s, multipleDatesSeparator: a } = i;
                    if (!t.length) return "";
                    let n = "function" == typeof e, r = n ? e(s ? t : t[0]) : t.map((t)=>this.formatDate(t, e));
                    return r = n ? r : r.join(a), r;
                }), I(this, "_checkIfDateIsSelected", function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.days, s = !1;
                    return r.selectedDates.some((i)=>{
                        let a = p(e, i, t);
                        return s = a && i, a;
                    }), s;
                }), I(this, "_scheduleCallAfterTransition", (e)=>{
                    this._cancelScheduledCall(), e && e(!1), this._onTransitionEnd = ()=>{
                        e && e(!0);
                    }, this.$datepicker.addEventListener("transitionend", this._onTransitionEnd, {
                        once: !0
                    });
                }), I(this, "_cancelScheduledCall", ()=>{
                    this.$datepicker.removeEventListener("transitionend", this._onTransitionEnd);
                }), I(this, "setViewDate", (e)=>{
                    if (!((e = b(e)) instanceof Date)) return;
                    if (p(e, this.viewDate)) return;
                    let t = this.viewDate;
                    this.viewDate = e;
                    let { onChangeViewDate: s } = this.opts;
                    if (s) {
                        let { month: e, year: t } = this.parsedViewDate;
                        s({
                            month: e,
                            year: t,
                            decade: this.curDecade
                        });
                    }
                    this.trigger(i.eventChangeViewDate, e, t);
                }), I(this, "setFocusDate", function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    (!e || (e = b(e)) instanceof Date) && (r.focusDate = e, r.trigger(i.eventChangeFocusDate, e, t));
                }), I(this, "setCurrentView", function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (r.viewIndexes.includes(e)) {
                        if (r.currentView = e, r.elIsInput && r.visible && r.setPosition(void 0, !0), r.trigger(i.eventChangeCurrentView, e), !r.views[e]) {
                            let t = r.views[e] = new T({
                                dp: r,
                                opts: r.opts,
                                type: e
                            });
                            r.shouldUpdateDOM && r.$content.appendChild(t.$el);
                        }
                        r.opts.onChangeView && !t.silent && r.opts.onChangeView(e);
                    }
                }), I(this, "_updateLastSelectedDate", (e)=>{
                    this.lastSelectedDate = e, this.trigger(i.eventChangeLastSelectedDate, e);
                }), I(this, "destroy", ()=>{
                    if (this.isDestroyed) return;
                    let { showEvent: e, isMobile: t } = this.opts, i = this.$datepicker.parentNode;
                    i && i.removeChild(this.$datepicker), this.$el.removeEventListener(e, this._onFocus), this.$el.removeEventListener("blur", this._onBlur), window.removeEventListener("resize", this._onResize), t && this._removeMobileAttributes(), this.keyboardNav && this.keyboardNav.destroy(), this.views = null, this.nav = null, this.$datepicker = null, this.opts = {}, this.$customContainer = null, this.viewDate = null, this.focusDate = null, this.selectedDates = [], this.rangeDateFrom = null, this.rangeDateTo = null, this.isDestroyed = !0;
                }), I(this, "update", function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = w({}, r.opts), { silent: a } = t;
                    w(r.opts, e);
                    let { timepicker: n, buttons: h, range: o, selectedDates: l, isMobile: d } = r.opts, c = r.visible || r.treatAsInline;
                    r._createMinMaxDates(), r._limitViewDateByMaxMinDates(), r._handleLocale(), l && (r.selectedDates = [], r.selectDate(l, {
                        silent: a
                    })), e.view && r.setCurrentView(e.view, {
                        silent: a
                    }), r._setInputValue(), s.range && !o ? (r.rangeDateTo = !1, r.rangeDateFrom = !1) : !s.range && o && r.selectedDates.length && (r.rangeDateFrom = r.selectedDates[0], r.rangeDateTo = r.selectedDates[1]), s.timepicker && !n ? (c && r.timepicker.destroy(), r.timepicker = !1, r.$timepicker.parentNode.removeChild(r.$timepicker)) : !s.timepicker && n && r._addTimepicker(), !s.buttons && h ? r._addButtons() : s.buttons && !h ? (r.buttons.destroy(), r.$buttons.parentNode.removeChild(r.$buttons)) : c && s.buttons && h && r.buttons.clearHtml().render(), !s.isMobile && d ? (r.treatAsInline || j || r._createMobileOverlay(), r._addMobileAttributes(), r.visible && r._showMobileOverlay()) : s.isMobile && !d && (r._removeMobileAttributes(), r.visible && (j.classList.remove("-active-"), "function" != typeof r.opts.position && r.setPosition())), c && (r.nav.update(), r.views[r.currentView].render(), r.currentView === i.days && r.views[r.currentView].renderDayNames());
                }), I(this, "disableDate", (e, t)=>{
                    (Array.isArray(e) ? e : [
                        e
                    ]).forEach((e)=>{
                        let i = b(e);
                        if (!i) return;
                        let s = t ? "delete" : "add";
                        this.disabledDates[s](this.formatDate(i, "yyyy-MM-dd"));
                        let a = this.getCell(i, this.currentViewSingular);
                        a && a.adpCell.render();
                    }, []);
                }), I(this, "enableDate", (e)=>{
                    this.disableDate(e, !0);
                }), I(this, "isDateDisabled", (e)=>{
                    let t = b(e);
                    return this.disabledDates.has(this.formatDate(t, "yyyy-MM-dd"));
                }), I(this, "isOtherMonth", (e)=>{
                    let { month: t } = o(e);
                    return t !== this.parsedViewDate.month;
                }), I(this, "isOtherYear", (e)=>{
                    let { year: t } = o(e);
                    return t !== this.parsedViewDate.year;
                }), I(this, "isOtherDecade", (e)=>{
                    let { year: t } = o(e), [i, s] = c(this.viewDate);
                    return t < i || t > s;
                }), I(this, "_onChangeSelectedDate", (e)=>{
                    let { silent: t } = e;
                    setTimeout(()=>{
                        this._setInputValue(), this.opts.onSelect && !t && this._triggerOnSelect();
                    });
                }), I(this, "_onChangeFocusedDate", function(e) {
                    let { viewDateTransition: t } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (!e) return;
                    let i = !1;
                    t && (i = r.isOtherMonth(e) || r.isOtherYear(e) || r.isOtherDecade(e)), i && r.setViewDate(e), r.opts.onFocus && r.opts.onFocus({
                        datepicker: r,
                        date: e
                    });
                }), I(this, "_onChangeTime", (e)=>{
                    let { hours: t, minutes: i } = e, s = new Date, { lastSelectedDate: a, opts: { onSelect: n } } = this, r = a;
                    a || (r = s);
                    let h = this.getCell(r, this.currentViewSingular), o = h && h.adpCell;
                    o && o.isDisabled || (r.setHours(t), r.setMinutes(i), a ? (this._setInputValue(), n && this._triggerOnSelect()) : this.selectDate(r));
                }), I(this, "_onFocus", (e)=>{
                    this.visible || this.show();
                }), I(this, "_onBlur", (e)=>{
                    this.inFocus || !this.visible || this.opts.isMobile || this.hide();
                }), I(this, "_onMouseDown", (e)=>{
                    this.inFocus = !0;
                }), I(this, "_onMouseUp", (e)=>{
                    this.inFocus = !1, this.$el.focus();
                }), I(this, "_onResize", ()=>{
                    this.visible && "function" != typeof this.opts.position && this.setPosition();
                }), I(this, "_onClickOverlay", ()=>{
                    this.visible && this.hide();
                }), I(this, "getViewDates", function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i.days;
                    return T.getDatesFunction(e)(r);
                }), I(this, "isWeekend", (e)=>this.opts.weekends.includes(e)), I(this, "getClampedDate", (e)=>{
                    let { minDate: t, maxDate: i } = this, s = e;
                    return i && m(e, i) ? s = i : t && v(e, t) && (s = t), s;
                }), this.$el = a(e), !this.$el) return;
                this.$datepicker = n({
                    className: "air-datepicker"
                }), this.opts = w({}, s, t), this.$customContainer = !!this.opts.container && a(this.opts.container), this.$altField = a(this.opts.altField || !1);
                let { view: h, startDate: l } = this.opts;
                l || (this.opts.startDate = new Date), "INPUT" === this.$el.nodeName && (this.elIsInput = !0), this.inited = !1, this.visible = !1, this.viewDate = b(this.opts.startDate), this.focusDate = !1, this.initialReadonly = this.$el.getAttribute("readonly"), this.customHide = !1, this.currentView = h, this.selectedDates = [], this.disabledDates = new Set, this.isDestroyed = !1, this.views = {}, this.keys = [], this.rangeDateFrom = "", this.rangeDateTo = "", this.timepickerIsActive = !1, this.treatAsInline = this.opts.inline || !this.elIsInput, this.init();
            }
            init() {
                let { opts: e, treatAsInline: t, opts: { inline: i, isMobile: s, selectedDates: n, keyboardNav: r, onlyTimepicker: h } } = this, o = a("body");
                (!B || B && P && !o.contains(P)) && !i && this.elIsInput && !this.$customContainer && R.buildGlobalContainer(R.defaultGlobalContainerId), !s || j || t || this._createMobileOverlay(), this._handleLocale(), this._bindSubEvents(), this._createMinMaxDates(), this._limitViewDateByMaxMinDates(), this.elIsInput && (i || this._bindEvents(), r && !h && (this.keyboardNav = new O({
                    dp: this,
                    opts: e
                }))), n && this.selectDate(n, {
                    silent: !0
                }), this.opts.visible && !t && this.show(), s && !t && this.$el.setAttribute("readonly", !0), t && this._createComponents();
            }
            _createMobileOverlay() {
                j = n({
                    className: "air-datepicker-overlay"
                }), P.appendChild(j);
            }
            _createComponents() {
                let { opts: e, treatAsInline: t, opts: { inline: i, buttons: s, timepicker: a, position: n, classes: r, onlyTimepicker: h, isMobile: o } } = this;
                this._buildBaseHtml(), this.elIsInput && (i || this._setPositionClasses(n)), !i && this.elIsInput || this.$datepicker.classList.add("-inline-"), r && this.$datepicker.classList.add(...r.split(" ")), h && this.$datepicker.classList.add("-only-timepicker-"), o && !t && this._addMobileAttributes(), this.views[this.currentView] = new T({
                    dp: this,
                    type: this.currentView,
                    opts: e
                }), this.nav = new V({
                    dp: this,
                    opts: e
                }), a && this._addTimepicker(), s && this._addButtons(), this.$content.appendChild(this.views[this.currentView].$el), this.$nav.appendChild(this.nav.$el);
            }
            _destroyComponents() {
                for(let e in this.views)this.views[e].destroy();
                this.views = {}, this.nav.destroy(), this.timepicker && this.timepicker.destroy();
            }
            _addMobileAttributes() {
                j.addEventListener("click", this._onClickOverlay), this.$datepicker.classList.add("-is-mobile-"), this.$el.setAttribute("readonly", !0);
            }
            _removeMobileAttributes() {
                j.removeEventListener("click", this._onClickOverlay), this.$datepicker.classList.remove("-is-mobile-"), this.initialReadonly || "" === this.initialReadonly || this.$el.removeAttribute("readonly");
            }
            _createMinMaxDates() {
                let { minDate: e, maxDate: t } = this.opts;
                this.minDate = !!e && b(e), this.maxDate = !!t && b(t);
            }
            _addTimepicker() {
                this.$timepicker = n({
                    className: "air-datepicker--time"
                }), this.$datepicker.appendChild(this.$timepicker), this.timepicker = new L({
                    dp: this,
                    opts: this.opts
                }), this.$timepicker.appendChild(this.timepicker.$el);
            }
            _addButtons() {
                this.$buttons = n({
                    className: "air-datepicker--buttons"
                }), this.$datepicker.appendChild(this.$buttons), this.buttons = new H({
                    dp: this,
                    opts: this.opts
                }), this.$buttons.appendChild(this.buttons.$el);
            }
            _bindSubEvents() {
                this.on(i.eventChangeSelectedDate, this._onChangeSelectedDate), this.on(i.eventChangeFocusDate, this._onChangeFocusedDate), this.on(i.eventChangeTime, this._onChangeTime);
            }
            _buildBaseHtml() {
                let { inline: e } = this.opts;
                var t, i;
                this.elIsInput ? e ? (t = this.$datepicker, (i = this.$el).parentNode.insertBefore(t, i.nextSibling)) : this.$container.appendChild(this.$datepicker) : this.$el.appendChild(this.$datepicker), this.$datepicker.innerHTML = '<i class="air-datepicker--pointer"></i><div class="air-datepicker--navigation"></div><div class="air-datepicker--content"></div>', this.$content = a(".air-datepicker--content", this.$datepicker), this.$pointer = a(".air-datepicker--pointer", this.$datepicker), this.$nav = a(".air-datepicker--navigation", this.$datepicker);
            }
            _handleLocale() {
                let { locale: e, dateFormat: t, firstDay: i, timepicker: s, onlyTimepicker: a, timeFormat: n, dateTimeSeparator: r } = this.opts;
                var h;
                this.locale = (h = e, JSON.parse(JSON.stringify(h))), t && (this.locale.dateFormat = t), void 0 !== n && "" !== n && (this.locale.timeFormat = n);
                let { timeFormat: o } = this.locale;
                if ("" !== i && (this.locale.firstDay = i), s && "function" != typeof t) {
                    let e = o ? r : "";
                    this.locale.dateFormat = [
                        this.locale.dateFormat,
                        o || ""
                    ].join(e);
                }
                a && "function" != typeof t && (this.locale.dateFormat = this.locale.timeFormat);
            }
            _setPositionClasses(e) {
                if ("function" == typeof e) return void this.$datepicker.classList.add("-custom-position-");
                let t = (e = e.split(" "))[0], i = `air-datepicker -${t}-${e[1]}- -from-${t}-`;
                this.$datepicker.classList.add(...i.split(" "));
            }
            _bindEvents() {
                this.$el.addEventListener(this.opts.showEvent, this._onFocus), this.$el.addEventListener("blur", this._onBlur), this.$datepicker.addEventListener("mousedown", this._onMouseDown), this.$datepicker.addEventListener("mouseup", this._onMouseUp), window.addEventListener("resize", this._onResize);
            }
            _limitViewDateByMaxMinDates() {
                let { viewDate: e, minDate: t, maxDate: i } = this;
                i && m(e, i) && this.setViewDate(i), t && v(e, t) && this.setViewDate(t);
            }
            formatDate() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.viewDate, t = arguments.length > 1 ? arguments[1] : void 0;
                if (e = b(e), !(e instanceof Date)) return;
                let i = t, s = this.locale, a = o(e), n = a.dayPeriod, r = c(e), h = R.replacer, l = {
                    T: e.getTime(),
                    m: a.minutes,
                    mm: a.fullMinutes,
                    h: a.hours12,
                    hh: a.fullHours12,
                    H: a.hours,
                    HH: a.fullHours,
                    aa: n,
                    AA: n.toUpperCase(),
                    E: s.daysShort[a.day],
                    EEEE: s.days[a.day],
                    d: a.date,
                    dd: a.fullDate,
                    M: a.month + 1,
                    MM: a.fullMonth,
                    MMM: s.monthsShort[a.month],
                    MMMM: s.months[a.month],
                    yy: a.year.toString().slice(-2),
                    yyyy: a.year,
                    yyyy1: r[0],
                    yyyy2: r[1]
                };
                for (let [e, t] of Object.entries(l))i = h(i, $(e), t);
                return i;
            }
            down(e) {
                this._handleUpDownActions(e, "down");
            }
            up(e) {
                this._handleUpDownActions(e, "up");
            }
            selectDate(e) {
                let t, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, { currentView: a, parsedViewDate: n, selectedDates: r } = this, { updateTime: h, silent: o } = s, { moveToOtherMonthsOnSelect: l, moveToOtherYearsOnSelect: d, multipleDates: c, range: u, autoClose: p, onBeforeSelect: v } = this.opts, g = r.length;
                if (Array.isArray(e)) return e.forEach((e)=>{
                    this.selectDate(e, s);
                }), new Promise((e)=>{
                    setTimeout(e);
                });
                if ((e = b(e)) instanceof Date) {
                    if (v && !o && !v({
                        date: e,
                        datepicker: this
                    })) return Promise.resolve();
                    if (a === i.days && e.getMonth() !== n.month && l && (t = new Date(e.getFullYear(), e.getMonth(), 1)), a === i.years && e.getFullYear() !== n.year && d && (t = new Date(e.getFullYear(), 0, 1)), t && this.setViewDate(t), c && !u) {
                        if (g === c) return;
                        this._checkIfDateIsSelected(e) || r.push(e);
                    } else if (u) switch(g){
                        case 1:
                            r.push(e), this.rangeDateTo || (this.rangeDateTo = e), m(this.rangeDateFrom, this.rangeDateTo) && (this.rangeDateTo = this.rangeDateFrom, this.rangeDateFrom = e), this.selectedDates = [
                                this.rangeDateFrom,
                                this.rangeDateTo
                            ];
                            break;
                        case 2:
                            this.selectedDates = [
                                e
                            ], this.rangeDateFrom = e, this.rangeDateTo = "";
                            break;
                        default:
                            this.selectedDates = [
                                e
                            ], this.rangeDateFrom = e;
                    }
                    else this.selectedDates = [
                        e
                    ];
                    return this.trigger(i.eventChangeSelectedDate, {
                        action: i.actionSelectDate,
                        silent: null == s ? void 0 : s.silent,
                        date: e,
                        updateTime: h
                    }), this._updateLastSelectedDate(e), p && !this.timepickerIsActive && this.visible && (c || u ? u && 1 === g && this.hide() : this.hide()), new Promise((e)=>{
                        setTimeout(e);
                    });
                }
            }
            unselectDate(e) {
                let t = this.selectedDates, s = this;
                if ((e = b(e)) instanceof Date) return t.some((a, n)=>{
                    if (p(a, e)) return t.splice(n, 1), s.selectedDates.length ? (s.rangeDateTo = "", s.rangeDateFrom = t[0], s._updateLastSelectedDate(s.selectedDates[s.selectedDates.length - 1])) : (s.rangeDateFrom = "", s.rangeDateTo = "", s._updateLastSelectedDate(!1)), this.trigger(i.eventChangeSelectedDate, {
                        action: i.actionUnselectDate,
                        date: e
                    }), !0;
                });
            }
            replaceDate(e, t) {
                let s = this.selectedDates.find((t)=>p(t, e, this.currentView)), a = this.selectedDates.indexOf(s);
                a < 0 || p(this.selectedDates[a], t, this.currentView) || (this.selectedDates[a] = t, this.trigger(i.eventChangeSelectedDate, {
                    action: i.actionSelectDate,
                    date: t,
                    updateTime: !0
                }), this._updateLastSelectedDate(t));
            }
            clear() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return this.selectedDates = [], this.rangeDateFrom = !1, this.rangeDateTo = !1, this.lastSelectedDate = !1, this.trigger(i.eventChangeSelectedDate, {
                    action: i.actionUnselectDate,
                    silent: e.silent
                }), new Promise((e)=>{
                    setTimeout(e);
                });
            }
            show() {
                let { onShow: e, isMobile: t } = this.opts;
                this._cancelScheduledCall(), this.visible || this.hideAnimation || this._createComponents(), this.setPosition(this.opts.position), this.$datepicker.classList.add("-active-"), this.visible = !0, e && this._scheduleCallAfterTransition(e), t && this._showMobileOverlay();
            }
            hide() {
                let { onHide: e, isMobile: t } = this.opts, i = this._hasTransition();
                this.visible = !1, this.hideAnimation = !0, this.$datepicker.classList.remove("-active-"), this.customHide && this.customHide(), this.elIsInput && this.$el.blur(), this._scheduleCallAfterTransition((t)=>{
                    !this.customHide && (t && i || !t && !i) && this._finishHide(), e && e(t);
                }), t && j.classList.remove("-active-");
            }
            _triggerOnSelect() {
                let e = [], t = [], { selectedDates: i, locale: s, opts: { onSelect: a, multipleDates: n, range: r } } = this, h = n || r, o = "function" == typeof s.dateFormat;
                i.length && (e = i.map(g), t = o ? n ? s.dateFormat(e) : e.map((e)=>s.dateFormat(e)) : e.map((e)=>this.formatDate(e, s.dateFormat))), a({
                    date: h ? e : e[0],
                    formattedDate: h ? t : t[0],
                    datepicker: this
                });
            }
            _handleAlreadySelectedDates(e, t) {
                let { selectedDates: i, rangeDateFrom: s, rangeDateTo: a } = this, { range: n, toggleSelected: r } = this.opts, h = i.length, o = "function" == typeof r ? r({
                    datepicker: this,
                    date: t
                }) : r, l = Boolean(n && 1 === h && e), d = l ? g(t) : t;
                n && !o && (2 !== h && this.selectDate(d), 2 === h && p(s, a)) || (o ? this.unselectDate(d) : this._updateLastSelectedDate(l ? d : e));
            }
            _handleUpDownActions(e, t) {
                if (!((e = b(e || this.focusDate || this.viewDate)) instanceof Date)) return;
                let i = "up" === t ? this.viewIndex + 1 : this.viewIndex - 1;
                i > 2 && (i = 2), i < 0 && (i = 0), this.setViewDate(new Date(e.getFullYear(), e.getMonth(), 1)), this.setCurrentView(this.viewIndexes[i]);
            }
            getCell(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.day;
                if (!((e = b(e)) instanceof Date)) return;
                let { year: s, month: a, date: n } = o(e), r = `[data-year="${s}"]`, h = `[data-month="${a}"]`, l = {
                    [i.day]: `${r}${h}[data-date="${n}"]`,
                    [i.month]: `${r}${h}`,
                    [i.year]: `${r}`
                };
                return this.views[this.currentView] ? this.views[this.currentView].$el.querySelector(l[t]) : void 0;
            }
            _showMobileOverlay() {
                j.classList.add("-active-");
            }
            _hasTransition() {
                return window.getComputedStyle(this.$datepicker).getPropertyValue("transition-duration").split(", ").reduce((e, t)=>parseFloat(t) + e, 0) > 0;
            }
            get shouldUpdateDOM() {
                return this.visible || this.treatAsInline;
            }
            get parsedViewDate() {
                return o(this.viewDate);
            }
            get currentViewSingular() {
                return this.currentView.slice(0, -1);
            }
            get curDecade() {
                return c(this.viewDate);
            }
            get viewIndex() {
                return this.viewIndexes.indexOf(this.currentView);
            }
            get isFinalView() {
                return this.currentView === i.years;
            }
            get hasSelectedDates() {
                return this.selectedDates.length > 0;
            }
            get isMinViewReached() {
                return this.currentView === this.opts.minView || this.currentView === i.days;
            }
            get $container() {
                return this.$customContainer || P;
            }
            static replacer(e, t, i) {
                return e.replace(t, function(e, t, s, a) {
                    return t + i + a;
                });
            }
        }
        var K;
        return I(R, "defaults", s), I(R, "version", "3.6.0"), I(R, "defaultGlobalContainerId", "air-datepicker-global-container"), K = R.prototype, Object.assign(K, N), t.default;
    }();
});

},{}],"aM9jX":[function() {},{}],"bG3Mq":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _default = {
    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    daysShort: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ],
    daysMin: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
    ],
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 0
};
exports.default = _default;

},{}],"4fl36":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
class OverlayView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".overlay");
    addHandlerClickX(handler) {
        this._parentElement.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".btn--x");
            if (!btn) return;
            handler();
        });
    }
    addHandlerClickOutside(handler) {
        this._parentElement.addEventListener("click", function(e) {
            if (e.target.className !== "overlay" && e.target.className !== "overlay_in--how_to_create" && !e.target.closest("h1")) return;
            handler();
        });
    }
}
exports.default = new OverlayView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dOQHp":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _overlayViewJs = require("./overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
var _overlaySliderViewJs = require("./overlaySliderView.js");
var _overlaySliderViewJsDefault = parcelHelpers.interopDefault(_overlaySliderViewJs);
class setGoalsSliderView {
    _parentElement = (0, _overlayViewJsDefault.default)._parentElement;
    _data;
    _curAccGoalLength;
    _allSlides;
    _type;
    async _submit(handler) {
        try {
            this._allSlides = (0, _overlaySliderViewJsDefault.default)._allSlides;
            const goalsInfo = Array.from(this._allSlides).map((s)=>{
                const titleInput = s.querySelector("#input--goal_title")?.value;
                const dateInput = s.querySelector("#input--goal_date")?.value;
                if (!titleInput && !dateInput) return;
                return {
                    title: titleInput || "",
                    date: dateInput || "",
                    comments: "",
                    toDoLists: "",
                    toDoListsCheckbox: []
                };
            }).filter((info)=>info && (info.date || info.title));
            if (goalsInfo.length === 0) return;
            handler(goalsInfo, this._type);
        } catch (err) {
            throw err;
        }
    }
    _generateMarkup() {
        this._data = (0, _overlaySliderViewJsDefault.default)._data;
        this._curAccGoalLength = (0, _overlaySliderViewJsDefault.default)._curAccGoalLength;
        this._type = (0, _overlaySliderViewJsDefault.default).type;
        return `
        <div class="overlay_in--set_goal">
         <button class="btn--x set_goal--btn_x" type="button">&times;</button>
         <h1>${this._curAccGoalLength < (0, _config.GOAL_LIMIT) ? `Let's set your goals! </h1> <p>You can set up to ${0, _config.GOAL_LIMIT} goals!` : `You have maximum number of goals!</h1> <p>You already have ${0, _config.GOAL_LIMIT} goals!`}</p>
         <div class="slider">
          ${this._createSlider()}
          <button class="slider--btn btn--left" type="button">&larr;</button>
          <button class="slider--btn btn--right" type="button">&rarr;</button>
          <div class="dots">${this._createDots()}</div>
         </div>
         <button class="btn--next slider--btn_next">&larr;</button>
        </div>`;
    }
    _createSlider() {
        let arr = [];
        for(let i = 0; i < (0, _config.GOAL_LIMIT); i++){
            const goalTitle = this._data.goals[i]?.title;
            const goalDate = this._data.goals[i]?.date;
            arr.push(`
           <div class="slide" data-slide="${i}">
            <h2>Goal No.${i + 1}</h2>

            <div class="btns--edit_delete btns_edit_delete--slide ${this._curAccGoalLength > i ? "" : "hidden"} ">
            <button class="btn--edit" data-edit="${i}" type="button">Edit</button>
            <button class="btn--delete" data-delete="${i}" type="button">Delete</button>
            </div>

            <div class="bottom_content">
            <div class="goal_title">
              <p>${this._curAccGoalLength > i ? "The" : "Set the"} name of your goal No.${i + 1}!</p>
              ${this._curAccGoalLength > i ? `<p class="set_goal_title">${goalTitle ? goalTitle : "No title yet"}</p>` : '<input id="input--goal_title" type="text" placeholder="Goal title"></input>'}
            </div>
            <div class="goal_date">
             <p>${this._curAccGoalLength > i ? "The" : "Set the"} date of your goal No.${i + 1}!</p>
             ${this._curAccGoalLength > i ? `<p class="set_goal_date">${goalDate ? goalDate : "No date yet"}</p>` : `<input id="input--goal_date" class="datepicker${i}" type="text" placeholder="Click here to select date"></input>`}
             </div>
            </div>
           <div class="to_do_lists
           to_do_lists--slide hidden" contenteditable="true">
            <div class="checkbox_container">
            <input type="checkbox" id="checkbox0">
            Let's add To-Do lists here!
            </div>
           </div>
           <div class="comments comments--slide hidden" contenteditable="true">
            Let's add comments here!
           </div>
           </div>`);
        }
        return arr.join("");
    }
    _createDots() {
        let arr = [];
        for(let i = 0; i < (0, _config.GOAL_LIMIT); i++)arr.push(`<button class="dots_dot" data-dot = "${i}" type="button"></button>`);
        return arr.join("");
    }
}
exports.default = new setGoalsSliderView();

},{"../config":"2hPh4","./overlayView.js":"4fl36","./overlaySliderView.js":"dip5k","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"in4HJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _overlaySliderViewJs = require("./overlaySliderView.js");
var _overlaySliderViewJsDefault = parcelHelpers.interopDefault(_overlaySliderViewJs);
var _overlayViewJs = require("./overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
//////Create unique ID/////
var _nanoid = require("nanoid");
class CreateRoomsSliderView {
    _parentElement = (0, _overlayViewJsDefault.default)._parentElement;
    _data;
    _curAccRoomLength;
    _allSlides;
    _type;
    _roomType;
    async _submit(handler) {
        try {
            this._allSlides = (0, _overlaySliderViewJsDefault.default)._allSlides;
            const roomsInfo = Array.from(this._allSlides).map((s)=>{
                const titleInput = s.querySelector("#input--goal_title")?.value;
                const dateInput = s.querySelector("#input--goal_date")?.value;
                if (!titleInput && !dateInput) return;
                return {
                    roomId: (0, _nanoid.nanoid)(),
                    title: titleInput || "",
                    date: dateInput || "",
                    comments: "",
                    toDoLists: "",
                    toDoListsCheckbox: []
                };
            }).filter((info)=>info && (info.date || info.title));
            if (roomsInfo.length === 0) return;
            handler(roomsInfo, this._type, this._roomType);
        } catch (err) {
            throw err;
        }
    }
    _generateMarkup() {
        this._data = (0, _overlaySliderViewJsDefault.default)._data;
        this._curAccRoomLength = this._data.rooms.length;
        this._type = (0, _overlaySliderViewJsDefault.default).type;
        this._roomType = (0, _overlaySliderViewJsDefault.default).roomType;
        return `
        <div class="overlay_in--set_goal">
         <button class="btn--x set_goal--btn_x" type="button">&times;</button>
         <h1>${this._curAccRoomLength !== 10 ? `Let's create your rooms! </h1> <p>You can create up to ${0, _config.ROOM_LIMIT} rooms!` : `You have maximum number of rooms!</h1> <p>You already have ${0, _config.ROOM_LIMIT} rooms!`}</p>
         <div class="slider">
          ${this._createSlider()}
          <button class="slider--btn btn--left" type="button">&larr;</button>
          <button class="slider--btn btn--right" type="button">&rarr;</button>
          <div class="dots">${this._createDots()}</div>
         </div>
         <button class="btn--next slider--btn_next">&larr;</button>
        </div>`;
    }
    _createSlider() {
        let arr = [];
        for(let i = 0; i < (0, _config.ROOM_LIMIT); i++){
            const roomTitle = this._data.rooms[i]?.title;
            const roomDate = this._data.rooms[i]?.date;
            arr.push(`
           <div class="slide" data-slide="${i}">
            <h2>Room No.${i + 1}</h2>
            <div class="btns--edit_delete btns_edit_delete--slide ${this._curAccRoomLength > i ? "" : "hidden"}">
            <button class="btn--edit" data-edit="${i}" type="button">Edit</button>
            <button class="btn--delete" data-delete="${i}" type="button">Delete</button>
            </div>
            <div class="bottom_content">
            <div class="goal_title">
              <p>${this._curAccRoomLength > i ? "The" : "Set the"} name of your room No.${i + 1}!</p>
              ${this._curAccRoomLength > i ? `<p class="set_goal_title">${roomTitle ? roomTitle : "No title yet"}</p>` : '<input id="input--goal_title" type="text" placeholder="Room title"></input>'}
            </div>
            <div class="goal_date">
             <p>${this._curAccRoomLength > i ? "The" : "Set the"} date of your room No.${i + 1}!</p>
             ${this._curAccRoomLength > i ? `<p class="set_goal_date">${roomDate ? roomDate : "No date yet"}</p>` : `<input id="input--goal_date" class="datepicker${i}" type="text" placeholder="Click here to select date"></input>`}
            </div>
            </div>
            <div class="to_do_lists to_do_lists--slide hidden" contenteditable="true">
             <div class="checkbox_container">
              <input type="checkbox" id="checkbox0">
              Let's add To-Do lists here!
             </div>
            </div>
            <div class="comments comments--slide hidden" contenteditable="true">
             Let's add comments here!
            </div>
           </div>
           `);
        }
        return arr.join("");
    }
    _createDots() {
        let arr = [];
        for(let i = 0; i < (0, _config.ROOM_LIMIT); i++)arr.push(`<button class="dots_dot" data-dot = "${i}" type="button"></button>`);
        return arr.join("");
    }
}
exports.default = new CreateRoomsSliderView();

},{"../config":"2hPh4","./overlaySliderView.js":"dip5k","./overlayView.js":"4fl36","nanoid":"328Fw","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"328Fw":[function(require,module,exports,__globalThis) {
/* @ts-self-types="./index.d.ts" */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "urlAlphabet", ()=>(0, _indexJs.urlAlphabet));
parcelHelpers.export(exports, "random", ()=>random);
parcelHelpers.export(exports, "customRandom", ()=>customRandom);
parcelHelpers.export(exports, "customAlphabet", ()=>customAlphabet);
parcelHelpers.export(exports, "nanoid", ()=>nanoid);
var _indexJs = require("./url-alphabet/index.js");
let random = (bytes)=>crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, defaultSize, getRandom)=>{
    let mask = (2 << Math.log2(alphabet.length - 1)) - 1;
    let step = -~(1.6 * mask * defaultSize / alphabet.length);
    return (size = defaultSize)=>{
        let id = '';
        while(true){
            let bytes = getRandom(step);
            let j = step | 0;
            while(j--){
                id += alphabet[bytes[j] & mask] || '';
                if (id.length >= size) return id;
            }
        }
    };
};
let customAlphabet = (alphabet, size = 21)=>customRandom(alphabet, size | 0, random);
let nanoid = (size = 21)=>{
    let id = '';
    let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
    while(size--)id += (0, _indexJs.urlAlphabet)[bytes[size] & 63];
    return id;
};

},{"./url-alphabet/index.js":"29KoN","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"29KoN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "urlAlphabet", ()=>urlAlphabet);
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"c0NbB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _overlaySliderViewJs = require("./overlaySliderView.js");
var _overlaySliderViewJsDefault = parcelHelpers.interopDefault(_overlaySliderViewJs);
var _overlayViewJs = require("./overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
//////Create unique ID/////
var _nanoid = require("nanoid");
///do select room btn!!!!!!!
class SelectRoomsSliderView {
    _parentElement = (0, _overlayViewJsDefault.default)._parentElement;
    _curAccGoalLength;
    _allSlides;
    _data;
    _type;
    _roomType;
    _select(e) {
        const btn = e.target.closest(".btn--select");
        if (!btn) return;
        // if (btn.classList.contains("permanent")) return;
        btn.classList.toggle("btn--select__active");
        btn.textContent = btn.classList.contains("btn--select__active") ? "Selected" : "Create room with this";
    }
    async _submit(handlerSubmit, handlerSaveSelected) {
        try {
            this._allSlides = (0, _overlaySliderViewJsDefault.default)._allSlides;
            const btnSelected = Array.from(this._parentElement.querySelectorAll(".btn--select__active"));
            if (!btnSelected.length) return;
            btnSelected.forEach((btn)=>{
                btn.classList.add("permanent");
            });
            const newSelectedGoalsIndex = this._newSelectedGoalsIndex(btnSelected);
            await handlerSaveSelected(newSelectedGoalsIndex);
            const roomsInfo = newSelectedGoalsIndex.map((newSelectedIndex)=>{
                const selectedSlide = this._allSlides[newSelectedIndex];
                const selectedSlideTitle = selectedSlide.querySelector(".set_goal_title");
                const selectedSlideDate = selectedSlide.querySelector(".set_goal_date");
                const title = selectedSlideTitle.textContent === "No title yet" ? "" : selectedSlideTitle.textContent;
                const date = selectedSlideDate.textContent === "No date yet" ? "" : selectedSlideDate.textContent;
                return {
                    roomId: (0, _nanoid.nanoid)(),
                    title: title,
                    date: date,
                    comments: "",
                    toDoLists: "",
                    toDoListsCheckbox: ""
                };
            });
            if (!roomsInfo.length) return;
            handlerSubmit(roomsInfo, this._type, this._roomType);
        } catch (err) {
            throw err;
        }
    }
    _newSelectedGoalsIndex(btnSelected) {
        const selectedGoalsIndex = btnSelected.map((btn)=>+btn.dataset.select);
        //remove goals selected in the past
        const newSelectedGoalsIndex = selectedGoalsIndex.filter((index)=>!this._data.goals[index].selected);
        return newSelectedGoalsIndex;
    }
    _goalsSelected(i) {
        return this._data.goals[i].selected ? true : false;
    }
    _generateMarkup() {
        this._data = (0, _overlaySliderViewJsDefault.default)._data;
        this._curAccGoalLength = (0, _overlaySliderViewJsDefault.default)._curAccGoalLength;
        this._type = (0, _overlaySliderViewJsDefault.default).type;
        this._roomType = (0, _overlaySliderViewJsDefault.default).roomType;
        return `
        <div class="overlay_in--set_goal">
         <button class="btn--x set_goal--btn_x" type="button">&times;</button>
         <h1>${this._curAccGoalLength !== 0 ? `Let's create your rooms!</h1> <p>You can create up to ${0, _config.GOAL_LIMIT} rooms!` : "You haven't set goals yet!</h1> <p>Create rooms from scratch or set goals first!"}</p>
         <div class="slider">
          ${this._createSlider()}
          <button class="slider--btn btn--left" type="button">&larr;</button>
          <button class="slider--btn btn--right" type="button">&rarr;</button>
          <div class="dots">${this._createDots()}</div>
         </div>
         <button class="btn--next slider--btn_next">&larr;</button>
        </div>`;
    }
    _createSlider() {
        let arr = [];
        for(let i = 0; i < this._curAccGoalLength; i++)arr.push(`
           <div class="slide" data-goto="${i}">
            <h2>Goal No.${i + 1}</h2>
            <button class=${this._goalsSelected(i) ? "btn--select__active permanent" : "btn--select"} data-select="${i}" type="button"> ${this._goalsSelected(i) ? "Already have" : "Create room with this"}</button>
            <div class="goal_title">
              <p> The name of your goal No.${i + 1}!</p>
              <p class="set_goal_title">${this._data.goals[i]?.title}</p>
            </div>
            <div class="goal_date">
             <p>The date of your goal No.${i + 1}!</p>
             <p class="set_goal_date">${this._data.goals[i]?.date}</p>
            </div>
           </div>`);
        return arr.join("");
    }
    _createDots() {
        let arr = [];
        for(let i = 0; i < this._curAccGoalLength; i++)arr.push(`<button class="dots_dot" data-dot = "${i}" type="button"></button>`);
        return arr.join("");
    }
}
exports.default = new SelectRoomsSliderView();

},{"../config":"2hPh4","./overlaySliderView.js":"dip5k","./overlayView.js":"4fl36","nanoid":"328Fw","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jL5KG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _overlayMessageSpinnerViewJs = require("./overlayMessageSpinnerView.js");
var _overlayMessageSpinnerViewJsDefault = parcelHelpers.interopDefault(_overlayMessageSpinnerViewJs);
var _overlaySliderViewJs = require("./overlaySliderView.js");
var _overlaySliderViewJsDefault = parcelHelpers.interopDefault(_overlaySliderViewJs);
var _overlayViewJs = require("./overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
class IdRoomsSliderView {
    _parentElement = (0, _overlayViewJsDefault.default)._parentElement;
    _data;
    _curAccRoomLength;
    _slideMax;
    _allSlides;
    _type;
    _roomType;
    async _submit(handler) {
        this._allSlides = (0, _overlaySliderViewJsDefault.default)._allSlides;
        const curRoomIds = this._data.rooms.map((room)=>room.roomId);
        const roomIdInputs = Array.from(this._allSlides).map((s)=>{
            const idInput = s?.querySelector("#input--id")?.value.trim();
            return idInput;
        });
        roomIdInputs.forEach((id)=>{
            if (id && id.length !== (0, _config.ROOM_ID_LENGTH)) (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessageInvalidId);
            if (id && curRoomIds.includes(id)) (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", (0, _overlayMessageSpinnerViewJsDefault.default)._errorMessageRoomAlreadyExists);
        });
        const newRoomIds = roomIdInputs.filter((id)=>id && id.length === (0, _config.ROOM_ID_LENGTH) && !curRoomIds.includes(id));
        if (!newRoomIds.length) return;
        handler(newRoomIds, this._type, this._roomType);
    }
    _generateMarkup() {
        this._data = (0, _overlaySliderViewJsDefault.default)._data;
        this._curAccRoomLength = this._data.rooms.length;
        this._type = (0, _overlaySliderViewJsDefault.default).type;
        this._roomType = (0, _overlaySliderViewJsDefault.default).roomType;
        this._slideMax = (0, _config.ROOM_LIMIT) - this._data.rooms.length;
        return `
            <div class="overlay_in--set_goal">
             <button class="btn--x set_goal--btn_x" type="button">&times;</button>
             <h1>${this._curAccRoomLength !== 10 ? `Let's join rooms! </h1> <p>You can join up to ${0, _config.ROOM_LIMIT} rooms! (You can still set ${this._slideMax} more rooms!)` : `You have maximum number of rooms!</h1> <p>You already have ${0, _config.ROOM_LIMIT} rooms!`}</p>
             <div class="slider">
              ${this._createSlider()}
              <button class="slider--btn btn--left" type="button">&larr;</button>
              <button class="slider--btn btn--right" type="button">&rarr;</button>
              <div class="dots">${this._createDots()}</div>
             </div>
             <button class="btn--next slider--btn_next">&larr;</button>
            </div>`;
    }
    _createSlider() {
        let arr = [];
        for(let i = 0; i < this._slideMax; i++)arr.push(`
               <div class="slide" data-goto="${i}">
                <h3>Please enter room id</h3>
                 <input id="input--id" type="text" placeholder="Room ID"></input>
               </div>`);
        return arr.join("");
    }
    _createDots() {
        let arr = [];
        for(let i = 0; i < this._slideMax; i++)arr.push(`<button class="dots_dot" data-dot="${i}" type="button"></button>`);
        return arr.join("");
    }
}
exports.default = new IdRoomsSliderView();

},{"../config":"2hPh4","./overlaySliderView.js":"dip5k","./overlayView.js":"4fl36","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./overlayMessageSpinnerView.js":"gern0"}],"l8oQV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class EntireAppView {
    _parentElement = document.querySelector("body");
    _addEventClickPasswordVisibility() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--password_visibility");
            if (!btn) return;
            let closestInput;
            if (btn.classList.contains("btn_password_visibility--settings_cur_password")) closestInput = btn.closest("div").querySelector("#input--cur_password");
            else if (btn.classList.contains("btn_password_visibility--settings_new_password")) closestInput = btn.closest("div").querySelector("#input--new_password");
            else closestInput = btn.closest("form").querySelector(".input--password");
            btn.classList.toggle("password--visible");
            closestInput.type = btn.classList.contains("password--visible") ? "text" : "password";
        });
    }
}
exports.default = new EntireAppView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8HJNM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
var _configJs = require("../config.js");
class SettingsView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".page--settings");
    _renderInitContainer = document.querySelector(".settings_form");
    _messageContainer;
    _message;
    _errorMessage = "Please fill the field below";
    _data;
    addHandlerClickX(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const btn = e.target.closest(".settings--btn_x");
            if (!btn) return;
            handler();
        });
    }
    addEventClickChange() {
        this._parentElement.addEventListener("click", (e)=>{
            if (e.target.closest(".btn--change_username")) this._renderInputField("username");
            if (e.target.closest(".btn--change_email")) this._renderInputField("email");
            if (e.target.closest(".btn--change_password")) this._renderInputField("password");
            this.addEventRemoveErrorInputField();
        });
    }
    addHandlerClickFinish(handlerUpdatePassword, handlerUpdateUsernameEmail) {
        this._parentElement.addEventListener("click", (e)=>{
            const clicked = e.target;
            if (!clicked.closest(".btn--finish")) return;
            if (clicked.closest(".btn--finish_password")) {
                this._message = "Password updated successfully";
                const curPasswordField = this._parentElement.querySelector("#input--cur_password");
                const newPasswordField = this._parentElement.querySelector("#input--new_password");
                const curPasswordInput = curPasswordField.value.trim();
                const newPasswordInput = newPasswordField.value.trim();
                if (!curPasswordInput) this.renderErrorInputField(curPasswordField);
                if (!newPasswordInput) this.renderErrorInputField(newPasswordField);
                if (!curPasswordInput || !newPasswordInput) return this.renderError();
                return handlerUpdatePassword(curPasswordInput, newPasswordInput, curPasswordField, newPasswordField);
            }
            let section;
            let inputField;
            let input;
            if (clicked.closest(".btn--finish_username")) {
                this._message = "Username updated successfully";
                section = "username";
                inputField = this._parentElement.querySelector("#input--username");
                input = inputField.value.trim();
            }
            if (clicked.closest(".btn--finish_email")) {
                this._message = "Email updated successfully";
                section = "email";
                inputField = this._parentElement.querySelector("#input--email");
                input = inputField.value.trim();
            }
            if (!input) {
                this.renderError();
                return this.renderErrorInputField(inputField);
            }
            handlerUpdateUsernameEmail(input, section, inputField);
        });
    }
    //username, email, or password
    _renderInputField(section) {
        this._messageContainer = this._parentElement.querySelector(".settings--error_message");
        let container;
        if (section === "password") {
            container = this._parentElement.querySelector(".settings--password");
            return container.innerHTML = `
        <p class="password_explanation--tiny settings--explanation_tiny">
        ${0, _configJs.PASSWORD_MIN_LENGTH} letters at minimum:  Include more than ${0, _configJs.PASSWORD_MIN_UPPERCASE} uppercase, <br>${0, _configJs.PASSWORD_MIN_LOWERCASE} lowercase, ${0, _configJs.PASSWORD_MIN_DIGIT} digit, and ${0, _configJs.PASSWORD_MIN_SPECIAL_CHARACTER} special character!</p>
        <div>
        <p>Please enter your current password</p>
        <input class="input--password" id="input--cur_password" type="password" placeholder="your current password" minLength="${0, _configJs.PASSWORD_MIN_LENGTH}">
        <button class="btn--password_visibility btn_password_visibility--settings_cur_password" type="button"></button>
        <p>Please enter your new password</p>
        <input class="input--password" id="input--new_password" type="password" placeholder="your new password" minLength="${0, _configJs.PASSWORD_MIN_LENGTH}">
        <button class="btn--password_visibility btn_password_visibility--settings_new_password" type="button"></button>
        </div>
        <button class="btn--finish btn--finish_password">Finish</button>`;
        }
        if (section === "username") container = this._parentElement.querySelector(".settings--username");
        if (section === "email") container = this._parentElement.querySelector(".settings--email");
        container.innerHTML = `
    ${section === "username" ? `<p class="username_explanation--tiny settings--explanation_tiny">
    Use ${0, _configJs.USERNAME_MAX_LENGTH} letters at maximum</p>` : ""}
    <div>
    <input id="input--${section}" ${section === "username" ? `type="text" maxLength="${0, _configJs.USERNAME_MAX_LENGTH}"` : 'type="email"'} placeholder="your new ${section}">
    </div>
    <button class="btn--finish btn--finish_${section}">Finish</button>`;
        if (section === "username") this._parentElement.querySelector(`#input--${section}`).value = this._data.username;
        if (section === "email") this._parentElement.querySelector(`#input--${section}`).value = this._data.email || "";
    }
    _generateMarkup() {
        return `
        <p class="error_message settings--error_message hidden">??</p>
        <button class="btn--x settings--btn_x">&times;</button>
        <h1>Account information</h1>
        <h3>
          Username
        </h3>
        <div class="settings--username">
          <p>${this._data.username}</p>
          <button class="btn--change_username">Change</button>        
        </div>
        <h3>
          Email address
        </h3>
        <div class="settings--email">
          <div class="settings_email_p--outer">
            <p>${this._data.email || "No email is set"}</p>
          </div>
          <button class="btn--change_email">Change</button>        
        </div>
        <h3>Password</h3>
        <div class="settings--password">
          <button class="btn--change_password">change</button>
        </div>
    `;
    }
}
exports.default = new SettingsView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","../config.js":"2hPh4"}],"3mZuB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
class LoginForgotPasswordView extends (0, _viewDefault.default) {
    _parentElement = document.querySelector(".forgot_password--form");
    _messageContainer = document.querySelector(".forgot_password--warning");
    _errorMessage = "Email address is required";
    addHandlerClickClose(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            e.preventDefault();
            const btn = e.target.closest(".forgot_password--btn_x");
            if (!btn) return;
            this.close(this._messageContainer);
            handler();
        });
    }
    addHandlerSubmit(handler) {
        this._parentElement.addEventListener("click", (e)=>{
            e.preventDefault();
            const btn = e.target.closest(".btn--send");
            if (!btn) return;
            const emailField = document.getElementById("forgot_password--input_email");
            const emailInput = emailField.value.trim();
            if (!emailInput) {
                this.renderErrorInputField(emailField);
                this.addEventRemoveErrorInputField();
                return this.renderError();
            }
            handler(emailInput);
        });
    }
}
exports.default = new LoginForgotPasswordView();

},{"./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gsWnq":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _overlayView = require("./overlayView");
var _overlayViewDefault = parcelHelpers.interopDefault(_overlayView);
var _view = require("./View");
var _viewDefault = parcelHelpers.interopDefault(_view);
class OverlayCreateRoomsView extends (0, _viewDefault.default) {
    overlayView = (0, _overlayViewDefault.default);
    _parentElement = (0, _overlayViewDefault.default)._parentElement;
    addHandlerClickX(handler) {
        this.overlayView.addHandlerClickX(handler);
    }
    addHandlerClickOutside(handler) {
        this.overlayView.addHandlerClickOutside(handler);
    }
    addHandlerClick(handlerScrach, handlerFromYouHave, handlerFromId, handlerJoinRooms) {
        this._parentElement.addEventListener("click", function(e) {
            if (e.target.closest(".btn--from_scratch")) return handlerScrach();
            if (e.target.closest(".btn--from_you_have")) return handlerFromYouHave();
            if (e.target.closest(".btn--from_id")) handlerFromId();
            if (e.target.closest(".btn--join_rooms")) handlerJoinRooms();
        });
    }
    _generateMarkup() {
        return `
      <div class="overlay_in--how_to_create">
        <button class="btn--x how_to_create--btn_x">&times;</button>
        <h1>What do you want to do today?</h1>
        <div class="btn_container--create_rooms">
        <h2>Create rooms</h2>
          <button class="btn--from_scratch">From scratch</button>
          <button class="btn--from_you_have">From the goal you already set</button>
          <button class="btn--from_id">Join a room with an id</button>
        </div>
        `;
    }
}
exports.default = new OverlayCreateRoomsView();

},{"./overlayView":"4fl36","./View":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7nL9P":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("./config.js");
var _controllerNewJs = require("./controllerNew.js");
var _userModelJs = require("../js/models/UserModel.js");
var _userModelJsDefault = parcelHelpers.interopDefault(_userModelJs);
var _overlayMessageSpinnerViewJs = require("../js/views/overlayMessageSpinnerView.js");
var _overlayMessageSpinnerViewJsDefault = parcelHelpers.interopDefault(_overlayMessageSpinnerViewJs);
var _overlayViewJs = require("../js/views/overlayView.js");
var _overlayViewJsDefault = parcelHelpers.interopDefault(_overlayViewJs);
var _mainWholeViewJs = require("../js/views/mainWholeView.js");
var _mainWholeViewJsDefault = parcelHelpers.interopDefault(_mainWholeViewJs);
var _settingsViewJs = require("../js/views/settingsView.js");
var _settingsViewJsDefault = parcelHelpers.interopDefault(_settingsViewJs);
var _loginWholeViewJs = require("../js/views/loginWholeView.js");
var _loginWholeViewJsDefault = parcelHelpers.interopDefault(_loginWholeViewJs);
class Helpers {
    _setTimeoutId;
    _resetSetTimeoutLogout(minutes = (0, _configJs.LOGOUNT_TIMEOUT)) {
        if (!this._setTimeoutId) return;
        clearTimeout(this._setTimeoutId);
        this._setTimeoutLogout(minutes);
    }
    ////I guess I should add some function to get rid of old refreshToken (database) that couldn't be deleted when user logs in next time
    _setTimeoutLogout(minutes = (0, _configJs.LOGOUNT_TIMEOUT)) {
        this._setTimeoutId = setTimeout(async ()=>{
            try {
                await (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "message", (0, _overlayMessageSpinnerViewJsDefault.default)._messageSessionTimeout);
                await (0, _userModelJsDefault.default).logout();
                (0, _controllerNewJs.setCurUserToNull)();
                (0, _settingsViewJsDefault.default).close();
                (0, _overlayViewJsDefault.default).close();
                (0, _mainWholeViewJsDefault.default).close();
                (0, _loginWholeViewJsDefault.default).open();
                this._setTimeoutId = null;
            } catch (err) {
                console.error(err);
                (0, _overlayMessageSpinnerViewJsDefault.default)._asyncInit("message", "error", "Server error \uD83D\uDE47\u200D\u2642\uFE0F This screen will go to the login page automatically. ");
                (0, _userModelJsDefault.default)._removeCurUserInfo();
                (0, _controllerNewJs.setCurUserToNull)();
                (0, _settingsViewJsDefault.default).close();
                (0, _overlayViewJsDefault.default).close();
                (0, _mainWholeViewJsDefault.default).close();
                (0, _loginWholeViewJsDefault.default).open();
                this._setTimeoutId = null;
            }
        }, minutes * 60000);
    }
}
exports.default = new Helpers();

},{"./config.js":"2hPh4","../js/models/UserModel.js":"gHvsa","../js/views/overlayMessageSpinnerView.js":"gern0","../js/views/overlayView.js":"4fl36","../js/views/mainWholeView.js":"d7In2","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","../js/views/settingsView.js":"8HJNM","../js/views/loginWholeView.js":"8d4a4","./controllerNew.js":"bGah5"}],"9C9jA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _loginWholeViewJs = require("./loginWholeView.js");
var _loginWholeViewJsDefault = parcelHelpers.interopDefault(_loginWholeViewJs);
class OverlayAppExplanationAboutThisWebView extends (0, _viewJsDefault.default) {
    _parentElement = document.querySelector(".overlay_app_explanation--about_this_web");
    _addEvents() {
        this._addEventClickX();
        this._addEventClickOutside();
        this._addEventClickEscapeClose(this._keyEventRemoveFocus);
    }
    _addEventClickX() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--x");
            if (!btn) return;
            this.close();
        });
    }
    _addEventClickOutside() {
        this._parentElement.addEventListener("click", (e)=>{
            if (!e.target.classList.contains("overlay--app_explanation")) return;
            this.close();
        });
    }
    _keyEventRemoveFocus() {
        const loginWholeViewParentEle = (0, _loginWholeViewJsDefault.default)._parentElement;
        const btns = loginWholeViewParentEle.querySelectorAll("button");
        btns.forEach((btn)=>btn.blur());
    }
}
exports.default = new OverlayAppExplanationAboutThisWebView();

},{"./View.js":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./loginWholeView.js":"8d4a4"}],"2OlBh":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _mainWholeViewJs = require("./mainWholeView.js");
var _mainWholeViewJsDefault = parcelHelpers.interopDefault(_mainWholeViewJs);
class OverlayAppExplanationHowToUseView extends (0, _viewJsDefault.default) {
    _parentElement = document.querySelector(".overlay_app_explanation--how_to_use");
    _addEvents() {
        this._addEventClickX();
        this._addEventClickOutside();
        this._addEventClickEscapeClose(this._keyEventRemoveFocus);
    }
    _addEventClickX() {
        this._parentElement.addEventListener("click", (e)=>{
            const btn = e.target.closest(".btn--x");
            if (!btn) return;
            this.close();
        });
    }
    _addEventClickOutside() {
        this._parentElement.addEventListener("click", (e)=>{
            if (!e.target.classList.contains("overlay--app_explanation")) return;
            this.close();
        });
    }
    _keyEventRemoveFocus() {
        const mainWholeViewParentEle = (0, _mainWholeViewJsDefault.default)._parentElement;
        const btns = mainWholeViewParentEle.querySelectorAll("button");
        btns.forEach((btn)=>btn.blur());
    }
}
exports.default = new OverlayAppExplanationHowToUseView();

},{"./View.js":"jSw21","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","./mainWholeView.js":"d7In2"}]},["aAtWW","bGah5"], "bGah5", "parcelRequire3bdd", {})

//# sourceMappingURL=Client.e3fc7154.js.map
