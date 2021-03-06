// Aqui nos carregamos o gulp e os plugins através da função require do nodejs
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

//Definimos o diretório dos arquivos para evitar repetição futuramente
var jsfiles = "./src/*.js";

//Aqui criamos uma nova tarefa através do gulp.task e damos a ela o nome 'lint'
gulp.task('lint',function(){
//Aqui carregamos os arquivos que a gente quer rodar as tarefas com o 'gulp.src'
//Logo depois usamos o 'pipe' para rodar a tarefa 'jshint'
gulp.src(files)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

// Criamos outra tarefa com o nome 'dist'
gulp.task('dist',function(){
// Carregamos os arquivos novamente
// E rodamos uma tarefa para contatenação
// Renomeamos o arquivo que será minificado e logo depois o minificamos com o 'uglify'
// E para terminar usamos o 'gulp.dest' para colocar os arquivos concatenados e minificados na pasta build
	gulp.src(files)
		.pipe(concat('./dist'))
		.pipe(rename('dist.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

//Criamos uma tarefa 'default' que vai rodar quando executarmos 'gulp' no projeto
gulp.task('default',function(){
	//usamos o 'gulp.run' para rodar as tarefas
	//e usamos o 'gulp.watch' ára o gulp esperar mudanças nos arquivos para rodar novamente
	gulp.run('lint','dist');
	gulp.watch('files',function(evt){
		gulp.run('lint','dist');
	});
});