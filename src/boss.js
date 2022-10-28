class Boss {
    constructor(ctx, ctxWidth, ctxHeight, lives = 10) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.lives = lives
        this.meatballs = []

        this.height = 400
        this.width = 450

        this.posX = ctxWidth - this.width - 50
        this.posY = ctxHeight - this.height - 50

        this.bossImg = new Image()
        this.bossImg.src = './assets/mrpotato.png'
    }

    draw() {
        // this.ctx.fillStyle = 'yellow'
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.bossImg, this.posX, this.posY, this.width, this.height)
    }
}