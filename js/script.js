const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 20;

playerLivesCount.textContent = playerLives;

const getData = () => [
  { imgSrc: "./images/puzzle_15.jpg", name: "vader" },
  { imgSrc: "./images/puzzle_2.jpg", name: "trap" },
  { imgSrc: "./images/puzzle_3.jpg", name: "boba" },
  { imgSrc: "./images/puzzle_13.jpg", name: "yoda" },
  { imgSrc: "./images/puzzle_5.jpg", name: "wookie" },
  { imgSrc: "./images/puzzle_12.jpg", name: "han" },
  { imgSrc: "./images/puzzle_7.jpg", name: "jawa" },
  { imgSrc: "./images/puzzle_8.jpg", name: "obi" },
  { imgSrc: "./images/puzzle_15.jpg", name: "vader" },
  { imgSrc: "./images/puzzle_2.jpg", name: "trap" },
  { imgSrc: "./images/puzzle_3.jpg", name: "boba" },
  { imgSrc: "./images/puzzle_13.jpg", name: "yoda" },
  { imgSrc: "./images/puzzle_5.jpg", name: "wookie" },
  { imgSrc: "./images/puzzle_12.jpg", name: "han" },
  { imgSrc: "./images/puzzle_7.jpg", name: "jawa" },
  { imgSrc: "./images/puzzle_8.jpg", name: "obi" },

  //Full list of images
  /*   { imgSrc: "./images/puzzle_1.jpg", name: "ewok" },
  { imgSrc: "./images/puzzle_2.jpg", name: "trap" },
  { imgSrc: "./images/puzzle_3.jpg", name: "boba" },
  { imgSrc: "./images/puzzle_4.jpg", name: "lando" },
  { imgSrc: "./images/puzzle_5.jpg", name: "wookie" },
  { imgSrc: "./images/puzzle_6.jpg", name: "palpatine" },
  { imgSrc: "./images/puzzle_7.jpg", name: "jawa" },
  { imgSrc: "./images/puzzle_8.jpg", name: "obi" },
  { imgSrc: "./images/puzzle_9.jpg", name: "r3p0" },
  { imgSrc: "./images/puzzle_10.jpg", name: "r2d2" },
  { imgSrc: "./images/puzzle_11.jpg", name: "jabba" },
  { imgSrc: "./images/puzzle_12.jpg", name: "han" },
  { imgSrc: "./images/puzzle_13.jpg", name: "yoda" },
  { imgSrc: "./images/puzzle_14.jpg", name: "luke" },
  { imgSrc: "./images/puzzle_15.jpg", name: "vader" },
  { imgSrc: "./images/puzzle_16.jpg", name: "leia" }, */
];

console.log(getData());

const randomise = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

console.log(randomise());

// Card generator function
const cardGenerator = () => {
  const cardData = randomise();
  // Generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    // Attach info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach card to a section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    //My code
    /*     back.innerHTML = `<img src="images/reverse.jpg">`; */

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  if (flippedCards.length == 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1500);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("Try again!");
      }
    }
  }
  //Check if game won
  if (toggleCard.length === 16) {
    restart("You have won!");
  }
};

const restart = (text) => {
  let cardData = randomise();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //Randomise
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 20;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 200);
};

cardGenerator();
