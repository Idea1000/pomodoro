const TIMER = 60;

function reduceTime() {
    if (time <= 0) {
        clearInterval(reduce);
    } else {
        time -= 1;
    }
}

function updateTimer(time, display) {
    let minute = Math.floor(time/60);
    let second = (time - minute*60).toString();
    if (second.length == 1) {
        second = "0"+second;
    }
    console.log("" + minute + second);
    display.innerText = minute + ":" + second;
}

function handleStartStop() {
    if (allume) {
        clearInterval(reduce);
        time = TIMER;
        updateTimer(time, affichage);
        document.getElementById("ss").innerText = "allumer";
        allume = false;
    } else {
        reduce = setInterval(function() {
            reduceTime();
            updateTimer(time, affichage);
        }, 1000);
        document.getElementById("ss").innerText = "éteindre";
        allume = true;
    }
}

let allume = false;
document.getElementById("ss").addEventListener("click", handleStartStop);
let affichage = document.getElementById("timer");
let time = TIMER;
console.log(time);
updateTimer(time, affichage);
console.log(time);
let reduce;
