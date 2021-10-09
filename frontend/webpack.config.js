const LiveReloadPlugin = require('webpack-livereload-plugin');
const path = require('path');

function webpackBase(config) {
  const baseConfig = {
    'devtool': config.devtool,
    'entry': config.entry,
    'mode': config.mode,
    'module': {
      'rules': [
        {
          'test': /\.js$/,
          'exclude': [path.resolve(__dirname, 'node_modules')],
          'use': ['babel-loader']
        },
        {
          'test': /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
          'use': [
            {
              'loader': 'url-loader',
              'options': {
                'limit': 100000,
              }
            }
          ]
        }
      ]
    },
    'resolve': config.resolve,
    'output': {
      'chunkFilename': '[name].bundle.js',
      'filename': '[name].bundle.js',
      'path': path.resolve(__dirname, '../server/static/js')
    },
    'optimization': {
      'splitChunks': {
        'cacheGroups': {
          'commons': {
            'chunks': 'initial',
            'maxInitialRequests': 5,
            'minChunks': 2,
            'minSize': 0
          }
        }
      }
    },
    'plugins': [
      new LiveReloadPlugin()
    ],
    'watch': config.watch
  };

  return baseConfig;
}

module.exports = webpackBase;
