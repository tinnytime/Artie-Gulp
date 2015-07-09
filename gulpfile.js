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
    sass            = require('gulp-ruby-sass'),
    sourcemaps      = require('gulp-sourcemaps');
    autoprefixer    = require('gulp-autoprefixer'),
    browserify      = require('browserify'),
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    del             = require('del');
    source          = require('vinyl-source-stream'),
    jshintStylish   = require('jshint-stylish'),
    buffer          = require('vinyl-buffer');

// Settings
var settings = {
    sass: {
        input: {
            file: 'styles.scss',
            files: '_app/scss/**/*.scss',
            path: '_app/scss/',
        },
        output: {
            style: 'compressed',
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
    },
    images: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        input: {
            files: 'assets/images/**/*',
        },
        output: {
            path: 'assets/images/',
            message: 'Images task complete'
        }
    }
};

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
 * @taske scripts
 * Runs lint and bundle
 */
gulp.task('scripts', gulp.series('lint', 'bundle'));

/**
 * @task sass
 * @usage $ gulp sass
 * Compiles sass files
 */
gulp.task('styles', function() {
    return sass(settings.sass.input.path + settings.sass.input.file, {
            style: settings.sass.output.style,
            sourcemap: settings.sass.output.sourcemap
        })
        .pipe( autoprefixer('last 2 version') )
        .pipe( gulp.dest(settings.sass.output.path) )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest(settings.sass.output.path )
        .pipe( notify({ message: settings.sass.output.message }) )
    );
});

/**
 * @task images
 * @usage $ gulp images
 * Compresses images
 */
gulp.task('images', function() {
    return gulp.src(settings.images.input.files)
        .pipe(
            imagemin({
                optimizationLevel: settings.images.optimizationLevel,
                progressive: settings.images.progressive,
                interlaced:settings.images.interlaced
            })
        )
        .pipe( gulp.dest(settings.images.output.path) )
        .pipe( notify({ message: settings.images.output.message }) );
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
 * @task watch
 * @usage $ gulp watch
 * Listens for changes to different files and runs the corresponding task
 */
gulp.task('watch', function() {
    gulp.watch(settings.sass.input.files,   gulp.task('styles'));
    gulp.watch(settings.js.input.files,     gulp.task('scripts'));
    gulp.watch(settings.images.input.files, gulp.task('images'));
});

/**
 * @task default
 * @usage $ gulp
 */
gulp.task('default',
    gulp.series('clean',
        gulp.parallel('scripts', 'styles')
    )
);