const TIMERTRAVAIL = 3; //1500
const TIMERPAUSE = 2; //300
const CYCLE = 2;

function changement() {
    if (state % 2 == 1) {
        //travail
        time = TIMERTRAVAIL;
        usedTimer = TIMERTRAVAIL;
        document.getElementById("travail").style.color = "Yellow";
        document.getElementById("pause").style.color = "White";
        state++;
    } else if (state % 2 == 0 && state != (CYCLE * 2)) {
        //pause
        time = TIMERPAUSE;
        usedTimer = TIMERPAUSE;
        document.getElementById("travail").style.color = "White";
        document.getElementById("pause").style.color = "Yellow";
        state++;
    } else {
        //grande pause
        time = TIMERTRAVAIL;
        usedTimer = TIMERTRAVAIL;
        document.getElementById("travail").style.color = "White";
        document.getElementById("pause").style.color = "Yellow";
        state=1;
    }
}

/**
 * enleve 1 au timer et supprime l'intervalle si il arrive à 0
 */
function reduceTime() {
    if (time <= 0) {
        /*clearInterval(reduce);*/
        changement();
    } else {
        time -= 1;
    }
}

/**
 * met à jour la page avec les nouvelles valeurs
 * @param {int} duree la durée restante
 * @param {Document} display document pointant au timer sur la page html
 */
function updateTimer(duree, display) {
    let minute = Math.floor(duree/60);
    let second = (duree - minute*60).toString();
    if (second.length == 1) {
        second = "0"+second;
    }
    display.innerText = minute + ":" + second;
    bar.animate((duree/usedTimer)*1.0);
}

/**
 * allume ou réinitialise le timer suivant la valeur du boolean globale allume
 */
function handleStartStop() {
    if (allume) {
        //eteindre
        clearInterval(reduce);
        state = 1;
        changement();
        state = 1;
        updateTimer(time, affichage);
        let icon = document.getElementById("ss");
        if ( icon.classList.contains('fa-rotate') ) {
            icon.classList.remove('fa-rotate');
            icon.classList.add('fa-play');
         }
        allume = false;
        bar.animate(1);
    } else {
        //lancer
        reduce = setInterval(function() {
            reduceTime();
            updateTimer(time, affichage);
        }, 1000);
        let icon = document.getElementById("ss");
        if ( icon.classList.contains('fa-play') ) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-rotate');
        }
        allume = true;
    }
}

let bar = new ProgressBar.Circle("#progressionCircle", {
    strokeWidth: 1.5,
    easing: 'easeInOut',
    duration: 1000,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });
bar.set(1);

let state = 1; //important
let usedTimer;
let allume = false;
document.getElementById("play").addEventListener("click", handleStartStop);
let affichage = document.getElementById("timer");
let time;
changement();
updateTimer(time, affichage);
let reduce;