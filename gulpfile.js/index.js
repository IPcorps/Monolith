
// File extension router

const { watch } = require("gulp"),
    ts = require("./ts"),
    md = require("./md");

exports.watcher = () => {

    // TypeScript -> JavaScript
    watch("app/**/*.ts")
        .on('change', ts.change);

    // md -> html
    watch("doc/**/*.md")
        .on('change', md.change);

};
