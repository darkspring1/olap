
const path = require('path');
module.exports = {
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      sagas: path.resolve(__dirname, 'src/sagas/'),
      api: path.resolve(__dirname, 'src/api/'),
      common: path.resolve(__dirname, 'src/common/'),
      state: path.resolve(__dirname, 'src/state/'),
      containers : path.resolve(__dirname, 'src/containers/'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      browserHistory: path.resolve(__dirname, 'src/browserHistory'),
    },
  },

  entry: {
      main: ['babel-polyfill', './src/index.jsx']
  },
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "./main.js"
  },

  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    port: 9000,
    open: true,
    historyApiFallback: {
      index: 'index.html'
    },
    
  },
  
  module: {
    rules: [
       
      {
        //test: /\.m?js$/,
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
     
      { 
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }]
      },

      { 
        test: /\.(eot|svg|ttf|woff|woff2)$/, 
        use: "url-loader?name=[name].[ext]"
      }

    ]
},



  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
}
 
};