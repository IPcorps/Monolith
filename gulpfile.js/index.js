/**
 * In development mode, no idb is used, and all resource requests go directly to the server.
 * - bs monitors changes in client resources and updates the page.
 * - changes to the server code are monitored by gulp, which restarts the server and then refreshes the page.
 * 
 * In production mode, the idb storage is used, which is accessed by resource requests.
 * - whenever resources, both client and server code, change, gulp restarts the server and then refreshes the page.
 */


// FILE EXTENSION ROUTER

const gulp = require("gulp"),
    fs = require("fs");

// Configuration preparation
const devMode = JSON.parse(fs.readFileSync(`${__dirname}/../.vscode/settings.json`).toString()).devMode;

exports.watcher = () => {

    // TypeScript -> JavaScript
    const ts = require("./ts");
    gulp.watch(["ctx-scripts/**/*.ts", "app/src/**/*.ts", "!app/src/client/wm/**", "!**/*.d.*"])
        .on("change", ts.change);

    // TypeScript -> JavaScript (webpack)
    const wp = require("./wp");
    gulp.watch(["app/src/client/wm/**/*.ts", "!**/*.d.*"])
        .on("change", wp.change);

    // Server file change watcher
    const node = require("./node");
    node.change();
    gulp.watch(["app/out/server/**/*.js", devMode ? "" : "app/out/client/**/*"])
        .on("change", node.change);
    console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(),
        `<<< ${devMode ? "DEVELOPMENT" : "PRODUCTION"} MODE >>>`);

};
