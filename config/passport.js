'use strict';

/*!
 * Module dependencies.
 */

const local = require('./passport/local');
const google = require('./passport/google');
const facebook = require('./passport/facebook');
// const twitter = require('./passport/twitter');

/**
 * Expose
 */

module.exports = function (passport) {

  // serialize sessions
  passport.serializeUser(function(user, done) {
    // user : LocalStrategy 객체의 인증함수에서 done(null,user)에 의해 리턴된 값이 넘어옴
    console.log('serialize');

    done(null, user); // session에 저장할 정보
});
// 로그인에 성공하면 사용자 정보를 세션에 저장

passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    /*pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM member WHERE id = ? ",[user.id], function(err, rows){
            done(err, rows[0]);
        });

        connection.release();
    })*/
    console.log("[user] : " + JSON.stringify(user));        

    done(null, user);
});
// node.js의 모든 페이지에 접속할 때마다 호출, 사용자 정보를 세션에서 읽어옴

// 호출될 때마다 매번 사용자 id 또는 email을 이용하여 DB에서 추가로 정보를 가져옴
// 하지만 이 방식은 DB 접근이 너무 잦기 때문에 비추천
// 저장할 데이터가 너무 크지 않은 이상 사용자 로그인 데이타를 모두 serialize시에 session에 넣는 것을 권장
// 데이터가 너무 많으면 redis와 같은 외부 메모리 DB를 이용해서 저장



  // use these strategies
  passport.use(local);
  passport.use(google);
  passport.use(facebook);
//   passport.use(twitter);
};