const jwt = require("jsonwebtoken");
const {SECRET} = require("../config/config");
const verifyToken = (req, res, next) => {
    const token = req.get('token');
    if(!token) {
        res.json({
            code: "200",
            msg: 'token缺失',
            data: null
        })
        return;
    }
    let errFlag = null;
    jwt.verify(token, SECRET, (err, data) => {
        errFlag = err;
        if(err) {
            res.json({
                code: "200",
                msg: 'token不正确',
                data: null
            })
        }else {
            req.user = data;
        }
    })
    // token验证失败不往下执行，在jwt.verify回调里面return不生效；
    if(errFlag) {
        return;
    }
    next();
}
module.exports = verifyToken;
