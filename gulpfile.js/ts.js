
// A few "require"
const gulp = require("gulp"),
    gulpTypescript = require("gulp-typescript"),
    gulpTerser = require("gulp-terser"),
    gulpRename = require("gulp-rename");

// Preparation for acceleration
const tsProject = gulpTypescript.createProject("./tsconfig.json");

exports.change = path => {

    // TypeScript processing for require
    const tsRes = gulp.src(path)                                                                // Reading the file 
        .pipe(tsProject())                                                                      // TypeScript -> JavaScript
        .on("error", console.log);                                                              // For oops caught a mistake 🙀

    tsRes.js
        // .pipe(gulp.dest("."))                                                                // Saving an intermediate file
        .pipe(gulpTerser())                                                                     // Javascript minifier and ... what else you want
        // .pipe(gulpRename({ extname: ".m.js" }))                                              // Output file extension
        .pipe(gulpRename(dir => dir.dirname = dir.dirname.replace("app\\src", "app\\out")))     // Setting the output path
        .pipe(gulp.dest("."));                                                                  // Saving the file

    // tsRes.dts.pipe(gulp.dest("."));                                                          // Saving the declaration file

    // To see something happen
    console.log("\x1B[90m%s \x1b[36mTS %s\x1b[0m", new Date().toLocaleTimeString(), path, "processed");

}
