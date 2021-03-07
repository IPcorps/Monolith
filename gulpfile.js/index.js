
// File extension router

const { watch } = require("gulp"),
    ts = require("./ts");

exports.watcher = () => {

    // TypeScript -> JavaScript
    watch("app/**/*.ts")
        .on('change', ts.change);

};
