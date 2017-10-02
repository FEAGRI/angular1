//angular1/gulpTasks/server.js
const gulp = require('gulp')
const watch = require('gulp-watch') // monitorar os arquivos e gerar tasks
const webserver = require('gulp-webserver')

gulp.task('server',['watch'], () => { //antes de executar o server, vai executar o watch primeiro depois continua aqui...
  gulp.src('public').pipe(webserver({
      livereload:true,
      port: 3000,
      open: true
  }))
})

gulp.task('watch', () => { // aerofunction
  watch('app/**/*.html', () => gulp.start('app.html'))
  watch('app/**/*.css', () => gulp.start('app.css'))
  watch('app/**/*.js', () => gulp.start('app.js'))
  watch('assets/**/*.*', () => gulp.start('app.assets'))
})
