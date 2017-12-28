const gulp = require('gulp');
const cfg = require('../appConfig.json').config;
const runseq = require('run-sequence');
const concat = require('gulp-concat');
const rename = require("gulp-rename");

gulp.task('js', function () {
    return gulp.src(cfg.src.js + '/**/*.js')
        .pipe(concat(cfg.projectName + '.js'))
        .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(cfg.build.js))
});

gulp.task('js:watch', function () {
  gulp.watch(cfg.src.js + '/**/*.*', ()=>runseq('js'));
});
