#搭建环境
*  安装 NodeJS  https://nodejs.org/en/
* 安装 MongoDB https://docs.mongodb.org
* 安装 Git     https://git-scm.com/downloads
* 安装 ionic   sudo npm install -g ionic
* 安装 cordova sudo npm install -g cordova
* 如果需要进行android，ios开发，需要安装android sdk 和xcode， 如果还没安装xcode，需要运行 sudo npm -g install ios-sim
   安卓sdk要求 Android 4.0+ (though 2.3 should work) ，IOS iOS 6+

* 下载 Z project from github
* 在根目录下执行下 npm install
* 在根目录下执行下 bower install

## 主要目录介绍
*  z_web web网站平台,浏览器访问
    编辑less跟js后运行gulp web 合并js,css代码到dist目录，（没有dist目录会自动生成）

*   z_app 混合app应用，用ionic,cordova编译，ios真机测试还需要借助xcode
    编辑less跟js后运行gulp app 合并js,css代码到dist目录，（没有dist目录会自动生成）
    在z_app目录下执行以下命令：
  *  npm install，    //安装服务端依赖包
  * bower install，  //安装前端依赖包
  * node tasks/platforms.js  //自动添加平台ios和android
  * node tasks/plugins.js   //添加cordova相关插件
  * ionic resources        //生成不同尺寸启动页面和logo

*   z_server 服务器后台相关
    编辑完后如有单元测试，需要运行gulp test 运行单元测试

## 开发账户
*  高德地图： 
   *  key: 668357c087be3d853a8256f478814907
   *  绑定服务： JS API
*  微信
   *  微信开发者账户
      *  https://open.weixin.qq.com
      *  user: chenzhixun@outlook.com
      *  password: GoDouJiao16$$
   *  微信服务号
      *  https://mp.weixin.qq.com/
      *  user:  qianchenhao@hotmail.com
      *  password:doujiaonb
