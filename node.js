var config = require("./webpack.config.js");
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'src/dev',
    publicPath: "/dist/"
});
server.listen(8080);