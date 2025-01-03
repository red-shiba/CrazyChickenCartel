class Statusbar extends DrawableObject {
  IMAGES = [
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
      'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
  ];
  percentage = 100;

  constructor(x,y) {
      super();
      this.loadImages(this.IMAGES);
      this.x = x;
      this.y = y;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
  } 
}
