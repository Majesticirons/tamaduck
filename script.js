// Game state
let gameState = {
    duck: null,
    name: '',
    hunger: 100,
    fun: 100,
    cleanliness: 100,
    health: 100,
    sleep: 100,
    coins: 0,
    foodUpgrade: 1,
};

// Elements
const gameScreen = document.getElementById('game-screen');
const selectionScreen = document.getElementById('selection-screen');
const duckNameDisplay = document.getElementById('duck-name-display');
const selectedDuck = document.getElementById('selected-duck');
const hungerBar = document.getElementById('hunger');
const funBar = document.getElementById('fun');
const cleanlinessBar = document.getElementById('cleanliness');
const healthBar = document.getElementById('health');
const sleepBar = document.getElementById('sleep');
const coinsDisplay = document.getElementById('coins');

// Update game state
function updateGameState() {
    duckNameDisplay.textContent = gameState.name;
    selectedDuck.src = gameState.duck;
    hungerBar.value = gameState.hunger;
    funBar.value = gameState.fun;
    cleanlinessBar.value = gameState.cleanliness;
    healthBar.value = gameState.health;
    sleepBar.value = gameState.sleep;
    coinsDisplay.textContent = 'Coins: ' + gameState.coins;
}

// Duck selection
document.getElementById('select-duck1').addEventListener('click', function() {
    gameState.duck = 'duck1.png';
});
document.getElementById('select-duck2').addEventListener('click', function() {
    gameState.duck = 'duck2.png';
});

// Duck naming
document.getElementById('name-duck').addEventListener('click', function() {
    const nameInput = document.getElementById('duck-name');
    gameState.name = nameInput.value;
    nameInput.value = '';
    selectionScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    updateGameState();
});

// Status degradation
setInterval(function() {
    gameState.hunger -= 1;
    gameState.fun -= 1;
    gameState.cleanliness -= 1;
    gameState.health -= 1;
    gameState.sleep -= 1;
    updateGameState();
    if (gameState.hunger <= 0 || gameState.fun <= 0 || gameState.cleanliness <= 0 || gameState.health <= 0 || gameState.sleep <= 0) {
        alert('Your duck has died. Game over.');
        location.reload();
    }
}, 1000);
// Button actions with costs
document.getElementById('feed-duck').addEventListener('click', function() {
    if (gameState.coins >= 2) {
        gameState.hunger += 10 * gameState.foodUpgrade;
        if (gameState.hunger > 100) gameState.hunger = 100;
        gameState.coins -= 2;
        updateGameState();
    } else {
        alert('Not enough coins.');
    }
});
// ... repeat for other actions with appropriate costs

// Economy system with minigames
document.getElementById('play-minigame').addEventListener('click', function() {
    // Randomly select a minigame
    const minigame = Math.floor(Math.random() * 3);
    if (minigame === 0) {
        playBlackjack();
    } else if (minigame === 1) {
        playGuessingGame();
    } else {
        playNumberMatchingGame();
    }
});

// Blackjack minigame
function playBlackjack() {
    const playerScore = Math.floor(Math.random() * 11) + 10; // 10 to 20
    const dealerScore = Math.floor(Math.random() * 11) + 10; // 10 to 20
    if (playerScore > dealerScore || dealerScore > 21) {
        rewardCoins();
        alert('You won the blackjack game! Your score: ' + playerScore + ', Dealer score: ' + dealerScore);
    } else {
        alert('You lost the blackjack game. Your score: ' + playerScore + ', Dealer score: ' + dealerScore);
    }
}

// Guessing game
function playGuessingGame() {
    const correctNumber = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const playerGuess = Math.floor(Math.random() * 10) + 1; // 1 to 10
    if (playerGuess === correctNumber) {
        rewardCoins();
        alert('You won the guessing game! You guessed: ' + playerGuess + ', Correct number: ' + correctNumber);
    } else {
        alert('You lost the guessing game. You guessed: ' + playerGuess + ', Correct number: ' + correctNumber);
    }
}

// Number matching game
function playNumberMatchingGame() {
    const numberToMatch = Math.floor(Math.random() * 100) + 1; // 1 to 100
    const playerNumber = Math.floor(Math.random() * 100) + 1; // 1 to 100
    const difference = Math.abs(playerNumber - numberToMatch);
    if (difference <= 10) {
        rewardCoins();
        alert('You won the number matching game! Your number: ' + playerNumber + ', Number to match: ' + numberToMatch);
    } else {
        alert('You lost the number matching game. Your number: ' + playerNumber + ', Number to match: ' + numberToMatch);
    }
}

// Reward coins
function rewardCoins() {
    const reward = Math.floor(Math.pow(Math.random(), 2) * 5) + 1; // 1 is most common, 5 is rarest
    gameState.coins += reward;
    updateGameState();
    if (reward === 5) {
        alert('Jackpot! You won 5coins!');
    }
}

// Upgrade costs
document.getElementById('upgrade-duck').addEventListener('click', function() {
    if (gameState.coins >= 10) {
        gameState.coins -= 10;
        gameState.hunger += 10;
        gameState.fun += 10;
        gameState.cleanliness += 10;
        gameState.health += 10;
        gameState.sleep += 10;
        updateGameState();
        alert('Your duck has been upgraded!');
    } else {
        alert('Not enough coins. Upgrade costs 10 coins.');
    }
});
document.getElementById('upgrade-food').addEventListener('click', function() {
    if (gameState.coins >= 10) {
        gameState.coins -= 10;
        gameState.foodUpgrade += 1;
        updateGameState();
        alert('Your food has been upgraded!');
    } else {
        alert('Not enough coins. Upgrade costs 10 coins.');
    }
});
