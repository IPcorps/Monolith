
// File extension router

const { watch } = require("gulp"),
    ts = require("./ts"),
    pug = require("./pug"),
    styl = require("./styl");

exports.watcher = () => {

    // TypeScript -> JavaScript
    watch("app/**/*.ts")
        .on('change', ts.change);

    // Pug -> HTML
    watch("app/**/*.pug")
        .on('change', pug.change);

    // Stylus -> CSS
    watch("app/**/*.styl")
        .on('change', styl.change);

};
