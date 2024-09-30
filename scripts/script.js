const DEFAULTTIMERTRAVAIL = 1500;
const DEFAULTTIMERPAUSE = 300;
const CYCLE = 4;

if (localStorage.getItem('mb_pomodoro_travail') == null) {
    localStorage.setItem('mb_pomodoro_travail',  JSON.stringify(DEFAULTTIMERTRAVAIL));
}
if (localStorage.getItem('mb_pomodoro_pause') == null) {
    localStorage.setItem('mb_pomodoro_pause',  JSON.stringify(DEFAULTTIMERPAUSE));
}

localStorage.setItem('mb_pomodoro_travail',  JSON.stringify(DEFAULTTIMERTRAVAIL));
localStorage.setItem('mb_pomodoro_pause',  JSON.stringify(DEFAULTTIMERPAUSE));

function getTime(valeur) {
    let hour = Math.floor(valeur/3600);
    let minute = Math.floor(valeur/60) - hour;
    let second = (valeur - minute*60 - hour*3600).toString();
    if (second.length == 1) {
        second = "0"+second;
    }
    if (minute.length == 1) {
        minute = "0"+minute;
    }
    if (hour.length == 1) {
        hour = "0"+hour;
    }
    return hour+":"+minute+":"+second;
}

function getSecond(time) {
    let hour = parseInt(time.substring(1,2));
    let minute = parseInt(time.substring(4,5));
    let second = parseInt(time.substring(7,8));
    return hour*3600 + minute*60 + second;
}


let TIMERTRAVAIL = JSON.parse(localStorage.getItem('mb_pomodoro_travail'));
let TIMERPAUSE = JSON.parse(localStorage.getItem('mb_pomodoro_pause'));

document.getElementById("temps_travail").value = getTime(JSON.parse(localStorage.getItem('mb_pomodoro_travail')));
document.getElementById("temps_pause").value = getTime(JSON.parse(localStorage.getItem('mb_pomodoro_pause')));

document.getElementById("changer").addEventListener("click", function() {
    console.log(getSecond(JSON.stringify(document.getElementById("temps_pause").value)));
    console.log(getSecond(JSON.stringify(document.getElementById("temps_travail").value)));
    localStorage.setItem('mb_pomodoro_travail', getSecond(JSON.stringify(document.getElementById("temps_travail").value)));
    localStorage.setItem('mb_pomodoro_pause', getSecond(JSON.stringify(document.getElementById("temps_pause").value)));
    TIMERTRAVAIL = getSecond(document.getElementById("temps_travail").value.toString());
    TIMERPAUSE = getSecond(document.getElementById("temps_pause").value.toString())
}); 

/**
 * change l'état du timer (Travail <-> Pause)
 */
function changement() {
    if (state % 2 == 1) {
        //si travail
        time = TIMERTRAVAIL;
        usedTimer = TIMERTRAVAIL;
        document.getElementById("travail").style.color = "Yellow";
        document.getElementById("pause").style.color = "White";
        state++;
    } else if (state % 2 == 0 && state != (CYCLE * 2)) {
        //si pause
        time = TIMERPAUSE;
        usedTimer = TIMERPAUSE;
        document.getElementById("travail").style.color = "White";
        document.getElementById("pause").style.color = "Yellow";
        state++;
    } else {
        //si grande pause
        time = TIMERTRAVAIL;
        usedTimer = TIMERTRAVAIL;
        document.getElementById("travail").style.color = "White";
        document.getElementById("pause").style.color = "Yellow";
        state=1;
    }
}

/**
 * enleve 1 au timer et provoque le changement d'état si le timer arrive à 0
 */
function reduceTime() {
    if (time <= 0) {
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
        //eteindre timer
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
        bar.animate(1); //reset la barre
    } else {
        //lancer timer
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

/*créer le cercle de progression*/
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

let state = 1; //defini l'état du timer
let usedTimer; //defini le temps utilisé pour le timer actuel (cercle de progression)
let allume = false; //indique si le timer est allumé ou eteint
document.getElementById("play").addEventListener("click", handleStartStop);
let affichage = document.getElementById("timer"); //pour modifier le timer sur le site
let time; //definition de la variable stockant le temps restant
changement(); //initialisation de l'état
updateTimer(time, affichage); //mise à jour de l'affichage
let reduce; //definition de l'intervale