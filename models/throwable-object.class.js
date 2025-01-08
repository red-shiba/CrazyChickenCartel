class ThrowableObject extends CollidableObject {
    speedX;
    speedY;
    splashed = false;

    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ROTATE);
        this.throw(direction);
        this.animateBottle();
    }

    /**
     * This function ensures the course of throwing a bottle
     */
    throw(direction) {
        this.speedY = 20;
        this.applyGravity();
        if (direction == true) {
            this.x = this.x - 100;
        }
        this.throw = setInterval(() => {
            if (direction == false) {
                this.x += 10;
            } else if (direction == true) {
                this.x -= 10;
            }
        }, 25);
        this.gameAnimations.push(this.throw);
    }

    /**
     * This function provides the animation of the bottles
     */
    animateBottle() {
        this.bottleRotate = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
        }, 100);
        this.gameAnimations.push(this.throw);
    }

    /**
     * This function provides the animation of the bottles when they break
     */
    playSplashAnimation() {
        clearInterval(this.throw);
        clearInterval(this.bottleRotate);
        this.speedY = 0;
        this.playAnimation(this.IMAGES_SPLASH);
    }
}
