// noinspection JSValidateTypes
//* Import necessary modules
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

//* Task for converting fonts
export function fonts() {
	return $.gulp.src($.path.fonts.src, { encoding: false })
		.pipe($.plumber({
			errorHandler: $.notify.onError(error => ({
				title: 'Fonts',
				message: error.message,
			})),
		}))
		.pipe(fonter($.app.fonter))
		.pipe($.debug({ title: 'convert-ttf to woff,eot,ttf' }))
		.pipe($.gulp.dest($.path.fonts.dest))
		.pipe(ttf2woff2())
		.pipe($.debug({ title: 'convert-ttf to woff2' }))
		.pipe($.gulp.dest($.path.fonts.dest))
		.pipe($.gulpIf($.app.isDev, $.debug({ title: '(Fonts)' })));
}
