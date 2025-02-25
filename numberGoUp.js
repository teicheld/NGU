// Setting vars

const mostBelovedNumberElem = document.getElementById("bln");
const incrementScoreElem = document.getElementById("incrementScore");
const speedScoreElem = document.getElementById("speedScore");
const warningElem = document.getElementById("warnings");
const upgrade1CostElem = document.getElementById("upgrade1Cost");
const upgrade2CostElem = document.getElementById("upgrade2Cost");
const growButton = document.getElementById("growButton");
const speedButton = document.getElementById("speedButton");
const forceButton = document.getElementById("forceButton")

let mostBelovedNumber = 671.0;
let growIncrement = 0.25;
let growthSpeed = 4000;
let speedIncrement = 500;
let upgrade1Cost = 1;
let upgrade2Cost = 5;
let warningStrings = ["moaar moneyyyyy!", "cash cash cash", "why number no go up?", "this seems pointless?!", "I like watching numbers go up.", "css is annoying. did you know that?", "don't look at my sourcecode okay", "it's not about size.", "it's about value. big value.", "coming up with strings to display here.", "this is a one liner.", "do you have anything funny to put here?", "you got to spend number to make number.", "best strategy: don't play!", "have you seen Satoshi?", "hurry up: they are printing faster!"];
let mostBelovedNumberOut = mostBelovedNumber;
let growthInterval;

// functions


function readifyNo(unformatedNumber) {
  if(unformatedNumber < 1000 && unformatedNumber > 0) {
    unformatedNumber = unformatedNumber.toFixed(2);
    return `${unformatedNumber}`;
  }
  else if(unformatedNumber < 1000000) {
    unformatedNumber = unformatedNumber / 1000;
    unformatedNumber = unformatedNumber.toFixed(2);
    return `${parseFloat(unformatedNumber)}k`;
  }
  else if((unformatedNumber < 1000000000)){
    unformatedNumber = unformatedNumber / 1000000;
    unformatedNumber = unformatedNumber.toFixed(2);
    return `${unformatedNumber}M`;
  }
  else if((unformatedNumber < 1000000000000)){
    unformatedNumber = unformatedNumber / 1000000000;
    unformatedNumber = unformatedNumber.toFixed(2);
    return `${unformatedNumber}G`;
  }
  else {
    unformatedNumber = unformatedNumber / 1000000000000;
    unformatedNumber = unformatedNumber.toFixed(2);
    return `${unformatedNumber}T`;
  }
}

growButton.onclick = function incrementUp() {
  if (mostBelovedNumber > upgrade1Cost) {
    mostBelovedNumber = mostBelovedNumber - upgrade1Cost;
    updateNumber();
    upgrade1Cost = upgrade1Cost * 1.10375;
    upgrade1CostElem.textContent = `Cost: ${readifyNo(upgrade1Cost)}`;
    growIncrement = growIncrement * 1.10470;
    incrementScoreElem.textContent = `Growth: ${readifyNo(growIncrement)}`;
  }
  else {
    warningElem.textContent = "you are too poor :(";
  }
}

speedButton.onclick = function speedUp() {
  if (mostBelovedNumber > upgrade2Cost && growthSpeed > 100) {
    mostBelovedNumber = mostBelovedNumber - upgrade2Cost;
    updateNumber();
    upgrade2Cost = upgrade2Cost * 1.6;
    upgrade2CostElem.textContent = `Cost:${readifyNo(upgrade2Cost)}`;
    growthSpeed = growthSpeed - speedIncrement;
    speedScoreElem.textContent = "Interval: " + (growthSpeed/1000).toFixed(2);
    speedIncrement = speedIncrement / 1.147;
    clearInterval(growthInterval);;
    growthInterval = setInterval(mainGrowth, growthSpeed);
    speedButton.textContent = "Grow faster!";
  }
  else if(mostBelovedNumber < upgrade2Cost){
    warningElem.textContent = "you are too poor :(";
  }
  else{
    warningElem.textContent = "you are too fast xD";
  }
}

forceButton.onclick = mainGrowth;

function updateNumber() {
  let mostBelovedNumberOut = readifyNo(mostBelovedNumber);
  mostBelovedNumberElem.textContent = mostBelovedNumberOut;
}


function mainGrowth() {
  mostBelovedNumber = mostBelovedNumber + growIncrement;
  updateNumber();
}

setInterval(gameOver, 10000)

function gameOver() {
  if (mostBelovedNumber > 100000000) {
    warningElem.textContent = "dude STOP! game is over. touch grass!";
  }

  else if (mostBelovedNumber > 10000) {
    warningElem.textContent = "okay I guess you won?";
  }

  else {
    let randomWarning = warningStrings[Math.floor(Math.random() * warningStrings.length)];
    warningElem.textContent = randomWarning;
  }
}
