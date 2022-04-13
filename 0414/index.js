// 1) Scroll Navigation
let aTags = document.querySelectorAll("header a");
for (let i = 0; i < aTags.length; i++) {
  aTags[i].onclick = function (e) {
    e.preventDefault();
    let targetId = e.target.getAttribute("href");
    let targetEl = document.querySelector(`${targetId}`);

    window.scrollTo({
      behavior: "smooth",
      top: targetEl.offsetTop,
    });
  };
}

// 2) Image Slider
let slider = document.querySelector("#slider");
let slides = slider.querySelector(".slides");
let slide = slides.querySelectorAll(".slide");

let currentSlide = 0;

setInterval(function () {
  let from = -(1024 * currentSlide);
  let to = from - 1024;
  slides.animate(
    {
      marginLeft: [from + "px", to + "px"],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = 0;
  }
}, 3000);

// 3) Tabs
let links = document.querySelectorAll(".tab-list li a");
let items = document.querySelectorAll(".tabs-list li");

for (let i = 0; i < links.length; i++) {
  links[i].onclick = function (e) {
    e.preventDefault();
  };
}

for (let i = 0; i < items.length; i++) {
  items[i].onclick = function () {
    // selected tab(<a> in <li>)
    let tabId = this.querySelector("a").getAttribute("href");

    // Remove active class in all element
    document
      .querySelectorAll(".tabs-list li, .tabs div.tab")
      .forEach(function (item) {
        item.classList.remove("active");
      });

    // Add active class in selected element
    document.querySelector(tabId).classList.add("active");

    // 여기서 this는 <a>를 자식으로 가진 <li>
    this.classList.add("active");
  };
}

// 4) Click Image Slider
// 오른쪽으로 이미지 슬라이드
document.querySelector(".right-arrow").onclick = function () {
  let currentSlide = document.querySelector("#photo .slide.active");
  let nextSlide = currentSlide.nextElementSibling; // right side slide on current slide

  // if current slide is last slide, next slide is first slide
  if (nextSlide === null) {
    nextSlide = currentSlide.parentElement.firstElementChild;
    // nextSlide = document.querySelector(".slider").firstElementChild;
  }
  currentSlide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );

  // Remove active class in current slide
  currentSlide.classList.remove("active");

  nextSlide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  // Add active class in next slide
  nextSlide.classList.add("active");
};

// 왼쪽 이미지 슬라이드
document.querySelector(".left-arrow").onclick = function () {
  let currentSlide = document.querySelector("#photo .slide.active");
  let prevSlide = currentSlide.previousElementSibling; // left side slide on current slide

  // if current slide is first slide, next slide is last slide
  if (prevSlide === null) {
    // prevSlide = currentSlide.parentNode.lastElementChild;
    prevSlide = document.querySelector(".slider").lastElementChild;

    currentSlide.animate(
      {
        opacity: [1, 0],
      },
      {
        duration: 500,
        easing: "ease",
        iterations: 1,
        fill: "both",
      }
    );
  }

  // Remove active class in current slide
  currentSlide.classList.remove("active");

  prevSlide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );

  // Add active class in next slide
  prevSlide.classList.add("active");
};

// 5. Go Top Button
let topBtn = document.querySelector(".top-btn button");
const onTopClick = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

topBtn.addEventListener("click", onTopClick);
