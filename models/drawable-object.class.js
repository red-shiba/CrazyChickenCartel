class DrawableObject {
    x = 120;
    y = 180;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    /**
     * This function ensures the loading of images
     * @param {file path of the image} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function ensures the implementation of the images
     * @param {*} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function loads all images from an array
     * @param {array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function adds objects to the respective display bar
     */
    addToBar() {
        if (this.percentage < 100) {
            this.percentage += 20;
            this.setPercentage(this.percentage);
        }
    }

    /**
     * This function delets objects to the respective display bar
     */
    deleteFromBar() {
        this.percentage -= 20;
        this.setPercentage(this.percentage);
    }

    /**
     * This function ensures the correct percentage of the display bar
     * @param {percentage} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * This function ensures the correct 
     * percentage of the display bar back
     * @returns percentage of the display
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
