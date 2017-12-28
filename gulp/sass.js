const gulp = require('gulp');
const sass = require('gulp-sass');
const cfg = require('../appConfig.json').config;
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const runseq = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const sorting = require('postcss-sorting');
const sassLint = require('gulp-sass-lint');

gulp.task('sass', function () {
  return gulp.src(cfg.src.sass + '/**/*.{scss,sass}')
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      },
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0,
        'nesting-depth': 2,
        'no-color-keywords': 1,
        'no-empty-rulesets': 1,
        'no-important': 1,
        'no-misspelled-properties': 1,
        'no-transition-all': 1,
        'space-before-brace': true,
        'space-before-colon': true,
        'indentation': 2
      }
    }))
    .pipe(sassLint.format())
    //.pipe(sassLint.failOnError())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([
        autoprefixer(),
        sorting()
    ]))
    .pipe(gulp.dest(cfg.build.css));
});

gulp.task('sass:watch', function () {
  gulp.watch(cfg.src.sass + '/**/*.*', ()=>runseq('copy','sass'));
});
