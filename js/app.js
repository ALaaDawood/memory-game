/*
 * Create a list that holds all of your cards
 */
const cardsList = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards); 
let openCards = new Array();
const movesSpan = document.querySelector('.moves');
let moves = 0;
const restartBtn = document.querySelector('.restart');
const starsList = document.querySelectorAll('.fa-star');
const container = document.querySelector('.container');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
restartBtn.addEventListener('click', function () {
    window.location.reload();
});
const shuffledCards = shuffle(cardsArray);

for (let i = 0; i < cardsArray.length; i++) {

    cardsList.appendChild(shuffledCards[i]);
    
}


cardsList.addEventListener('click', cardClicked);

function cardClicked(e) {

    const clickedCard = e.target;
    if (clickedCard.classList.contains('card'))
    {
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
            console.log("counter = "+counter);
            break;
        }
    }
    if (counter == 8) {
        displayScroe();
    }
}
function displayScroe() {
    console.log("you won!");
    container.remove();
    document.createElement('p')
}

function addToOpenCards(clickedCard) {
    clickedCard.classList.add('open');
    openCards.push(clickedCard);

    if (openCards.length === 2) {

        if (openCards[0].innerHTML == openCards[1].innerHTML)
        {
            foundMatch(openCards);
        }
        else {
            notMatched(openCards);
        }
    }

}

function foundMatch(array)
{
    setTimeout(function () {
        array[0].classList.add('match');
        array[1].classList.add('match');
        openCards.pop();
        openCards.pop();
    }, 500);
    checkStatus();
}
function notMatched(array)
{
    //array[0].style.backgroundColor = "tomato";
    //array[1].style.backgroundColor = "tomato";
    setTimeout(function () {
        for (let i = 0; i < array.length; i++) {
           
            array[i].classList.remove('show');
            array[i].classList.remove('open');
        }
        array.pop();
        array.pop();
    }, 500);
    
}
function calcMoves() {
    moves++;
    movesSpan.innerText = moves;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
