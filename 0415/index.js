// Scroll Navigation
const navItems = document.querySelectorAll(".nav-item");
for (navItem of navItems) {
  navItem.onclick = function (e) {
    e.preventDefault();

    let targetId = e.target.getAttribute("href");
    let targetEl = document.querySelector(`${targetId}`);

    // 선택한 Tab 밑줄
    for (item of navItems) {
      item.children[0].classList.remove("active");
    }
    e.target.classList.add("active");

    // 스크롤 애니메이션
    window.scrollTo({
      behavior: "smooth",
      top: targetEl.offsetTop - 50,
    });
  };
}

// Scroll할 때 Header 없애기
const header = document.querySelector(".header");
const body = document.querySelector("body");
const onScrollHeader = () => {
  if (window.scrollY >= 50) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
};

const onMouseMove = (e) => {
  if (e.clientY <= 83) {
    header.classList.remove("hidden");
  }
};

body.addEventListener("mousewheel", onScrollHeader);
body.addEventListener("mousemove", onMouseMove);

// Go Top Button
let topBtn = document.querySelector("#top-btn button");
const onTopClick = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

topBtn.addEventListener("click", onTopClick);
