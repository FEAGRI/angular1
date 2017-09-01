//angular1/gulpTasks/deps.js

// npm run dev
// gerar dinamicamente a pasta public/assets/css fonts e js conforme as linhas 25,39 e 47
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const uglifycss = require('gulp-uglifycss')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', function(request, response, next){
  gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/realease/angular-ui-router.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
    'node_modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
    'node_modules/admin-lte/bootstrap/js/bootstrap.min.js',
    'node_modules/admin-lte/plugins/slimScroll/jqueryslimscroll.min.js',
    'node_modules/admin-lte/dist/js/app.min.js'
  ])
  .pipe(uglify()) //minificar os arquivos, tornado o arquivo menor possível
  .pipe(concat('deps.min.js')) // vai concatenar todos os arquivos do gul.scr em um unico arquivo min.js
  .pipe(gulp.dest('public/assets/js')) // e no final coloca o arquivo min.js nesta pasta
})

gulp.task('deps.css', function(){
  gulp.src([
    'node_modules/angular-toastr/dist/angular-toastr.min.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/admin-lte/bootstrap/css/bootstrap.min.css',
    'node_modules/admin-lte/dist/css/AdminLTE.min.css',
    'node_modules/admin-lte/dist/css/skins/_all-skins.min.css'

  ])
  .pipe(uglifycss({"uglyComments":true}))
  .pipe(concat('deps.min.css'))
  .pipe(gulp.dest('public/assets/css'))
})

gulp.task('deps.fonts', function(){
  gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/admin-lte/bootstrap/fonts/*.*'
  ])
  .pipe(gulp.dest('public/assets/fonts'))
})
