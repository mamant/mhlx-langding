const gulp   = require('gulp');
const del    = require('del');
const util   = require('gulp-util');
const cfg  = require('../appConfig.json').config;

gulp.task('clean', function(cb) {
    return del([
        cfg.build.root
    ]).then(function(paths) {
        util.log('Deleted:', util.colors.magenta(paths.join('\n')));
    });
});
