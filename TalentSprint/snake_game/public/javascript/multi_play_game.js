const gameContainer = document.querySelector(".game-container");
const cellSize = 20; // Cell size in pixels
const containerWidth = gameContainer.clientWidth;
const containerHeight = gameContainer.clientHeight;
const gridSizeX = Math.floor(containerWidth / cellSize) - 1;
const gridSizeY = Math.floor(containerHeight / cellSize) - 1;
const gridCells = [];
let playerSegments = [{ x: 0, y: 0 }]; // Array of player's body segments
let player2Segments = [];
let direction = "right";
let applePosition = { x: -1, y: -1 }; // Initial apple position
const gameOverCard = document.querySelector(".game-over-card");
const playAgainButton = gameOverCard.querySelector(".play-again-button");
let isOpen = false; // Initialize isOpen as false

// multiplayer battle code
const urlParams = new URLSearchParams(window.location.search);
const host_IP = urlParams.get("2IP");
const password = urlParams.get("password"); // Get the secret password from URL param
const isHost = urlParams.get("isHost") === "true";

// Determine the class to add based on host_IP
const classToAdd = isHost === false || isHost === null ? "player2" : "player";

if (isHost === false || isHost === null) playerSegments = [{ x: 1, y: 0 }];

// Show the "Add Player 2" button only for the host
if (isHost === true) {
  const addPlayer2Button = document.querySelector("#addPlayer2Button"); // Add Player 2 button
  const shareLinkCard = document.querySelector("#shareLinkCard"); // Shareable Link Card
  const shareableLinkInput = document.querySelector("#shareableLink"); // Input field for shareable link
  const copyLinkButton = document.getElementById("copyLinkButton");

  addPlayer2Button.style.display = "block";

  // Add a click event listener to the "Add Player 2" button
  addPlayer2Button.addEventListener("click", () => {
    //console.log(hello);
    if (isHost === true) {
      // Generate the shareable link with password
      const shareableLink =
        `http://` +
        host_IP +
        `/view/multi_play_game.html?2IP=` +
        host_IP +
        `&password=${encodeURIComponent(password)}&isHost=false`;

      // Set the link in the input field
      shareableLinkInput.value = shareableLink;

      // Toggle the visibility of the shareable link card
      if (shareLinkCard.style.display == "block") {
        // Hide the card
        shareLinkCard.style.display = "none";
      } else {
        // Show the card
        shareLinkCard.style.display = "block";
      }
    }
  });

  // Add a click event listener to the "Copy Link" button
  copyLinkButton.addEventListener("click", () => {
    // Select the text in the input field
    shareableLinkInput.select();
    shareableLinkInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Deselect the input
    shareableLinkInput.blur();

    // Optionally, provide user feedback (e.g., show a tooltip)
    // You can add a tooltip or a message to inform the user that the link has been copied
    // For example:
    // copyLinkButton.innerText = "Link Copied!";
  });
} else {
  addPlayer2Button.style.display = "none";
}

const socket = io("http://" + host_IP + ":7000/game"); // Replace with Device 1/ host's IP

// socket.addEventListener("connect", () => {
//   console.log(socket);
// });

// Add an "error" event listener
socket.on("error", (error) => {
  console.error("Socket error:", error);
});

// Listen for the "passwordSet" event before the socket opens
socket.on("passwordSet", (data) => {
  if (data) {
    //const receivedData = JSON.parse(event.data);
    console.log(data.message);
  }
});

socket.on("connect", () => {
  console.log("Socket opened");

  isOpen = true;

  // Send the password to the server when the connection is opened
  if (isHost === true) {
    console.log("isHost: " + isHost);
    console.log("sending password to server");
    socket.emit("setPassword", { password });
  } else if (isHost === null || isHost === false) {
    console.log("isHost: " + isHost);
    console.log("joining with password");
    socket.emit("joinPassword", { password });
  }
});

// update apple position when player 2 joins
socket.on("player2Joined", () => {
  generateApplePosition();
});

socket.on("appleSync", (data) => {
  //data = JSON.stringify(data);
  // Remove the previous apple
  if (applePosition.x !== -1 && applePosition.y !== -1) {
    const prevAppleIndex = applePosition.y * gridSizeX + applePosition.x;
    gridCells[prevAppleIndex].classList.remove("apple");
  }

  // If applePosition is received, update the apple position
  applePosition = data["applePosition"];

  // Update the grid to show the new apple position
  const newAppleIndex = applePosition.y * gridSizeX + applePosition.x;
  gridCells[newAppleIndex].classList.add("apple");
});

socket.on("snakeSync", (data) => {
  //data = JSON.stringify(data);

  //console.log(data);
  updatePlayer2Positions(data.playerSegments, data.classToAdd);
});

function updatePlayer2Positions(newPlayer2Segments, newClassToAdd) {
  //console.log()

  //if (newPlayer2Segments && Array.isArray(newPlayer2Segments)) {
  // Remove the class "player2" from the previous Player 2 segments
  player2Segments.forEach((segment) => {
    gridCells[segment.y * gridSizeX + segment.x].classList.remove(
      newClassToAdd
    );
  });

  // Add the class "player2" to the new Player 2 segments
  newPlayer2Segments.forEach((segment) => {
    gridCells[segment.y * gridSizeX + segment.x].classList.add(newClassToAdd);
  });

  // Update the player2Segments array
  player2Segments = newPlayer2Segments;
  // } else {
  //   console.error("Invalid player segments data received.");
  // }
}

socket.on("otherPlayerLeft", () => {
  let otherPlayerColor;
  if (isHost === false || isHost === null) {
    alert("Host has disconnected.");
    window.location.href = "/view/start_page.html";
    otherPlayerColor = "player";
  } else {
    otherPlayerColor = "player2";
  }
  player2Segments.forEach((segment) => {
    gridCells[segment.y * gridSizeX + segment.x].classList.remove(otherPlayerColor);
  });
});

socket.on("disconnect", () => {
  // Set isOpen to false when the connection is closed
  isOpen = false;
  console.log("WebSocket connection closed");
});

// Modify sendPlayerSegmentsData to check isOpen before sending data
function sendPlayerSegmentsData() {
  if (isOpen) {
    const data = {
      isHost: isHost,
      classToAdd: classToAdd,
      playerSegments: playerSegments,
    };
    socket.emit("snakeSync", data);
  }
}

function sendApplePosition() {
  if (isOpen) {
    const data = {
      isHost: isHost,
      applePosition: applePosition,
    };
    socket.emit("appleSync", data);
  }
}

function createGrid() {
  for (let y = 0; y < gridSizeY; y++) {
    for (let x = 0; x < gridSizeX; x++) {
      const gridCell = document.createElement("div");
      gridCell.className = "grid-cell";
      gameContainer.appendChild(gridCell);
      gridCells.push(gridCell);
    }
  }
}

function movePlayer() {
  let newPlayerX = playerSegments[0].x;
  let newPlayerY = playerSegments[0].y;

  if (direction === "right") {
    newPlayerX += 1;
  } else if (direction === "left") {
    newPlayerX -= 1;
  } else if (direction === "up") {
    newPlayerY -= 1;
  } else if (direction === "down") {
    newPlayerY += 1;
  }

  // Check if the new position is within the grid bounds
  if (
    newPlayerX >= 0 &&
    newPlayerX < gridSizeX &&
    newPlayerY >= 0 &&
    newPlayerY < gridSizeY &&
    !gridCells[newPlayerY * gridSizeX + newPlayerX].classList.contains("player")
  ) {
    const newPlayerHead = { x: newPlayerX, y: newPlayerY };

    // Add the class to the new head
    gridCells[newPlayerY * gridSizeX + newPlayerX].classList.add(classToAdd);

    playerSegments.unshift(newPlayerHead);

    // Check if the player occupied the apple cell
    if (newPlayerX === applePosition.x && newPlayerY === applePosition.y) {
      generateApplePosition();
    } else {
      // Remove the class from the tail
      const tail = playerSegments.pop();
      gridCells[tail.y * gridSizeX + tail.x].classList.remove(classToAdd);
    }

    sendPlayerSegmentsData();
  } else {
    showGameOverCard();
  }
}

// function updatePlayerPositions(playerSegments) {
//   // console.log(playerSegments);
//   gridCells.forEach((cell) => cell.classList.remove("player2"));

//   playerSegments.forEach((segment) => {
//     const segmentIndex = segment.y * gridSizeX + segment.x;
//     if (host_IP != null) {
//       gridCells[segmentIndex].classList.add("player2");
//     } else gridCells[segmentIndex].classList.add("player");
//   });
// }

function showGameOverCard() {
  clearInterval(gameInterval);

  document.removeEventListener("keydown", keyBoardEvents);

  // show card
  gameOverCard.style.display = "block";

  // Remove the previous event listener if it exists
  playAgainButton.addEventListener("click", handlePlayAgain);
}

function handlePlayAgain() {
  gameOverCard.style.display = "none";

  // Remove snake
  playerSegments.forEach((segment) => {
    const segmentIndex = segment.y * gridSizeX + segment.x;
    if (isHost === true) gridCells[segmentIndex].classList.remove("player");
    else gridCells[segmentIndex].classList.remove("player2");
  });

  if (isHost === false || isHost === null) playerSegments = [{ x: 1, y: 0 }];
  else playerSegments = [{ x: 0, y: 0 }];
  direction = "right";

  //console.log(playerSegments);

  gameInterval = setInterval(gameLoop, 310);

  // Add the event listener
  playAgainButton.removeEventListener("click", handlePlayAgain);

  // Add key events back
  document.addEventListener("keydown", keyBoardEvents);
}

function updateApplePosition(newAppleX, newAppleY) {
  // Remove the previous apple
  if (applePosition.x !== -1 && applePosition.y !== -1) {
    const prevAppleIndex = applePosition.y * gridSizeX + applePosition.x;
    gridCells[prevAppleIndex].classList.remove("apple");
  }

  // Update the apple position
  applePosition = { x: newAppleX, y: newAppleY };
  const newAppleIndex = applePosition.y * gridSizeX + applePosition.x;
  gridCells[newAppleIndex].classList.add("apple");

  sendApplePosition();
}

function generateApplePosition() {
  // Find a random position for the new apple
  let newAppleX, newAppleY;
  do {
    newAppleX = Math.floor(Math.random() * gridSizeX);
    newAppleY = Math.floor(Math.random() * gridSizeY);
  } while (
    playerSegments.some(
      (segment) => segment.x === newAppleX && segment.y === newAppleY
    ) // || // Avoid player's segments
    //gridCells[newAppleY * gridSizeX + newAppleX].classList.contains("apple") // Avoid existing apple
  );

  updateApplePosition(newAppleX, newAppleY);
}

function gameLoop() {
  movePlayer();
}

function keyBoardEvents(event) {
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
}

document.addEventListener("keydown", keyBoardEvents);

createGrid();
if (isHost === true) {
  generateApplePosition();
}
let gameInterval = setInterval(gameLoop, 310);
