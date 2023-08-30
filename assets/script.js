//set variables
var startButton = document.querySelector(".start-button");
//answerKey 
var incorrectGuesses = document.querySelector("#incorrect-guesses");
var answerKey = ["boolean", "string", "array", "method"]
var i = 0;
var keyPressed;
var underScoresArray=[];
var underScoresString="";
var allowNext = 0;
var mainGameDisplay = document.querySelector(".word-blanks");
var congratsLine = document.querySelector("#congrats");
var nextButton = document.querySelector("#next-question");
var winValue;
var loseValue;
var winScore = document.querySelector(".win");
var loseScore = document.querySelector(".lose");
var started = false;
if(localStorage.getItem("wins") === null){
    winValue = 0;
    loseValue = 0;
    console.log("local storage empty");
}else {
    winValue = JSON.parse(localStorage.getItem("wins"));
    loseValue = JSON.parse(localStorage.getItem("losses"));
    winScore.textContent = localStorage.getItem("wins");
    loseScore.textContent = localStorage.getItem("losses");
    console.log("local storage has item");
}


var resetButton = document.querySelector(".reset-button");
var secondsLeft = 10;
var timerText = document.querySelector(".timer-count");
var gameEnd = false;


//FUNCTIONS
//function: change to game to display with underscores
function gameDisplay() {
    mainGameDisplay.setAttribute("style", "font-size: 3.5em");
    underScoresString = "";
    underScoresArray = [];
    allowNext = 0;
    for (var h = 0; h <answerKey[i].length; h++){
        underScoresString += "_ ";
        underScoresArray.push("_");
    }
    
    mainGameDisplay.textContent = underScoresString;
}

//function: test if value is correct
function checkKeyEqual() {
    console.log(i);
    
    var k = [];
    for (var h = 0 ; h<answerKey[i].length; h++){
       if (keyPressed === answerKey[i][h]) {
        k.push(h);
        underScoresArray[h] = keyPressed;
       } 
        }
        if (k.length === 0){
            
            incorrectGuesses.textContent += keyPressed + " ";
           
        } else {
        mainGameDisplay.textContent = underScoresArray.join(" ");
        }
        if(underScoresArray.indexOf("_") === -1){
            if(i === answerKey.length-1){
                mainGameDisplay.setAttribute("style", "font-size: 1em")
                mainGameDisplay.textContent = "CONGRATS YOU GOT IT! YOU WIN!"
                winValue++;
                localStorage.setItem("wins" , JSON.stringify(winValue));
                localStorage.setItem("losses", JSON.stringify(loseValue));
                winScore.textContent = localStorage.getItem("wins");
                loseScore.textContent = localStorage.getItem("losses");
                gameEnd = true;
                incorrectGuesses.textContent = "";
                
            }else { 
                allowNext = 1;
                i++;
                mainGameDisplay.setAttribute("style", "font-size: 1em")
                mainGameDisplay.textContent = "CONGRATS YOU GOT IT! CLICK HERE FOR NEXT QUESTION!";
                incorrectGuesses.textContent = "";
            }
        
    }
    
    
}
//funtion: start a timer by the seconds
function setTime() {
    // timerText.setAttribute("style", "font-size: 3.5em")
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timerText.textContent = secondsLeft;

    if (gameEnd){
        clearInterval(timerInterval);
        // timerText.setAttribute("style", "display: none");
    }
    if (secondsLeft <= 0){
        clearInterval(timerInterval);
        mainGameDisplay.textContent = "YOU LOSE!!!!!!"
        loseValue++;
        localStorage.setItem("wins" , JSON.stringify(winValue));
        localStorage.setItem("losses", JSON.stringify(loseValue));
        winScore.textContent = localStorage.getItem("wins");
        loseScore.textContent = localStorage.getItem("losses");
        gameEnd = true;
    }

    }, 1000);
    
} 


//EVENT LISTENERS
//start quiz
startButton.addEventListener("click" , function(event){
    event.stopPropagation();
    event.preventDefault();
    // timerText.setAttribute("style", "font-size: 3.5em");
    startButton.textContent = "Refresh"
    var element = event.target;
    if (element.matches("button")){
        if (gameEnd === true) {
             started === false;
             location.reload();
        }else if (started === false)
        {
        gameDisplay();
        setTime();
        started = !started;
        }
    }
    
    
})

//keydown
addEventListener("keydown", function(event){
    if (started === true && mainGameDisplay.textContent !== "CONGRATS YOU GOT IT! CLICK HERE FOR NEXT QUESTION!"){
    if(gameEnd === false && secondsLeft>0){
    event.stopPropagation();
    keyPressed = event.key;
    checkKeyEqual();
    }
}
})

//next question button
mainGameDisplay.addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();
    var element = event.target;
    if(started === true && gameEnd === false) {
    if(element.matches("div")){
        
        gameDisplay();
    }
}
})

//reset button
resetButton.addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();
    var element = event.target;
    if(element.matches("button")){
        localStorage.setItem("wins", "0");
        localStorage.setItem("losses", "0");
        winScore.textContent = 0;
        loseScore.textContent = 0;
    }
})

