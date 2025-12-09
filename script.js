console.clear();

const INPUTS = document.querySelectorAll(".info-input");
const CARD = document.querySelector("#card-content");
const BTNS = document.querySelectorAll("button");
const INFO = document.querySelector("#card-info");

let currentCard = 0; // this global variable kinda sketchy
let currentSide = "Front";
// too many variables of the same thing Lol
let currentUID = null;
let cards = [];

// setup functions
const getUID = () => {
  let UID = localStorage.getItem("cards_user");
  if (!UID) {
    UID = "user_" + Date.now();
  }
  localStorage.setItem("cards_user", UID);
  return UID;
};

const saveCards = () => {
  if (currentUID) {
    localStorage.setItem(`cards_${currentUID}`, JSON.stringify(cards));
  }
};

const loadCards = () => {
  const saved = localStorage.getItem(`cards_${currentUID}`);
  cards = saved ? JSON.parse(saved) : [];
  currentCard = 0;
  currentSide = "Front";
};

const setCard = () => {
  if (cards.length == 0) {
    CARD.innerText = "Empty card";
    INFO.innerText = `No cards to show :)`;
  } else {
    INFO.innerText = `Card ${currentCard + 1}/${cards.length} (${currentSide})`;
    CARD.innerText = cards[currentCard][currentSide];
  }
};

const deleteCard = () => {
  console.log(cards);
  console.log(currentCard);
  cards.splice(currentCard, 1);
  console.log(cards);

  if (currentCard > 0) currentCard--;
  saveCards();
  setCard();
};

const flipCard = () => {
  currentSide == "Front" ? (currentSide = "Back") : (currentSide = "Front");
  setCard();
};

const nextCard = () => {
  currentCard == cards.length - 1 ? (currentCard = 0) : currentCard++;
  setCard();
};

const displayError = () => {
  console.log("Please add a card!");
};

// add card function
const addCard = (curCard) => {
  let cardFront;
  let cardBack;

  //clean up?
  if (INPUTS[0].value && INPUTS[1].value) {
    INPUTS.forEach((input, i) => {
      switch (input.id) {
        case "front-input":
          cardFront = input.value;
          break;
        case "back-input":
          cardBack = input.value;
          break;
      }
      input.value = "";
    });

    // add to array
    cards.push({
      Front: cardFront,
      Back: cardBack,
    });
    // if (cards.length == 1) {
    //   CARD.innerText = cards[curCard]['Front']
    // }
    saveCards();
    // ye clean up this too. liek you can put the functions inside each other
    setCard();
    console.log(cards[curCard]);
  }
};

BTNS.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    switch (btn.id) {
      case "add-btn":
        addCard(cards.length);
        break;
      case "flip-btn":
        cards.length > 0 ? flipCard() : displayError();
        break;
      case "next-btn":
        cards.length > 0 ? nextCard() : displayError();
        break;
      case "delete-btn":
        cards.length > 0 ? deleteCard() : displayError();
        break;
    }
  });
});

//enter
INPUTS.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") addCard(cards.length); //idk should i fix this cards.length thing to make it global or --- im just testing
  });
});

// load cards from the local storage
currentUID = getUID();
loadCards();
setCard();
