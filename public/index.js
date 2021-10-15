let socket = io();

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

// $('#s1').css('z-index', '100');
$('#a').html(score.teamA);
$('#b').html(score.teamB);
$('#current').html(score.currentScore);
$('#question').html(score.question);
socket.emit('joined');

let a1a = document.getElementById("a1a");
let a2a = document.getElementById("a2a");
let a3a = document.getElementById("a3a");
let a4a = document.getElementById("a4a");
let a5a = document.getElementById("a5a");
let a6a = document.getElementById("a6a");

let a1c = document.getElementById("a1c");
let a2c = document.getElementById("a2c");
let a3c = document.getElementById("a3c");
let a4c = document.getElementById("a4c");
let a5c = document.getElementById("a5c");
let a6c = document.getElementById("a6c");

let wrong = document.getElementById("wrong");

socket.on('connect', (data) => {
  score = data;
  console.log("sent");
});


socket.on('data', (data) => {
  console.log(data);
  score = data;
  console.log(score.teamA);
  $('#a').html(score.teamA);
  $('#b').html(score.teamB);
  $('#teamA').html(score.nameA);
  $('#teamB').html(score.nameB);
  $('#current').html(score.currentScore);
  $('#question').html(score.question);
// a1
  if(score.a1.show){
    a1a.innerHTML = score.a1.answer;
    a1c.innerHTML = score.a1.points;
    $('#a1').addClass("show");
    $('#a1').removeClass("hide");
    $('#s1').removeClass("show");
    $('#s1').addClass("hide");
  }
  if(!score.a1.show){
    $('#s1').addClass("show");
    $('#s1').removeClass("hide");
    $('#a1').removeClass("show");
    $('#a1').addClass("hide");
  }
// a2
  if(score.a2.show){
    a2a.innerHTML = score.a2.answer;
    a2c.innerHTML = score.a2.points;
    $('#a2').addClass("show");
    $('#a2').removeClass("hide");
    $('#s2').removeClass("show");
    $('#s2').addClass("hide");
  }
  if(!score.a2.show){
    $('#s2').addClass("show");
    $('#s2').removeClass("hide");
    $('#a2').removeClass("show");
    $('#a2').addClass("hide");
  }
// a3
  if(score.a3.show){
    a3a.innerHTML = score.a3.answer;
    a3c.innerHTML = score.a3.points;
    $('#a3').addClass("show");
    $('#a3').removeClass("hide");
    $('#s3').removeClass("show");
    $('#s3').addClass("hide");
  }
  if(!score.a3.show){
    $('#s3').addClass("show");
    $('#s3').removeClass("hide");
    $('#a3').removeClass("show");
    $('#a3').addClass("hide");
  }
// a4
  if(score.a4.show){
    a4a.innerHTML = score.a4.answer;
    a4c.innerHTML = score.a4.points;
    $('#a4').addClass("show");
    $('#a4').removeClass("hide");
    $('#s4').removeClass("show");
    $('#s4').addClass("hide");
  }
  if(!score.a4.show){
    $('#s4').addClass("show");
    $('#s4').removeClass("hide");
    $('#a4').removeClass("show");
    $('#a4').addClass("hide");
  }
  // a5
  if(score.a5.show){
    a5a.innerHTML = score.a5.answer;
    a5c.innerHTML = score.a5.points;
    $('#a5').addClass("show");
    $('#a5').removeClass("hide");
    $('#s5').removeClass("show");
    $('#s5').addClass("hide");
  }
  if(!score.a5.show){
    $('#s5').addClass("show");
    $('#s5').removeClass("hide");
    $('#a5').removeClass("show");
    $('#a5').addClass("hide");
  }
  // a6
  if(!score.a6.hide){
    if(score.a6.show){
      a6a.innerHTML = score.a6.answer;
      a6c.innerHTML = score.a6.points;
      $('#a6').addClass("show");
      $('#a6').removeClass("hide");
      $('#s6').removeClass("show");
      $('#s6').addClass("hide");
    }
    if(!score.a6.show){
      $('#s6').addClass("show");
      $('#s6').removeClass("hide");
      $('#a6').removeClass("show");
      $('#a6').addClass("hide");
    }
  }
  if(score.a6.hide){
    $('#s6').addClass("hide");
    $('#a6').addClass("hide");
  }
  if(score.wrong == 1){
    wrong.innerHTML = "X"
    $('#wrong').addClass("showWrong");
    setTimeout(function() { remClass(); }, 3000);
    console.log("1");
  }
  if(score.wrong == 2){
    wrong.innerHTML = "X X"
    $('#wrong').addClass("showWrong");
    setTimeout(function() { remClass(); }, 3000);
    console.log("2");
  }
  if(score.wrong == 3){
    wrong.innerHTML = "X X X"
    $('#wrong').addClass("showWrong");
    setTimeout(function() { remClass(); }, 3000);
    console.log("3");
  }
  console.log("data");
});

function remClass(){
  $('#wrong').removeClass("showWrong");
}