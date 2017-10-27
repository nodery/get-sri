'use strict'

const gulp = require('gulp')
const bumper = require('./utils/gulp-bumper')
const replace = require('./utils/gulp-replace-with')

gulp.task('bump', function () {
  return gulp.src('../package.json')
    .pipe(bumper())
    .pipe(gulp.dest('../'))
})

gulp.task('build', function () {
  const pkg = require('../package')

  return gulp.src('../src/*.js')
    .pipe(replace(pkg))
    .pipe(gulp.dest('../dist'))
})

gulp.task('default', ['build'])
