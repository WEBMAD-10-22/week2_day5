class Meatball {
    constructor(ctx, bossPosX, bossPosY, bossHeight, velX = -10) {
        this.ctx = ctx

        this.width = 100
        this.height = 100

        this.posX = bossPosX
        this.posY = bossPosY + bossHeight - this.height

        this.velX = velX

        this.meatBallImg = new Image()
        this.meatBallImg.src = './assets/meat.png'
    }

    update() {
        this.draw()
        this.move()
    }

    draw() {
        // this.ctx.fillStyle = 'brown'
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.meatBallImg, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posX += this.velX
    }
}