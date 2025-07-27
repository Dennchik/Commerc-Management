import data from 'gulp-data';
import webpHtml from 'gulp-html-webp';
import pug from 'gulp-pug';
import { minifyHtml } from '../config/app.js';

//* Task for compiling Pug files to Html files
export function pugJade() {
  return $.gulp
    .src($.path.pug.src)
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError((error) => ({
          title: 'PUG',
          message: error.message,
        })),
      })
    )
    .pipe(
      data(function () {
        const jsonString = $.fs.readFileSync($.path.json.readFile).toString();
        const json = JSON.parse(jsonString);
        return {
          ...json,
          webRoot: '.', // или './', в зависимости от твоей структуры
        };
      })
    )
    .pipe(pug($.app.pug))
    .pipe($.fileInclude($.app.include))
    .pipe(webpHtml())
    .pipe(minifyHtml())
    .pipe($.gulp.dest($.path.pug.dest))
    .pipe($.gulpIf($.app.isDev, $.debug({ title: '(PugJade)' })));
}
