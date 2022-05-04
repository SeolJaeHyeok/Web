/**
 * class & interface
 */
class Animal {
  id: number;
  name: string;
  private secret: string;

  constructor(name: string) {
    this.id = Date.now();
    this.name = name;
    this.secret = "this is secret";
  }

  public getName() {
    this.logSecret();
    return this.name;
  }

  private logSecret() {
    console.log(`${this.secret}`);
  }
}

interface Machine {
  type: string;
  name: string;
  run: () => void;
  getType: () => string;
}

interface A {
  x: number;
  y: number;
}

// interface B {
//   x: number;
//   y: number;
// }

const distance = (point1: A, point2: A) => {
  return;
};

const obj = {
  x: 1,
  y: 4,
};

distance({ x: 1, y: 2 }, obj);
