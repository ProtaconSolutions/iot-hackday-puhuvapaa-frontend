/* jshint node: true */
'use strict';

var gulp = require('gulp');
var fs = require('fs');
/**
 * @var {*} plugins
 */
var plugins = require('gulp-load-plugins')({lazy: false});
var ngConstant = require('gulp-ng-constant');
var noop = plugins.util.noop;
var eventStream = require('event-stream');
var lazypipe = require('lazypipe');
var stylish = require('jshint-stylish');
var bower = require('./bower');
var mainBowerFiles = require('main-bower-files');
var historyApiFallback = require('connect-history-api-fallback');
var isWatching = false;

// Read and parse package.json contents
var packageData = JSON.parse(fs.readFileSync('package.json', 'utf8'));

var htmlMinOpts = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true
};

// JS Hint
gulp.task('jshint', function() {
  return gulp.src([
      './gulpfile.js',
      './src/app/**/*.js'
    ])
    .pipe(plugins.cached('jshint'))
    .pipe(jshint('./.jshintrc'))
    .pipe(livereload());
});

// CSS
gulp.task('clean-css', function() {
  return gulp.src('./.tmp/css')
    .pipe(plugins.rimraf());
});

gulp.task('styles', ['clean-css'], function() {
  return scssFiles()
    .pipe(plugins.sass())
    .pipe(gulp.dest('./.tmp/css/'))
    .pipe(plugins.cached('built-css'))
    .pipe(livereload());
});

gulp.task('styles-dist', ['styles'], function() {
  return cssFiles()
    .pipe(dist('css', bower.name));
});

gulp.task('csslint', ['styles'], function() {
  return gulp.src([
      './src/app/**/*.css'
    ])
    .pipe(plugins.cached('csslint'))
    .pipe(plugins.csslint('./.csslintrc'))
    .pipe(plugins.csslint.reporter());
});

gulp.task('scsslint', ['styles'], function() {
  var scsslint = plugins.scssLint;

  return gulp.src('./src/app/**/*.scss')
    .pipe(scsslint({
      config: './scsslint.yml'
    }));
});

// Scripts
gulp.task('scripts-dist', ['templates-dist'], function() {
  return appFiles()
    .pipe(dist('js', bower.name, {ngAnnotate: true}));
});

// Templates
gulp.task('templates', function() {
  return templateFiles()
    .pipe(buildTemplates());
});

gulp.task('templates-dist', function() {
  return templateFiles({min: true})
    .pipe(buildTemplates());
});

// Vendors
gulp.task('vendors', function() {
  var bowerStream = gulp.src(mainBowerFiles());

  return eventStream.merge(
    bowerStream.pipe(plugins.filter('**/*.css')).pipe(dist('css', 'vendors')),
    bowerStream.pipe(plugins.filter('**/*.js')).pipe(dist('js', 'vendors'))
  );
});

// Index
gulp.task('index', index);
gulp.task('build-all', ['styles', 'templates'], index);

function index() {
  var opt = {read: false};

  return gulp.src('./src/app/index.html')
    .pipe(plugins.inject(gulp.src(mainBowerFiles(opt)), {ignorePath: 'bower_components', starttag: '<!-- inject:vendor:{{ext}} -->'}))
    .pipe(plugins.inject(eventStream.merge(appFiles(), cssFiles(opt)), {ignorePath: ['.tmp', 'src/app']}))
    .pipe(plugins.embedlr())
    .pipe(gulp.dest('./.tmp/'))
    .pipe(livereload())
  ;
}

// Assets
gulp.task('assets', function() {
  return gulp.src('./src/app/assets/**')
    .pipe(gulp.dest('./dist/assets'));
});

// Partials
gulp.task('partials', function() {
  return gulp.src('./src/app/partials/**')
    .pipe(gulp.dest('./dist/partials'));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src([
      './bower_components/fontawesome/fonts/**',
      './bower_components/mdi/fonts/**'
    ])
    .pipe(gulp.dest('./dist/fonts'));
});

// Dist
gulp.task('dist', ['config', 'vendors', 'assets', 'fonts', 'styles-dist', 'scripts-dist'], function() {
  return gulp.src('./src/app/index.html')
    .pipe(plugins.inject(gulp.src('./dist/vendors.min.{js,css}'), {
      ignorePath: 'dist',
      starttag: '<!-- inject:vendor:{{ext}} -->'
    }))
    .pipe(plugins.inject(gulp.src('./dist/' + bower.name + '.min.{js,css}'), {ignorePath: 'dist'}))
    .pipe(plugins.htmlmin(htmlMinOpts))
    .pipe(gulp.dest('./dist/'));
});

// Static file server
gulp.task('statics', plugins.serve({
  port: 3000,
  root: ['./.tmp', './src/app', './bower_components'],
  middleware: historyApiFallback({})
}));

// Production file server, note remember to run 'gulp dist' first!
gulp.task('production', plugins.serve({
  port: 4000,
  root: ['./dist'],
  middleware: historyApiFallback({})
}));

// Watch
gulp.task('serve', ['config', 'watch']);

gulp.task('watch', ['statics', 'default'], function() {
  isWatching = true;

  // Initiate livereload server:
  plugins.livereload({
    start: true
  });

  gulp.watch('./src/app/**/*.js', ['jshint']).on('change', function(evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    }
  });

  gulp.watch('./src/app/index.html', ['index']);
  gulp.watch(['./src/app/**/*.html', '!./src/app/index.html'], ['templates']);
  gulp.watch(['./src/app/**/*.scss'], ['csslint', 'scsslint']).on('change', function(evt) {
    if (evt.type !== 'changed') {
      gulp.start('index');
    }
  });
});

// Config
gulp.task('config', ['configFile', 'configPackage']);

gulp.task('configFile', function() {
  var constants;

  try {
    constants = JSON.parse(fs.readFileSync('./src/app/config/config.json', 'utf8'));
  } catch (error) {
    constants = {
      'config': {
        'backendUrl': process.env.BADGE_BACKENDURL || 'http://localhost/'
      }
    }
  }

  return ngConstant({
      name: 'badgeFrontend.config',
      templatePath: './src/app/config/template.ejs',
      space: '    ',
      constants: constants,
      stream: true
    })
    .pipe(plugins.rename('config.js')) // Rename stream file
    .pipe(gulp.dest('./src/app/config/')); // Writes config.js to dist/ folder
});

gulp.task('configPackage', function() {
  var constants = {
    package: {
      name: packageData.name,
      version: packageData.version
    }
  };

  return ngConstant({
      name: 'badgeFrontend.config',
      templatePath: './src/app/config/template.ejs',
      space: '    ',
      constants: constants,
      stream: true,
      deps: false
    })
    .pipe(plugins.rename('package.js')) // Rename stream file
    .pipe(gulp.dest('./src/app/config/')); // Writes package.js to dist/ folder
});

// Default task
gulp.task('default', ['lint', 'build-all']);

// Lint everything
gulp.task('lint', ['jshint', 'csslint', 'scsslint']);

// All CSS files as a stream
function cssFiles(opt) {
  return gulp.src('./.tmp/css/**/*.css', opt);
}

// All SCSS files as a stream
function scssFiles() {
  return gulp.src([
    './src/app/**/*.scss',
    '!./src/app/**/_*.scss'
  ]);
}

// All AngularJS application files as a stream
function appFiles() {
  var files = [
    './.tmp/' + bower.name + '-templates.js',
    './src/app/**/*.js',
    '!./src/app/**/*_test.js'
  ];

  return gulp.src(files)
    .pipe(plugins.angularFilesort());
}

// All AngularJS templates/partials as a stream
function templateFiles(opt) {
  return gulp.src(['./src/app/**/*.html', '!./src/app/index.html'], opt)
    .pipe(opt && opt.min ? plugins.htmlmin(htmlMinOpts) : noop());
}

// Build AngularJS templates/partials
function buildTemplates() {
  return lazypipe()
    .pipe(plugins.ngHtml2js, {
      moduleName: bower.name + '-templates',
      prefix: '/' + bower.name + '/',
      stripPrefix: '/src/app'
    })
    .pipe(plugins.concat, bower.name + '-templates.js')
    .pipe(gulp.dest, './.tmp')
    .pipe(livereload)();
}

/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} [name]
 * @param {Object} [opt]
 */
function dist(ext, name, opt) {
  opt = opt || {};

  return lazypipe()
    .pipe(plugins.concat, name + '.' + ext)
    .pipe(gulp.dest, './dist')
    .pipe(opt.ngAnnotate ? plugins.ngAnnotate : noop)
    .pipe(opt.ngAnnotate ? plugins.rename : noop, name + '.annotated.' + ext)
    .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist')
    .pipe(ext === 'js' ? plugins.uglify : plugins.minifyCss)
    .pipe(plugins.rename, name + '.min.' + ext)
    .pipe(gulp.dest, './dist')();
}

// Livereload (or noop if not run by watch)
function livereload() {
  return lazypipe()
    .pipe(isWatching ? plugins.livereload : noop)();
}

// Jshint with stylish reporter
function jshint(jshintfile) {
  // Read JSHint settings, for some reason jshint-stylish won't work on initial load of files
  var jshintSettings = JSON.parse(fs.readFileSync(jshintfile, 'utf8'));

  return lazypipe()
    .pipe(plugins.jshint, jshintSettings)
    .pipe(plugins.jshint.reporter, stylish)();
}
