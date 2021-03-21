
// A few 'require'
const { src, dest } = require('gulp'),
    ts = require('gulp-typescript'),
    terser = require('gulp-terser');

// Preparation for acceleration
let tsOpt = require('../config-ts.js'),
    tersOpt = require('../config-ters.js');

let tsProject = ts.createProject(tsOpt);

exports.change = path => {

    // TypeScript processing
    src(path)                           // Reading the file 
        .pipe(tsProject())              // TypeScript -> JavaScript
        .on('error', console.log)       // For oops caught a mistake 🙀
        .pipe(terser(tersOpt))          // Javascript minifier and ... what else you want
        .pipe(dest('.'));               // Saving the file

    // To see something happen
    console.log('\x1b[36m%s\x1b[0m', path, 'processed');

}
