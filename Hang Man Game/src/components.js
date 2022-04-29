import { GameStatus, isGameEnded, generateGameMessage } from "./util.js";
import { calculateImageSize } from "./image-util";
import { h, id } from "./dom.js";

export const HangmanImage = (chancesLeft, images) => {
  const container = id("hangman-image");
  const context = container.getContext("2d");
  context.clearRect(0, 0, container.width, container.height);

  images.slice(chancesLeft).map((item, idx) => {
    context.drawImage(
      item.image,
      item.dx,
      item.dy,
      ...calculateImageSize(item.image.width, item.image.height, 70)
    );
  });
};

export const Word = (gameStatus, wordArr) => {
  const container = id("word");
  container.innerHTML = "";

  const wordText = h("div");
  wordText.classList.add("word-text");

  // 게임이 끝났다면, 게임이 끝났다는 메시지를 보여준다.
  if (isGameEnded(gameStatus)) {
    const message = h("p");
    message.innerText = generateGameMessage(gameStatus);
    wordText.appendChild(message);
  }

  // 진행되고 있는 경우, `wordArr`를 이용해
  // 각 글자를 보여준다.
  const spans = wordArr.map((c) => {
    const span = h("span");
    if (c !== " ") {
      span.classList.add("character");
    }
    span.innerText = c;
    return span;
  });

  // wordText 안에 글자들을 구성한다.
  // 공백을 제외한 글자들은 character 라는 클래스를 가진다.
  // wordText 안에 들어간다.
  wordText.append(...spans);
  container.appendChild(wordText);
};

export const KeyboardLayout = (gameStatus, enteredCharacters, onClickItem) => {
  const container = id("keyboard-layout");
  container.innerHTML = "";

  const ul = h("ul");
  ul.classList.add("keyboard-layout");

  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((c) => {
      const li = h("li");
      const button = h("button");

      // 버튼을 누를 때, 선택한 문자를 함수로 전달한다.
      // 게임이 종료되었거나, 이미 누른 문자라면 해당 버튼을 누르지 못하게 한다.
      button.classList.add("keyboard-button");
      button.innerText = c;
      button.addEventListener("click", () => onClickItem(c));
      button.disabled = isGameEnded(gameStatus) || enteredCharacters[c];

      li.appendChild(button);
      return li;
    })
    .forEach((node) => ul.appendChild(node));

  container.appendChild(ul);
};

export const ButtonBox = (
  wordLoading,
  gameStatus,
  chancesLeft,
  timer,
  onClickStart
) => {
  const container = id("button-box");
  container.innerHTML = "";

  // 남은 기회를 보여주는 텍스트를 만든다.
  const chances = h("div");
  chances.classList.add("chances-text");
  chances.innerText = `Chances: ${chancesLeft}`;

  // 남은 시간을 보여준다.
  const timerText = h("div");
  timerText.classList.add("timer-text");
  timerText.innerText = timer;

  // 게임 시작 버튼.
  // 아직 단어가 로딩중이거나, 게임이 끝나지 않았다면 버튼을 누르지 못하게 한다.
  // 버튼을 누르면 게임이 시작된다.
  const button = h("button");
  button.classList.add("start-button");
  button.innerText = "START";
  button.addEventListener("click", onClickStart);
  button.disabled = wordLoading || !isGameEnded(gameStatus);

  container.append(chances, timerText, button);
};

export function render(state, onClickItem, onClickStart, imageSources) {
  KeyboardLayout(state.gameStatus, state.enteredCharacters, onClickItem);
  Word(state.gameStatus, state.wordArr);
  ButtonBox(
    state.wordLoading,
    state.gameStatus,
    state.chancesLeft,
    state.timer,
    onClickStart
  );
  HangmanImage(state.chancesLeft, imageSources);
}
