var Engine = (function (global) {
  'use strict';
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    patterns = {},
    lastTime,
    rAfId,
    collisionOccurred = false;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  function main() {

    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;
    update(dt);
    if (collisionOccurred) {
      win.cancelAnimationFrame(rAfId);
      return;
    }
    render();

    lastTime = now;
    rAfId = win.requestAnimationFrame(main);
  }

  function init() {

    reset();
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    updateEntities(dt);
    if (checkCollisions()) {
      collisionOccurred = true;
      if (win.confirm('Collision occurred! do you wanna start again?')) {
        reset();
        collisionOccurred = false;
      }
    }
  }

  function checkCollisions() {
    return allEnemies.some(function (enemy) {
      if (Math.floor(enemy.x) + 81 >= player.x && Math.floor(enemy.x) <= player.x + 81 && enemy.y === player.y) {


        return true;
      }
    });
  }

  function updateEntities(dt) {
    allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    player.update();
  }

  function render() {
    var rowImages = [
        'images/water-block.png',
        'images/stone-block.png',
        'images/stone-block.png',
        'images/stone-block.png',
        'images/grass-block.png',
        'images/grass-block.png'
      ],
      numRows = 6,
      numCols = 5,
      row, col;

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }

  function renderEntities() {
    allEnemies.forEach(function (enemy) {
      enemy.render();
    });
    player.render();
  }

  function reset() {
    // noop
    global.resetGame();


  }

  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/char-pink-girl.png'
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
