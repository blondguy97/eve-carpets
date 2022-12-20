const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const del = require('del');



function browsersync() {
    browserSync.init({
        server: { baseDir: 'dev/' },
        notify: false,
    });
}

function styles() {
    return src('dev/scss/style.scss')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(cleanCss({
            format: 'keep-breaks'
        }))
        .pipe(dest('dev/css/'))
        .pipe(browserSync.stream())

}

function build() {
    return src([
        'dev/css/**/*.min.css',
        'dev/js/**/*.min.js',
        'dev/fonts/**.*.*',
        'dev/**/*.html',
    ], {base: 'dev/'})
    .pipe(dest('dist'))
}

function cleanBuild() {
    return del('dist/**/*', {force: true})
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        'dev/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dev/js/'))
        .pipe(browserSync.stream())
}



function startwatch() {
    watch(['dev/**/*.js', '!dev/**/*.min.js'], scripts);
    watch('dev/**/*.scss', styles)
    watch('dev/**/*.html').on('change', browserSync.reload)
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.cleanBuild = cleanBuild;
exports.build = series(cleanBuild, styles, scripts, build);

exports.default = parallel(styles,scripts,browsersync, startwatch)