// 화살표 함수 축약
const add = (a, b) => a + b;

// 화살표 함수
const sub = (a, b) => {
  return a - b;
};

// 함수 선언문
function mul(a, b) {
  return a * b;
}

// 함수 표현식
const div = function (a, b) {
  return a / b;
};

module.exports = {
  add1: add,
  sub,
  mul,
  div,
};
