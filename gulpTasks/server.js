//angular1/gulpTasks/server.js

const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

gulp.task('server',['watch'], function(){ //antes de executar o server, vai executar o watch primeiro depois continua aqui...
  gulp.src('public').pipe(webserver({
      livereload:true,
      port: 4000,
      open: true
  }))
})

gulp.task('watch', function() {
  watch('app/**/*.html', () => gulp.start('app.html'))
  watch('app/**/*.css', () => gulp.start('app.css'))
  watch('app/**/*.js', () => gulp.start('app.js'))
  watch('app/**/*.*', () => gulp.start('app.assets'))
})