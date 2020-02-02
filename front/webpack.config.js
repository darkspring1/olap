
const path = require('path');
module.exports = {
  
  entry: {
      main: ['babel-polyfill', './src/index.js']
  },
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "./main.js"
  },

  devServer: {
    contentBase: path.join(__dirname, "./"),
    port: 9000,
    open: true
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      sagas: path.resolve(__dirname, 'src/sagas/'),
      api: path.resolve(__dirname, 'src/api/')
    }
  },
  
  module: {
    rules: [
       
      {
        //test: /\.m?js$/,
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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