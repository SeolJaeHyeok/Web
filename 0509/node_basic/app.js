// 기본 실행

// require는 한 번만 호출한 후 삭제
// 삭제를 방지하고 기능의 반복 사용을 위해 함수형 모듈을 작성
const cal = require("./cal");
const func = require("./func");

// console.log(cal.add1(1, 2));
// console.log(cal.sub(1, 2));
// console.log(cal.mul(1, 2));
// console.log(cal.div(1, 2));
// console.log(func);

for (let i = 0; i < 10; i++) {
  console.log(func());
}

console.log(`\n` + func("initial") + `\n`);

for (let i = 0; i < 10; i++) {
  console.log(func());
}
