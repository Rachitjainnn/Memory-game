var buttonColor = ["blue", "yellow", "red", "green"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).keydown(function(){
if(!start){
    $("h1").html("Level 0")
    nextSequence();
    start = true; 
}

})
$(".btn").click(function () {
    var userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("S")
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
              }, 1000);
        }
    }else{
       console.log("wrong");
       var wrongAudio = new Audio("sounds/wrong.mp3");
       wrongAudio.play();
       $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over");
       },200);
       $("h1").text("Game Over");
       $("h2").text("(Press Any Key to Restart)")
       startOver();
    }

} 

function nextSequence() {

    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

        playSound(randomChosenColor);

    return randomChosenColor;

}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

        $("#" + currentColour).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
  }