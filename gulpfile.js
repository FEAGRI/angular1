
const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTasks/app')
require('./gulpTasks/deps')
require('./gulpTasks/server')

// esqueleto do build pronto...

gulp.task('default', () => { // tem que colocar uma task chamada default, pq esta task que vai iniciar o processo de construção
  if(util.env.production){ //checa no package.json linha 8, chamada do gulp em production
    // gulp.start('deps', 'app') // start no deps.js e app.js => correções vindas a partir da aula 63
    sequence('deps', 'app')
  } else{
    // gulp.start('deps','app','server') foi trocado pelo sequence, antes era startado e paralelo e agora será em sequencia
    sequence('deps','app','server')
  }
})
