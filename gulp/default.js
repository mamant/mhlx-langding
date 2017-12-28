var gulp = require('gulp');
var runseq = require('run-sequence');

gulp.task('default', function(){
	runseq(
		'clean',
		'copy',
		'sass',
		'server',
		'nunjucks',
		'js',
		'copy:watch',
		'sass:watch',
		'js:watch',
		'nunjucks:watch'
	);
});
