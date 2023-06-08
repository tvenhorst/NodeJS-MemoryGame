const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let currentPlayer = 1;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;

    if (currentPlayer === 1) {
      playerOneScore++;

    } else {
      playerTwoScore++;
    }
    updateScoreDisplay();

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updatePlayerDisplay();


  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updatePlayerDisplay();
    }, 1200);
  }
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
  playerOneScore = 0;
  playerTwoScore = 0;
  currentPlayer = 1;
  updatePlayerDisplay();
  updateScoreDisplay();
}

function updatePlayerDisplay() {
  const playerDisplay = document.querySelector(".player-display");
  playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScoreDisplay() {
  const playerOneScoreDisplay = document.querySelector(".player-one-score");
  const playerTwoScoreDisplay = document.querySelector(".player-two-score");
  playerOneScoreDisplay.textContent = `${playerOneScore}`;
  playerTwoScoreDisplay.textContent = `${playerTwoScore}`;
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", shuffleCard);
