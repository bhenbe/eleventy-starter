const gulp = require("gulp"),
      sass = require("gulp-sass"),
      postcss = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      cssnano = require("cssnano"),
      sourcemaps = require("gulp-sourcemaps"),
      browserSync = require("browser-sync").create();

// Define tasks after requiring dependencies
var paths = {
  styles: {
      // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
      src: "src/scss/**/*.scss",
      // Compiled files will end up in whichever folder it's found in (partials are not compiled)
      dest: "css"
  }
};
	
function style() {
  // Where should gulp look for the sass files?
  // My .sass files are stored in the styles folder
  // (If you want to use scss files, simply look for *.scss files instead)
  return (
      gulp
          .src(paths.styles.src)
          // Use sass with the files found, and log any errors
          .pipe(sourcemaps.init())
          .pipe(sass())
          .on("error", sass.logError)
          // Use postcss with autoprefixer and compress the compiled file using cssnano
          .pipe(postcss([autoprefixer(), cssnano()]))
          // Now add/write the sourcemaps
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(paths.styles.dest))
          .pipe(browserSync.stream())
  );
}

function watch(){
  browserSync.init({
    server: {
      baseDir: "./_site/"
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  });
  style();
  gulp.watch(paths.styles.src, style)
}

// $ gulp watch
exports.watch = watch

// $ gulp style
exports.style = style;