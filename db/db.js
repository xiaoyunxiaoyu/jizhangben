// 1、安装 npm i mongoose
// 2、引入mongoose
const errFn = () => {
    console.log('链接失败');
}
module.exports = function(success, error= errFn) {
    const mongoose = require('mongoose');
    const {DBHOST, DBNAME, DBPORT} = require('../config/config');

// 3、链接mongo服务 mongodb => 协议   127.0.0.1 ip   27017 => 服务端口号   bilibili => 数据库名称
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

// 4、链接成功回调  once  事件回调函数只执行一次  如果数据库服务突然断线了，会尝试重新链接数据库服务，链接上了不会再执行回
// 调函数的代码，on绑定的话会重新执行，官方推荐使用once
    mongoose.connection.once('open',() => {
        success();
    })

// 链接失败回调
    mongoose.connection.on('error',() => {
        error();
    })

// 关闭成功回调
    mongoose.connection.on('close',() => {
        console.log('关闭成功')
    })

// setTimeout(() => {
//     // 关闭链接
//     mongoose.disconnect();
// }, 2000)
}

