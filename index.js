var _            = require('lodash'),
    elixir       = require('laravel-elixir'),
    gulp         = require('gulp'),
    browserify   = require('gulp-browserify'),
    util         = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    Notification = require('laravel-elixir/ingredients/commands/Notification'),
    utilities    = require('laravel-elixir/ingredients/commands/Utilities');

elixir.extend('browserify', function (src, options) {
  var config = this,
      defaultOptions = {
        browserify: {
          debug: !config.production,
          insertGlobals: false
        },
        srcDir: config.assetsDir + 'js',
        output: config.jsOutput
      };

  options = _.extend(defaultOptions, options);
  src = "./" + utilities.buildGulpSrc(src, options.srcDir);

  gulp.task('browserify', function () {
    return gulp.src(src)
      .pipe(browserify(options.browserify))
      .pipe(config.production ? uglify() : util.noop())
      .pipe(gulp.dest(options.output))
      .pipe(new Notification().message('Browserify completed!'));
  });

  this.registerWatcher('browserify', options.srcDir + '/**/*.js');
  return this.queueTask('browserify');
});