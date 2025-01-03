class SalsabottleBar extends DrawableObject{
  IMAGES = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];
  percentage = 0;

  constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 20;
      this.y = 100;
      this.width = 200;
      this.height = 60;
      this.setPercentage(this.percentage);
  }    
}
