# 작업일지

> ## 3/24
- JavaScript 기초 문법 공부

***

> ## 3/28
- JavaScript(jQuery) & HTML & CSS 예제 만들며 공부

***

> ## 3/31
- jQuery를 통해 마우스 휠 이벤트를 받아 화면 확대, 축소 테스트
- 웹 사이트의 레이아웃을 나누기 위해서 div 공부 및 테스트

***

> ## 4/5
- html 만다라트 레이아웃을 나눔
- 3x3 모양을 만듬으로써 각각의 div에 table 만들 준비
- div에 다시 3x3 직사각형 모양의 table 제작 및 css로 칸 크기 및 글자 고정 mandalarttable_4_5
![mandal_table](https://cloud.githubusercontent.com/assets/16646208/14281718/b0d76294-fb75-11e5-90d5-3f25883bfc5d.PNG)

***

> ## 4/7
- table의 html 파일 분리
- html 파일이 로드되지 않는 오류 해결
- css 파일을 따로 저장한 후 불러오려 했으나 실패

***

> ## 4/8
- css 파일 분리한 것을 다시 합침
- html 테이블 내에 텍스트 입력 방법 조사 중

***

> ## 4/10
- css 파일 분리 후 불러오기 성공
- 마우스 휠 이벤트 적용(만다라트 테이블 확대/축소)
- 더블 클릭 후 테이블 내에 내용 수정 기능 진행 중

***

> ## 4/12
- MandalArt 테이블 내용 입력 로직 재설계
- 더블 클릭 후 테이블 내에 내용 수정 기능 완료(addClass 메소드, readonly 속성 이용)
- 위의 내용을 input type="text"로 하였으나 MultiLine이 되지 않아 textarea로 대체
- 그러나 ellipsis(칸을 넘어가면 ...으로 보여주는 속성) 를 적용할 수 없어 해결 방안을 찾는 중
```
$(document).ready(function() {
    $('td').dblclick(function(e) {
        var input_table = $(this); // 선택한 테이블의 Text Field에 접근하기 위해 변수 선언, Text Field이 선택됨
        var article;
        $(input_table.children().first()).addClass("input-field");
        $(input_table.children().first()).attr("readonly", false); // 더블클릭 이벤트를 받았을 때 Text Filed 편집 가능
        $('.input-field').on('keydown', function(event) { 
            // Enter 입력 이벤트
            if (event.keyCode == 13) {
                event.stopPropagation();
                article = $('.input-field').val();
                $('td #text-field').removeClass('input-field').attr("readonly", true);
            }
        });
        $(document).on('click', function(event) { 
            // 해당 Text Field 영역을 제외한 클릭 이벤트
            if ($(event.target).closest('.input-field') > 0) {
                console.log('clicked');
                return;
            }
            else {
                event.stopPropagation();
                article = $('.input-field').val();
                $('td #text-field').removeClass('input-field').attr("readonly", true);
            }
        });
    });
});
```

***

> ## 4/18
- 지금까지 진행한 프로젝트 내용 팀 멤버들의 소스 코드 수합 및 링크 연결
- 소스 파일 및 이미지 파일 네이밍 수정
- 발표 자료 제작 및 준비

![_](https://cloud.githubusercontent.com/assets/16646208/14730830/06725fb2-0885-11e6-8387-72176f55c686.PNG)

***

> ## 4/19
- 수합한 소스 파일들을 html, css, js 별로 나누어서 저장
- 이미지 링크 서버에서 통합적으로 제공
- 로고 및 아이콘 디자인 통일
- html5 시맨틱 태그 추가
- **GITLAB**
- gitlab 쓸데없는 브랜치 제거
- gitlab master 브랜치에 등록 
- 새로운 브랜치 생성(mandal, bucket_list, calendar, document)

***

> ## 4/21
- Zoomooz라는 jQuery Plugin을 이용하여 zoom 기능 구현
- 마우스 휠 이벤트를 받아 확대시키는 기능 삭제
- 표를 드래그할 수 있는 기능 삭제
- 텍스트 입력 가능 상태를 더블 클릭에서 클릭 한 번으로 교체
- gitlab 업데이트

***

> ## 4/23
**상세 설계 변경**
- 테이블을 불러올 때 text-filed 또는 text-area는 기본적으로 보이지 않게 해야 함
- 칸 위에 마우스를 올렸을 때 작은 버튼이 보이고 그것을 누르면 ~~토스트로 text-filed가 떠야함~~ readonly attr이 false로 바뀜
- ~~text-field 에 입력을 하면 실시간으로 테이블 내의 텍스트에도 입력이 됨~~
- 각 테이블의 가운데 칸과 정중앙의 테이블 class="zoomTarget"
- 정중앙 테이블 class="mandal-center"
- jQuery Plugin Zoomooz 적용

***

> ## 4/24
- 상세 설계 변경 내용 적용(4/23 일지 참고)
- mandal_table.css 파일 내용 이전 및 삭제
- 정중앙 테이블들을 클릭했을 때 Zoomooz가 해당하는 칸으로 이동하도록 설정해야 함
- 글자 수 제한 기능 적용 X
- javascript 소스 코드 깔끔하게 정리
![_2016_04_24](https://cloud.githubusercontent.com/assets/16646208/14767823/c3b6408e-0a6a-11e6-9b02-7ed8985d96e6.PNG)

***

> ## 4/25
- mandal-center div에 마우스를 올렸을 때 zoomTarget 클래스 추가 -> zoomooz 적용 가능
- mandal-center 테이블에 id 추가(jQuery)
- 이벤트가 꼬여 있음(click, mouseover, mouseleave 등)

***

> ## 4/26
- mandal_table.html에서 mandal-center 에 위치할 테이블을 mandal_table_center.html 로 분리
- mandal_table.js가 각각 두 번 호출되어 텍스트 영역과 버튼이 두 개씩 생기는 오류 발생
- mandal_table.js 삭제 및 mandal_main.js로 통합
- 이벤트가 실행되지 않는 오류 발생

***

> ## 4/27
- table과 center html 파일이 중복 로드되는 오류와 이벤트가 발생하지 않는 오류를 해결하기 위해 
mouseover 이벤트로 html 파일이 로드된 뒤에 이벤트를 설정하도록 함(임시적인 대처, 수정 필요)
- 칸을 눌렀을 때 해당하는 위치로 zoom 되는 기능 보완(zoomooz, div 영역 안에서 확대 되지 않음, 수정 필요)

***

> ## 4/28
- zoomooz 기능에서 window 전체가 확대 되는 것을 div 안으로 한정시키기 위해 코드를 수정함(실패)

***

> ## 4/29
- zoomooz 기능에서 window 전체가 확대 되는 것을 div 안으로 한정시키기 위해 코드를 수정함(실패)

***

> ## 4/30
- zoomooz 기능에서 window 전체가 확대 되는 것을 div 안으로 한정시키기 위해 코드를 수정함(성공)
- div 안에서 확대가 되지만 다시 원 상태로 돌아오는 것이 되지 않음
- 오류를 수정하다가 zoomooz 기능 자체가 작동하지 않게 됨, 원인 불명
`jquery.zoomooz.min.js:1 Uncaught TypeError: Cannot read property 'inverse' of null`

***

> ## 5/2
- zoomooz 오류 수정 완료(이벤트 적용 부분이 틀렸기 때문)
```
$(document).on('dblclick', function(e)
$('.zoomTarget').on('dblclick', function(e)
```
- Zoomooz reset 가능  
`$(this).zoomTarget(zoom_settings); // .zoomTarget을 준비상태로`

***

> ## 5/2
- mouseover 이벤트로 html을 로드해오는 것이 불편하여 직접 다 옮김(동적 X)
- 그랬더니 zoomooz 기능에 오류가 생김 : 줌이 두 번 되거나 배율이 맞지 않음
- 글자 수 제한 기능 보완(글자 수가 max일 때 백스페이스를 입력하면 경고가 뜸)

***

> ## 5/11 ~ 5/14
- STAC(SKT Smart App Challange) 2016 보고서 작성
- 만다라트 표에 색깔 삽입
- document 브랜치 추가(보고서, 문서 작성 시 이미지 등)
- 작업 내용 origin/master 브랜치에 push

***

> ## 5/15
- server 브랜치 생성

***

> ## 5/16
- ejs 템플릿 엔진 적용
: html 디렉터리 삭제, view 디렉터리 생성 및 기존 html 파일들의 확장자들을 ejs로 바꾸어서 넣음
- origin/server 브랜치와 origin/master 브랜치 병합(merge)
- day_calendar 브랜치 생성(유미림, 일간 계획표)

***

> ## 5/17
- 조원 로컬 저장소 origin/master 브랜치에서 pull 및 각자 브랜치에 push(강석진 마이다스 면접 -> 아직 하지 않음)
- node.js Google API 테스트(실패, 원인은 잘 모르지만 시간을 조금 더 투자한다면 성공할 수 있을 듯)
- jQuery Plugin인 FullCalendar가 php 위에서만 돌아간다고 함 -> node.js로 돌려봄 -> 성공
-> 캘린더 파트는 빠른 시일 내에 끝낼 수 있을 듯

***

> ## 5/18
- 서버 ejs 템플릿 엔진 실험
- obj 인자 전달
app.js
```
var ejsObj = {
    FinalTarget : '최종목표',
    SubTarget1 : '세부목표1',
    ....
}
res.render('mandal_main', {obj : ejsObj});
```
mandal_main.ejs
```
var jsonObj = <%- JSON.stringify(obj) %>; // 인자로 전달받은 obj를 json 객체로 변환
//
var string  = 'Sub1_act1'; // 문자열로 객체에 접근할 수 있는지 실험
alert(jsonObj[string]); // 가능함
//
$.each(jsonObj, function(index, value) {
    console.log(jsonObj[index] + index); // each 문을 통해서도 객체에 접근 가능
}); 
```

***

> ## 5/19
- 데이터베이스와 연동이 되어있다고 가정하고 json을 ejs를 통해 가져옴(성공)
app.js
```
var subTargets = 
		[{
			"id" : "act1_1",
			"article" : "세부목표1"
		}, 
                ...
                }]
var actions = 
		[{
			"id" : "act1_1",
			"article" : "실천사항1"
		}, 
                ...
                }]
var jsonObj = {
		FinalTarget : "최종목표",
		subTargets : subTargets,
		actions : actions
	}
```
mandal_main.ejs
```
var finalTar = jQuery.parseJSON('<%- JSON.stringify(jsonObj.FinalTarget) %>');
var subTar = jQuery.parseJSON('<%- JSON.stringify(jsonObj.subTargets) %>');
var actions = jQuery.parseJSON('<%- JSON.stringify(jsonObj.actions) %>');  
$.each(subTar, function(index, value) {
    $('#mandal1').children('.table-article');
    console.log(subTar[index].article);
});  
$.each(actions, function(index, value) {
    console.log(actions[index].article);
});
```
- fullcalendar 드래그 안 되는 문제 해결(jquery-custom-ui 버전 문제인듯)
- 테이블 안에 p 태그 추가(내용 입력 위해)
- 서버에서 받아온 데이터를 적절한 곳에 넣는 코드 작성 중(id 순회?)

***

> ## 5/20
- 클라이언트와 서버가 만다라트 데이터를 주고 받을 때 굳이 json 형식으로 힘들게 하지말고 
  배열로 한 번에 보내주는 게 어떨까
- 이 방법이 더 간단해 보이고 쉬운 것 같음. 데이터들의 순서는 정해져있기 때문에 그대로 옮기면 될듯.
- 기존에 만다라트에 프롬포트로 입력을 받아서 p 태그에 텍스트를 삽입하는 방식을 따로 추가하지 않고
  input에 type="hidden" 으로 하여 결과적으로 사용자에게는 보이지 않지만 서버로 보내지는 데이터는 같도록 함.
mandal_main.js
```
$("td")
.append('<input type="button" value="" class="input-button">')
.append('<p class="text-field"></p>')
.append('<input type="hidden" name="mandalArticle" class="hidden-field">');  
$(this).next('.text-field').text(text)
            .next('.hidden-field').val(text);
```

***

> ## 5/21
- 서버와 클라이언트 사이에 배열 객체를 전달하여 데이터를 주고 받을 수 있게 함
```
var mandalData = jQuery.parseJSON('<%- JSON.stringify(jsonObj) %>');
$('.table-article').each(function(index) {
	$(this).children('.text-field').text(mandalData[index])
	.next('.hidden-field').val(mandalData[index]);
});
```

***

> ## 5/23
- zoomooz 기능 오류 없이 정상적으로 작동
- 만다라트 주요 기능 완성

***

> ## 5/25
- 마스터 계정 생성(jungjung@gmail.com, qkqh) 및 로그인 세션 유지
- express-session을 사용하려고 하였으나 구체적인 구현 방법을 잘 몰라 passport라는 미들웨어를 사용하기로 함

***

> ## 5/26
- 로그인 기능 구현 및 세션 유지 성공
- 하지만 로그인이 된 상태라도 로그인 폼이 그대로 있어서 로그아웃할 수 없음
- 토글을 사용하려고 하였지만 어떻게 해야할지 잘 모르겠음
- 그래서 ejs 인자로 로그인 세션 id를 받아 확인하여 세션이 있으면 로그아웃 버튼이 생기게 하고 그렇지 않으면 로그인 폼이 보이도록 함    
**login.ejs**
```
$(document).ready(function() {
    var userEmail = jQuery.parseJSON('<%- JSON.stringify(user) %>');
    if (userEmail) {
      $('#log_form').html('<%- include logoutform.ejs %>')
      .children('.user-email').text('Welcome ' + userEmail.email + '!!');
    } else {
      $('#log_form').html('<%- include loginform.ejs %>');
    }
});
```
**app.js**
```
app.get('/login', function(req, res) {
	var uemail = JSON.stringify(req.user);	// req.user는 deserializeUser에 의해서 저장된 사용자 정보를 꺼내볼 수 있음
                                                // req.user : { email : "jungjung@gmail.com" }
	if (typeof uemail == "undefined")  res.render('login', { user : false})
	else  res.render('login', { user : req.user });			
});
```
- Before Login(/login)
![default](https://cloud.githubusercontent.com/assets/16646208/15575460/f95642fc-238d-11e6-9141-1228adeafc41.PNG)
- After Login(/login)
![default](https://cloud.githubusercontent.com/assets/16646208/15575459/f9339b1c-238d-11e6-9e78-31aa3cd7378c.PNG)

***

> ## 5/28 ~ 5/29
- 자체 로그인 세션 유지 기능 구현 후 페이스북 계정 연동 시도
- 연동하는 것은 성공하였지만 세션 데이터에서 정보를 파싱하는 것에 실패함
- 페이스북 세션을 json 파싱하려고 하자 `unexpected token n in JSON` 오류가 발생하며 데이터를 얻어올 수 없음
- 서버 사이드에서나 클라이언트 측에서나 파싱을 하려고 하자 오류가 발생함

***

> ## 5/30
- 파싱 오류를 해결하려고 여러가지 시도를 하다가 소스가 꼬임
- 이후 다시 해봤지만 결국 실패함 

***

> ## 5/31
- 결과적으로는 JSON 파싱하는 것을 포기함
- http://nodeqa.com/nodejs_ref/83 블로그에서 해결책을 찾게 됨
- app.js 파일에서 ejs로 인자를 전달할 때 `req.session.passport.user`로 주면 json 값을 파싱하지 않아도 서버 사이드에서 해결 가능  
**app.js**
```
app.get('/login', function(req, res) {
	var account = req.user;
	if (typeof account == "undefined") {
		res.render('login', { user : false});
	} // 로그인 되어 있지 않을 때
	else {
		if (account.email) { // 사이트 자체 로그인
			res.render('logout', { user : req.session.passport.user.email });
		} else { // 외부 계정 연동
			res.render('logout', { user : req.session.passport.user.displayName || {} });			
		}
	} // 로그인 세션이 있을 때
});
```
- 이 문제를 해결한 후 같은 방법으로 구글 계정 연동 성공(트위터 연동은 휴대폰 인증이 된 계정이 필요하여 연기)

***

> ## 6/1 ~ 6/5
- DB 연동이 끝나기 전까지는 해야할 일이 없음
- node.js에 대해서 심화를 공부하기로 함
- ubuntu 14.04에서 서버를 여는 방법, pm2(process manager), 클러스터, curl 등에 대해서 사이트에서 공부했음

***

> ## 6/6
- 우분투에서 서버 테스트
- IP 접속 시 서비스 이용 가능, 도메인을 구매하지 않아 IP를 입력해야 함

***

> ## 6/7
- 황수경이 calendar branch merge를 시도했지만 기존의 calendar_desing branch를 merge 했던 것 때문에 충돌 발생(같은 html 파일을 각각 다른 구조로 수정함)
- 직접 해보려고 했지만 제3자가 하기에는 힘들어서 담당했던 황수경과 정태균이 하도록 함

***

> ## 6/9
- 6/8일에 황수경, 정태균 둘이서 서로의 소스 코드를 맞춰보면서 수정을 하였고 충돌 문제를 해결함
- 그렇지만 gitlab 오류인지 ```Validate branches Cannot Create: This merge request already exists:```라는 오류가 발생하며 merge request 등록 자체가 안됨(충돌 문제를 해결하기 전에 한 번 merge request를 했었음, 기존의 것을 closed해도 같은 오류 발생)
- 그래서 server branch에 merge를 먼저한 다음 로컬에서 충돌을 일으키는 부분을 수정한 후 master branch에 merge함
- calendar 일정 추가, 수정, 삭제, 일정 드래깅 기능 추가 및 수정
![image](https://cloud.githubusercontent.com/assets/16646208/15918890/aadcc0ec-2e46-11e6-8a43-c334c25729b7.png)

***

> ## 6/10
- 발표를 하기 위해서 브랜치 병합 작업
- JAVA 프로젝트 프리뷰 발표
- 웹 사이트에 통일성 없음, 요구사항 제대로 받아들여지지 않음, 완성도 미흡, 기능 미완, DB 연동 안됨, 사용하고 싶지 않음 => 전체적으로 엉망임, 20점 만점에 2점
- PM : 일정 관리 및 팀원 역할 할당, 갈굼, 남의 작업을 도와주기보다는 전체적으로 통합 및 통솔
- 5, 6교시에 앞으로 해야할 일을 정리하고 팀원별로 역할 구분 및 수행(수정하는 파일이 겹치지 않게, branch merge 문제)
- 만다라트 모달 기능을 추가하려고 했으나 실패, 황수경과 역할 교체

***

> ## 6/11
- fullcalendar 언어 한국어로 변경 및 일간으로 확인할 시 /calendar/day로 링크가 넘어가도록 설정
- 처음 만다라트 제작 페이지에 들어갔을 때 스크롤 자동 이동(초기 상태는 확대 되었을 때 아래부분이 잘림)
- modal 띄우기 성공(기존에 되지 않던 이유는 js와 css를 불러오는 순서가 잘못되었었음)
```
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<script src='/vendor/modal.js'></script>
<link href='/css/modals.less' rel = 'stylesheet' type = 'text/css'>
```

***

> ## 6/12
- modal을 띄운 후에 버튼 이름 등 수정
- 엔터를 입력했을 떄 추가 버튼 trigger 설정
- 그 외 기타 세부 사항 수정(글자 제한, 보조 목표 연동 등)
- 기존에 있는 .input-button에 tooltip 적용
```
$("td").append('<input type="button" class="input-button btn btn-secondary" data-toggle="tooltip" title=" ">')
```
- 버튼에 마우스를 올리면 안에 생략된 내용도 볼 수 있음
- tooltip은 기본적으로 안의 내용을 수정할 수 없음, 따라서 다음과 같이 속성을 적용해야 함
```
$(this).children('.input-button')
        .css('visibility', 'visible')
        .attr("title", article) // 테이블에 마우스를 올리면 해당 칸에 버튼이 보임
         tooltip({
            placement: 'top',
            container: 'body'
         })
         .tooltip("fixTitle");
```
![image](https://cloud.githubusercontent.com/assets/16646208/15990783/8e06f7e0-30d9-11e6-9363-33fa04f47b20.png)
![image](https://cloud.githubusercontent.com/assets/16646208/15990790/b827f6b4-30d9-11e6-99cb-d7376df59b6a.png)
- 개인노트북에서 nodjs-mysql 연동 시도
- 딱히 오류는 없었지만 값을 꺼내오는 방법을 몰라서 테스트는 실패, 하지만 작동은 되는 듯

> ## 6/13
- mysql 연동 성공
```
var connection = mysql.createConnection({
    host :'localhost',
    port : 8080,
    user : 'root',
    password : 'password',
    database:'handalart'
});
connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
```
```
connection.query("select * from member where member_Email = ?", [userid], function(err, rows) {
	if (err) {
            console.error(err);
            connection.rollback(function () {
                console.error('rollback error');
                throw err;
            });
        }
	account = JSON.parse(JSON.stringify(rows));
```

> ## 6/16
- fullcalendar에서 일간 버튼을 클릭하면 기존의 틀은 그대로 있고 day_calendar 부분만 render하려고 했지만 실패함
- ajax 통신과 new EJS(...)를 이용하려 했지만 오류 발생 또는 동작이 제대로 되지 않음
- 만다라트에서 데이터를 서버에 전송한 후 데이터베이스에 삽입, 많은 시행착오를 겪었지만 결과적으로는 성공, 하지만 많은 문제점이 있음
- 우선 mandal_ultimate 테이블에서 모든 키를 기본키로 설정해야 데이터베이스에 데이터를 넣을 수 있음, 그렇기 때문에 중복되는 내용이나 빈 내용이 2개 이상 있으면 오류가 발생, 이러한 문제는 mandal_detail 테이블에서도 마찬가지로 발생
- 만약 로그인 세션이 없는 상태로 데이터를 보내려고 하면 오류 발생(DB에서 세션을 이용해 member_Id 값을 얻기 때문)
```
pool.getConnection(function(err, connection) {
        var mandalId;
        connection.query('select max(mandal_Id) from mandal_ultimate where member_Id = ?',//'select mandal_Id from mandal_ultimate where member_Id = ? order by mandal_Id desc limit 1'//
            [req.session.passport.user.id], function(err, rows) {
                mandalId = Number(JSON.stringify(rows[0]).match(/\d+/)[0]) + 1;
                // "max(mandal_Id)" : 1에서 '()' 때문에 키로 인식하지 못함
                for (var subIndex = 0; subIndex < 8; subIndex++) {
                    connection.query("insert into mandal_ultimate values(?, ?, ?, ?)",
                    [req.session.passport.user.id, mandalId, "bucket_1", req.body.subArticle[subIndex]], function(err, rows) {
                        if (err) {
                            console.error(err);
                            connection.rollback(function () {
                                console.error('rollback error');
                                throw err;
                            });
                        }
                    });
                }
                connection.query("insert into mandal_ultimate values(?, ?, ?, ?)",
                    [req.session.passport.user.id, mandalId, "bucket_1", req.body.ultimateArticle], function(err, rows) {
                        if (err) {
                            console.error(err);
                            connection.rollback(function () {
                                console.error('rollback error');
                                throw err;
                            });
                        }
                    });
                for (var detailIndex = 0; detailIndex < 64; detailIndex++) {
                    console.log(parseInt(detailIndex/8 + 1));
                    console.log(req.body.detailArticle[detailIndex]);
                    connection.query("insert into mandal_detail values(?, ?, ?, ?, ?)",
                    [ req.session.passport.user.id, "bucket_1", mandalId, parseInt(detailIndex/8 + 1), req.body.detailArticle[detailIndex] ], function(err, rows) {
                        if (err) {
                            console.error(err);
                            connection.rollback(function () {
                                console.error('rollback error');
                                throw err;
                            });
                        }
                    });
                }
        });
        connection.release();
    });
```

***

> ## 6/17
- 정태균이 반응형 웹으로 다시 디자인한 사이트를 기준으로 서버 사이드 기능을 옮김
- 로그인을 하는데 데이터 전송에 실패함 하지만 서버에서 확실이 데이터를 받음
- 로그인은 되지만 세션 확인으로 로그아웃 버튼을 띄울 때 새로 고침을 해야함

***

> ## 6/20
- 로그인 성공  
**app.js**
```
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
	//'아이디나 비밀번호가 바르지 않습니다.'
	res.redirect('/');
});
```
**routes/index.js**  
```
exports.routeHasId = function (req, res) {
    var account = req.user;
	if (typeof account == "undefined") {
		res.render('index', { user : false}); 
	} // 로그인 되어 있지 않을 때
	else {
		if (account.email) { // 사이트 자체 로그인
			res.render('index_session', { user : req.session.passport.user.email });
		} else { // 외부 계정 연동
			res.render('index_session', { user : req.session.passport.user.displayName || {} });			
		}
	} // 로그인 세션이 있을 때
}
```  
**public/js/index.js**
```
$('.form-login').on('submit', function(evt) {
        evt.preventDefault();
        var action = $(this).attr('action');
        $.ajax({
            url: '/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(data, err) {
                if (data.success) {
                    console.log('데이터 전송 성공!!');
					          location.reload();
                } else {
                    console.log('오류 발생!!');
					          location.reload();
                }
            },
            error:function(request, status, error) {
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    });
```
- 페이스북 & 구글 로그인 연동 성공
```
<input type="button" id="facebook" class="btn btn-primary btn-fill fg fa fa-facebook" onclick="location.href='/auth/facebook'">
<input id="google"" class="btn btn-danger btn-fill fg fa fa-google-plus" onclick="location.href='/auth/google'">
```
- 기존에 안 되던 문제는 태그 이름이 button이었기 때문. 하지만 그림이 없어짐
- 만다라트 내용이 기존 DB에 있는 것이라면 수정하게 하고 없으면 새로 만들기
- 수정하는 기능은 DB 설계 문제 때문에 삭제했다가 새로 추가해야함(정상 작동)

***

> ## 6/21
- 만다라트 DB에서 mandal_Id 값들을 가져와서 mandal_main.ejs 파일에 배열로 인자 전달
- 이 배열들을 이용해서 링크를 동적으로 만듦
```
<script type='text/javascript'>
      $(document).ready(function() {
        var index = JSON.parse(<%- JSON.stringify(mandalIndex) %>);
        $.each(index, function(index, val) {
          $("section")
          .append('<a href="/mandal/main/' + val.mandal_Id + '"><div class="preview"></div></a>');
        });
        $.each($(".preview"), function(index, val) {
          var link = "/mandal/main/" + (index + 1)
          console.log(link);
          $(this).load(link + " .mandal-center")
        });
      });
    </script>
```
- 하지만 프리뷰 때문에 급하게 만들다 보니 오류 발생
- 프리뷰 망함
- DB 처음부터 다시 설계 중

***

> ## 6/22
- member 테이블을 제외하고 데이터베이스 설계 완료
- 데이터베이스에 외부 계정도 연동하기 위해서 member 테이블을 다시 설계하려고 함
- 어떻게 해야할지 감이 잡히지 않아 생활코딩에서 찾음
- mysql-passport 예제를 찾고 서버 기능들을 모듈화 시키기로 함
- DB member 테이블 설계 완료
- SQL 작성 완료 및 DB 구축

***

> ## 6/23
- 서버 기능 모듈화 작업

***

> ## 6/24
- passport 부분 분리
- 로컬, 페이스북, 구글 로그인을 새로운 데이터베이스에 적용 및 연동 완료
- 만다라트를 등록하는 부분을 하려고 했지만 기존에 mandal_Id가 몇 까지 있는지 알아야 함
- 하지만 초기 상태에는 null 값이 반환되어 오류가 발생함
- 그래서 회원가입을 하면 기본적으로 mandal_Id가 0이고 실제로는 사용하지 않는 튜플을 생성할 예정임(이는 버킷리스트에도 마찬가지로 적용)

***

> ## 6/25
- STAC 본선 발표를 하러 서울에 갖다옴(기숙사에 오전 7:10에 출발해서 오후 8:15에 도착)
- 지적된 점 : 웹, 앱 중 주요 타겟?? 만다라트를 모바일에서 어떻게 UI로 표현?? UI/UX가 중요!! 등
- 새로 설계한 데이터베이스에 만다라트 데이터 연동
- 새로운 만다라트 저장(/mandal/main) 기능 완료
- 등록된 만다라트의 목록을 가져와 띄워주기(/mandal) 기능 완료
- 저장했던 만다라트 가져오기 기능 부분 완료(mandalDetail 부분에서 문제가 생김)

***

> ## 6/26
- 만다라트 불러오기 기능 완료
- json을 파싱할 때 키 값을 변수를 이용하려면 object[0]['string' + value] 같은 방식으로 해야 함  
**mandal_main.ejs**
```
		$(document).ready(function() {
			var mandalUltimateData = JSON.parse(<%- JSON.stringify(ultimate) %>);
			var mandalSubData = JSON.parse(<%- JSON.stringify(sub) %>);
			var mandalDetailData = JSON.parse(<%- JSON.stringify(detail) %>);
			if (mandalUltimateData) {
				$(".ultimateGoal")
				.children(".text-field").text(mandalUltimateData[0].mandal_content)
				.next(".hidden-field").val(mandalUltimateData[0].mandal_content);
			}
			if (mandalSubData) {
				$.each($(".subGoal"), function(index, value) {
					$(this)
					.children(".text-field").text(mandalSubData[index].mandalSub_Content)
					.next(".hidden-field").val(mandalSubData[index].mandalSub_Content);
				});
				$.each($(".falseSub"), function(index, value) {
					$(this)
					.children(".text-field").text(mandalSubData[index].mandalSub_Content)
					.next(".hidden-field").val(mandalSubData[index].mandalSub_Content);
				});
			}
			if (mandalDetailData) {
				$.each($(".detailGoal"), function(index, value) {
					var content = mandalDetailData[parseInt(index/8)]['mandalDetail_Content' + parseInt(index % 8 + 1)];
					if (content) {
						$(this)
						.children(".text-field").text(content)
						.next(".hidden-field").val(content);
					}
					else {
						return true;
					}
				});
			}
		});
```
- 만다라트 수정 기능 완료
- mandalDetail 을 제외하고 정상적으로 업데이트 됨
- detail 부분을 수정하려고 for문을 돌리면 for문이 다 돌고 나서 query 문이 동작함
- 위와 같은 일이 발생하는 이유는 비동기식인 node.js에서 query문이 처리되기 전에 for문이 기다리지 않고 먼저 돌기 때문
- 그래서 'async'라는 라이브러리를 사용하여 해결함
- 그런데도 데이터가 삽입이 되지 않아 확인했더니 mandal_Id 부분을 req.parms.id로 해야하는데 mandalId로 하고 있었음
- 다음부터는 변수의 스코프를 확실히 확인하자  
**/routes/mandal.js**
```
var async = require('async');
var detailIndex = [0, 8, 16, 24, 32, 40, 48, 56];
async.eachSeries(detailIndex, function(forIndex, callback) {
            var detailArticle = req.body.detailArticle;
            var query = "UPDATE mandalDetail SET mandalDetail_Content1 = ?, mandalDetail_Content2 = ?, " +
            "mandalDetail_Content3 = ?, mandalDetail_Content4 = ?, mandalDetail_Content5 = ?, " + 
            "mandalDetail_Content6 = ?, mandalDetail_Content7 = ?, mandalDetail_Content8 = ? " + 
            " WHERE member_AuthId = ? AND mandal_Id = ? AND mandalSub_Id = ?";
            var index = parseInt(forIndex % 8);
            connection.query(query,
            [
            detailArticle[forIndex], detailArticle[forIndex + 1], 
            detailArticle[forIndex + 2], detailArticle[forIndex + 3], 
            detailArticle[forIndex + 4], detailArticle[forIndex + 5], 
            detailArticle[forIndex + 6], detailArticle[forIndex + 7],
            authId, req.params.id, parseInt(forIndex / 8 + 1)
            ], 
            function(err, rows) {
                if (err) {
                    console.error(err);
                    connection.rollback(function () {
                        console.error('rollback error');
                        throw err;
                    });
                }
            });
        });
```
- 확실하지는 않지만 업데이트를 여러 번 반복하면 오류가 발생하고 그 이후로는 업데이트 부분이 작동하지 않음(mandalDetail 테이블만 그러는 듯)

***

> ## 6/27
- 회원가입 기능 추가
- 사용자로부터 아이디, 비밀번호, 이메일, 닉네임을 입력받음
- 회원가입을 하는데 POST 요청이 두 번 날라가서 회원가입 쿼리문을 2번 작성함 => mysql 기본키 오류
- 회원가입을 하면 버킷리스트와 만다라트를 작성할 수 있는 상태가 되기 위해서 ID가 0인 튜플들을 자동으로 생성
- 하지만 위에서 기본키 오류가 떴기 때문에 여기의 쿼리문이 실행되지 않아 결국 만다라트를 생성하지 못함

> ## 6/28
- 자바 최종 발표
- 이번 것도 결과적으로 망함
- 회원가입을 한 후에 만다라트를 작성하려고 하자 에러가 뜨면서 서버가 자동으로 재시작 => 로그아웃 된 뒤 루트화면으로...
- 이 모든 것들의 문제는 아직 비동기 프로그래밍에 익숙하지 않아서라고 판단 => 비동기 프로그래밍 다시 공부 시작

***

> ## 6/29 ~ 7/1
- 시험 기간

***

> ## 7/4
- 만다라트 추가, 수정 기능 완료(로컬, facebook, google 포함)
- async 라이브러리의 waterfall, series를 사용함  
**만다라트 추가**
```
async.waterfall([
    function getMandalId(getMandalIdCallback) {
        connection.query('SELECT MAX(mandal_Id) FROM mandal WHERE member_AuthId = ?',
        [authId], function(err, rows) {
            mandalId = Number(JSON.stringify(rows[0]).match(/\d+/)[0]) + 1;
            // "max(mandal_Id)" : 1에서 '()' 때문에 키로 인식하지 못함
            console.log('mandalId : ' + mandalId);
            if (err) {
                getMandalIdCallback(err);
            } else {
                console.log("Successfully get Mandal Id");
                getMandalIdCallback(null, mandalId);
            }
        });
    },
    function insertMandal(mandalId, insertMandalCallback) {
        connection.query("INSERT INTO mandal VALUES (?, ?, ?, ?)",
        [authId, mandalId, req.body.ultimateArticle, null], 
        function(err, rows) {
            if (err) {
                insertMandalCallback(err);
            } else {
                console.log("Successfully insert mandal");
                insertMandalCallback(null, mandalId);
            }
        });
    }
    ...
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            connection.release();
            res.render('mandal_make', 
            { 
                mandalIndex : false,
                ultimate : false,
                sub : false
            });
        }
        console.log("result : " + result);
    }
);
```
**만다라트 수정(업데이트)**
```
async.series([
    function updateMandal(updateMandalCallback) {
        connection.query("UPDATE mandal SET mandal_content = ? WHERE member_AuthId = ? AND mandal_Id = ?",
        [req.body.ultimateArticle, authId, req.params.id, null], 
        function(err, rows) {
            if (err) {
                updateMandalCallback(err);
            } else {
                console.log("Successfully update mandal");
                updateMandalCallback(null);
            }
        });
    },
    function updateMandalSub(updateMandalSubCallback) {
        for (var subIndex = 0; subIndex < 8; subIndex++) {
            var query = "UPDATE mandalSub SET mandalSub_Content = ? WHERE member_AuthId = ? AND mandal_Id = ? AND mandalSub_Id = ?";
            console.log('subindex : ' + subIndex);
            (function () {
                var sub = subIndex;
                connection.query(query,
                [req.body.subArticle[subIndex], authId, req.params.id, subIndex + 1], 
                function(err, rows) {
                    if (err) {
                        updateMandalSubCallback(err);
                    }
                    console.log("in query" + sub);
                });
            }());
        }
        console.log("Successfully update mandal sub");
        updateMandalSubCallback(null);
    }
    ],
    function(err, result) {
        if (err) {
            console.log(err);
            connection.release();
            res.render('mandal_make', 
            { 
                mandalIndex : false,
                ultimate : false,
                sub : false
            });
        }
        console.log("result : " + result);
    }
);
```

***

> ## 7/5
- 새로운 디자인 적용
![14](https://cloud.githubusercontent.com/assets/16646208/16651082/a4b63df0-447c-11e6-9233-781f667ca83b.png)
- 최종발표(1차), 피드백 받음
- 여지 없이 터지는 서버 오류(로그인, 세션 등)
- 여러가지 피드백 받음([https://gitlab.com/NCookies/Mandal_Art/wikis/%EA%B3%84%ED%9A%8D(https://gitlab.com/NCookies/Mandal_Art/wikis/%EA%B3%84%ED%9A%8D))
- day_calendar 데이터를 DB로 전송 및 저장
- 하지만 한계가 있는데 일간 캘린더의 시간도 아직 테스트용으로, 직접 입력해줘야함(이 부분은 차후 보완해야함)
***
- 데이터를 저장할 때 어떤 이유인지는 모르겠지만 fullcalendar 방식으로 JSON 파싱하면 오류가 발생함
- 그래서 /calendar/day로 라우팅을 받아서 다른 함수를 만듦(차후 원인 분석 필요)
***
- passport를 이용하여 index에서 로그인할 때 flash message가 뜰 수 있게 함  
** index.ejs
```
<script type="text/javascript">
$(document).ready(function() {
    var message = '<%= message %>';
    console.log("message : " + message);
    var flash = {
        exists: function() {
            return ($('#flash').length > 0);
        },
        show: function(msg) {
            var message;
            if (!flash.exists()) {
                message = $('<div id="flash"></div>').prependTo('body');
            } else {
                message = $('#flash');
            }
            $('body').delegate('#flash', 'click', function() {
                flash.hide();
            });
            if (msg) {
                message.html(msg);
            }
            $('#flash').css('z-index', '1')
            .slideDown(500);
            clearTimeout(flash.timeout);
            flash.timeout = setTimeout(function() {
                flash.hide();
            }, 2000);
        },
        hide: function() {
            $('#flash').slideUp();
            if (flash.timeout) {
                clearTimeout(flash.timeout);
            }
        },
        timeout: null
    };
    if ( message.length ) {
        if (message == 'Missing credentials') {
            console.log('what is missing');
            message = '아이디 또는 비밀번호를 입력해주세요';
        }
        flash.show(message);
    }
    else {
        message = '한다라트';
        flash.show(message);
    }
});
</script>
<div id="flash"></div>
```
** passport.js **
```
return done(null, false, { message : '존재하지 않는 계정입니다.'});
// 로그인을 시도했을 때 계정이 존재하지 않으면 위와 같이 message 부분에 넣고 싶은 글을 넣는다
```
** routes.js **
```
app.post('/auth/login',
    passport.authenticate('local', 
    { 
        failureRedirect: '/login_fail',
        failureFlash: true 
    }),
    function(req, res) {
    req.session.save(function(){
        res.redirect('/');
    });
});
```

***

> ## 7/6
- 딱히 한 일이 없는 것 같음(...)

***

> ## 7/7
- 회원가입을 했을 때 POST 요청이 두 번 가서 DB 기본키 오류가 발생하는 문제를 해결함
- jQuery로 submit 이벤트를 받는 것이 아니라 버튼에 click 이벤트를 받으면 됨(...)
***
- 세션이 없는 상태에서 다른 기능을 선택하면 '로그인 후 이용해주세요'라는 flash message를 보여준 후 '/'로 redirect 해야 함
- 기존의 방법으로는 passport에서만 적용되기 때문에 새로운 방법을 찾기로 함
- 미들웨어 함수로
```
req.flash('message', '아이디 또는 비밀번호가 잘못되었습니다.');
res.redirect('/');
```
- 위와 같이 해주고 '/' 라우트에서
```res.render('index', { user : false, message : req.flash('message')});```
- 로 하면 message를 전달 받을 수 있음
***
- local 계정으로 만다라트 또는 캘린더를 등록하면 오류가 발생함
- DB의 기본키인 member_AuthId로 검색할 때 잘못된 결과를 대입했기 때문(ex_ local:local:aa)
```
var getProvider = function(req) {
    var provider;
    console.log('[provider] : ' + req.session.passport.user.provider);
    if (req.session.passport.user.provider == undefined) {
        provider = "";
        console.log("provider is local");
        return provider;
    } else if(req.session.passport.user.provider == "local") {
        return "";
    }
    else {
        provider = req.session.passport.user.provider + ":";
        console.log("provider is " + provider.split(':')[0]);
    }
    return provider;
}
```
- 강석진의 버킷리스트 소스 적용(디자인은 적용 중)
- 새로운 modal, header 적용
- day_calendar 업데이트
