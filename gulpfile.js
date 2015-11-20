// including plugins
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename");

// task
gulp.task('dist', function() {

    gulp.src('./src/scripts/*.js') // path to your files
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist/scripts/'));

    gulp.src('./src/styles/*.scss') // path to your file
        .pipe(sass())
        .pipe(gulp.dest('dist/styles'));

    gulp.src('./dist/styles/*.css') // path to your file
        .pipe(minifyCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('dist/styles.min'));


});
