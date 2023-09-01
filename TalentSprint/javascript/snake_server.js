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
