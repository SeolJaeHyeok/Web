let body = document.querySelector("body");
let button = document.querySelector("#toggle");
let nodes = document.querySelectorAll("a");

function toggleMode(value) {
  if (value === "night") {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].style.color = "white";
    }
    button.value = "morning";
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].style.color = "black";
    }
    button.value = "night";
  }
}
