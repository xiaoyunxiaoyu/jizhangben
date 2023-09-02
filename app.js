var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo');
var logger = require('morgan');

var indexRouter = require('./routes/web');
var usersRouter = require('./routes/web/users');
var authRouter = require('./routes/web/auth');
var accountRouter = require('./routes/api/account');
var authApiRouter = require('./routes/api/auth');
var {DBNAME, DBHOST, DBPORT} = require('./config/config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'sid', // 设置cookie的name,默认值是：connect.sid
    secret: 'hezhiyun', // 参与加密的字符串(又称签名)  加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    resave: true, // 是否在每次请求时重新保存session  为true的话，客户一直操作就不会掉线，不然到设置的时间之后就会掉线，相当于更新时间
    store: MongoStore.create({
        mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, // 数据库链接配置，配了之后操作session会自动更新数据的session数据，不配置的话，session会默认在内存里面
    }),
    cookie: {
        httpOnly: true, // 开启后前端无法通过js获取当前cookie,开启后响应报文Set-Cookie会有httpOnly标志
        maxAge: 1000 * 60 * 10, // cookie失效时间
    },
}))

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('404')
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
