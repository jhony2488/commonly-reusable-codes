const gulp = require('gulp'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  imagesConvert = require('gulp-images-convert'),
  webp = require('gulp-webp'),
  minifyCss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  uglifyJs = require('gulp-uglify'),
  svgmin = require('gulp-svgmin'),
  clean = require('gulp-clean'),
  sass = require('gulp-sass'),
  notify = require('gulp-notify'),
  htmlmin = require('gulp-htmlmin')

sass.compiler = require('node-sass')

gulp.task('img', () => {
  const svgOrigin = ['src/assets/images/**.svg'],
    directoryProject = 'src/assets/images/**',
    directoryBuiLd = 'dist/assets/images/'

  gulp.src(svgOrigin).pipe(svgmin()).pipe(gulp.dest(directoryBuiLd))
  return gulp
    .src(directoryProject)
    .pipe(imagemin())
    .pipe(gulp.dest(directoryBuiLd))
})
gulp.task('sass', () => {
  const srcScss = ['./src/assets/sass/main.scss'],
    distCssBuild = './dist/assets/css/',
    distCssDev = './src/assets/css/'
  return gulp
    .src(srcScss)
    .pipe(sass())
    .pipe(gulp.dest(distCssBuild))
    .pipe(gulp.dest(distCssDev))
})
gulp.task('css', () => {
  const srcCss = ['src/assets/css/*'],
    distCssBuild = './dist/assets/css/',
    distCssDev = './src/assets/css/'
  return gulp
    .src(srcCss)
    .pipe(autoprefixer('last 99 versions'))
    .pipe(minifyCss())
    .pipe(gulp.dest(distCssBuild))
    .pipe(gulp.dest(distCssDev))
})
gulp.task('js', () => {
  const srcJs = [
      'src/assets/js/html5Shiv.js',
      'src/assets/js/respond.js',
      'src/assets/js/jquery.js',
    ],
    srcJquery = [
      'src/assets/js/main.js',
      'src/assets/js/compatibilyImages.js',
      'src/assets/js/acessibilidade.js',
    ],
    distJs = ['dist/assets/js/']
  gulp.src(srcJquery).pipe(gulp.dest(distJs))
  return gulp.src(srcJs).pipe(uglifyJs()).pipe(gulp.dest(distJs))
})
gulp.task('php', () => {
  const src = ['./src/assets/php/**'],
    dist = ['./dist/assets/php/']
  return gulp.src(src).pipe(gulp.dest(dist))
})
gulp.task('pages', () => {
  const pagesSrc = ['src/*.php'],
    pagesDist = ['dist/']
  gulp.src(pagesSrc).pipe(gulp.dest(pagesDist))
})
gulp.task('componentsPages', () => {
  const pagesComponentsSrc = ['src/assets/componentsParcials/*.php'],
    pagesComponentsDist = ['dist/assets/componentsParcials/']
  gulp
    .src(pagesComponentsSrc)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/],
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
    ],
    directoryDist = [
      './dist/assets/fontawesome/css/',
      './dist/assets/fontawesome/js/',
      './dist/assets/fontawesome/metadata/',
      './dist/assets/fontawesome/sprites/',
      './dist/assets/fontawesome/svgs/',
      './dist/assets/fontawesome/webfonts/',
    ]
  gulp
    .src(directorySrc[0])
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
    ],
    dest = [
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
    ]

  gulp
    .src(src[0])
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
  return gulp.src(src[13]).pipe(gulp.dest(dest[13]))
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
  'all',
  gulp.series(
    'clean',
    'fontAwesome',
    'acessibilidade',
    'img',
    'sass',
    'css',
    'js',
    'php',
    'pages',
    'componentsPages'
  )
)
gulp.task('default', () => {
  const files = [
    './src/assets/js/*',
    './src/assets/sass/***',
    './src/*',
    './src/assets/componentsParcials/*',
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
      'js',
      'php',
      'pages',
      'componentsPages'
    )
  )
})
