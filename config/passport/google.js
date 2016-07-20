
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
// GOOGLE AUTH =========================
// =====================================
module.exports = new GoogleStrategy({
        clientID: '947227472989-d2i27nlkn6la0gfdmlaocs2ah6aaa4tr.apps.googleusercontent.com',
        clientSecret: 'LDZUY-y4KPijlulViqLR7wlh',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        pool.getConnection(function(err, connection) {
            connection.query('SELECT EXISTS ( SELECT * FROM member WHERE member_AuthId = ?);',
            ['google:' + profile.id], function(err, rows) { // 계정이 있으면 1, 없으면 0
                if (err) {
                    console.error(err);
                    connection.rollback(function () {
                        console.error('rollback error');
                        throw err;
                    });
                }


                var auth_Id = Number(JSON.stringify(rows[0]).split(':')[2].match(/\d+/)[0]);
                // 계정이 DB에 등록되었는지 확인하는 변수 0 또는 1


                if (auth_Id == 1) { // 계정이 등록된 경우
                    var user = {
                        'id' : profile.id,
                        'displayName' : profile.displayName,
                        'provider' : profile.provider
                    };

                    console.log("mysql : already exist");

                    return done(null, user);
                }
                else { // 계정이 등록되지 않았던 경우
                    connection.query('INSERT INTO member VALUES (?, ?, ?, ?)',
                    ['google:' + profile.id, getRandomCode(45), profile.emails[0].value, profile.displayName],
                    function(err, rows) {
                        if (err) {
                            console.error(err);
                            connection.rollback(function () {
                                console.error('rollback error');
                                throw err;
                            });
                        }
                    });

                    connection.query('INSERT INTO bucketlist VALUES (?, ?, ?, ?, ?, ?)',
                    ['google:' + profile.id, 0, "START", "0000-00-00", "ACHIEVED", "DESCRIPTION"],
                    function(err, rows) {
                        if (err) {
                            console.error(err);
                            connection.rollback(function () {
                                console.error('rollback error');
                                throw err;
                            });
                        }

                        console.log('insert into bucketlist starting');
                    });

                    connection.query('INSERT INTO mandal VALUES (?, ?, ?, ?)',
                    ['google:' + profile.id, 0, "START", null],
                    function(err, rows) {
                        if (err) {
                            console.error(err);
                            connection.rollback(function () {
                                console.error('rollback error');
                                throw err;
                            });
                        }

                        console.log('insert into mandal starting');
                    });

                    var user = {
                        'id' : profile.id,
                        'displayName' : profile.displayName,
                        'provider' : profile.provider
                    };

                    console.log("mysql : add in database");

                    return done(null, user);
                    // DB에 추가
                }
            });

            connection.release();
        });
        console.log(profile.id);
        done(null, profile);
    }
);