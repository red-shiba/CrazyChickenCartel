class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.8;
  energy = 100;
  lastHit = 0;
  alive = true;
  move;
  enemyLevel = 1;
  gameAnimations = [];
  ObjectSounds = true;

  /**
   * the function stops all intervals of the respective array
   */
  stopGameAnimation() {
    for (let i = 0; i < this.gameAnimations.length; i++) {
      const element = this.gameAnimations[i];
      clearInterval(element);
    }
    this.gameAnimations = [];
  }

  /**
   * this function can give gravity to an object
   */
  applyGravity() {
    this.checkForGround = setInterval(() => {
      if (this.isAboveGround() || this.speedY >= 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = 192.5;
      }
    }, 1000 / 25);
    this.gameAnimations.push(this.checkForGround);
  }

  /**
   * this function checks if an object is on the ground
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    else {
      return this.y < 180;
    }
  }

  /**
   * this function moves an object to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * this function moves an object to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * this function loads multiple images from an array and plays them as an animation
   * @param {array} images 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * This function lets an object jump
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * This function provides a mute and endmute function for the sounds of all objects
   * @param {audio path} sound 
   * @param {audio loop (true or false)} loop 
   */
  playObjectiveSounds(sound, loop = false) {
    if (this.ObjectSounds) {
      sound.loop = loop;
      sound.play();
    } else {
      sound.pause();
    }
  }

  /**
   * this function checks whether two objects collide
   * @param {colliding object} obj 
   * @returns true or false
   */
  isColliding(obj) {
    return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
  }

  /**
   * This function ensures that life is deducted from the respective object when hit
   */
  hit(x) {
    this.energy -= 5 + x;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * this function ensures that the value of the life of an object is true or false
   * @param {true or false} status 
   */
  setAlive(status) {
    this.alive = status;
  }

  /**
   * This function ensures that the time between the last hit is returned in seconds
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * this function returns that the energy of the object is 0
   * @returns energy of the object
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function provides the animation of the chicken
   */
  animateChicken() {
    this.chickenMoveLeft = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    this.gameAnimations.push(this.chickenMoveLeft);

    this.chickenMoveSets = setInterval(() => {
      if (this.alive == true) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.alive == false) {
        this.loadImage(this.IMAGES_DEAD);
        clearInterval(this.move);
      }
    }, 200);
    this.gameAnimations.push(this.chickenMoveSets);
  }
}
