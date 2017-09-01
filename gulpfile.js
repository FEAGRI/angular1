
const gulp = require('gulp')
const util = require('gulp-util')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

// esqueleto do build pronto...

gulp.task('default', function() {
  if(util.env.production){ //checa no package.json linha 8, chamada do gulp em production
    gulp.start('deps', 'app') // start no deps.js e app.js
  } else{
    gulp.start('deps','app','server')
  }
})
