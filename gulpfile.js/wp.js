
// A few "require"
const gulp = require("gulp"),
    webpackStream = require("webpack-stream"),
    webpack = require("webpack");

// Preparation for acceleration
const wpOpt = require("./config/config-wp.js");

exports.change = path => {

    // To see something happen
    console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(), path, "wp start of processing...");

    gulp.src(path)                                          // Entry point
        .pipe(webpackStream(wpOpt, webpack))                // Creating a bundle
        .on("error", () => console.log)
        .pipe(gulp.dest("."))                               // Saving a bundle
        .on("end", () => console.log("\x1B[90m%s \x1b[36m%s\x1b[0m", new Date().toLocaleTimeString(), path, "wp processing is complete!"));

}
