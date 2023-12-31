const numberOfBoxes = 3; // Change this to the desired number of divs

for (let i = 0; i < numberOfBoxes; i++) {
  const div = document.createElement("div");
  div.className = "box";
  document.body.appendChild(div);
}

const boxes = document.querySelectorAll(".box");
const speed = 0.15; // Adjust this value for movement speed

function randomPosition(element, placedElements) {
  const maxX = window.innerWidth - element.offsetWidth;
  const maxY = window.innerHeight - element.offsetHeight;

  let randomX, randomY;
  do {
    randomX = Math.random() * maxX;
    randomY = Math.random() * maxY;
  } while (isOverlapping(randomX, randomY, placedElements));

  element.style.transform = `translate(${randomX}px, ${randomY}px)`;

  placedElements.push({ x: randomX, y: randomY });
}

function isOverlapping(x, y, placedElements) {
  for (const element of placedElements) {
    const distance = Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2);
    if (distance < 200) {
      return true;
    }
  }
  return false;
}

const placedElements = [];
boxes.forEach((box) => {
  randomPosition(box, placedElements);
});

function followMouse(event, box) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const boxRect = box.getBoundingClientRect();
  const boxX = boxRect.left + boxRect.width / 2;
  const boxY = boxRect.top + boxRect.height / 2;

  const angle = Math.atan2(mouseY - boxY, mouseX - boxX);
  const distance = Math.sqrt((mouseX - boxX) ** 2 + (mouseY - boxY) ** 2);

  const reducedDistance = distance * 0.9; // Reduce by 10%
  let newX = boxX + Math.cos(angle) * reducedDistance * speed;
  let newY = boxY + Math.sin(angle) * reducedDistance * speed;

  // Check if the new position would overlap with other boxes
  for (const otherBox of boxes) {
    if (otherBox !== box) {
      const otherBoxRect = otherBox.getBoundingClientRect();
      const otherBoxX = otherBoxRect.left + otherBoxRect.width / 2;
      const otherBoxY = otherBoxRect.top + otherBoxRect.height / 2;

      const distanceToOtherBox = Math.sqrt(
        (newX - otherBoxX) ** 2 + (newY - otherBoxY) ** 2
      );
      if (distanceToOtherBox < 150) {
        // If overlapping, keep the current position
        newX = boxX;
        newY = boxY;
        break;
      }
    }
  }

  box.style.transform = `translate(${newX - boxRect.width / 2}px, ${
    newY - boxRect.height / 2
  }px)`;
}

setTimeout(() => {
  document.addEventListener("mousemove", (event) => {
    boxes.forEach((box) => {
      followMouse(event, box);
    });
  });
}, 3000);

function redirectToStartGame() {
  setTimeout(() => {
    window.location.href = "../view/startGame.html";
  }, 500);
}

boxes.forEach((box) => {
  box.addEventListener("mouseenter", redirectToStartGame);
});
