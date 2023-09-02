module.exports = (req, res, next) => {
    if(!req.session.userName) {
        return res.redirect('/login');
    }
    next();
}
