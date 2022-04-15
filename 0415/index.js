// Scroll Navigation
const navItems = document.querySelectorAll(".nav-item")[0].children;
for (navItem of navItems) {
  navItem.onclick = function (e) {
    e.preventDefault();

    let targetId = e.target.getAttribute("href");
    let targetEl = document.querySelector(`${targetId}`);

    // 선택한 Tab 밑줄
    for (item of navItems) {
      item.children[0].classList.remove("item-active");
    }
    e.target.classList.add("item-active");

    // 스크롤 애니메이션
    window.scrollTo({
      behavior: "smooth",
      top: targetEl.offsetTop,
    });
  };
}

// Go Top Button
let topBtn = document.querySelector("#top-btn button");
const onTopClick = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  header.classList.remove("hidden");
};

topBtn.addEventListener("click", onTopClick);

// toggle Menu Button
const toggleBtn = document.querySelector(".navbar_toggleBtn");
const menu = document.querySelector(".nav-item");
const links = document.querySelector(".link-bar");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  links.classList.toggle("active");
});
