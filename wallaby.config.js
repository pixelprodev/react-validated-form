const babelConfigJS = require('./babel.config.js')

module.exports = function (wallaby) {
  const babelConfig = {
    babel: require('@babel/core'),
    presets: babelConfigJS.presets
  }

  return {
    files: [
      { pattern: 'src/**/*.js' },
      { pattern: 'src/**/*.jsx' },
      { pattern: 'test/**/*.spec.js', ignore: true }
    ],

    tests: [
      { pattern: 'test/**/*.spec.js' }
    ],

    slowTestThreshold: 750,
    testFramework: 'mocha',

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },

    compilers: {
      'src/**/*.js': wallaby.compilers.babel(babelConfig),
      'src/**/*.jsx': wallaby.compilers.babel(babelConfig),
      'test/**/*.js': wallaby.compilers.babel(babelConfig)
    },

    setup: function (wallaby) {
      require('jsdom-global/register')
      global.expect = require('expect')
      wallaby.testFramework.ui('tdd')
      window.Date = Date
    }
  }
}