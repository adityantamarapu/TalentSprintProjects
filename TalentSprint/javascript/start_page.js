const playButton = document.querySelector(".play-button");
const createButton= document.querySelector('.create-button');
const instructionsButton = document.querySelector(".btn-instructions");
const instructionsCard = document.querySelector(".instructions-card");
const CodeInputField= document.querySelector('.code-input');
const battleButton = document.querySelector(".btn-battle");
const battleCard = document.querySelector(".battle-card");

instructionsButton.addEventListener("mouseover", function () {
  instructionsCard.style.display = "block";
});

instructionsButton.addEventListener("mouseout", function () {
  instructionsCard.style.display = "none";
});

battleButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default button behavior
  if (battleCard.style.display == "block") {
    battleCard.style.display = "none";
  } else {
    battleCard.style.display = "block";
  }
});

playButton.addEventListener("mouseenter", function() {
    battleCard.style.display = "none";
});

instructionsButton.addEventListener("mouseenter", function() {
    battleCard.style.display = "none";
});

// Add an event listener to the "Play" button
playButton.addEventListener("click", function () {
  // Redirect to play_game.html
  window.location.href = "../view/play_game.html";
});


createButton.addEventListener("click", function() {
    const battleCode = CodeInputField.value.trim();
    if (battleCode !== "") {
        window.location.href = `../view/multi_play_game.html?battleCode=${encodeURIComponent(battleCode)}`;
    }
});