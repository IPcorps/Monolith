
// A few "require"
const gulp = require("gulp"),
    gulpTypescript = require("gulp-typescript"),
    gulpTerser = require("gulp-terser"),
    gulpIf = require("gulp-if"),
    gulpRename = require("gulp-rename");

// Preparation for acceleration
const wdsOpt = require("./config-wds.js").ts,
    tsOpt = "./tsconfig.json";

const tsProject_req = gulpTypescript.createProject(tsOpt),
    tsProject = gulpTypescript.createProject(tsOpt, { module: "ESNext" });

exports.change = path => {

    // TypeScript processing for require
    const tsRes = gulp.src(path)                                                                 // Reading the file 
        .pipe(path.match(/app\\src\\client/) ? tsProject() : tsProject_req())               // TypeScript -> JavaScript
        .on("error", console.log);                                                          // For oops caught a mistake 🙀

    tsRes.js.pipe(gulpIf(wdsOpt.middle, gulp.dest(".")))                                         // Saving an intermediate file
        .pipe(gulpIf(wdsOpt.mini, gulpTerser()))                                                // Javascript minifier and ... what else you want
        .pipe(gulpIf(!!wdsOpt.extjs, gulpRename({ extname: wdsOpt.extjs })))                // Output file extension
        .pipe(gulpIf(!!wdsOpt.dirFrom, gulpRename(                                          // Checking and setting the path
            dir => dir.dirname = dir.dirname.replace(wdsOpt.dirFrom, wdsOpt.dirTo))))
        .pipe(gulp.dest("."));                                                                   // Saving the file

    if (wdsOpt.dts) tsRes.dts.pipe(gulp.dest("."));                                              // Saving the file

    // To see something happen
    console.log("\x1B[90m%s \x1b[36mTS %s\x1b[0m", new Date().toLocaleTimeString(), path, "processed");

}
