# wechaty-plugin-robot
wechaty plugin robot



## 介绍

这是一个使用插件堆积起来的微信机器人，使用极其简单，除去插件的配置项，大概只用了10来行代码

关于此项目实现的功能及背景包括所使用插件的一些详细介绍，请看下面这篇帖子👇👇👇

[wechaty plugin|实现一个微信机器人几行代码即可]()





## 使用

### step 1

首先，你需要先将此项目 `clone` 到本地

然后在项目根目录新建一个 `config.js` 文件，填入以下内容

```js
module.exports = {
  PUPPET_PADPLUS_TOKEN: "你申请的Token",
  ROBOT_NAME: "你的机器人名字",
}
```



### step 2

你需要安装依赖，在项目根目录下执行以下命令

```js
npm install

// or

yarn install
```



### step 3

运行代码

```js
node index.js

// or

npm run serve

// or

yarn serve
```





## 最后

欢迎加微信机器人「圈子」来体验一波，也可以加入交流群一块交流，公众号「不正经的前端」也欢迎大家关注

![](https://gitee.com/IsboyJC/PictureBed/raw/master/other/image-20200713201421436.png)