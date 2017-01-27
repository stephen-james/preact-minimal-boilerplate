import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack-stream';
const browserSync = require('browser-sync');

const reload = () => browserSync.reload();

const resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(__dirname, 'app', glob);
};

const paths = {
  // paths used for watches
  js: [resolveToApp('**/*!(.spec.js).js')],
  html: [
    resolveToApp('**/*.html')
  ],
  css: [
    resolveToApp('**/*.css'),
    resolveToApp('**/*.scss')
  ],
  assets: [
    resolveToApp('**/*.png')
  ],
  // paths used directly for packing
  base: path.join(__dirname, 'app'),
  entry: path.join(__dirname, 'app/index.js'),
  template: path.join(__dirname, 'app/index.html'),
  output: path.join(__dirname, 'dist')
};

gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('copy-assets', () => {
  return gulp.src(paths.assets, { base: paths.base })
    .pipe(gulp.dest(paths.output));
});

gulp.task('copy-template', () => {
  return gulp.src(paths.template)
    .pipe(gulp.dest(paths.output));
});

gulp.task('copy', ['copy-assets', 'copy-template'], (done) => {
  done();
});

gulp.task('reload', ['copy', 'webpack'], (done) => {
  reload();
  done();
});

gulp.task('serve', ['copy', 'webpack'], () => {
  browserSync({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: paths.output }
  });
});

gulp.task('watch', ['serve'], () => {
  const allPaths = [].concat(paths.js, paths.html, paths.css, paths.assets);
  gulp.watch(allPaths, ['reload']);
});

gulp.task('default', ['watch']);
