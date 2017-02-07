var config = require('./gulp.config')();
var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('vet', function() {
    log('Analysing source with jscs and jshint');
    gulp.src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});


gulp.task('styles',['clean-styles'], function() {
    log('less --> css');
    gulp.src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        //.pipe($.autoprefixer({browser: ['last 2 version', '>5%']}))
        .pipe(gulp.dest(config.styles));
});

gulp.task('clean-styles', function(done) {
    var files = config.styles + '**/*.css';
    clean(files, done);
});

gulp.task('clean-fonts', function(done) {
    var files = config.build + 'fonts/**/*.*';
    clean(files, done);
});

gulp.task('clean-images', function(done) {
    var files = config.build + 'images/**/*.*';
    clean(files, done);
});

gulp.task('clean', function(done) {
    var delConfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delConfig));
    del(delConfig);
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        //config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
        );
    clean(files, done);
});

gulp.task('templatecache', function() {
    return gulp
            .src(config.htmltemplates)
            .pipe($.minifyHtml({empty: true}))
            .pipe($.angularTemplatecache(
                config.templateCache.file,
                config.templateCache.options
            ))
            .pipe(gulp.dest(config.client));
});



gulp.task('wiredep', function() {
    log('injecting bower css,js');
    var options = config.getWireDepOptions;
    var wiredep = require('wiredep').stream;
    return gulp
            .src(config.index)
            .pipe(wiredep(options))
            .pipe($.inject(gulp.src(config.js)))
            .pipe(gulp.dest(config.client));
});


gulp.task('inject', ['wiredep', 'styles'], function() {
    log('injecting custom css');
    return gulp
            .src(config.index)
            .pipe($.inject(gulp.src(config.css)))
            .pipe(gulp.dest(config.client));
});

gulp.task('fonts',['clean-fonts'], function() {
    log('copying fonts...');
    return gulp
            .src(config.fonts)
            .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images',['clean-images'], function() {
    log('copying images...');
    return gulp
            .src(config.images)
            .pipe($.imagemin({optimizationLevel: 4}))
            .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('optimize', ['inject'], function() {
    log('optimizing js,css,html');
    var assets = $.useref({searchPath: './'});
    var templateCache = config.client + config.templateCache.file;
    return gulp
            .src(config.index)
            .pipe($.plumber())
            .pipe($.inject(gulp.src(templateCache, {read:false})))
            .pipe(assets)
            //.pipe(assets.restore())
            .pipe(gulp.dest(config.build));
});

gulp.task('serve-dev',['inject'], function() {
    var isDev = true;
    var nodeOptions = {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev': 'build'
            },
            watch: [config.server]
    };
    $.nodemon(nodeOptions)
        .on('restart', ['vet'],function(ev) {
            log('*** nodemon restarted ***');
            log('files changed on restart:' + ev);
            setTimeout(function() {
                browserSync.notify('reloading...');
                browserSync.reload({stream: false});
            },1000);
        })
        .on('start', function() {
            log('*** nodemon started ***');
            startBrowserSync();
        })
        .on('crash', function() {
            log('*** nodemon crashed ***');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly ***');
        });
});

/////
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File' + event.path.replace(srcPattern, '') + '' + event.type);
}

function startBrowserSync() {
    if(args.nosync || browserSync.active) {
        return;
    }
    log('Starting browser sync');
    gulp.watch([config.less],['styles'])
        .on('change', function(ev) {
            changeEvent(ev);
        });
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp +  '**/*.css'    ],
        injectChanges: true,
        logFileChanges: true,
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };
    browserSync(options);
}

function errorLogger(error) {
    log('** Start of Error **');
    log(error);
    log('** End of Error **');
    this.emit('end');
}

function clean(path, done) {
    log('Cleaning: ' +$.util.colors.blue(path));
    del(path);
    done();
}


function log(msg) {
    if(typeof(msg) === 'object') {
        for( var item in msg) {
            if(msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
