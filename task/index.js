'use strict'

const gulp = require('gulp')
const replace = require('./utils/gulp-replace-with')
const jsdoc = require('./utils/gulp-jsdoc2md')
const bumper = require('./utils/gulp-bumper')
const releaser = require('./utils/gulp-releaser')

gulp.task('build', function () {
  const pkg = require('../package')

  return gulp.src('../src/*.js')
    .pipe(replace(pkg))
    .pipe(gulp.dest('../lib'))
})

gulp.task('doc', function () {
  return gulp.src('../lib/*.js')
    .pipe(jsdoc())
    .pipe(gulp.dest('../doc'))
})

gulp.task('release',
  gulp.series(
    function bump () {
      return gulp.src('../package.json')
        .pipe(bumper())
        .pipe(gulp.dest('../'))
    },
    'build',
    'doc',
    function release () {
      return gulp.src('../package.json')
        .pipe(releaser())
    }
  )
)

gulp.task('default', gulp.series('build'))
