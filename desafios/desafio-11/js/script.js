const cards = document.querySelectorAll('.card');
const modais = document.getElementById('modais')
const modalWin = document.getElementById('modal-victory')
const modalLose= document.getElementById('modal-lose')
// const timer = document.querySelector(".timer");
// const time = document.querySelector(".time");
const counter = document.querySelector('.moves');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let dificult = '';
let totalPairs = 9;
let pairs = 0;
// let mediumTime = 10 * 60, hardTime = 5 * 60;
let moves = 0;

function startGame(){
    let dificult = document.getElementById('dificult').value;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
    moves = 0;

    switch (dificult) {
        case 'easy':
            shuffle();
            localStorage.setItem('dificult', 'easy');
            // timer.style.display = 'none';
            break;
            
        case 'medium':
            shuffle();
            localStorage.setItem('dificult', 'medium');
            // startTimer(dificult);
            break;
            
        case 'hard':
            shuffle();
            localStorage.setItem('dificult', 'hard');
            // startTimer(dificult);
        break;
            
        default:
            shuffle();
            break;
    }
}


function restartGame(){
    cards.forEach(card => card.classList.remove('flip'));
    resetBoard();
    shuffle();
    // startTimer(localStorage.getItem('dificult'));
    resetMoves();
    pairs = 0;
}

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    moveCounter();

    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.killer === secondCard.dataset.killer;

    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    pairs++;

    if(pairs == 9){
        finishGame();
    }

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    })
}

function finishGame(){
    modais.style.display = 'flex';
    // time.stop();
    if(pairs == 9){
        modalWin.style.display = 'flex';
    } else {
        modalLose.style.display = 'flex';
    }
    pairs = 0;
}

function closeModal(){
    modais.style.display = 'none';
    modalWin.style.display = 'none';
    modalLose.style.display = 'none';
}

function playAgain(){
    closeModal();
    dificult = localStorage.getItem('dificult');
    resetMoves();
    startGame();
}


// function startTimer(dificultTime) {
//     timer.style.display = 'block';
//     const minutes = Math.floor(time)
//     let seconds = timeRemaining % 60;
//     switch(dificultTime){
//         case 'medium':
//             time = new Timer(timer, 600);
//             break;
            
//         case 'hard':
//             time = new Timer(timer, 300);
//             break;

//         default:
//             break;
//     }
// }

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
}

function resetMoves() {
    moves = 0;
    counter.innerHTML = moves;
}