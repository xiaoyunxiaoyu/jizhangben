var express = require('express');
var router = express.Router();
const moment = require("moment");

const AccountModel = require('../../models/AccountModel');

const loginCheckMiddleware = require('../../middlewares/loginCheckMiddlewares');

/* GET home page. */
router.get('/', loginCheckMiddleware, function (req, res, next) {
    res.render('account')
});

router.post('/', function (req, res, next) {
    AccountModel.create(req.body).then(result => {
        console.log('res:', result);
        const message = result ? '操作成功' : '操作失败'
        res.render('status', {message, link: '/records'});
    })
});

router.get('/records', loginCheckMiddleware, function (req, res, next) {
    AccountModel.find().then(list => {
        res.render('list', {list, moment});
    })
});

router.get('/records/:id', loginCheckMiddleware, function (req, res, next) {
    const {id} = req.params;
    AccountModel.findByIdAndDelete(id).then(result => {
        const message = result ? '操作成功' : '操作失败'
        res.render('status', {message, link: '/records'});
    })
});


module.exports = router;
