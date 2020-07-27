const keyMap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  90: 'b',
  88: 'a'
};

const input = {
  init: (el, events) => {
    el.addEventListener("keydown", (event) => {
      const value = keyMap[event.keyCode];
      if (value) events.push(["input", value]);
    });
  },
};

export default input;
