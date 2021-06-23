
// A few 'require'
const { src, dest } = require('gulp'),
    ts = require('gulp-typescript'),
    terser = require('gulp-terser'),
    gulpif = require('gulp-if'),
    gulprename = require("gulp-rename");

// Preparation for acceleration
const wdsOpt = require('./config-wds.js').ts,
    tsOpt = require('./config/config-ts.js'),
    tersOpt = require('./config/config-ters.js');

const tsProject_req = ts.createProject(tsOpt),
    tsProject = ts.createProject({ ...tsOpt, module: "ESNext" });

exports.change = path => {

    // TypeScript processing for require
    const tsRes = src(path)                                                                 // Reading the file 
        .pipe(path.match(/app\\src\\client/) ? tsProject() : tsProject_req())               // TypeScript -> JavaScript
        .on('error', console.log);                                                          // For oops caught a mistake 🙀

    tsRes.js.pipe(gulpif(wdsOpt.middle, dest('.')))                                         // Saving an intermediate file
        .pipe(gulpif(wdsOpt.mini, terser(tersOpt)))                                         // Javascript minifier and ... what else you want
        .pipe(gulpif(!!wdsOpt.extjs, gulprename({ extname: wdsOpt.extjs })))                // Output file extension
        .pipe(gulpif(!!wdsOpt.dirFrom, gulprename(                                          // Checking and setting the path
            dir => dir.dirname = dir.dirname.replace(wdsOpt.dirFrom, wdsOpt.dirTo))))
        .pipe(dest('.'));                                                                   // Saving the file

    if (wdsOpt.dts) tsRes.dts.pipe(dest('.'));                                              // Saving the file

    // To see something happen
    console.log('\x1B[90m%s \x1b[36m%s\x1b[0m', new Date().toLocaleTimeString(), path, 'processed');

}
