
// A few "require"
const gulp = require("gulp"),
    stream = require("stream"),
    webpackStream = require("webpack-stream"),
    webpack = require("webpack");

// Preparation for acceleration
const wpOpt = require("./config/config-wp.js");

exports.change = path => {

    gulp.src(path)                                          // Entry point
        .pipe(webpackStream(wpOpt, webpack))                // Creating a bundle
        .on("error", () => console.log)
        .pipe(new stream.Transform({
            objectMode: true,
            transform(file, _, cb) {
                const content = file.contents.toString()
                    .replace("export declare namespace Mono", "declare namespace Mono");
                file.contents = Buffer.from(content);
                cb(null, file);
            }
        }))
        .pipe(gulp.dest("."));                              // Saving a bundle

    // To see something happen
    console.log("\x1B[90m%s \x1b[36mWP %s\x1b[0m", new Date().toLocaleTimeString(), path, "processed");

}
