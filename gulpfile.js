'use strict';

var gulp = require('gulp');
var files = require('./files');

// load dependencies
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css'); //css
var uglify = require('gulp-uglify'); //js
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var webpack = require('gulp-webpack');
var open = require('gulp-open');
var del = require('del');

// release
gulp.task('default', ['release']);
gulp.task('release', ['release:css', 'release:js', 'release:jq']);

gulp.task('clean', function (cb) {

  del([files.release], cb);
});

gulp.task('release:css', ['clean'], function () {

  //css
  return gulp.src(files.css)
    .pipe(concat(files.destCss))
    .pipe(autoprefixer({
      browsers: ['> 5%', 'last 5 version', 'ie 8']
    })) // auto-prefix
    .pipe(gulp.dest(files.release))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify())
    .pipe(gulp.dest(files.release));
});

gulp.task('release:js', ['clean'], function () { // add jslint and uTest later maybe

  //js
  return gulp.src('src/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(files.release))
    //js hint before uglify
    // .pipe(jshint())
    // .pipe(jshint.reporter('jshint-stylish'))
    //uglify
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(files.release));
});

gulp.task('release:jq', ['clean'], function () {
  return gulp.src('src/jquery/*.js')
    .pipe(concat('hershey.jquery.js'))
    .pipe(gulp.dest(files.release))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(files.release));
});

//-----------------------------------------------> for dev

gulp.task('dev', ['serve'], function () {

  if (files.entry) {
    var opts = {
      url: require('url').resolve("http://localhost:8080", files.entry),
      app: "google chrome"
    };

    gulp.src(files.entry)
      .pipe(open('', opts));
  }
});
gulp.task('concat', ['concat:css', 'concat:js']);

// concat css
gulp.task('concat:css', function () {

  return gulp.src(files.css)
    .pipe(concat(files.destCss))
    .pipe(gulp.dest(files.release))
    .pipe(connect.reload());
});

// concat js
gulp.task('concat:js', function () {

  return gulp.src('src/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(files.release))
    .pipe(connect.reload());
});

// concat jquery src
gulp.task('concat:jq', function () {
  return gulp.src('src/jquery/*.js')
    .pipe(concat('hershey.jquery.js'))
    .pipe(gulp.dest(files.release))
    .pipe(connect.reload());
});

gulp.task('serve:view', function () {

  return gulp.src(files.views)
    .pipe(connect.reload());
});

gulp.task('watch', function () {

  gulp.watch(files.js, ['concat:js', 'concat:jq']);
  gulp.watch(files.css, ['concat:css']);
  gulp.watch(files.views, ['serve:view']);
});

gulp.task('serve', ['concat', 'concat:jq', 'watch'], function () {

  connect.server({
    livereload: true
  });
});

gulp.task('dev:jq', ['serve'], function () {
  if (files.entry_jq) {
    var opts = {
      url: require('url').resolve("http://localhost:8080", files.entry_jq),
      app: "google chrome"
    };

    gulp.src(files.entry_jq)
      .pipe(open('', opts));
  }
});
