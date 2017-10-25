const gulp = require('gulp')
const replace = require('./utils/gulp-replace-with')
const pkg = require('../package')

gulp.task('build', () => {
  return gulp.src('../src/*.js')
    .pipe(replace({...pkg}))
    .pipe(gulp.dest('../dist'))
})

gulp.task('default', ['build'])
