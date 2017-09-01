//angular1/gulpTasks/app.js

const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets'])

gulp.task('app.html', function(request, response, next){
  gulp.src('app/**/*.html') // os arquivos html que estão na pasta app independente de quais sejam "**"
    .pipe(htmlmin({ collapseWhitspace: true})) //tirar espaços em branco e deixar o html menor possível
    .pipe(gulp.dest('public'))
})

gulp.task('app.css', function(){
  gulp.src('app/**/*.css')
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/assets/css'))
})

gulp.task('app.js', function(){
  gulp.src('app/**/*.js')
    .pipe(babel({ presets: ['es2015']})) // babel vai converter todo modelo do javascript novo es2015 para os navegadores
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/assets/js'))
})

gulp.task('app.assets', function(){
  gulp.src('assets/**/*.*')
    .pipe(gulp.dest('public/assets'))
})
