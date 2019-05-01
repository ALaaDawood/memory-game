/*
 * Create a list that holds all of your cards
 */
const cardsList = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
let openCards = new Array();
const movesSpan = document.querySelector('.moves');
let moves = 0;
let stars = 3;
const restartBtn = document.querySelector('.restart');
const starsList = document.querySelectorAll('.fa-star');
starsListArr = Array.from(starsList);
const container = document.querySelector('.container');
const body = document.querySelector('body');
timerspan = document.querySelector('.timer');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
restartBtn.addEventListener('click', function () {
    window.location.reload();
    timer();
});
const shuffledCards = shuffle(cardsArray);

for (let i = 0; i < cardsArray.length; i++) {

    cardsList.appendChild(shuffledCards[i]);
    timer();
}


cardsList.addEventListener('click', cardClicked);

function cardClicked(e) {

    const clickedCard = e.target;
    if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('show')) {
        calcMoves();
        clickedCard.classList.add('show');
        addToOpenCards(clickedCard);
    }


}
let counter = 1;

function checkStatus() {

    for (let card of cards) {
        if (card.classList.contains('match')) {
            counter++;
            console.log("counter = " + counter);
            break;
        }
    }
    if (counter == 8) {
        displayScroe();
    }
}

function displayScroe() {
    console.log("you won!");
    //clearInterval(timerId);
    container.parentNode.removeChild(container);
    /****************Create Scroe Board Container********************/
    const scoreContainer = document.createElement('div');
    scoreContainer.setAttribute('class', 'scoreContainer');
    body.appendChild(scoreContainer);

    const checkImg = document.createElement('img');
    checkImg.setAttribute('src', './img/check-mark.gif');

    const congrats = document.createElement('h1');
    congrats.innerText = "Congratulations! YOU Won!";

    const playerStats = document.createElement('p');
    playerStats.innerText = "With " + moves + " Moves and " + stars + " Stars ";

    const againBtn = document.createElement('button');
    againBtn.innerText = "Play Again";
    againBtn.setAttribute('class', 'btnSuccess');
    againBtn.addEventListener('click', function () {
        window.location.reload();
    });

    scoreContainer.appendChild(checkImg);
    scoreContainer.appendChild(congrats);
    scoreContainer.appendChild(playerStats);
    scoreContainer.appendChild(againBtn);
}

function addToOpenCards(clickedCard) {
    clickedCard.classList.add('open');
    openCards.push(clickedCard);

    if (openCards.length === 2) {

        if (openCards[0].innerHTML == openCards[1].innerHTML) {
            foundMatch(openCards);
        } else {
            notMatched(openCards);
        }
    }

}

function foundMatch(array) {
    setTimeout(function () {
        array[0].classList.add('match');
        array[1].classList.add('match');
        openCards.pop();
        openCards.pop();
    }, 500);
    checkStatus();
}

function notMatched(array) {
    array[0].classList.add('notMatched');
    array[1].classList.add('notMatched');
    setTimeout(function () {
        for (let i = 0; i < array.length; i++) {

            array[i].classList.remove('show');
            array[i].classList.remove('open');
        }
        array[0].classList.remove('notMatched');
        array[1].classList.remove('notMatched');
        array.pop();
        array.pop();

    }, 500);

}

function calcMoves() {
    moves++;
    movesSpan.innerText = moves;
    updateStars();
}

function updateStars() {
    if (moves > 15 && moves < 25) {
        starsList[2].setAttribute('class', 'fa fa-star-o');
        stars = 2;
    }
    if (moves >= 25 && moves < 35) {
        starsList[1].setAttribute('class', 'fa fa-star-o');
        stars = 1;
    }
    if (moves >= 35) {
        starsList[0].setAttribute('class', 'fa fa-star-o');
        stars = 0;
    }

}

function timer() {
    var countdown = 900000;
    var timerId = setInterval(function () {
        countdown -= 1000;
        var min = Math.floor(countdown / (60 * 1000));
        var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);

        if (countdown <= 0) {
            alert("Time's up!");
            clearInterval(timerId);
            window.location.reload();

        } else {
            timerspan.innerText = min + " : " + sec;

        }

    }, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */