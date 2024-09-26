const TIMER = 60;

/**
 * enleve 1 au timer et supprime l'intervalle si il arrive à 0
 */
function reduceTime() {
    if (time <= 0) {
        clearInterval(reduce);
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
    bar.animate((duree/TIMER)*1.0);
}

/**
 * allume ou réinitialise le timer suivant la valeur du boolean globale allume
 */
function handleStartStop() {
    if (allume) {
        //eteindre
        clearInterval(reduce);
        time = TIMER;
        updateTimer(time, affichage);
        if ( document.getElementById("ss").classList.contains('fa-rotate') ) {
            document.getElementById("ss").classList.remove('fa-rotate');
            document.getElementById("ss").classList.add('fa-play');
         }
        allume = false;
        bar.animate(1);
    } else {
        //lancer
        reduce = setInterval(function() {
            reduceTime();
            updateTimer(time, affichage);
        }, 1000);
        
        if ( document.getElementById("ss").classList.contains('fa-play') ) {
           document.getElementById("ss").classList.remove('fa-play');
           document.getElementById("ss").classList.add('fa-rotate');
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

let allume = false;
document.getElementById("play").addEventListener("click", handleStartStop);
let affichage = document.getElementById("timer");
let time = TIMER;
updateTimer(time, affichage);
let reduce;