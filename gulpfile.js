var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee =require('gulp-coffee'),
    browserify =require('gulp-browserify'),
    compass =require('gulp-compass'),
    concat = require('gulp-concat');
    connect = require('gulp-connect');

var env,
    coffeeSources,
    JsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  } else {
    outputDir = 'builds/production';
  }

coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];

sassSources = ['components/sass/style.scss']
htmlSources = [outputDir + '*.html']
jsonSources = [outputDir + 'js/*.json']

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function (){
  gulp.src(jsSources)
  .pipe(concat('script.js'))
  .pipe(browserify())
  .pipe(gulp.dest(outputDir + 'js'))
  .pipe(connect.reload())
});

gulp.task('compass', function (){
  gulp.src(sassSources)
  .pipe(compass({
    sass: 'components/sass',
    image: outputDir + 'images',
    style: 'expanded'
  })
  .on('error', gutil.log))
  .pipe(gulp.dest(outputDir + 'css'))
  .pipe(connect.reload())

});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(jsonSources, ['json']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch('components/sass/*.scss', ['compass']);

});

gulp.task('connect', function () {
  connect.server({
  root: outputDir,
  livereload: true
  })
  
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(jsonSources)
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);