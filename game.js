var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started = false; //intialize with false taki ek baar hi nextSquence lo call karee
var level =0; //for changing the header
$(document).keypress(function(event){
  if(!started){
    nextSequence();
    $("h1").text("Level "+level);
    started = true;
  }

});
// colourclicking
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// nextSquence
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var chosenRandomColour =buttonColours[randomNumber];
  gamePattern.push(buttonColours[randomNumber]);
console.log(chosenRandomColour);
  $("#"+chosenRandomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenRandomColour);
}
// nextSequence();

// Animatepress
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// playsound
function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
