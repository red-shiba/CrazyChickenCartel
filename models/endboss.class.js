class Endboss extends CollidableObject {
  x = 2500;
  height = 400;
  width = 250;
  y = 60;
  hadFirstContact = false;
  energy = 100;
  enemyLevel = 2;
  endbossActive = false;
  speed = 8;
  bossHit = false;
  alertFinished = false;
  check = 0;
  IMAGES_WALKING = [
      'img/4_enemie_boss_chicken/1_walk/G1.png',
      'img/4_enemie_boss_chicken/1_walk/G2.png',
      'img/4_enemie_boss_chicken/1_walk/G3.png',
      'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ALERT = [
      'img/4_enemie_boss_chicken/2_alert/G5.png',
      'img/4_enemie_boss_chicken/2_alert/G6.png',
      'img/4_enemie_boss_chicken/2_alert/G7.png',
      'img/4_enemie_boss_chicken/2_alert/G8.png',
      'img/4_enemie_boss_chicken/2_alert/G9.png',
      'img/4_enemie_boss_chicken/2_alert/G10.png',
      'img/4_enemie_boss_chicken/2_alert/G11.png',
      'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  IMAGES_HURT = [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];
  IMAGES_ATTACK = [
      'img/4_enemie_boss_chicken/3_attack/G13.png',
      'img/4_enemie_boss_chicken/3_attack/G14.png',
      'img/4_enemie_boss_chicken/3_attack/G15.png',
      'img/4_enemie_boss_chicken/3_attack/G16.png',
      'img/4_enemie_boss_chicken/3_attack/G17.png',
      'img/4_enemie_boss_chicken/3_attack/G18.png',
      'img/4_enemie_boss_chicken/3_attack/G19.png',
      'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_DEAD = [
      'img/4_enemie_boss_chicken/5_dead/G24.png',
      'img/4_enemie_boss_chicken/5_dead/G25.png',
      'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.animate();
  }

  /**
   * This function ensures that the correct animations are played 
   * for the selected interactions and are regularly checked for changes
   */
  animate() {
      this.checkIsBossActive();
      this.gameAnimations.push(this.isAlive);
      this.dead = setInterval(() => { this.checkForAlive(); }, 125);
      this.gameAnimations.push(this.dead);
      this.hittet = setInterval(() => { this.checkForBossGetHit(); }, 100);
      this.gameAnimations.push(this.hittet);
  }

  /**
   * checks whether the boss has been activated
   */
  checkIsBossActive() {
      let i = 0;
      this.isAlive = setInterval(() => {
          this.bossSpawning(i);
          i++;
          if (this.endbossActive && !this.hadFirstContact) {
              i = 0;
              this.hadFirstContact = true;
              return i;
          }
      }, 200);
  }

  /**
   * this function activates the boss
   * @param {parameters for the length of the start animation and the change to the running animation} i 
   */
  bossSpawning(i) {
      if (this.endbossActive) {
          if (i <= this.IMAGES_ALERT.length && this.energy > 0) {
              this.playAnimation(this.IMAGES_ALERT);
              if (i == this.IMAGES_ALERT.length) {
                  this.alertFinished = true;
              }
          } else if (this.alertFinished && !this.bossHit) {
              this.playAnimation(this.IMAGES_WALKING);
              this.moveLeft();
          }
      }
  }

  /**
   * this function checks if the boss is still alive
   */
  checkForAlive() {
      if (this.energy == 0) {
          clearInterval(this.alive);
          this.playAnimation(this.IMAGES_DEAD);
          this.alive = false;
      }
  }

  /**
   * this function checks if the boss has taken damage
   */
  checkForBossGetHit() {
      if (this.check <= this.IMAGES_HURT.length && this.bossHit) {
          this.playAnimation(this.IMAGES_HURT);
      }
      if (this.check > this.IMAGES_HURT.length) {
          this.bossHit = false;
          this.check = 0;
      }
      this.check++;
  }
}
