var express = require('express');
var router = express.Router();

const AccountModel = require('../../models/AccountModel');
const verifyToken = require('../../middlewares/verifyToken');

// 新增账单
router.post('/account', verifyToken, function (req, res, next) {
    // 验证
    if (!req.body.projectName) {
        res.json({
            code: '200',
            msg: 'projectName不能为空',
            data: [],
        })
        return;
    }
    AccountModel.create(req.body).then(result => {
        const message = result ? '操作成功' : '操作失败'
        res.render('status', {message, link: '/records'});
    })
});

// 通过id获取单个账单
router.get('/records/:id', verifyToken, function (req, res, next) {
    const {id} = req.params;
    AccountModel.findById(id).then(result => {
        res.json({
            code: "200",
            msg: '成功',
            result
        })
    })
});

// 获取账单列表
router.get('/records', verifyToken, function (req, res, next) {
    console.log('user', req.user);
    AccountModel.find().sort({time: -1}).exec().then(data => {
        res.json({
            code: "200",
            msg: '成功',
            data
        })
    })
});

// 删除账单
router.delete('/records/:id', verifyToken, function (req, res, next) {
    const {id} = req.params;
    AccountModel.findByIdAndDelete(id).then(result => {
        res.json({
            code: "200",
            msg: '成功',
            result
        })
    })
});

// 更新账单
router.patch('/records/:id', verifyToken, function (req, res, next) {
    const {id} = req.params;
    AccountModel.updateOne({_id: id}, req.body).then(result => {
        res.json({
            code: "200",
            msg: '成功',
            result
        })
    })
});

module.exports = router;
