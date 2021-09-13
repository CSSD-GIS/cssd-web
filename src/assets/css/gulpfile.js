var path = require("path");
var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var cssWrap = require("gulp-css-wrap");
gulp.task("css-wrap", function () {
  return gulp
    .src(path.resolve("./theme/theme-blue/index.css"))
    .pipe(
      cssWrap({
        selector: ".theme-blue" /* 填写对应主题的class名 */,
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("src/assets/css/theme/theme-blue")); /* 存放的目录 */
});
