class Cloud extends MovableObject {
  y = 25;
  height = 250;
  width = 500;

  constructor(spawnPoint) {
      super().loadImage('img/5_background/layers/4_clouds/1.png');
      if (spawnPoint < 500) {
          this.x = Math.random() * 2200;
      }
      else{
          this.x = spawnPoint
      }
      this.animateCloud();
  }

  /**
   * animate the clouds
   */
  animateCloud() {
      this.cloudMoveSet = setInterval(() => {
          this.moveLeft();
      }, 10);
      this.gameAnimations.push(this.cloudMoveSet);
  }
}
