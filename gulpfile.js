let gulp = require("gulp");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
// let uglify = require('gulp-uglify');   //Unloaded to make it faster

gulp.task("autoprefix", function() {
  return gulp
    .src("./public/**/*.css")
    .pipe(autoprefixer())
    .pipe(gulp.dest("./public/css/"));
});

gulp.task("sass", () => {
  return (
    gulp
      .src("./scss/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer())
      // .pipe(uglify())                //So far we want to see clean css file
      .pipe(gulp.dest("./public/css"))
  );
});

gulp.task("watch", () => {
  gulp.watch(`./scss/**/*.scss`, gulp.series(`sass`));
  // gulp.watch(`./scss/**/*.scss`, gulp.series(`autoprefix`));
});

//Things to add in free time :)

//gulp hash filenma // For hashing css files to enforce load css on each http request

//minify            //getting it smaller

//uglyfy            // For getting it smaller

//gulp autoprefixer //For changing it in http head section
