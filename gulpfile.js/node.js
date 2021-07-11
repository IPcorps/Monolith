
// A few "require"
const childProcess = require("child_process"),
    fs = require("fs"),
    browserSync = require("browser-sync").create();

// Configuration preparation
let bsOpt = require("./config/config-bs.js");
const gSettings = JSON.parse(fs.readFileSync(`${__dirname}/../.vscode/settings.json`).toString());

// Browser-sync server
if (gSettings.devMode) bsOpt = { ...bsOpt, files: ["app/out/client/**"] };
if (!gSettings.https) bsOpt = {
    ...bsOpt,
    proxy: { ...bsOpt.proxy, target: bsOpt.proxy.target.replace("https", "http") },
    https: false
};
browserSync.init(bsOpt);

// Copying global settings to the settings of the server being started
const setPath = `${__dirname}/../app/out/server/wm/settings.json`;
let settings = JSON.parse(fs.readFileSync(setPath).toString());
fs.writeFileSync(setPath, JSON.stringify({ ...settings, https: gSettings.https, devMode: gSettings.devMode }, null, "\t"));

let node;

exports.change = () => {

    // Start/restart node server
    if (node) node.kill();
    node = childProcess.fork("../server/main.js", { // Starting the server on the node
        cwd: process.cwd() + "/app/out/client"
    });

    // Update live-server
    browserSync.reload();

    // To see something happen
    console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(), "Node server start/restart");

}
