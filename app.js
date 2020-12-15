// sdk AWS 모듈 불러오기 
var AWS = require('aws-sdk');

// 어떤 지역을 제어할 것인지에 대해 알아보기 
AWS.config.region = 'ap-northeast-2';

// aws에서 ecs 형성 
var ec2 = new AWS.EC2();


/* 설치한 express 모듈 불러오기 */
const express = require('express');

/* 설치한 socket.io 모듈 불러오기 */
const socket = require('socket.io');

/* Node.js 기본 내장 모듈 불러오기 */
const http = require('http');

/* Node.js 기본 내장 모듈 불러오기 */
const fs = require('fs');

/* express 객체 생성 */
const app = express();

/* express http 서버 생성 */
const server = http.createServer(app);

/* 생성된 서버를 socket.io에 바인딩 */
const io = socket(server);

ec2.describeInstances({}, function (err, data) {

  console.log(err);
});

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

/* Get 방식으로 / 경로에 접속하면 실행 됨 */
app.get('/', function (request, response) {
  fs.readFile('./static/index.html', function (err, data) {
    if (err) {
      response.send('에러');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    }
  });
});

//main 페이지 접속
app.get('/Mypage', function (request, response) {
  fs.readFile('./static/Mypage.html', function (err, data) {
    if (err) {
      response.send('에러');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    }
  });
});

//SearchPage 접속
app.get('/Searchpage', function (request, response) {
  fs.readFile('./static/Searchpage.html', function (err, data) {
    if (err) {
      response.send('에러');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    }
  });
});

//LicensingPage  접속
app.get('/LicensingPage', function (request, response) {
  fs.readFile('./static/LicensingPage.html', function (err, data) {
    if (err) {
      response.send('에러');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    }
  });
});




//ec2 test 제거 가능 
app.get('/ec2', function (req, res) {
  ec2.describeInstances({}, function (err, data) {
    res.json(data);
  })
})


// on은 소켓에서 해당 이벤트 받으면 콜백함수 실행 

io.sockets.on('connection', function (socket) {
  console.log('유저 접속됨');

  socket.on('send', function (data) {
    console.log('전달된 메시지:', data.msg);
  });


});



/* 서버를 8080 포트로 listen */
server.listen(8080, function () {
  console.log('서버 실행 중..');
});
