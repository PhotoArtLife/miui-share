学习webpack，基本始终是围绕：

　　1.如何安装webpack
  
　　2.如何使用webpack
  
　　3.如何使用loader
  
　　4.如何使用开发服务器
  

　　可能我们会在如何使用开发服务器的时候，遇到诸如调试的相关问题：

　　使用开发服务器：我们webpack中使用的开发调试服务器通常是 webpack-dev-server，通过这个服务我们更多的是想实现无刷新的处理编译入口文件。　

　　通过以下命令全局安装
  	
    1：npm install webpack-dev-server -g
    
　　启动服务器
  
  	2：webpack-dev-server --progress --colors
    
　　这会绑定一个小型express服务器到localhost:8080，来为你的静态资源及bundle（自动编译）服务。
    通过访问http://localhost:8080/webpack-dev-server/bundle，bundle每次重编译后浏览器页面都会自动更新。

　　但这里可能会遇到，我们改动js文件，无法实时更新的问题，很大一部分原因是没有理解编译后的bundle是虚拟的问题，本地其实质是没有编译的，所以我们不能用本地的路径去处理，需要进行更改为http://localhost:8080/bundle.js.

　　我们可能预想实现无刷新是这样的：
    js 文件修改，webpack-dev-server 监控到变化，webpack 重新编译，实时更新浏览器中的页面，但可惜的是，http://localhost:8080/index.html 对 js 文件的变化无动于衷，改完之后，手动刷新才能生效。

　　webpack-dev-server 提供了两种模式用于自动刷新页面：
  
     1：iframe 模式，我们不访问 http://localhost:8080，而是访问http://localhost:8080/webpack-dev-server/index.html
     
     2：inline 模式，在命令行中指定该模式，webpack-dev-server --inline。
     这样http://localhost:8080/index.html 页面就会在 js 文件变化后自动刷新了。
    

 可以在package.json的scripts里面加上执行命令：

"scripts": {
 
    "start": "webpack-dev-server --inline --hot",
    
    "build": "webpack --display-error-details",
    
    "watch": "webpack --progress --colors --watch"
    
  },


解释一下官方推荐的无刷新：

示例代码：package.json

"scripts": {

    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
    /*build导致找不到页面 cannot file*/
    "hot": "webpack-dev-server  --devtool eval --progress --colors --hot --content-base",
  }

示例代码：webpack.config.js

module.exports = {

    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, './src/entry.js')
    ]
};

官方的无刷新，其实是在前面讲到的iframe实现的实时刷新，如果我们，至进行http://localhost:8080/index.html是不会进行实时刷新的。还有一点，就是官方后面加的build，作用时让其监测，打包出bundle.js，但亲测会导致，到cannot page file， 所以建议，调试完毕之后，手动打包。

注意：通常我们设置好webpack-dev-server服务自动刷新预览功能之后，发现手机预览不了，其实是由于webpack-pack-server服务安全机制导致的，只允许本机访问，我们可以把host设置为0.0.0.0就可以允许或者设置为本机地址。

解决参考资料：
  
stackoverflow问答：

http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router

stackoverflow问答2：

http://stackoverflow.com/questions/30064746/webpack-dev-server-test-on-mobile

github isuues：

https://github.com/webpack/webpack-dev-server/issues/160

最后，给大家一个建议，多看官方的示例文档，这才是快速入门的最佳渠道：
webpack官方文档：https://webpack.github.io/docs/tutorials/getting-started/#development-server　
