module.exports = function (api) {
  api.cache(true)
  const presets = [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      targets: {
        browsers: ['last 2 versions', 'ie 11']
      }
    }]
  ]
  const env = {
    test: {
      presets: [
        ['@babel/preset-env', {
          modules: 'commonjs'
        }]
      ]
    }
  }

  return ({ presets, env })
}