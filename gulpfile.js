const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const minifyCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const svgmin = require('gulp-svgmin')
const ts = require('gulp-typescript')
const uglifyJs = require('gulp-uglify')

sass.compiler = require('node-sass')

gulp.task('img', () => {
    const svgOrigin = ['src/assets/images/**.svg']
    const directoryProject = 'src/assets/images/**'
    const directoryBuiLd = 'dist/assets/images/'

    gulp.src(svgOrigin).pipe(svgmin()).pipe(gulp.dest(directoryBuiLd))
    return gulp
        .src(directoryProject)
        .pipe(imagemin())
        .pipe(gulp.dest(directoryBuiLd))
})
gulp.task('sass', () => {
    const srcScss = ['./src/assets/sass/main.scss']
    const distCssBuild = './dist/assets/css/'
    const distCssDev = './src/assets/css/'
    return gulp
        .src(srcScss)
        .pipe(sass())
        .pipe(gulp.dest(distCssBuild))
        .pipe(gulp.dest(distCssDev))
})
gulp.task('css', () => {
    const srcCss = ['src/assets/css/*']
    const distCssBuild = './dist/assets/css/'
    const distCssDev = './src/assets/css/'
    return gulp
        .src(srcCss)
        .pipe(autoprefixer('last 99 versions'))
        .pipe(minifyCss())
        .pipe(gulp.dest(distCssBuild))
        .pipe(gulp.dest(distCssDev))
})
gulp.task('js', () => {
    const srcJs = [
        'src/assets/scripts/js/html5Shiv.js',
        'src/assets/scripts/js/respond.js',
        'src/assets/scripts/js/jquery.js',
        'src/assets/scripts/js/selectivizr.js',
        'src/assets/scripts/js/slick.js',
    ]
    const srcJsPolify = [
        'src/assets/scripts/js/html5Shiv.js',
        'src/assets/scripts/js/respond.js',
        'src/assets/scripts/js/selectivizr.js',
    ]
    const srcJquery = ['src/assets/scripts/js/acessibilidade.js']
    const distJs = ['dist/assets/scripts/js/']
    gulp.src(srcJquery).pipe(gulp.dest(distJs))

    gulp.src(srcJsPolify)
        .pipe(concat('allPolify.js'))
        .pipe(gulp.dest(distJs))
        .pipe(gulp.dest('./src/assets/scripts/js/'))
    return gulp.src(srcJs).pipe(uglifyJs()).pipe(gulp.dest(distJs))
})
gulp.task('ts', () => {
    const src = ['./src/assets/scripts/typescript/**.ts']
    const dist = './src/assets/scripts/js/'
    return gulp
        .src(src)
        .pipe(
            ts({
                noImplicitAny: true,
            })
        )
        .pipe(gulp.dest(dist))
})
gulp.task('php', () => {
    const src = ['./src/assets/scripts/php/**']
    const dist = ['./dist/assets/scripts/php/']
    return gulp.src(src).pipe(gulp.dest(dist))
})
gulp.task('html', () => {
    const src = ['./src/*.html']
    const dist = ['./dist/']
    return gulp
        .src(src)
        .pipe(
            htmlmin({
                collapseWhitespace: true,
            })
        )
        .pipe(gulp.dest(dist))
})
gulp.task('pages', () => {
    const pagesSrc = ['src/*.php']
    const pagesDist = ['dist/']
    return gulp.src(pagesSrc).pipe(gulp.dest(pagesDist))
})
gulp.task('partials', () => {
    const pagesComponentsSrc = ['src/assets/partials/*.php']
    const pagesComponentsDist = ['dist/assets/partials/']
    return gulp
        .src(pagesComponentsSrc)
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                ignoreCustomFragments: [
                    /<%[\s\S]*?%>/,
                    /<\?[=|php]?[\s\S]*?\?>/,
                ],
            })
        )
        .pipe(gulp.dest(pagesComponentsDist))
})
gulp.task('fontAwesome', () => {
    const directorySrc = [
        './src/assets/fontawesome/css/*',
        './src/assets/fontawesome/js/*',
        './src/assets/fontawesome/metadata/*',
        './src/assets/fontawesome/sprites/*',
        './src/assets/fontawesome/svgs/**',
        './src/assets/fontawesome/webfonts/*',
    ]
    const directoryDist = [
        './dist/assets/fontawesome/css/',
        './dist/assets/fontawesome/js/',
        './dist/assets/fontawesome/metadata/',
        './dist/assets/fontawesome/sprites/',
        './dist/assets/fontawesome/svgs/',
        './dist/assets/fontawesome/webfonts/',
    ]
    gulp.src(directorySrc[0])
        .pipe(autoprefixer('last 99 versions'))
        .pipe(minifyCss())
        .pipe(gulp.dest(directoryDist[0]))
    gulp.src(directorySrc[1]).pipe(gulp.dest(directoryDist[1]))
    gulp.src(directorySrc[2]).pipe(gulp.dest(directoryDist[2]))
    gulp.src(directorySrc[3]).pipe(gulp.dest(directoryDist[3]))
    gulp.src(directorySrc[4]).pipe(gulp.dest(directoryDist[4]))
    return gulp.src(directorySrc[5]).pipe(gulp.dest(directoryDist[5]))
})
gulp.task('acessibilidade', () => {
    const src = [
        './src/assets/acessibilidade/css/*',
        './src/assets/acessibilidade/coffee/*',
        './src/assets/acessibilidade/coffee/hatemile/implementation/*',
        './src/assets/acessibilidade/coffee/hatemile/util/*',
        './src/assets/acessibilidade/coffee/hatemile/util/html/**',
        './src/assets/acessibilidade/coffee/hatemile/util/css/**',
        './src/assets/acessibilidade/js/*',
        './src/assets/acessibilidade/js/hatemile/*',
        './src/assets/acessibilidade/js/hatemile/implementation/*',
        './src/assets/acessibilidade/js/hatemile/util/*',
        './src/assets/acessibilidade/js/hatemile/util/css/**',
        './src/assets/acessibilidade/js/hatemile/util/html/**',
        './src/assets/acessibilidade/_locales/pt_BR/js/*',
        './src/assets/acessibilidade/_locales/pt_BR/coffee/*',
        './src/assets/acessibilidade/_locales/en_US/js/*',
        './src/assets/acessibilidade/_locales/en_US/coffee/*',
    ]
    const dest = [
        './dist/assets/acessibilidade/css/',
        './dist/assets/acessibilidade/coffee/',
        './dist/assets/acessibilidade/coffee/hatemile/implementation/',
        './dist/assets/acessibilidade/coffee/hatemile/util/',
        './dist/assets/acessibilidade/coffee/hatemile/util/html/',
        './dist/assets/acessibilidade/coffee/hatemile/util/css/',
        './dist/assets/acessibilidade/js/',
        './dist/assets/acessibilidade/js/hatemile/',
        './dist/assets/acessibilidade/js/hatemile/implementation/',
        './dist/assets/acessibilidade/js/hatemile/util/',
        './dist/assets/acessibilidade/js/hatemile/util/css/',
        './dist/assets/acessibilidade/js/hatemile/util/html/',
        './dist/assets/acessibilidade/_locales/pt_BR/js/',
        './dist/assets/acessibilidade/_locales/pt_BR/coffee/',
        './dist/assets/acessibilidade/_locales/en_US/js/',
        './dist/assets/acessibilidade/_locales/en_US/coffee/',
    ]

    gulp.src(src[0])
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest(dest[0]))
    gulp.src(src[1]).pipe(gulp.dest(dest[1]))
    gulp.src(src[2]).pipe(gulp.dest(dest[2]))
    gulp.src(src[3]).pipe(gulp.dest(dest[3]))
    gulp.src(src[4]).pipe(gulp.dest(dest[4]))
    gulp.src(src[5]).pipe(gulp.dest(dest[5]))
    gulp.src(src[6]).pipe(uglifyJs()).pipe(gulp.dest(dest[6]))
    gulp.src(src[7]).pipe(uglifyJs()).pipe(gulp.dest(dest[7]))
    gulp.src(src[8]).pipe(uglifyJs()).pipe(gulp.dest(dest[8]))
    gulp.src(src[9]).pipe(uglifyJs()).pipe(gulp.dest(dest[9]))
    gulp.src(src[10]).pipe(uglifyJs()).pipe(gulp.dest(dest[10]))
    gulp.src(src[11]).pipe(uglifyJs()).pipe(gulp.dest(dest[11]))
    gulp.src(src[12]).pipe(gulp.dest(dest[12]))
    gulp.src(src[13]).pipe(gulp.dest(dest[13]))
    gulp.src(src[14]).pipe(gulp.dest(dest[14]))
    return gulp.src(src[15]).pipe(gulp.dest(dest[15]))
})
gulp.task('clean', () => {
    const srcClean = [
        './src/assets/css/*.map',
        './src/assets/bootstrap/js/*.map',
        './src/assets/bootstrap/css/*.map',
    ]
    return gulp.src(srcClean, { read: false }).pipe(clean())
})
gulp.task(
    'build',
    gulp.series(
        'clean',
        'fontAwesome',
        'acessibilidade',
        'img',
        'sass',
        'css',
        'ts',
        'js',
        'php',
        'html',
        'pages',
        'partials'
    )
)
gulp.task('default', () => {
    const files = [
        './src/assets/scripts/***',
        './src/assets/sass/***',
        './src/*',
        './src/assets/partials/*',
        './src/assets/images/**',
    ]
    gulp.watch(
        files,
        gulp.series(
            'clean',
            'fontAwesome',
            'acessibilidade',
            'img',
            'sass',
            'css',
            'ts',
            'js',
            'php',
            'pages',
            'partials'
        )
    )
})
