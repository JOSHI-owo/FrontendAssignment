// selecting the elements with their class name
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container2");
const modal = document.querySelector(".modal");

// for each draggable <p> tag we check which one is being dragged or has stop dragging
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    console.log("drag start");
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

// checking, on which container the element is being dragged over to
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    // getting the child element and the offset value from getDragAfterElement() function
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    console.log(afterElement);
    // inserting the element into position
    if (afterElement == null) {
      container.appendChild(draggable);
      modal.innerHTML = `<h2>Moved: Box ${draggable.innerHTML}</h2>`;
      modal.style.opacity = 1;
    } else {
      container.insertBefore(draggable, afterElement);
      modal.innerHTML = `<h2>Moved: Box ${draggable.innerHTML}</h2>`;
      modal.style.opacity = 1;
    }
  });
});

// returning the position of the closest elemnt in y axis, we measure from the centre of the blocks then return the element and the offset
function getDragAfterElement(container, y) {
  const dragableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return dragableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      //   console.log(offset);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
