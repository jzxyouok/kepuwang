var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass');


 

gulp.task('watch', function() {
  
   
    gulp.watch("./sass/*.scss", ["sass"]);
});

 

 

gulp.task('sass', function() {
    return sass('./sass/*.scss', { style: 'expanded' })
        .pipe(gulp.dest('./stylesheet'))
        .pipe(connect.reload())
});

//运行Gulp时，默认的task
gulp.task('default', [ 'sass', 'watch']);
