var gulp        = require('gulp')
var sass        = require('gulp-sass')
var pug         = require('gulp-pug')
var rename      = require('gulp-rename')
var browsersync = require('browser-sync').create()

sass.compiler   = require('node-sass')

gulp.task('sass', () => {
    return gulp.src('sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('css/'))
        .pipe(browsersync.stream())
})

gulp.task('pug', () => {
    return gulp.src('pug/index.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'))
})

gulp.task('default', () => {
    gulp.watch('pug/*.pug', gulp.series('pug'))
    gulp.watch('sass/**/*.sass', gulp.series('sass'))
    gulp.watch('index.html').on('change', browsersync.reload)
    browsersync.init({server: {baseDir: './'} } )
})
