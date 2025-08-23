//* Importing modules
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import newer from 'gulp-newer';

//* Converting and compressing images
export function image() {
  return $.gulp
    .src($.path.image.src, { encoding: false })
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError((error) => ({
          title: 'Image',
          message: error.message,
        })),
      })
    )
    .pipe(newer($.path.image.dest))
    .pipe($.gulpIf($.app.isProd, $.size({ title: 'До сжатия-Image:' })))
    .pipe($.gulpIf($.app.isProd, imagemin($.app.imagemin)))
    .pipe($.gulpIf($.app.isProd, $.size({ title: 'После сжатия-Image:' })))
    .pipe($.gulp.dest($.path.image.dest))
    .pipe(webp())
    .pipe(newer($.path.image.dest))
    .pipe($.gulp.dest($.path.image.dest));
}
