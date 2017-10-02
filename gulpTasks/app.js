//angular1/gulpTasks/app.js
const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets'])

gulp.task('app.html', () => {
  gulp.src('app/**/*.html') // os arquivos html que estão na pasta app independente de quais sejam "**"
    .pipe(htmlmin({ collapseWhitespace: true})) //tirar espaços em branco e deixar o html menor possível
    .pipe(gulp.dest('public'))
})

gulp.task('app.css', () => {
  return gulp.src('app/**/*.css')
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/assets/css'))
})

gulp.task('app.js', () => {
  return gulp.src('app/**/*.js')
    .pipe(babel({ presets: ['env'] })) // babel vai converter todo modelo do javascript novo env para os navegadores
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/assets/js'))
})

gulp.task('app.assets', () => { //
  return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('public/assets'))
})
