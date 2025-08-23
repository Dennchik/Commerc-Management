//* Importing modules
// noinspection JSUnusedGlobalSymbols

import browserSync from 'browser-sync';
import gulp from 'gulp';

import babel from 'gulp-babel';
import debug from 'gulp-debug';
import fileInclude from 'gulp-file-include';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import fs from 'fs';

//* Configuration options
import { app } from './gulp/config/app.js';
import { path } from './gulp/config/path.js';
//* Run - Tasks
import { clear, clearFonts } from './gulp/tasks/clear.js';
import { fonts } from './gulp/tasks/fonts.js';
import { fontsStyle } from './gulp/tasks/fontStyle.js';
import { image } from './gulp/tasks/image.js';
import { js } from './gulp/tasks/js.js';
import { redirect } from './gulp/tasks/redirect.js';
import { pugJade } from './gulp/tasks/pug.js';
import { json } from './gulp/tasks/json.js';
import { scss } from './gulp/tasks/scss.js';
import { server } from './gulp/tasks/server.js';
import { sprite } from './gulp/tasks/sprite.js';

global.$ = {
  path: path,
  app: app,
  gulp: gulp,
  sourcemaps: sourcemaps,
  browserSync: browserSync,
  plumber: plumber,
  notify: notify,
  fs: fs,
  fileInclude: fileInclude,
  gulpIf: gulpIf,
  debug: debug,
  rename: rename,
  babel: babel,
  size: size,
};

//* Watcher
const change = gulp.series(clearFonts, fonts, fontsStyle);
const changeJson = gulp.series(json, pugJade);

function reload(done) {
  browserSync.reload();
  done();
}

const watcher = () => {
  // gulp.watch(path.react.watch, gulp.series(react, reload));
  gulp.watch(path.js.watch, gulp.series(js, reload));
  gulp.watch(path.pug.watch, gulp.series(pugJade, reload));
  gulp.watch(path.scss.watch, gulp.series(scss, reload));
  gulp.watch(path.json.watch, gulp.series(changeJson, reload));
  gulp.watch(path.json.readFile, gulp.series(pugJade, reload));
  gulp.watch(path.image.watch, gulp.series(image, reload));
  gulp.watch(path.sprite.watch, gulp.series(sprite, reload));
  gulp.watch(path.fonts.watch, gulp.series(change, reload));
  gulp.watch(path.fontsStyle.watch, gulp.series(fontsStyle, reload));
};

const end = gulp.series(
  clear,
  clearFonts,
  json,
  gulp.parallel(pugJade, scss, js, fonts, image, sprite),
  fontsStyle
);

const dev = gulp.series(end, gulp.parallel(watcher, server));
//* Call back
export {
  clear,
  clearFonts,
  fonts,
  fontsStyle,
  image,
  pugJade,
  scss,
  js,
  json,
  sprite,
  redirect,
  server,
  change,
};
//* Default Task
export default app.isProd ? end : dev;
