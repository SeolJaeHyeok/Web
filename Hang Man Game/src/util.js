export const GameStatus = {
  READY: "READY",
  START: "START",
  LOSE: "LOSE",
  WIN: "WIN",
};

export function isGameEnded(gameStatus) {
  return gameStatus !== GameStatus.START;
}

export function fetchWord() {
  return fetch("https://puzzle.mead.io/puzzle?wordCount=2")
    .then((r) => r.json())
    .then((data) => data.puzzle);
}

// 게임 상태에 따른 메세지 반환
export function generateGameMessage(gameStatus) {
  if (gameStatus === GameStatus.READY) {
    return "게임을 시작하세요.";
  } else if (gameStatus === GameStatus.LOSE) {
    return "게임에 졌습니다. 다시 시작하세요.";
  } else if (gameStatus === GameStatus.WIN) {
    return "단어를 맞췄습니다! 다시 시작하세요.";
  }
}

export function wordToMap(word) {
  return word
    .toUpperCase()
    .split("")
    .reduce((map, c, idx) => {
      if (!map[c]) map[c] = [];
      map[c].push(idx);
      return map;
    }, {});
}
