const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io"); // Import Socket.IO
const { platform } = require("os");
const { exec } = require("child_process");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 7000;

const osPlatform = platform();
// Get the local IP address of the server
const { networkInterfaces } = require("os");
const nets = networkInterfaces();
let host_IP;

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === "IPv4" && !net.internal) {
      host_IP = net.address;
      break;
    }
  }
  if (host_IP) break;
}
const start_page_url = `http://${host_IP}:${port}/view/start_page.html`;

// Enable CORS for your server
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Start the server
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


let command;

if (osPlatform === 'win32') {
  command = `start microsoft-edge:${start_page_url}`;
} else if (osPlatform === "xdg-open") {
  command = `open -a "Google Chrome" ${start_page_url}`;
} else {
  command = `google-chrome --no-sandbox ${start_page_url}`;
}
console.log(`executing command: ${command}`);

exec(command);

app.post("/check-password/:password", (req, res) => {
  const password = req.params.password;

  // Check if the password is available or valid based on your server-side logic
  // For example, check if it's in the passwordToUsers map and the user count is as expected
  const available = !passwordToUsers[password];
  const valid =
    passwordToUsers[password] && passwordToUsers[password].length === 1;

  //const userCount = passwordToUsers[password] ? passwordToUsers[password].length : 0;

  res.status(200).json({ available, valid });
});

// Initialize Socket.IO
const io = new Server(server);

// Store connected sockets and associated passwords
const sockets = new Map();
const passwordToUsers = {}; // Map passwords to an array of users

// Define a namespace for your game
const gameNamespace = io.of("/game");

// Handle connections to the game namespace
gameNamespace.on("connect", (socket) => {
  // Log when a user connects
  console.log(`A user connected: ${socket.id}`);

  socket.emit("message", { message: "Your socket id is: " + socket.id });

  // Handle password setting
  socket.on("setPassword", (data) => {
    console.log("client host called set password " + data);
    const { password } = data;

    if (!passwordToUsers[password]) {
      // Password doesn't exist, set it
      sockets.set(socket.id, password);
      passwordToUsers[password] = [socket];
      //console.log(`Password set for user ${socket.id}: ${password}`);

      // Send a confirmation message to the client
      socket.emit("passwordSet", { message: "Password set successfully" });
    } else {
      // Password already exists, send an error message
      socket.emit("passwordSet", { message: "Password already exists" });
    }
  });

  socket.on("joinPassword", (data) => {
    const { password } = data;

    if (passwordToUsers[password] && passwordToUsers[password].length === 1) {
      // Password exists and has only one user, allow joining
      sockets.set(socket.id, password);
      passwordToUsers[password].push(socket);
      //console.log("User " + socket.id + " joined with password: " + password);
      socket.emit("passwordSet", { message: "Joined successfully" });

      passwordToUsers[password][0].emit("player2Joined");
    } else {
      // Password doesn't exist or has multiple users, send an error message
      socket.emit("passwordSet", {
        message: "Invalid password or room is full",
      });
    }
  });

  // Handle apple from clients in the game namespace
  socket.on("appleSync", (data) => {
    //data = JSON.stringify(data);

    //console.log(socket.id + " sent apple " + data);

    try {
      const senderPassword = sockets.get(socket.id);

      if (senderPassword) {
        const recipients = passwordToUsers[senderPassword];

        if (recipients && recipients.length > 1) {
          // Determine the recipient socket based on the isHost value
          const recipientSocket = data.isHost ? recipients[1] : recipients[0];

          if (recipientSocket && recipientSocket !== socket) {
            recipientSocket.emit("appleSync", data);
            //console.log(`${socket.id} sent apple to ${recipientSocket.id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error in sending apple:", error);
    }
  });

  socket.on("snakeSync", (data) => {
    //data = JSON.stringify(data);

    //console.log(socket.id + " sent snake " + data);

    try {
      const senderPassword = sockets.get(socket.id);

      if (senderPassword) {
        const recipients = passwordToUsers[senderPassword];

        if (recipients && recipients.length > 1) {
          // Determine the recipient socket based on the isHost value
          const recipientSocket = data.isHost ? recipients[1] : recipients[0];

          if (recipientSocket && recipientSocket !== socket) {
            recipientSocket.emit("snakeSync", data);
            //console.log(`${socket.id} sent snake to ${recipientSocket.id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error in sending snake:", error);
    }
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    //console.log(`User disconnected: ${socket.id}`);

    const password = sockets.get(socket.id);
    sockets.delete(socket.id);

    if (password) {
      const usersWithSamePassword = passwordToUsers[password];

      //console.log(usersWithSamePassword);

      if (usersWithSamePassword) {
        // Remove the socket from the array of users with the same password
        passwordToUsers[password] = usersWithSamePassword.filter(
          (userSocket) => userSocket !== socket
        );  

        // If there are no more sockets with this password, remove the password entry
        if (passwordToUsers[password].length === 0) {
          delete passwordToUsers[password];
        }else{
          passwordToUsers[password][0].emit('otherPlayerLeft');
        }

      }
    }

    console.log(sockets);
    console.log(passwordToUsers);
  });
});
