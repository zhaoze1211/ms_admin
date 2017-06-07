#基于Vue2.0搭建的前端组件化单页面应用

###安装

项目地址：http://rui.lingketech.com

通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js])

```
npm install
```
启动服务(http://localhost:8090)

```
node server.js
```
发布代码
```
npm run dist
```

###开发

###目录结构
<pre>
.
├── README.md           
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── libs           // 各种工具方法、过滤器
│   ├── plugins        // Vue插件
│   ├── views          // 各种页面
│   ├── vuex           // vuex状态管理器
│   ├── main.js        // Webpack 预编译入口
│   └── routers.js     // Vue-router 路由配置
├── server.js          // webpack-dev-server服务配置
└── webpack.constants.js  // Webpack 配置文件
</pre>

