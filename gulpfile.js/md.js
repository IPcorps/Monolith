
// A few 'require'
const { src, dest } = require('gulp'),
    md = require('gulp-markdown-github-style');

// Preparation for acceleration
let mdOpt = require('../config-md.js');

exports.change = path => {

    // md processing
    src(path)                           // Reading the file 
        .pipe(md(mdOpt))                // md -> html
        .on('error', console.log)       // For oops caught a mistake 🙀
        .pipe(dest('.'));               // Saving the file

    // To see something happen
    console.log('\x1b[36m%s\x1b[0m', path, 'processed');

}
