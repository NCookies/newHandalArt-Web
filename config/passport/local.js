
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var flash = require('connect-flash');

var pool = mysql.createPool({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'mysqlhandalart3576!',
    database : 'handalart',
    connectionLimit : 20,
    waitForConnections : false
});


// =====================================
// LOCAL AUTH ==========================
// =====================================
module.exports = new LocalStrategy({
        usernameField : 'id', // user email
        passwordField : 'password', // user password
        passReqToCallback : true
        // 인증을 수행하는 인증 함수, HTTP request를 그대로  전달할지 여부
    },
    function(req ,userid, password, done) {
        var account;

        var id = userid;
        var passwd = password;

        console.log("[id] : " + id);
        console.log("[password] : " + passwd);


        console.log("id : " + "local:" + id);

        pool.getConnection(function(err, connection) {

            connection.query("SELECT * FROM member WHERE member_AuthId = ?",
            ['local:'+id], function(err, rows) {
                if (err) {
                    console.error(err);
                    connection.rollback(function () {
                        console.error('rollback error');
                        throw err;
                    });
                }

                if (JSON.stringify(rows) == "[]") {
                    console.log("No Account");
                    return done(null, false,
                    { message : '존재하지 않는 계정입니다.'});
                }

                account = JSON.parse(JSON.stringify(rows));


                if (userid != account[0].member_AuthId.split(':')[1]) {
                    return done(null, false,
                    { message : '잘못된 아이디입니다.'});
                } 
                
                if (password != account[0].member_Password) {
                    return done(null, false, { message : '잘못된 비밀번호입니다.'});
                } else {
                    var user = {
                        'id' : account[0].member_AuthId,
                        'displayName': account[0].member_DisplayName,
                        'provider' : 'local'
                    }
                    //'id': rows[0].member_AuthId };
                    return done(null, user);
                }
            });

            connection.release();
        });
    }
);