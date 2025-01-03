class Coin extends CollidableObject{
  x = 100;
  width = 100;
  height = 100;
  y = 260;
  IMAGES = [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png',
  ];

  constructor(){
      super().loadImage('img/8_coin/coin_1.png');
      this.x = 200 + Math.random() * 2000;
  }
}
