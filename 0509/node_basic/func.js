let number = 0;

// require는 한 번만 호출한 후 삭제
// 삭제를 방지하고 기능의 반복 사용을 위해 함수형 모듈을 작성
module.exports = (m) => {
  if (m == "initial") {
    number = 0;
    return number;
  }
  return (number += 1);
};
