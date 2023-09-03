const playButton = document.querySelector(".play-button");
const createButton = document.querySelector(".create-button");
const joinButton = document.querySelector(".join-button");
const instructionsButton = document.querySelector(".btn-instructions");
const instructionsCard = document.querySelector(".instructions-card");
const CodeInputField = document.querySelector(".code-input");
const battleButton = document.querySelector(".btn-battle");
const battleCard = document.querySelector(".battle-card");
const passInputField = document.querySelector(".password-input");

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

playButton.addEventListener("mouseenter", function () {
  battleCard.style.display = "none";
});

instructionsButton.addEventListener("mouseenter", function () {
  battleCard.style.display = "none";
});

// Add an event listener to the "Play" button
playButton.addEventListener("click", function () {
  // Redirect to play_game.html
  window.location.href = "../view/play_game.html";
});

// Create a function to send a POST request
async function checkPassword(host_IP, password) {
  try {
    const url =
      `/check-password/${encodeURIComponent(password)}`;
    const response = await fetch(url, {
      method: "POST", // Change the request method to POST
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error checking password:", error);
    throw error; // Rethrow the error for handling later if needed
  }
}

createButton.addEventListener("click", async function () {
  const host_IP = CodeInputField.value.trim();
  const battlePass = passInputField.value.trim();

  if (battlePass !== "") {
    try {
      const data = await checkPassword(host_IP, battlePass);

      if (data.available === true) {
        window.location.href=
          `../view/multi_play_game.html?2IP=${encodeURIComponent(
            host_IP
          )}&password=${encodeURIComponent(battlePass)}&isHost=true`;
      } else {
        alert("Password already in use. Please choose a different password.");
      }
    } catch (error) {
      console.error("Error checking password:", error);
    }
  }
});

joinButton.addEventListener("click", async function () {
  const host_IP = CodeInputField.value.trim();
  const battlePass = passInputField.value.trim();

  if (host_IP !== "" && battlePass !== "") {
    try {
      const data = await checkPassword(host_IP, battlePass);

      if (data.valid === true) {
        window.location.href =
          `../view/multi_play_game.html?2IP=${encodeURIComponent(
            host_IP
          )}&password=${encodeURIComponent(battlePass)}&isHost=false`;
      } else {
        alert("Invalid password or game is already full.");
      }
    } catch (error) {
      console.error("Error checking password:", error);
    }
  }
});
