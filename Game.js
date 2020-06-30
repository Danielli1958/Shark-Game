var scene, boatDummy, scoreText;
var boatCount=8;
var score=0;
var maxTime = 45;
var time = maxTime;
var interval;
function start() {
  scene = $('a-scene')[0];
  boatDummy = $('.dummy-boat');
  scoreText = $('#scoreText');
  alert("Eat all 8 boats within 45 seconds to win");
  alert("Use arrow or wasd keys to move");
  alert("Drag mouse to look around");
  for (var i=0; i < boatCount; i++) {
  addBoat();
  }
  console.log("The scene is ready", scene);
  interval = setInterval(onTimerTick, 1000);
}




function getRandom(min, max) {
  var diff = max - min;
  var randomNum = Math.random()*diff + min;
  return Math.round(randomNum);
}

function getDirection(x, y, z, direction){
  var randomNum;
  if (direction == 'random'){
    randomNum = getRandom(0, 3);
  } else {
    randomNum = direction;
  }  
  if (randomNum == 0) {
    x = '-' + x;
    z = '-' + z;
  } else if(randomNum == 1) {
    z = '-' + z;
  } else if (randomNum == 2) {
    x = '-' + x;
  }
  return x + ' ' + y + ' ' + z;
}




function addBoat() {
  var finalZ = 20;
  var newBoat = boatDummy.clone();
  newBoat.attr('visible','true');
  newBoat.attr('class', 'boat');
  var boatPosition = newBoat.attr('position');
  var randomX = getRandom(5, 30);
  var randomZ = getRandom(5, 30);
  console.log(boatPosition, newBoat);
  var position = getDirection(randomX, boatPosition.y, randomZ, 'random');
  console.log(position);
  newBoat.attr('position', position);
  var animationProperty = 'property: position; dur: 10000; dir: alternate; loop: true;to:' + randomX + ' ' + boatPosition.y + ' ' + randomZ;
  console.log(" propertyanimation", animationProperty);
  newBoat.attr('animation', animationProperty);
  $(scene).append(newBoat);
  newBoat.on('hitstart', die);
 }


function gameOver() {
$('#shark').remove();
$('#lose').attr('visible', true);
}

function winGame() {
$('#shark').remove();
$('#win').attr('visible', true);
}



function die(event) {
  console.log("lol");
  var collidedBoat = event.target;
  score = score + 1;
  scoreText.attr('value', 'score: ' + score);
  collidedBoat.remove();
}  


function onTimerTick(){
  time = time - 1;
  $('#timer').attr('value', time + " seconds left");
  if(score==8) {
  clearInterval(interval);
  interval = undefined;
  winGame();
  }
  if(time==0) {
    clearInterval(interval);
  interval = undefined;
    gameOver();
  }
}




  

AFRAME.registerComponent("start-game", {
  init: start
});
