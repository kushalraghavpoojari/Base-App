module.exports = function() {
  var client = './src/client/';
  var clientApp = client + 'app/';
  var config = {
    temp: './.tmp/',
    styles: client + 'styles/',
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    build: './build/',
    fonts: './bower_components/font-awesome/fonts/**/*.*',
    client: client,
    htmltemplates: clientApp + '**/*.html',
    images: client + 'images/**/*.*',
    index: client + 'index.html',
    js: [
      client + '**/*.module.js',
      client + '**/*.js'
    ],
    css: client + 'styles/styles.css',
    less: client +'styles/styles.less',
    templateCache: {
      files: 'templates.js',
      options: {
        module: 'app',
        standAlone: false,
        root: 'app/'
      }
    },
    defaultPort: 8080,
    nodeServer: './src/server/app.js',
    server: './src/server/'
  };

  config.getWireDepOptions = function () {
    var options = {
      bowerJson: require('./bower.json'),
      directory: 'bower_components/',
      ignorePath: '../../'
    };
    return options;
  };

  return config;
};
