const express = require('express');
const router = express.Router();
const md5 = require('md5');
const AuthModel = require('../../models/AuthModel');

router.get('/reg', (req, res) => {
    res.render('auth/reg')
})

router.post('/reg', async (req, res) => {
    const {userName, password} = req.body;
    if(userName.trim() && password.trim()) {
        const result = await AuthModel.find({userName})
        if(result.length) {
            res.render('status', {message: '用户名已存在，请重新输入', link: '/reg'});
            return;
        }
        AuthModel.create({userName, password: md5(password)}).then(result=> {
            if(result) {
                res.render('auth/login')
            }
        })
    }else {
        res.render('status', {message: '用户名和密码必填', link: '/reg'});
    }
})

router.get('/login', async (req, res) => {
    res.render('auth/login');
})

router.post('/login', async (req, res) => {
    const {userName, password} = req.body;
    console.log('body', req.body);
    if(userName.trim() && password.trim()) {
        // 根据用户名获取用户数据
       const result = await AuthModel.findOne({userName,password: md5(password)});
       if(result) {
           // 设置session
           req.session.userName = userName;
           req.session._id=result._id;
           // 用户名和密码都正确，则跳转记账页面
           res.redirect('/');
           return;
       }
       res.render('status', {message: '用户名或密码不正确，请重新登录', link: '/login'})
    }else {
        res.render('status', {message: '用户名和密码必填', link: '/login'});
    }
})

router.post('/logout', async (req, res) => {
    console.log("有请求");
    req.session.destroy();
    res.render('auth/login');
})

module.exports = router;
