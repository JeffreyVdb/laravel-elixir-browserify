const PLUGIN_NAME = 'browserify';

var _            = require('lodash'),
    elixir       = require('laravel-elixir'),
    gulp         = require('gulp'),
    browserify   = require('browserify'),
    util         = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    transform    = require('vinyl-transform'),
    Notification = require('laravel-elixir/ingredients/commands/Notification'),
    utilities    = require('laravel-elixir/ingredients/commands/Utilities');

elixir.extend(PLUGIN_NAME, function (src, output, options) {
  var config = this,
      defaultOptions = {
        plugin: {
          debug: !config.production,
          insertGlobals: false
        },
        srcDir: config.assetsDir + 'js',
        base: '.'
      };

  options = _.extend(defaultOptions, options);
  src = "./" + utilities.buildGulpSrc(src, options.srcDir);
  output = output || config.jsOutput;

  // Create vinyl stream to use with pipes
  var browserified = transform(function (filename) {
    return browserify(filename, options.plugin).bundle();
  });

  // Create task
  gulp.task(PLUGIN_NAME, function () {
    return gulp.src(src, {base: options.base})
      .pipe(browserified)
      .pipe(config.production ? uglify() : util.noop())
      .pipe(gulp.dest(output))
      .pipe(new Notification().message('Browserify completed!'));
  });

  this.registerWatcher(PLUGIN_NAME, options.srcDir + '/**/*.js');
  return this.queueTask(PLUGIN_NAME);
});
