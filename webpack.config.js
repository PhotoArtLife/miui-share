var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixerConfig = require('./autoprefixer.config');
var WebpackDevServer = require("webpack-dev-server");

var DEBUG = process.env.NODE_ENV !== 'production';

var plugins = [];
var entry;  
var output = {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js',
};
//调试生产与发布环境判断
if (DEBUG) {
  plugins.push(new webpack.HotModuleReplacementPlugin({multiStep: true}));

  plugins.push(new HtmlWebpackPlugin({
    title: 'Development',
    template: path.resolve(__dirname, 'src/dev/index.html')
  }));
  //指定打包的入口文件
  entry = [
    './dev/entry.js',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/dev-server'
  ];
} else {
  entry = {soshPCShare: './js/index.js'};
  //配置输出文件夹的路径和键值
  output.library = 'soshPCShare';
  output.libraryTarget = 'umd';
  output.umdNamedDefine = true;
}

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: entry,
  output: output,
  plugins: plugins,
  module: {               //定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?minimize!postcss!sass'
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif)$/,
        loader: 'url?limit=20000&name=img/[name].[ext]'
      },
    ]
  },
  resolve: {extensions: ['', '.js', '.scss']},  //定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
  postcss: [autoprefixer(autoprefixerConfig)],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    inline: true,  //热更新inline模式
    noInfo: false,
    stats: {
      colors: true,
      chunks: false
    }
  }
}
