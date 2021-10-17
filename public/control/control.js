// require('fs');
let socket = io();
// let el;

// socket.on('time', (timeString) => {
//   el = document.getElementById('server-time');
//   el.innerHTML = 'Server time LETS GOOO: ' + timeString;
// });

// let SR1 = document.getElementById("TRScore1");


var json = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "./questions.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})();

// let ans = JSON.parse(json);
select = document.getElementById("question");
// for (var i = 0; i < json.length; i++) {
//     var option = document.createElement("option");
//     option.innerHTML = json[i].text;
//     // option.textContent = name;
//     select.appendChild(option);
// };
var txt = "Question: ";
// txt += '<select  id="dropdown" onchange="return showAnswer();">'
txt += '<select  id="dropdown">'
for (var i = 0; i < json.length; i++) {
    txt += "<option " + 'value="'+ i +'">' + json[i].text + "</option>";
}
txt += '</select>';
txt += '<button id="showQ">Show Question</button>';
select.innerHTML = txt;
console.log(json);
console.log(json[0].text);

var score = {
  teamA: 0,
  teamB: 0,
  currentScore: 0,
  wrong: 0,
  question: "Get Ready!",
  nameA: "Control",
  nameB: "B",
  gameOver: false,
  a1: {
    answer: "a1",
    points: 0,
    show: false
  },
  a2: {
    answer: "a2",
    points: 0,
    show: false
  },
  a3: {
    answer: "a3",
    points: 0,
    show: false
  },
  a4: {
    answer: "a4",
    points: 0,
    show: false
  },
  a5: {
    answer: "a5",
    points: 0,
    show: false
  },
  a6: {
    answer: "a6",
    points: 0,
    show: false,
    hide: false
  }
};

socket.on('initial', (data) => {
  console.log(data);
  score = data;
  document.getElementById('teamA').innerHTML = "Team " + score.nameA + " gets the points";
  document.getElementById('teamB').innerHTML = "Team " + score.nameB + " gets the points";
  document.getElementById('nAreplace').innerHTML = "Team " + score.nameA;
  document.getElementById('nBreplace').innerHTML = "Team " + score.nameB;
  document.getElementById('nApoints').innerHTML = "Team " + score.nameA + " Points";
  document.getElementById('nBpoints').innerHTML = "Team " + score.nameB + " Points";
  console.log("HELLO");
});
socket.emit('joined');
socket.on('data', data => {
  if(data != score){
    score = data;
    document.getElementById('nAreplace').innerHTML = "Team " + score.nameA;
    document.getElementById('nBreplace').innerHTML = "Team " + score.nameB;
    document.getElementById('nApoints').innerHTML = "Team " + score.nameA + " Points";
    document.getElementById('nBpoints').innerHTML = "Team " + score.nameB + " Points";
    document.getElementById('teamA').innerHTML = "Team " + score.nameA + " gets the points";
    document.getElementById('teamB').innerHTML = "Team " + score.nameB + " gets the points";
  }
});
// function teamUpdate(){
//   score.nameA = document.getElementById('teamA');
//   score.nameB = document.getElementById('teamB');
//   console.log("WHY DOOO");
//   socket.emit('data', score);
// }

$('#updateName').on('click', function() {
  // console.log(score);
  // console.log(document.getElementById('nameA').value);
  // console.log(score.nameA);
  score.nameA = document.getElementById('nameA').value;
  score.nameB = document.getElementById('nameB').value;
  document.getElementById('teamA').innerHTML = "Team " + score.nameA + " gets the points";
  document.getElementById('teamB').innerHTML = "Team " + score.nameB + " gets the points";
  console.log("data");
  socket.emit('data', score);
});

$('#updateScore').on('click', function() {
  score.teamA = document.getElementById('pointsA').value;
  score.teamB = document.getElementById('pointsB').value;
  console.log("data");
  socket.emit('data', score);
});

$('#showQ').on('click', function() {
  showQuestion();
});


function showQuestion(){
  let quest = document.getElementById('dropdown');
  console.log(quest.value);
  console.log(score.nameA);
  document.getElementById('a1').innerHTML = json[quest.value].answers[0];
  document.getElementById('a2').innerHTML = json[quest.value].answers[1];
  document.getElementById('a3').innerHTML = json[quest.value].answers[2];
  document.getElementById('a4').innerHTML = json[quest.value].answers[3];
  document.getElementById('a5').innerHTML = json[quest.value].answers[4];

  score.question = json[quest.value].text;

  score.a1.answer = json[quest.value].answers[0];
  score.a2.answer = json[quest.value].answers[1];
  score.a3.answer = json[quest.value].answers[2];
  score.a4.answer = json[quest.value].answers[3];
  score.a5.answer = json[quest.value].answers[4];
  score.a6.answer = json[quest.value].answers[5];

  score.a1.points = json[quest.value].results[0];
  score.a2.points = json[quest.value].results[1];
  score.a3.points = json[quest.value].results[2];
  score.a4.points = json[quest.value].results[3];
  score.a5.points = json[quest.value].results[4];
  score.a6.points = json[quest.value].results[5];
  score.a1.show = false;
  score.a2.show = false;
  score.a3.show = false;
  score.a4.show = false;
  score.a5.show = false;
  score.a6.show = false;
  console.log(json[quest.value].answers.length);
  if(json[quest.value].answers.length == 5){
    score.a6.hide = true;
    document.getElementById('a6').innerHTML = "Only 5 Answers";
  }else{
    document.getElementById('a6').innerHTML = json[quest.value].answers[5];
    score.a6.hide = false;
  }
  socket.emit('data', score);
};



// socket.emit('data', score);
$('#clear').on('click', function() {
  score.a1.show = false;
  score.a2.show = false;
  score.a3.show = false;
  score.a4.show = false;
  score.a5.show = false;
  score.a6.show = false;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#show').on('click', function() {
  score.a1.show = true;
  score.a2.show = true;
  score.a3.show = true;
  score.a4.show = true;
  score.a5.show = true;
  score.a6.show = true;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#hide').on('click', function() {
  score.a1.show = false;
  score.a2.show = false;
  score.a3.show = false;
  score.a4.show = false;
  score.a5.show = false;
  score.a6.show = false;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#gameOver').on('click', function() {
  score.gameOver = !score.gameOver;
  console.log("data");
  socket.emit('data', score);
});

$('#reset').on('click', function() {
  score.teamA = 0;
  score.teamB = 0;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#teamA').on('click', function() {
  score.teamA += score.currentScore;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#teamB').on('click', function() {
  score.teamB += score.currentScore;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#w1').on('click', function() {
  score.wrong = 1;
  console.log("data");
  socket.emit('data', score);
});

$('#w2').on('click', function() {
  score.wrong = 2;
  console.log("data");
  socket.emit('data', score);
});

$('#w3').on('click', function() {
  score.wrong = 3;
  console.log("data");
  socket.emit('data', score);
});


$('#a1').on('click', function() {
  console.log("data");
  if(!score.a1.show){
    score.a1.show = true;
    score.currentScore += score.a1.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a2').on('click', function() {
  console.log("data");
  if(!score.a2.show){
    score.a2.show = true;
    score.currentScore += score.a2.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a3').on('click', function() {
  console.log("data");
  if(!score.a3.show){
    score.a3.show = true;
    score.currentScore += score.a3.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a4').on('click', function() {
  console.log("data");
  if(!score.a4.show){
    score.a4.show = true;
    score.currentScore += score.a4.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a5').on('click', function() {
  console.log("data");
  if(!score.a5.show){
    score.a5.show = true;
    score.currentScore += score.a5.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a6').on('click', function() {
  console.log("data");
  if(!score.a6.hide){

    if(!score.a6.show){
      score.a6.show = true;
      score.currentScore += score.a6.points;
    }
    score.wrong = 0;
  }
  socket.emit('data', score);
});
// clear.addEventListener('click', function() {
//     score.teamA = 0;
//     score.teamB = 0;
//     score.currentScore = 0;
//     socket.emit('data', score);
// });

// socket.on('score', data => {

// });
// socket.on('score', data => {
//   console.log("data");
//   console.log(data);
//   results.game1.done = data.game1.done;
//   results.game2.done = data.game2.done;
//   results.game3.done = data.game3.done;
//   results.game4.done = data.game4.done;
//   results.clear = data.clear;
//   console.log("Results");
//   console.log(results);
// });