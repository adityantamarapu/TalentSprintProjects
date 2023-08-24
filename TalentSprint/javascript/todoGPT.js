const addButton = document.getElementById("addButton");
const todoInput = document.getElementById("todoInput");
const listViewCheckbox = document.getElementById("listViewCheckbox");
const listContainer = document.getElementById("listContainer"); // Get the list container

let draggingBubble = null; // To keep track of the currently dragged bubble
let BubbleMoveIntervals = {}; // To store the bubble setInterval ID
let popVisibleTimeouts = {};

const todoBubbleContainers = [];

const emptyListText = document.createElement("div"); // empty list text display
emptyListText.textContent = "~ list is empty now ~";
if (todoBubbleContainers.length == 0) {
  emptyListText.style.display = "block";
} else {
  emptyListText.style.display = "none";
}
emptyListText.style.color = "grey";

addButton.addEventListener("click", () => {
  const inputValue = todoInput.value.trim();
  const descriptionValue = todoDescription.value.trim();

  if (inputValue) {
    const todoBubbleContainer = document.createElement("div");
    todoBubbleContainer.id = Date.now();

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = inputValue;

    const textSize = bubble.textContent.length * 10; // Adjust the factor to control the size
    bubble.style.width = textSize + "px";
    bubble.style.height = textSize + "px";

    if (listViewCheckbox.checked) todoBubbleContainer.style.display = "none";
    document.body.appendChild(todoBubbleContainer);

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    // Create the description card
    const descriptionCard = document.createElement("div");
    descriptionCard.className = "description-card";
    descriptionCard.textContent = descriptionValue;

    const listElement = createListItem(
      inputValue,
      descriptionValue,
      listContainer,
      todoBubbleContainer
    );

    // Create the "Pop" button
    const popButton = document.createElement("button");
    popButton.textContent = "Pop";
    popButton.className = "pop-button btn btn-danger btn-sm";

    popButton.addEventListener("click", () => {
      removeTodo(listElement, todoBubbleContainer);
    });

    // Append the description card to the card container
    cardContainer.appendChild(descriptionCard);

    // Append the "Pop" button to the bubble
    cardContainer.appendChild(popButton);

    // Hide the card container initially
    cardContainer.style.display = "none";

    // Append the card container to the bubble
    bubble.appendChild(cardContainer);

    todoBubbleContainer.appendChild(bubble);

    todoBubbleContainer.bubble = bubble;

    // Track all todos
    todoBubbleContainers.push(todoBubbleContainer);

    // Show the card container on bubble hover
    todoBubbleContainer.addEventListener("mouseover", () => {
      cardContainer.style.display = "flex";

      clearTimeout(popVisibleTimeouts[todoBubbleContainer.id]);
      delete popVisibleTimeouts[todoBubbleContainer.id];
    });

    // Hide the card container when mouse leaves the bubble
    todoBubbleContainer.addEventListener("mouseout", () => {
      const newPopInterval = setTimeout(() => {
        cardContainer.style.display = "none";
      }, 2000);

      popVisibleTimeouts[todoBubbleContainer.id] = newPopInterval;
      //console.log(popVisibleTimeouts);
    });

    // add the bubble in a random position
    const randomX = Math.random() * (window.innerWidth - bubble.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - bubble.offsetHeight);
    bubble.style.left = randomX + "px";
    bubble.style.top = randomY + "px";

    bubble.addEventListener("touchstart", (event) => {
      startDrag(event);
    });

    bubble.addEventListener("mousedown", (event) => {
      startDrag(event);
    });

    // handle for drag functionality
    function startDrag(event) {
      draggingBubble = bubble;
      bubble.classList.add("dragging");

      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;

      const offsetX = clientX - bubble.getBoundingClientRect().left;
      const offsetY = clientY - bubble.getBoundingClientRect().top;

      document.addEventListener("mousemove", dragBubble);
      document.addEventListener("touchmove", dragBubble);

      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchend", stopDragging);

      function dragBubble(event) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        const x = clientX - offsetX;
        const y = clientY - offsetY;
        bubble.style.left = x + "px";
        bubble.style.top = y + "px";
      }

      function stopDragging() {
        document.removeEventListener("mousemove", dragBubble);
        document.removeEventListener("touchmove", dragBubble);

        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("touchend", stopDragging);

        draggingBubble.classList.remove("dragging");
        draggingBubble = null;
      }
    }

    todoInput.value = "";
    todoDescription.value = "";

    if (!listViewCheckbox.checked) {
      BubbleMoveIntervals[todoBubbleContainer.id] = setInterval(
        floatBubbleRandomly,
        1000
      );
    }

    function floatBubbleRandomly() {
      //console.log(todoBubbleContainer.id + " is about to move");
      if (draggingBubble !== bubble) {
        //console.log(todoBubbleContainer.id + " is moving");
        const displacementX = Math.random() * 10 - 4; // Displacement in X direction
        const displacementY = Math.random() * 10 - 4; // Displacement in Y direction
        bubble.style.transform = `translate(${displacementX}px, ${displacementY}px)`;
      }
    }

    function createListItem(
      inputValue,
      descriptionValue,
      listContainer,
      todoBubbleContainer
    ) {
      const listElement = document.createElement("div");

      const listTodo = document.createElement("div");
      listTodo.classList.add("list-todo");
      listTodo.textContent = inputValue;
      listElement.appendChild(listTodo);

      const listTodoDescription = document.createElement("div");
      listTodoDescription.classList.add("list-todo-description");
      listTodoDescription.style.display = "none";
      listTodoDescription.textContent = descriptionValue;
      listElement.appendChild(listTodoDescription);

      const dropdownButton = document.createElement("button");
      dropdownButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
      dropdownButton.className = "btn btn-link dropdown-button";
      listTodo.appendChild(dropdownButton);

      dropdownButton.addEventListener("click", () => {
        if (listTodoDescription.style.display == "none") {
          listTodoDescription.style.display = "block";
          dropdownButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        } else {
          listTodoDescription.style.display = "none";
          dropdownButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
        }
      });

      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.className = "btn btn-link trash-button";
      listTodo.appendChild(trashButton);

      trashButton.addEventListener("click", () => {
        removeTodo(listElement, todoBubbleContainer);
      });

      listContainer.appendChild(listElement);

      return listElement;
    }

    function removeTodo(listElement, todoBubbleContainer) {
      listElement.remove(); // remove list element

      const indexToRemove = todoBubbleContainers.indexOf(todoBubbleContainer);
      if (indexToRemove !== -1) {
        todoBubbleContainers.splice(indexToRemove, 1); // remove bubble and card from list
      }
      todoBubbleContainer.remove(); // Remove the bubble and card from the DOM

      // emply list text display
      if (todoBubbleContainers.length === 0) {
        emptyListText.style.display = "block";
      } else {
        emptyListText.style.display = "none";
      }

      clearInterval(BubbleMoveIntervals[todoBubbleContainer.id]);
      delete BubbleMoveIntervals[todoBubbleContainer.id];
    }

    emptyListText.style.display = "none";
  }
});

listViewCheckbox.addEventListener("change", () => {
  if (listViewCheckbox.checked) {
    for (const container of todoBubbleContainers) {
      container.style.display = "none";
      clearInterval(BubbleMoveIntervals[container.id]);
    }
    listContainer.style.display = "block"; // Show the list container
  } else {
    for (const container of todoBubbleContainers) {
      container.style.display = "block";
      BubbleMoveIntervals[container.id] = setInterval(() => {
        floatBubbleRandomly(container);
      }, 1000);
    }
    listContainer.style.display = "none"; // Hide the list container
  }

  // emply list text display
  if (todoBubbleContainers.length === 0) {
    if (!listContainer.contains(emptyListText))
      listContainer.appendChild(emptyListText);
  } else {
    if (listContainer.contains(emptyListText))
      //listContainer.removeChild(emptyListText);
      emptyListText.style.display = "none";
  }
});

function floatBubbleRandomly(container) {
  //console.log(todoBubbleContainer.id + " is about to move");
  if (draggingBubble !== container.bubble) {
    //console.log(container.id + " is moving");
    const displacementX = Math.random() * 10 - 4; // Displacement in X direction
    const displacementY = Math.random() * 10 - 4; // Displacement in Y direction
    container.bubble.style.transform = `translate(${displacementX}px, ${displacementY}px)`;
  }
}
