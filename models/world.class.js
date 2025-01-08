class World {
  character = new Character();
  statusBar = new Statusbar(20, 0);
  endbossStatusBar = new EndbossStatusbar(500, 40);
  coinBar = new Coinbar();
  salsa_bottleBar = new SalsabottleBar();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  throwableObject = [];
  worldIntervals = [];
  lastCollision = 0;
  enableGameSound = true;
  playedOnce = false;
  gameRun = false;
  gameSound = new Audio('audio/background.mp3');
  splashAudio = new Audio('audio/destroyGlas.mp3');
  chickenAudio = new Audio('audio/chickenSound.mp3');
  bossChickenDieAudio = new Audio('audio/bossChickenDie.mp3');
  bossChickenHurtAudio = new Audio('audio/bossChickenHurt.mp3');

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.backgroundMusic();
    this.checkGameIsRunning();
  }

  /**
   * The function checks whether the game has ended via the variable kameRun
   */
  checkGameIsRunning() {
    this.checkForRunningGame = setInterval(() => {
      if (this.gameRun == false) {
        this.stopWorldAnimation();
        this.character.stopGameAnimation();
        this.stopEnemyAnimation();
        clearInterval(this.checkForRunningGame);
      }
    }, 300);
  }

  /**
   * the function stops all intervals of opponents
   */
  stopEnemyAnimation() {
    this.level.enemies.forEach(enemy => {
      enemy.stopGameAnimation();
    });
  }

  /**
   * the function stops all intervals in the world
   */
  stopWorldAnimation() {
    for (let i = 0; i < this.worldIntervals.length; i++) {
      const element = this.worldIntervals[i];
      clearInterval(element);
    }
    this.worldIntervals = [];
  }

  /**
   * allows access from character.js to world.js
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * controls the background music
   */
  backgroundMusic() {
    this.backgroundMusic = setInterval(() => {
      if (this.enableGameSound) {
        this.playMusic(this.gameSound, true);
        this.gameSound.volume = 0.4;
      }
      else {
        this.gameSound.pause();
      }
    }, 200);
    this.worldIntervals.push(this.backgroundMusic);
  }

  /**
   * controls the mute function
   * @param {selected audio file} sound 
   * @param {should the audio file be looped or not (true or false)} loop 
   */
  playMusic(sound, loop) {
    if (this.enableGameSound) {
      sound.loop = loop;
      sound.play();
    } else {
      sound.pause();
    }
  }

  /**
   * controls important game actions. Collisions and boss spawn
   */
  run() {
    this.gameI = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkDistanceToEndboss();
    }, 200);
    this.worldIntervals.push(this.gameI);
  }

  /**
   * checks the distance between character and boss and lets the boss become active at a maximum distance of 500
   */
  checkDistanceToEndboss() {
    this.checkDTE = setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
          const distance = enemy.x - this.character.x;
          if (distance < 500) {
            enemy.endbossActive = true;
          }
        }
      });
    }, 300);
    this.worldIntervals.push(this.checkDTE);
  }

  /**
   * checks the presence of a bottle and, if present, 
   * makes it appear when the d key is pressed and adjusts the display accordingly
   */
  checkThrowObjects() {
    if (this.character.collectedBottles > 0) {
      if (this.keyboard.D) {
        this.character.wakeUp();
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
        this.character.useCollectables('bottle');
        this.salsa_bottleBar.deleteFromBar();
        this.salsa_bottleBar.setPercentage(this.salsa_bottleBar.percentage);

      }
    }
  }

  /**
   * checks collisions
   */
  checkCollisions() {
    this.checkCollisionsWithEnemy();
    this.checkCollisionsFromBottleToEnemy();
    this.checkCollisionsFromHeavenToEnemy();
    if (this.character.collectedCoins <= 5) {
      this.chooseCollectable('coin');
    }
    if (this.character.collectedBottles <= 4) {
      this.chooseCollectable('bottle');
    }
  }

  /**
   * checks collisions of the character from above on an opponent in falling state
   */
  checkCollisionsFromHeavenToEnemy() {
    this.checkCollisionFHTE = setInterval(() => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
          if (
            this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.speedY < 0
          ) {
            this.character.jump();
            this.playMusic(this.chickenAudio, false);
            this.level.enemies.splice(enemyIndex, 1);
          }
        }
      });
    }, 100);
    this.worldIntervals.push(this.checkCollisionFHTE);
  }

  /**
   * checks collisions of a bottle on an opponent
   */
  checkCollisionsFromBottleToEnemy() {
    this.throwableObject.forEach((throwableObject, throwableIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (throwableObject.isColliding(enemy)) {
          this.damageEnemy(enemy, enemyIndex, throwableObject, throwableIndex);
        }
      });
    });
  }

  /**
   * checks collisions between an opponent and the character
   */
  checkCollisionsWithEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Endboss) {
          this.character.hit(50);
        }
        else {
          if (!this.character.isAboveGround())
            this.character.hit(0);
        }
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * checks collisions of the character with an object that can be collected and distinguishes which one was collected
   * @param {bottle or coin} collectable 
   */
  chooseCollectable(collectable) {
    let items;
    let bar;
    if (collectable === 'coin') {
      items = this.level.coins;
      bar = this.coinBar;
    } else if (collectable === 'bottle') {
      items = this.level.salsa_bottle;
      bar = this.salsa_bottleBar;
    }
    this.checkCollisionsWithCollectables(items, bar, collectable);
  }

  /**
   * updates the display for the coins or bottles accordingly
   * @param {coin or bottle} items 
   * @param {coinbar or SalsabottleBar} bar 
   * @param {the collected coin or bottle} collectable 
   */
  checkCollisionsWithCollectables(items, bar, collectable) {
    items.forEach((item, itemIndex) => {
      if (this.character.isColliding(item)) {
        items.splice(itemIndex, 1);
        bar.addToBar();
        this.character.collect(collectable);
        bar.setPercentage(bar.percentage);
      }
    });
  }

  /**
   * checks whether the character has done damage to an opponent and provides 
   * the respective animation and sound. 
   * It also checks whether the opponent is a boss or a normal opponent
   * @param {current enemy} enemy 
   * @param {current enemy index} enemyIndex 
   * @param {the object that hit the opponent} throwableObject 
   * @param {index from the object that hit the opponent} throwableIndex 
   */
  damageEnemy(enemy, enemyIndex, throwableObject, throwableIndex) {
    throwableObject.splashed = true;
    throwableObject.playSplashAnimation();
    this.playMusic(this.splashAudio, false);
    setTimeout(() => { this.throwableObject.splice(throwableIndex, 1); }, 500);
    if (enemy.alive == true) {
      if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
        this.enemyHit(enemy, enemyIndex);
        this.playMusic(this.chickenAudio, false);
      }
      if (enemy instanceof Endboss) {
        this.bossHit(enemy, enemyIndex);
      }
    }
  }

  /**
   * lets the hit opponent die
   * @param {current enemy} enemy 
   * @param {current enemy index} enemyIndex 
   */
  enemyHit(enemy, enemyIndex) {
    if (enemy.enemyLevel < 2) {
      enemy.alive = false;
      setTimeout(() => {
        this.level.enemies.splice(enemyIndex, 1)
      }, 500);
    }
  }

  /**
   * lets the hit boss die
   * @param {current boss} enemy 
   * @param {current boss index} enemyIndex 
   */
  bossHit(enemy, enemyIndex) {
    enemy.hit(0);
    enemy.bossHit = true;
    this.endbossStatusBar.setPercentage(enemy.energy);
    if (enemy.energy != 0) {
      this.playMusic(this.bossChickenHurtAudio, false);
    }
    if (enemy.energy == 0) {
      setTimeout(() => {
        this.playMusic(this.bossChickenDieAudio, false);
        this.gameSound.pause();
        this.level.enemies.splice(enemyIndex, 1);
        enemy.stopGameAnimation();
      }, 500);
    }
  }

  /**
   * This function records the world and ensures that the camera moves with it
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawBars();
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * This function draws the display bars
   */
  drawBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.salsa_bottleBar);
    this.addToMap(this.endbossStatusBar);
  }

  /**
   * This function draws the objects in the world
   */
  drawObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.salsa_bottle);
  }

  /**
   * This function ensures the implementation of a group of objects in the world
   * @param {object to be painted} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  /**
   * This function ensures the implementation of the individual 
   * object in the world and ensures that it looks in the right direction
   * @param {movableObject} mo 
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * rotates the image
   * @param {movableObject} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * turns the picture back
   * @param {movableObject} mo 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
