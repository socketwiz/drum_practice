
const path = require('path');
const webpackBase = require('./webpack.config.js');

const config = webpackBase({
  'devtool': 'cheap-module-source-map',
  'entry': {
    'drum-practice': path.resolve(__dirname, 'src', 'index.js')
  },
  'mode': 'development',
  'resolve': {
    'modules': [path.resolve(__dirname, 'node_modules')]
  },
  'watch': true
});

module.exports = config;
