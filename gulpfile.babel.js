import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import { stream as wiredep } from 'wiredep';

const $ = gulpLoadPlugins();

const reload = browserSync.reload;

gulp.task('css', () => {
    return gulp.src('app/css/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/css'))
        .pipe(reload({ stream: true }));
});

gulp.task('js', () => {
    return gulp.src('app/js/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/js'))
        .pipe(reload({ stream: true }));
});

function lint(files, options) {
    return () => {
        return gulp.src(files)
            .pipe(reload({ stream: true, once: true }))
            .pipe($.eslint(options))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}

gulp.task('lint', lint('app/js/**/*.js'));

gulp.task('html', ['components'], () => {
    // gulp.src('app/CNAME').pipe(gulp.dest('dist'));
    gulp.src('.tmp/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.if(/vendor\.js$/, gulp.dest('dist')));
    return gulp.src('.tmp/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.ignore.exclude(/vendor\.js$/))
        // .pipe($.ignore.exclude(/vendor\.css$/))
        .pipe($.uniqueFiles())
        .pipe($.if(/\.js$/, $.uglify()))
        .pipe($.if(/\.css$/, $.cssnano()))
        // .pipe($.debug())
        .pipe($.if(/\.html$/, $.htmlmin({ collapseWhitespace: true })))
        // .pipe($.debug())
        .pipe(gulp.dest('dist'));
});

gulp.task('components', ['css', 'js', 'baker'], () => {
    var gutil = $.util;
    return gulp.src(['.tmp/**/*.html', '!.tmp/index.html'])
        .pipe($.useref({ searchPath: ['.tmp/**'] }))
        // .pipe($.debug())
        // .pipe($.if(/\.css$/, $.cssnano()))
        // .pipe($.if(/\.css$/, gulp.dest('./dist/components')))
        // .pipe($.ignore.exclude(/vendor\.js$/))
        // .pipe($.uniqueFiles())
        // .pipe($.if(/components\.js$/, $.debug()))
        // .pipe($.if(/\.js$/, $.uglify()))
        // .pipe($.if(/components\.js$/, gulp.dest('./dist/components')))
        .pipe($.if(/\.html$/, $.htmlmin({ collapseWhitespace: true })))
        .pipe($.if(/\.html$/, gulp.dest('dist')))
});

gulp.task('img', () => {
    return gulp.src('app/img/**/*')
        .pipe($.if($.if.isFile, $.cache($.imagemin({
                progressive: true,
                interlaced: true,
                // don't remove IDs from SVGs, they are often used
                // as hooks for embedding and styling
                svgoPlugins: [{ cleanupIDs: false }]
            }))
            .on('error', function(err) {
                console.log(err);
                this.end();
            })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('baker', function() {
    return gulp.src(['app/**/*-tpl.html'])
        .pipe($.fileInclude())
        .pipe($.replaceName(/[-]tpl.html/ig, '.html'))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('fileinclude', function() {
    gulp.src(['app/**/*-tpl.html'])
        .pipe($.fileInclude())
        .pipe($.replaceName(/[-]tpl.html/ig, '.html'))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('serve', ['css', 'js', 'fonts', 'fileinclude'], () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/vendor': 'vendor'
            }
        }
    });

    gulp.watch([
        '.tmp/**/*.html',
        '.tmp/js/**/*.js',
        'app/img/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/css/**/*.scss', ['css']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('app/**/*.html', ['fileinclude']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
});



gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:web', () => {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['web']
        }
    });
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/css/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/css'));

    gulp.src('app/**/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap-sass'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'img', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});

gulp.task('tinypng', function() {
    gulp.src(['app/img-origin/**/*.png', 'app/img-origin/**/*.jpg', '!app/img-origin/ok/**/*.*'])
        .pipe($.tinypng('13I8NM09OlZ1E0vNNq4c3Nq9oFTT8Y-v'))
        .pipe(gulp.dest('app/img'));
});