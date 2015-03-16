'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'), 
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  rework = require('gulp-rework'),
  inherit = require('rework-inherit'),
  vars = require('rework-vars'),
  imprt = require('rework-import'),
  reworkNPM = require('rework-npm'),
  autoprefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch');
var babelify = require("babelify");
gulp.task('watch', function() {
    
    watch('./public/js/app/**/*.*' , function() {
        gulp.start('buildjs');
    });
        watch( './css/**/*.css', function() {
        gulp.start('buildcss');
    });

});
//lint js files
gulp.task('lint', function() {
    gulp.src(['*.js','routes/*.js', 'public/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('prepLibs', function () {
    return gulp.src('./node_modules/react/dist/*')
        .pipe(gulp.dest('./public/js/libs'))
});

gulp.task('buildcss', function () {
    return gulp.src('./css/style.css')
        .pipe(rework(reworkNPM({ 
            shim: { 
                'purecss': 'build/pure.css'
            }}),
            vars(), 
            inherit(),
            imprt({
                path: './css/modules/'
            })
            )
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('buildjs', function () {
 
    return browserify({ entries:['./public/js/app/app.jsx'], debug: true })
        .transform(babelify.configure({
          experimental: false
        })) 
        .bundle()
        .on('error', function (e) {
            console.log('browserify error');
            console.log(arguments);
            throw e;
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js')) 
        .on('end', function () {
            console.log('ended');
        });
});
gulp.task('images', function () {

});

gulp.task('build', ['prepLibs', 'buildjs', 'buildcss']);

gulp.task('default', [ 'build' ]);