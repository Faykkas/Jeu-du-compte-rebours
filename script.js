// Initialisation des variables de jeu
let score = 0;
let countdown = 20; // Durée du jeu en secondes
let timer;
let targetInterval; // variable pour l'intervalle des cibles
const targetSpeed = 700; // Temps de disparition de chaque cible , tu peux regler la difficulté du jeu ici si tu met des valeurs inférieur le jeu sera plus compliquer.

// Sélection des éléments DOM
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const gameArea = document.getElementById("game-area");

// Affiche le pop-up des règles du jeu au chargement de la page
window.addEventListener("load", showRulesPopup);

// Affiche les règles du jeu dans un pop-up
function showRulesPopup() {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Règles du Jeu</h2>
            <p>Cliquez sur les cibles rouges pour marquer des points. Vous avez 20 secondes pour obtenir le meilleur score possible.</p>
            <button class="close-button">Commencer</button>
        </div>
    `;

    // Démarre le jeu en fermant le pop-up
    popup.querySelector(".close-button").addEventListener("click", () => {
        popup.remove();
        startButton.disabled = false; // Active le bouton de démarrage
    });

    document.body.appendChild(popup);
}

// Débute une nouvelle partie
startButton.addEventListener("click", startGame);

function startGame() {
    // Réinitialise les valeurs de jeu
    score = 0;
    countdown = 20;
    updateScore();
    updateTimer();

    // Préparation de l'interface de jeu
    startButton.disabled = true;
    gameArea.innerHTML = "";

    // Démarre le compte à rebours
    timer = setInterval(updateTimer, 1000);

    // Démarre un intervalle pour apparaître les cibles toutes les `targetSpeed` millisecondes
    targetInterval = setInterval(spawnTarget, targetSpeed);
}

// Met à jour le compte à rebours chaque seconde
function updateTimer() {
    countdown--;
    timerDisplay.textContent = "Temps restant : " + countdown + "s";
    if (countdown <= 0) endGame();
}

// Affiche le score final et termine la partie
function showEndGamePopup() {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
      <div class="popup-content">
        <span class="celebration-emoji">🎉</span>
        <h2>Votre score final : ${score}</h2>
        <button class="close-button">Fermer</button>
      </div>
    `;

    // Ferme le pop-up quand l'utilisateur clique sur "Fermer"
    popup.querySelector(".close-button").addEventListener("click", () => {
        popup.remove();
    });

    document.body.appendChild(popup);
}

// Termine le jeu et affiche le score final
function endGame() {
    clearInterval(timer); // Arrête le compte à rebours
    clearInterval(targetInterval); // Arrête l'apparition des cibles
    startButton.disabled = false; // Réactive le bouton pour rejouer
    gameArea.innerHTML = ""; // Efface toutes les cibles
    showEndGamePopup(); // Affiche le pop-up de fin de partie
}

// Met à jour l'affichage du score
function updateScore() {
    scoreDisplay.textContent = "Score : " + score;
}

// Génère une nouvelle cible dans une position aléatoire
function spawnTarget() {
    // Supprime l'ancienne cible s'il y en a une
    gameArea.innerHTML = "";

    const target = document.createElement("div");
    target.classList.add("target");

    // Position aléatoire de la cible dans la zone de jeu
    target.style.left = Math.random() * (gameArea.clientWidth - 40) + "px";
    target.style.top = Math.random() * (gameArea.clientHeight - 40) + "px";
    gameArea.appendChild(target);

    // Augmente le score et génère une nouvelle cible lors du clic sur la cible
    target.addEventListener("click", () => {
        score++;
        updateScore();
        target.remove(); // Supprime la cible actuelle pour éviter les clics répétés
    });
}
