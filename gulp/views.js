const gulp = require('gulp');
const cfg  = require('../appConfig.json').config;
const nunjucksRender = require('gulp-nunjucks-render');
const plumber        = require('gulp-plumber');
const gulpif         = require('gulp-if');
const changed        = require('gulp-changed');
const prettify       = require('gulp-prettify');
const frontMatter    = require('gulp-front-matter');

function renderHtml(onlyChanged) {
    nunjucksRender.nunjucks.configure({
        watch: false,
        trimBlocks: true,
        lstripBlocks: false
    });

    return gulp
        .src([cfg.src.templates + '/**/[^_]*.html'])
        .pipe(plumber({
            // errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(cfg.build.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(nunjucksRender({
            path: [cfg.src.templates]
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: false,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulp.dest(cfg.build.html));
}

gulp.task('nunjucks', function() {
    return renderHtml();
});

gulp.task('nunjucks:changed', function() {
    return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
    gulp.watch([
        cfg.src.templates + '/**/[^_]*.html'
    ], ['nunjucks:changed']);

    gulp.watch([
        cfg.src.templates + '/**/_*.html'
    ], ['nunjucks']);
});
