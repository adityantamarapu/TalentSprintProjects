const gameContainer = document.querySelector(".game-container");
const cellSize = 20; // Cell size in pixels
const containerWidth = gameContainer.clientWidth;
const containerHeight = gameContainer.clientHeight;
const gridSizeX = Math.floor(containerWidth / cellSize) - 1;
const gridSizeY = Math.floor(containerHeight / cellSize) - 1;
const gridCells = [];
let playerSegments = [{ x: 0, y: 0 }]; // Array of player's body segments
let direction = "right";
let applePosition = { x: -1, y: -1 }; // Initial apple position

// multiplayer battle code
const urlParams = new URLSearchParams(window.location.search);
const device2IP = urlParams.get("2IP");

if (device2IP == null) {
  const WebSocket = require("ws");
  const server = new WebSocket.Server({ port: 8080 });

  let playerSegmentsOfPlayer2 = []; // Array to store playerSegments of the other player

  server.on("connection", (socket) => {
    console.log("Device 1: Connection established with Device 2");

    // Send playerSegments data to Device 2
    socket.send(JSON.stringify({ playerSegments }));

    socket.on("message", (message) => {
      const receivedData = JSON.parse(message);
      // Update playerSegmentsOfPlayer2 with receivedData
      playerSegmentsOfPlayer2 = receivedData.playerSegments;
      // Call a function to update the other player's position
      updatePlayer2Positions();
    });
  });

  function updatePlayer2Positions() {
    gridCells.forEach((cell) => cell.classList.remove("player2"));

    playerSegmentsOfPlayer2.forEach((segment) => {
      const segmentIndex = segment.y * gridSizeX + segment.x;
      gridCells[segmentIndex].classList.add("player2");
    });
  }
} else {
  const socket = new WebSocket("ws://"+device2IP+":8080"); // Replace with Device 2's IP

  socket.addEventListener("open", () => {
    console.log("Device 2: Connected to Device 1");
  });

  socket.addEventListener("message", (event) => {
    const receivedData = JSON.parse(event.data);
    // Update playerSegments with receivedData
    playerSegments = receivedData.playerSegments;
    // Call a function to update the player's position
    updatePlayerPositions();
  });

  // Add the function to send playerSegments data back to Device 1
  function sendPlayerSegmentsData() {
    const data = {
      playerSegments: playerSegments,
    };
    socket.send(JSON.stringify(data));
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

    playerSegments.unshift(newPlayerHead);

    // Check if the player occupied the apple cell
    if (newPlayerX === applePosition.x && newPlayerY === applePosition.y) {
      increaseSnakeLength();
      generateApple();
      playerSegments.pop();
    } else {
      playerSegments.pop();
    }

    updatePlayerPositions();
    sendPlayerSegmentsData();
  } else {
    clearInterval(gameInterval);
    showGameOverCard();
  }
}

function increaseSnakeLength() {
  const tail = playerSegments[playerSegments.length - 1];
  playerSegments.push({ x: tail.x, y: tail.y });
}

function updatePlayerPositions() {
  // console.log(playerSegments);
  gridCells.forEach((cell) => cell.classList.remove("player"));

  playerSegments.forEach((segment) => {
    const segmentIndex = segment.y * gridSizeX + segment.x;
    gridCells[segmentIndex].classList.add("player");
  });
}

function showGameOverCard() {
  const gameOverCard = document.querySelector(".game-over-card");
  const playAgainButton = gameOverCard.querySelector(".play-again-button");

  gameOverCard.style.display = "block";

  playAgainButton.addEventListener("click", () => {
    window.location.href = "../view/play_game.html";
  });
}

function generateApple() {
  // Remove the previous apple
  if (applePosition.x !== -1 && applePosition.y !== -1) {
    const prevAppleIndex = applePosition.y * gridSizeX + applePosition.x;
    gridCells[prevAppleIndex].classList.remove("apple");
  }

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

  applePosition = { x: newAppleX, y: newAppleY };
  const newAppleIndex = applePosition.y * gridSizeX + applePosition.x;
  gridCells[newAppleIndex].classList.add("apple");
}

function gameLoop() {
  movePlayer();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
});

createGrid();
generateApple();
const gameInterval = setInterval(gameLoop, 310);
