import shuffle from "shuffle-array";

const queue = [];

export function getWrapX(GRID_WIDTH) {
  return function wrapX(x) {
    if (x >= GRID_WIDTH) return x % GRID_WIDTH;
    if (x < 0) return wrapX(GRID_WIDTH + x);
    return x;
  };
}

export function getDoesCollide(GRID_WIDTH) {
  const wrapX = getWrapX(GRID_WIDTH);
  return (piece, grid) => {
    let shape = piece.shape;
    let collides;
    // rotate shape :)
    shape.forEach((line, y) => {
      line.forEach((block, x) => {
        let _y = y + piece.y;
        if (block && grid[_y] && grid[_y][wrapX(x + piece.x)]) {
          collides = true;
        }
      });
    });
    return collides;
  };
}

export const pieces = {
  i: {
    shape: [
      [1, 1, 1, 1],
    ],
  },
  t: {
    shape: [
      [0, 1],
      [1, 1, 1],
    ],
  },
  z: {
    shape: [
      [1, 1],
      [0, 1, 1],
    ],
  },
  s: {
    shape: [
      [0, 1, 1],
      [1, 1],
    ],
  },
  o: {
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  l: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  j: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
};

export function spawn(piece) {}

export function getNext() {
  if (queue.length === 0) {
    let pieceTypes = Object.keys(pieces);
    shuffle(pieceTypes);
    queue.push(...pieceTypes);
  }
  return queue[0];
}
