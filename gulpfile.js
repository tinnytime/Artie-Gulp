/*
      ___  ______ _____ _____ _____ 
     / _ \ | ___ \_   _|_   _|  ___|
    / /_\ \| |_/ / | |   | | | |__  
    |  _  ||    /  | |   | | |  __| 
    | | | || |\ \  | |  _| |_| |___ 
    \_| |_/\_| \_| \_/  \___/\____/ 
*/

// Modules
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps');
    autoprefixer    = require('gulp-autoprefixer'),
    browserify      = require('browserify'),
    jshint          = require('gulp-jshint'),
    jshintStylish   = require('jshint-stylish'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    del             = require('del');
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    ignore          = require('gulp-ignore');

// Settings
var settings = {
    sass: {
        input: {
            file: 'styles.scss',
            files: '_app/scss/**/*.scss',
            path: '_app/scss/',
        },
        output: {
            style: 'expanded',
            sourcemap: true,
            file: 'styles.css',
            path: 'assets/css/',
            message: 'Sass task complete'
        }
    },
    js: {
        input: {
            files: '_app/js/**/*.js',
            file: '_app/js/app.js'
        },
        output: {
            file: 'main.js',
            path: 'assets/js',
            message: 'JS task complete'
        }
    }
};

/**
 * @task sass
 * @usage $ gulp sass
 * Compiles sass files
 */
gulp.task('styles', function () {
    'use strict';

    return gulp.src('_app/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 14,
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(settings.sass.output.path))
        .pipe(ignore.exclude('*.map'));
});
/**
 * @task lint
 * Lints all scripts in the scripts folder
 */
gulp.task('lint', function () {
    'use strict';

    return gulp.src(settings.js.input.files)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

/**
 * @task browserify
 * Compiles javascript modules
 */
gulp.task('bundle', function () {
    return browserify({
            entries: [settings.js.input.file],
            debug: true
        }).bundle()
        .pipe(source(settings.js.output.file))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(settings.js.output.path));
});

/**
 * @task clean
 * Removes all compiled sass & javascript files
 */
gulp.task('clean', function(callback) {
    callback = callback || function() {};
    del([
        settings.sass.output.path,
        settings.js.output.path
    ], callback);
});

/**
 * @taske scripts
 * Runs lint and bundle
 */
gulp.task('scripts', gulp.series('lint', 'bundle'));

/**
 * @task watch
 * @usage $ gulp watch
 * Listens for changes to different files and runs the corresponding task
 */
gulp.task('watch', function() {
    gulp.watch(settings.sass.input.files, gulp.task('styles'));
    gulp.watch(settings.js.input.files, gulp.task('scripts'));
});

/**
 * @task default
 * @usage $ gulp
 */
gulp.task('default',
    gulp.series('watch')
);