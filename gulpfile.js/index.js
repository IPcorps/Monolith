/**
 * In development mode, no idb is used, and all resource requests go directly to the server.
 * - bs monitors changes in client resources and updates the page.
 * - changes to the server code are monitored by gulp, which restarts the server and then refreshes the page.
 * 
 * In production mode, the idb storage is used, which is accessed by resource requests.
 * - whenever resources, both client and server code, change, gulp restarts the server and then refreshes the page.
 */


// File extension router

const { watch } = require("gulp"),
    fs = require("fs");

// Configuration preparation
const wdsOpt = require('./config-wds.js'),
    devMode = JSON.parse(fs.readFileSync(`${__dirname}/../.vscode/settings.json`).toString()).devMode;

exports.watcher = () => {

    // TypeScript -> JavaScript
    if (wdsOpt.ts.use) {
        const ts = require("./ts");
        watch(["app/src/**/*.ts", "ctx-scripts/**/*.ts", "!**/*.d.*"])
            .on('change', ts.change);
    }

    // Server file change watcher
    if (wdsOpt.node.use) {
        const node = require("./node");
        node.change();
        watch(["app/out/server/**/*.js", devMode ? "" : "app/out/client/**/*"])
            .on('change', node.change);

        console.log('\x1B[90m%s \x1b[36m%s\x1b[0m', new Date().toLocaleTimeString(),
            `<<< ${devMode ? "DEVELOPMENT" : "PRODUCTION"} MODE >>>`);

    }

};
