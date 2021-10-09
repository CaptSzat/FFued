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
txt += '<select  id="dropdown" onchange="return showAnswer();">'
for (var i = 0; i < json.length; i++) {
    txt += "<option " + 'value="'+ i +'">' + json[i].text + "</option>";
}
select.innerHTML = txt;
console.log(json);
console.log(json[0].text);

var score = {
  teamA: 0,
  teamB: 0,
  currentScore: 0,
  wrong: 0,
  question: "Get Ready!",
  nameA: "A",
  nameB: "B",
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
  },
};

function teamUpdate(){
  score.nameA = document.getElementById('teamA');
  score.nameB = document.getElementById('teamB');
  console.log("WHY DOOO");
  socket.emit('data', score);
}

$('#updateName').bind('click', function() {
  score.nameA = document.getElementById('nameA').value;
  score.nameB = document.getElementById('nameB').value;
  console.log("data");
  socket.emit('data', score);
});

$('#updateScore').bind('click', function() {
  score.teamA = document.getElementById('pointsA').value;
  score.teamB = document.getElementById('pointsB').value;
  console.log("data");
  socket.emit('data', score);
});


function showAnswer(){
  let quest = document.getElementById('dropdown');
  console.log(quest.value);
  console.log(score.nameA);
  document.getElementById('a1').innerHTML = json[quest.value].answers[0];
  document.getElementById('a2').innerHTML = json[quest.value].answers[1];
  document.getElementById('a3').innerHTML = json[quest.value].answers[2];
  document.getElementById('a4').innerHTML = json[quest.value].answers[3];
  document.getElementById('a5').innerHTML = json[quest.value].answers[4];
  document.getElementById('a6').innerHTML = json[quest.value].answers[5];

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
  }else{
    score.a6.hide = false;
  }
  socket.emit('data', score);
};



socket.on('connect', () => {
  console.log("sent");
  // socket.emit('data', score);
});

socket.emit('data', score);
$('#clear').bind('click', function() {
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

$('#show').bind('click', function() {
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

$('#hide').bind('click', function() {
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

$('#reset').bind('click', function() {
  score.teamA = 0;
  score.teamB = 0;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#teamA').bind('click', function() {
  score.teamA += score.currentScore;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#teamB').bind('click', function() {
  score.teamB += score.currentScore;
  score.currentScore = 0;
  score.wrong = 0;
  console.log("data");
  socket.emit('data', score);
});

$('#w1').bind('click', function() {
  score.wrong = 1;
  console.log("data");
  socket.emit('data', score);
});

$('#w2').bind('click', function() {
  score.wrong = 2;
  console.log("data");
  socket.emit('data', score);
});

$('#w3').bind('click', function() {
  score.wrong = 3;
  console.log("data");
  socket.emit('data', score);
});


$('#a1').bind('click', function() {
  console.log("data");
  score.a1.show = !score.a1.show;
  if(score.a1.show){
    score.currentScore += score.a1.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a2').bind('click', function() {
  console.log("data");
  score.a2.show = !score.a2.show;
  if(score.a2.show){
    score.currentScore += score.a2.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a3').bind('click', function() {
  console.log("data");
  score.a3.show = !score.a3.show;
  if(score.a3.show){
    score.currentScore += score.a3.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a4').bind('click', function() {
  console.log("data");
  score.a4.show = !score.a4.show;
  if(score.a4.show){
    score.currentScore += score.a4.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a5').bind('click', function() {
  console.log("data");
  score.a5.show = !score.a5.show;
  if(score.a5.show){
    score.currentScore += score.a5.points;
  }
  score.wrong = 0;
  socket.emit('data', score);
});
$('#a6').bind('click', function() {
  console.log("data");
  if(!score.a6.hide){
    score.a6.show = !score.a6.show;
    if(score.a6.show){
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