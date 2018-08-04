const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'cheap-eval-source-map',
  entry: {
    main: path.join(__dirname, 'src/js', 'main.jsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3333,
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|svg|gif|woff|otf)$/,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}
