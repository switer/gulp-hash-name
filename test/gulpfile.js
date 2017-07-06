var gulp = require('gulp')
var hashName = require('../index')

gulp.task('default', function () {
	return gulp.src('./test.test.abc.config.js')
				.pipe(hashName({
					hashLength: 8,
					template: '{name}_{hash}{ext}'
				}))
				.pipe(gulp.dest('./dist'))
})