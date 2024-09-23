const TIMER = 10;

function reduceTime() {
    if (time <= 0) {
        clearInterval(reduce);
    } else {
        time -= 1;
    }
}

function updateTimer(time, display) {
    let local_timer = time;
    let minute = Math.round(local_timer/60);
    let second = local_timer - minute*60;
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
