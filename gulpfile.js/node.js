
// A few 'require'
const { fork } = require('child_process'),
    http = require('http'),
    fs = require("fs"),
    bs = require("browser-sync").create();

const wdsOpt = require('./config-wds.js'),
    bsOpt = require('./config/config-bs.js'),
    devMode = JSON.parse(fs.readFileSync(`${__dirname}/../.vscode/settings.json`).toString()).devMode;
if (wdsOpt.bs.use) bs.init(devMode ? { ...bsOpt, ...wdsOpt.bs.updConf } : bsOpt);

// Recording the development mode in the settings of the server being started
const setPath = `${__dirname}/../app/out/server/settings.json`;
let settings = JSON.parse(fs.readFileSync(setPath).toString());
fs.writeFileSync(setPath, JSON.stringify({ ...settings, devMode }, null, "\t"));

let node;

exports.change = () => {

    // Start/restart node server
    if (node) node.kill();
    node = fork('../server/main.js', { // Starting the server on the node
        cwd: process.cwd() + "/app/out/client"
    });

    // Update live-server
    if (wdsOpt.bs.use) bs.reload();

    // To see something happen
    console.log('\x1B[90m%s \x1b[36m%s\x1b[0m', new Date().toLocaleTimeString(), 'Node server start/restart');

}
