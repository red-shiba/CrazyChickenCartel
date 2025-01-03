class Salsa_bottle extends CollidableObject {
  width = 100;
  height = 100;
  y = 330;
  IMAGES = [
      'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
      'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  constructor(){
      super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
      this.x = 200 + Math.random() * 2000;
  }
}
