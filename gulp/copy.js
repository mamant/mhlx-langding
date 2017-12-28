var gulp = require('gulp');
var runseq = require('run-sequence');
const cfg  = require('../appConfig.json').config;

gulp.task('copy', function(){
	runseq( 'copy-img', 'copy-fonts' );
});

gulp.task('copy:watch', function () {
  gulp.watch('src/**/*', ['copy-img']);
});

gulp.task('copy-img', function() {
  return gulp.src([cfg.src.img + '/**/*.*'])
  	.pipe(gulp.dest(cfg.build.img))
});

gulp.task('copy-fonts', function() {
	return gulp.src([cfg.src.fonts + '/**/*.*'])
		.pipe(gulp.dest(cfg.build.fonts))
});
