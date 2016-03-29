var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var browserSync = require('browser-sync');

var paths = {
  scripts: './app/modules/**/*.js', //path for our js files
  styles: ['./app/scss/**/*.css', './app/scss/**/*.scss'], //path for our *.css and *.scss
  images: './app/img/**/*', //path for our images
  assets: './app/assets/**/*', //path for our images
  html: './app/**/*.html', //path for our *.html files
  distDev: './dist.dev', //path for our DEV directory
  distProd: './dist.prod', //path for our PROD directory
  nodeModulesFiles: ['./node_modules/lodash/lodash.js', './node_modules/highcharts/highcharts.src.js', './node_modules/angular/angular.js', './node_modules/angular-route/angular-route.js']
};

var pipes = {};

pipes.builtVendorScriptsDev = function() {
  return gulp.src(paths.nodeModulesFiles)
    // .pipe(plugins.uglify())
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest(paths.distDev));
};

pipes.builtAppScriptsDev = function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.removelogs())
      // .pipe(plugins.uglify())
      .pipe(plugins.concat('app.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.distDev));
};

pipes.builtHtmlFilesDev = function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.distDev));
};

pipes.builtAssetsFilesDev = function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.distDev+'/assets/'));
};

pipes.builtImageFilesDev = function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.distDev+'/img/'));
};

pipes.builtStyleFilesDev = function() {
  return gulp.src(paths.styles)
    .pipe(gulp.dest(paths.distDev+'/css/'));
};

pipes.builtAppDev = function() {
  return es.merge(pipes.builtVendorScriptsDev(),
    pipes.builtAppScriptsDev(),
    pipes.builtHtmlFilesDev(),
    pipes.builtAssetsFilesDev(),
    pipes.builtImageFilesDev(),
    pipes.builtStyleFilesDev());
};

gulp.task('build-app-dev', pipes.builtAppDev);

gulp.task('clean-build-app-dev', ['clean-dev'], pipes.builtAppDev);

gulp.task('clean-dev', function() {
  return del(paths.distDev);
});

gulp.task('watch-dev', ['clean-build-app-dev'], function() {
  var reload = browserSync.reload;

  browserSync({
    port: 8000,
    server: {
      baseDir: paths.distDev
    }
  });

  gulp.watch(paths.scripts, function() {
    return pipes.builtAppScriptsDev()
      .pipe(reload({stream: true}));
  });

  gulp.watch(paths.html, function() {
    return pipes.builtHtmlFilesDev()
      .pipe(reload({stream: true}));

  });

  gulp.watch(paths.styles, function() {
    return pipes.builtStyleFilesDev()
      .pipe(reload({stream: true}));
  });

  gulp.watch(paths.images, function() {
    return pipes.builtImageFilesDev()
      .pipe(reload({stream: true}));
  });

});

gulp.task('default', ['watch-dev']);