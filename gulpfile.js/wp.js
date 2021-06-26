
// A few "require"
const { src, dest } = require("gulp"),
    webpackStream = require("webpack-stream"),
    webpack = require("webpack");

// Preparation for acceleration
const wdsOpt = require("./config-wds.js").wp,
    wpOpt = require("./config/config-wp.js");

exports.change = path => {

    src(wdsOpt.entry)                                   // Entry point
        .pipe(webpackStream(wpOpt, webpack))            // Creating a bundle
        .on("error", console.log)
        .pipe(dest(wdsOpt.output));                     // Saving a bundle

    // To see something happen
    console.log("\x1B[90m%s \x1b[36mWP %s\x1b[0m", new Date().toLocaleTimeString(), path, "processed");

}
