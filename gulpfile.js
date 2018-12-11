'use strict';

process.env.NODE_ENV = 'development';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

var serverJsFiles = ['server.js', 'config/**/*.js', '!config/env/*.js', '!config/z_env_template.js', '!config/z_env_all_template.js', 'z_server/**/*.js', '!z_server/libraries/**', '!node_modules/**'];
var mochaJsFiles = ['z-server/tests/**/*.js'];

gulp.task('server-jshint', function () {
    return gulp.src(serverJsFiles)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('server-test', function (done) {
    gulp.src(serverJsFiles)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(mochaJsFiles)
                .pipe(mocha({
                    reporter: 'spec',
                    require: require('./server')
                }))
                .pipe(istanbul.writeReports({
                    reporters: ['lcov']
                }))
                .on('end', function () {
                    done();
                    process.exit();
                })
        })
});

// gulp.task('test', ['server-jshint', 'server-test']);
gulp.task('test', ['server-jshint']);
