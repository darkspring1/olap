
const path = require('path');


module.exports = {

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      state: path.resolve(__dirname, 'src/state/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      common: path.resolve(__dirname, 'src/common/'),
    },
  },

  entry: { main: ['babel-polyfill', './tests/test.js'] },
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: `${__dirname}/test-dist/`,
    filename: './main.js',
  },

  module: {
    rules: [
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
    ],
  },


  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

};
