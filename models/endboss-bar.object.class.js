class EndbossStatusbar extends DrawableObject {
  IMAGES = [
      'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
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
