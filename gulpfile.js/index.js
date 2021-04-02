
// File extension router

const { watch } = require("gulp");

// Configuration preparation
const wdsOpt = require('./config-wds.js');

exports.watcher = () => {

    // TypeScript -> JavaScript
    if (wdsOpt.ts.use) {
        const ts = require("./ts");
        watch(["app/**/*.ts", "!**/*.d.*"])
            .on('change', ts.change);
    }

    // Pug -> HTML
    if (wdsOpt.pug) {
        const pug = require("./pug");
        watch("app/**/*.pug")
            .on('change', pug.change);
    }

    // Stylus -> CSS
    const styl = require("./styl");
    if (wdsOpt.styl) {
        watch("app/**/*.styl")
            .on('change', styl.change);
    }

};
