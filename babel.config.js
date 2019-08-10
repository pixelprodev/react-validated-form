module.exports = function (api) {
  api.cache(true)
  const presets = [
    '@babel/preset-react',
    ['@babel/preset-env', {
      targets: {
        "node": "current"
      }
    }]
  ]
  const plugins = [
    "@babel/plugin-proposal-export-default-from"
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

  return ({ presets, plugins, env })
}