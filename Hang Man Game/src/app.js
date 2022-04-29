import "./app.css";
import {
  initializeState,
  initialState,
  startGame,
  decreaseTimer,
  selectCharacter,
  checkGameStatus,
  setWordLoading,
} from "./state.js";
import { render } from "./components.js";
import { GameStatus, fetchWord, isGameEnded } from "./util.js";
import { fetchAllImages } from "./image-util.js";

const App = () => {
  let state = { ...initialState };
  let imageSources = null;

  function changeState(callback) {
    // 상태를 변경하는 함수.
    // 상태를 변경한 후에 바로 render 함수를 호출한다.
    state = callback(state);
    render(state, onClickItem, onClickStart, imageSources);
  }

  function onClickItem(c) {
    // 알파벳 하나를 선택하면 호출되는 함수.
    changeState((state) => selectCharacter(state, c));
    changeState((state) => checkGameStatus(state));
  }

  function onClickStart() {
    if (state.wordLoading) return;

    // 단어 로딩 시작시, wordLoading을 설정한다.
    changeState((state) => setWordLoading(state, true));

    // 단어를 서버로부터 가져온다.
    fetchWord().then((word) => {
      // 단어를 가져온 후에 인터벌을 등록한다.
      const intervalId = setInterval(() => {
        // 인터벌은 1초마다 작동하며 게임이 끝나면 인터벌을 제거한다.
        if (isGameEnded(state.gameStatus)) {
          clearInterval(intervalId);
          return;
        }

        // 게임이 끝나지 않았다면 1초마다 timer를 감소하며 게임 상태를 체크한다.
        // changeState((state) => checkGameStatus(decreaseTimer(state)));
        changeState((state) => decreaseTimer(state));
        changeState((state) => checkGameStatus(state));
      }, 1000);

      // 로딩이 완료되면 wordLoading을 false로 설정
      // 받아온 word를 가지고 상태를 초기화
      // 타이머를 등록하고 게임을 시작한다.
      changeState((state) =>
        startGame(initializeState(setWordLoading(state, false), word))
      );
    });
  }

  fetchAllImages().then((images) => {
    imageSources = images;
    changeState((state) => state);
  });
};

export default App;
