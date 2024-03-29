var gulp = require('gulp');

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

var browserSync = require('browser-sync');

var wait = require('gulp-wait');

var nunjucks = require('gulp-nunjucks');
 
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer'); 
var pixrem = require('gulp-pixrem');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

var path = require('path');
//wordpress
// var dirName = path.dirname(__dirname).split(path.sep)[3];
//static
var dirName = path.basename(__dirname);

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'localhost/'+dirName
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

var errorHandler = { 
  errorHandler: function(error) {
    console.log(error.message);
    this.emit('end');
  }
};

gulp.task('html', function() {
  gulp.src('./src/html/*.html')
    .pipe(plumber(errorHandler))
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

gulp.task('styles', function(){
  gulp.src('./src/sass/**/*.scss')
    .pipe(wait(250)) //to fix Error: File to import not found or unreadable consider reducing delay
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./src/sass']
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [">1%"] }) ]))
    .pipe(gulp.dest('./'))
    .pipe(rename({suffix: '.min'}))
    .pipe(postcss([ cssnano() ]))
    .pipe(pixrem({ rootValue: '16px', html: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  gulp.src('src/js/**/*.js')
    .pipe(plumber(errorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // .pipe(concat('main.js'))
    .pipe(gulp.dest('./'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(uglify())
    // .on('error', function (err) { console.log(err.toString()); })
    // .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
}); 

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/sass/**/*.scss", ['styles']);
  gulp.watch("src/js/**/*.js", ['scripts']);
  gulp.watch("src/html/**/*.html", ['html']);  
});