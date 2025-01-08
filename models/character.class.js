class Character extends CollidableObject {
  height = 250;
  width = 120;
  y = 80;
  speed = 10;
  collectedCoins = 0;
  collectedBottles = 0;
  standingTime = 0;
  idleStatus = false;
  world;
  lastPlayedTime = 0;
  COOLDOWN_TIME = 2000;
  walking_sound = new Audio('audio/step.mp3');
  hurt_sound = new Audio('audio/hurt.mp3');
  collectCoinSound = new Audio('audio/collectCoin.mp3');
  collectBottleSound = new Audio('audio/collectBottle.mp3');
  jumpSound = new Audio('audio/jump.mp3');
  isPlayinghurt = false;
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30
  }
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];
  IMAGES_STANDING = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];
  IMAGES_STANDING_LONG = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_STANDING_LONG);
    this.applyGravity(this.y);
    this.animate();
  }

  /**
   * this function ist for all animation for this character
   */
  animate() {
    this.controle = setInterval(() => { this.moves(); }, 1000 / 60);
    this.gameAnimations.push(this.controle);

    this.jumping = setInterval(() => { this.handleJumping(); }, 300);
    this.gameAnimations.push(this.jumping);

    this.getDamage = setInterval(() => { this.handleDamage(); }, 300);
    this.gameAnimations.push(this.getDamage);

    this.walking = setInterval(() => { this.handleWalking(); }, 100);
    this.gameAnimations.push(this.walking);
  }

  /**
   * this funtion ist for collecting Coins or Bottles
   * @param {object (Coin or Bottle)} obj 
   */
  collect(obj) {
    if (obj === 'coin') {
      this.collectedCoins++;
      this.playObjectiveSounds(this.collectCoinSound, false);
    } else if (obj === 'bottle') {
      if (this.collectedBottles < 5) {
        this.collectedBottles++;
        this.playObjectiveSounds(this.collectBottleSound, false);
      }
    }
  }

  /**
   * this function is for deleting uesd items
   * @param {object (coin or bottle)} obj 
   */
  useCollectables(obj) {
    if (obj == 'coin') {
      this.collectedCoins--;
    } else if (obj == 'bottle') {
      this.collectedBottles--;
    }
  }

  /*
   * this function let the character wake up
   */
  wakeUp() {
    this.idleStatus = false;
    this.checkStandingTime();
  }

  /**
   * the function is there to check the idle time. If the character 
   * is idle for a longer period, it should switch to a sleeping mode
   */
  checkStandingTime() {
    let timepassed = new Date().getTime() - this.standingTime;
    timepassed = timepassed / 1000;
    if (this.idleStatus && timepassed > 3) {
      this.playAnimation(this.IMAGES_STANDING_LONG)
    } else if (this.idleStatus) {
      this.playAnimation(this.IMAGES_STANDING)
    } else if (!this.isHurt() && !this.isDead() && !this.isAboveGround() && !this.idleStatus) {
      this.standingTime = new Date().getTime();
      this.idleStatus = true;
    }
  }

  /**
   * This function is for the character's movements, especially jumping and running
   */
  moves() {
    this.walking_sound.pause();
    this.controleMoveRight();
    this.controleMoveLeft();
    this.controleJump();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * this function controls the movement to the right
   */
  controleMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.playObjectiveSounds(this.walking_sound, false);
      this.otherDirection = false;
    }
  }

  /**
   * this function controls the movement to the left
   */
  controleMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.playObjectiveSounds(this.walking_sound, false);
      this.otherDirection = true;
    }
  }

  /**
   * this function controls the jump movement
   */
  controleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.playObjectiveSounds(this.jumpSound, false);
    }
    if (!this.isAboveGround) {
      clearInterval(this.jumping);
    }
  }

  /**
   * This function controls the movement animation in the jump
   */
  handleJumping() {
    let i = 0;
    if (this.isAboveGround()) {
      if (i <= this.IMAGES_JUMPING.length) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
      this.idleStatus = false;
    }
  }

  /**
   * this function checks whether the character is still alive when damage is received and checks 
   * whether the character jumped from above onto the enemy and therefore does not take damage
   */
  handleDamage() {
    if (this.isDead()) {
      this.checkForDeath();
    } else if (this.isHurt() && !this.isAboveGround()) {
      this.checkForHurt();
    }
  }

  /**
   * this function ensures that when the character is dead the correct animation is played
   */
  checkForDeath() {
    this.playAnimation(this.IMAGES_DEAD);
    this.idleStatus = false;
    this.world.keyboard = false;
  }

  /**
   * this function ensures that when the character is hurt the correct animation and sound is played
   */
  checkForHurt() {
    if (this instanceof Character) {
      this.playAnimation(this.IMAGES_HURT);
      if (!this.isPlayinghurt) {
        this.isPlayinghurt = true;
        setTimeout(() => {
          this.playObjectiveSounds(this.hurt_sound, false);
        }, 700);
        this.hurt_sound.onended = () => {
          this.isPlayinghurt = false;
        };
      }
      this.idleStatus = false;
    }
  }

  /**
   * this function ensures that when the character is running the correct animation is played
   */
  handleWalking() {
    if (this.world.keyboard.keyOnUes == true && !this.isAboveGround()) {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleStatus = false;
      }
    } else {
      this.checkStandingTime();
    }
  }
}
