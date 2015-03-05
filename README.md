## Laravel Elixir Browserify

## Usage

### Example *Gulpfile.js*:

```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-browserify');

elixir(function(mix) {
  mix.browserify("**/*.js");
});
```

In the first argument of browserify you can specify a blob or simply a file path that you want to
compile. This path will be appended to the default path for javascript files which is set as
_./resources/assets/js/_. So in this case it would browserify all the javascript files in that
said path. If your files are located elsewhere, say perhaps _./assets/js/_ you could change your
configuration to the following

```javascript
elixir(function(mix) {
  mix.browserify("**/*.js", null, {
    srcDir: './assets/js'
  });
});
```

You can also change browserify specific options if you like:

```javascript
elixir(function(mix) {
  mix.browserify("**/*.js", null, {
    browserify: {
      // Define your browserify configuration within this object
    }
  });
});
```

#### Advanced example
```javascript
var elixir = require('laravel-elixir');
require('laravel-elixir-browserify');

elixir(function(mix) {
  mix.browserify("**/*.js", "public/js", {
    browserify: {
      debug: true,
      insertGlobals: true,
      transform: ["debowerify"]
    }
  })
});
```
