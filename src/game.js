const DEFAULT_OPTIONS = {
  screenWidth: 640,
  screenHeight: 480,
  gridWidth: 32,
  gridHeight: 20,
  voidRadius: 16,
  crustThickness: 16,
};

import shuffle from "shuffle-array";

const queue = [];

export function getWrapX(GRID_WIDTH) {
  return function wrapX(x) {
    if (x >= GRID_WIDTH) return x % GRID_WIDTH;
    if (x < 0) return wrapX(GRID_WIDTH + x);
    return x;
  };
}

export function getPieceGridCoords(piece, grid) {
  // console.log('grid: ', grid[0]);
  const wrapX = getWrapX(grid[0].length);
  let coords = [];

  piece.shape.forEach((line, y) => {
    line.forEach((block, x) => {
      if (block) {
        coords.push([x + piece.x, y + piece.y]);
      }
    });
  });

  coords = coords.map(([x, y]) => {
    if (piece.angle === 0) return [wrapX(x), y];
    let xTranslation = piece.x + piece.centre[0];
    let yTranslation = piece.y + piece.centre[1];
    let _x = x - xTranslation;
    let _y = y - yTranslation;

    if (piece.angle === 1) {
      [_x, _y] = [_y, -_x];
    } else if (piece.angle === 2) {
      [_x, _y] = [-_x, -_y];
    } else if (piece.angle === 3) {
      [_x, _y] = [-_y, _x];
    }

    _x += xTranslation;
    _y += yTranslation;
    return [wrapX(_x), _y];
  });

  return coords;
}

// use getPieceGridCoords
export function getDoesCollide() {
  return (piece, grid) => {
    const coords = getPieceGridCoords(piece, grid);
    let collides;
    coords.forEach(([x, y]) => {
      if (y >= grid.length) collides = true;
      if (grid[y] && grid[y][x]) {
        collides = true;
      }
    });
    return collides;
  };
}

export const pieces = {
  i: {
    shape: [[1, 1, 1, 1]],
    centre: [1.5, 0.5],
  },
  t: {
    shape: [
      [0, 1],
      [1, 1, 1],
    ],
    centre: [1, 1],
  },
  z: {
    shape: [
      [1, 1],
      [0, 1, 1],
    ],
    centre: [1, 1],
  },
  s: {
    shape: [
      [0, 1, 1],
      [1, 1],
    ],
    centre: [1, 1],
  },
  o: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    centre: [0.5, 0.5],
  },
  l: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    centre: [1, 1],
  },
  j: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    centre: [1, 1],
  },
};

export function spawn() {
  const piece = {
    x: 14,
    y: 0,
    type: getNext(),
    angle: 0,
  };
  piece.shape = pieces[piece.type].shape;
  piece.centre = pieces[piece.type].centre;
  queue.shift();
  return piece;
}

export function getNext() {
  if (queue.length === 0) {
    let pieceTypes = Object.keys(pieces);
    shuffle(pieceTypes);
    queue.push(...pieceTypes);
  }
  return queue[0];
}

export function removeLines(lines, grid) {
  lines.reverse().forEach((y) => {
    grid.splice(y, 1);
  });
  for (let i = 0; i < lines.length; i++) {
    let newEmptyRow = new Array(32).fill(0);
    grid.unshift(newEmptyRow);
  }
}
