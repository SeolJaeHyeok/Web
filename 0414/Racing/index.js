window.onload = function () {
  var el = document.getElementById("change_heading");
  el.innerText = "카 레이싱 대회";

  var section = document.querySelector("section");
  section.addEventListener("mouseover", function (event) {
    var selectedColor = document.querySelector(".selected");
    selectedColor.innerText = event.target.className;
  });

  var newDiv = document.createElement("div");
  newDiv.className = "purple";
  section.appendChild(newDiv);

  var button = document.querySelector("button");
  var car1 = document.querySelector(".car1");
  var car2 = document.querySelector(".car2");
  car1.style.marginLeft = 0;
  car2.style.marginLeft = 0;

  function reset(car1, car2) {
    clearTimeout(car1.timer);
    clearTimeout(car2.timer);
    car1.style.marginLeft = 0;
    car2.style.marginLeft = 0;
    button.disabled = false;
  }

  button.addEventListener("click", function (event) {
    button.disabled = true;
    let car1Margin = parseInt(car1.style.marginLeft.split("px")[0]);
    let car2Margin = parseInt(car2.style.marginLeft.split("px")[0]);

    car1.timer = setInterval(function () {
      car1Margin += Math.random() * 100;
      car1.style.marginLeft = car1Margin.toString() + "px";
      if (parseInt(car1.style.marginLeft) > window.innerWidth) {
        alert("Car 1 wins!");
        reset(car1, car2);
      }
    }, 100);

    car2.timer = setInterval(function () {
      car2Margin += Math.random() * 100;
      car2.style.marginLeft = car2Margin.toString() + "px";
      if (parseInt(car2.style.marginLeft) > window.innerWidth) {
        alert("Car 2 wins!");
        reset(car1, car2);
      }
    }, 100);
  });
};
