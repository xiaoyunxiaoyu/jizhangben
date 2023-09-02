const express = require('express');
const md5 = require("md5");
const jwt = require('jsonwebtoken');
const AuthModel = require("../../models/AuthModel");
const {SECRET} = require("../../config/config");
const router = express.Router();

router.post('/login', async (req, res) => {
    const {userName, password} = req.body;
    if(userName.trim() && password.trim()) {
        // 根据用户名获取用户数据
        const result = await AuthModel.findOne({userName,password: md5(password)});
        if(result) {
            // 创建token
            const token = jwt.sign({userName, password, id: result._id}, SECRET, {
                expiresIn: 60 * 60 * 24 * 7 // 一周
            })
            res.json({
                code: '200',
                msg: '成功',
                data: token
            })
            return;
        }
        res.json({
            code: '200',
            msg: '用户名或密码不正确',
            data: null
        })
    }else {
        res.json({
            code: '200',
            msg: '用户名和密码必填',
            data: null
        })
    }
})

module.exports = router;
