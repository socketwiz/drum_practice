
const path = require('path');
const webpackBase = require('./webpack.config.js');

const config = webpackBase({
  'devtool': false,
  'entry': {
    'drum-practice': path.resolve(__dirname, 'src', 'index.js')
  },
  'mode': 'production',
  'resolve': {
    'modules': [path.resolve(__dirname, 'node_modules')]
  },
  'watch': false
});

module.exports = config;
