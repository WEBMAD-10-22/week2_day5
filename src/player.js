class Player {
    constructor(ctx, ctxWidth, ctxHeigth) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeigth = ctxHeigth
        this.floor = 50
        this.cooldown = 1

        this.canJump = false
        this.canShoot = false

        this.width = 120
        this.height = 150

        this.posY = ctxHeigth - this.floor - this.height
        this.posX = 120


        this.velX = 0
        this.velY = 0
        this.gravity = 2

        this.keys = {
            leftKeyPressed: false,
            rightKeyPressed: false,
            upKeyPressed: false,
        }

        this.bullets = []

        this.playerImg = new Image()
        this.playerImg.src = "./assets/mainPlayer.png";

        this.init()
    }

    init() {
        this.setEventListeners()
    }

    update() {
        // this.ctx.fillStyle = 'red'
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height)

        this.posY += this.velY
        this.velY += this.gravity

        if (this.cooldown >= 1) this.canShoot = true

        // TENGO EN CUENTA LA VELOCIDAD DEL JUGADOR EN LA CAÍDA
        if (this.posY + this.height + this.velY >= this.ctxHeigth - this.floor) {
            this.velY = 0
            this.canJump = true
        }

        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()
        if (this.keys.upKeyPressed) this.jump()
    }

    setEventListeners() {
        document.addEventListener('keydown', ({ code }) => {
            switch (code) {
                case 'ArrowLeft':
                    this.keys.leftKeyPressed = true
                    break;
                case 'ArrowRight':
                    this.keys.rightKeyPressed = true
                    break;
                case 'ArrowUp':
                    this.keys.upKeyPressed = true
                    break;
                case 'Space':
                    this.keys.upKeyPressed = true
                    break;
                case 'KeyE':
                    this.shoot()
                    break;
            }
        })

        document.addEventListener('keyup', ({ code }) => {
            switch (code) {
                case 'ArrowLeft':
                    this.keys.leftKeyPressed = false
                    break;
                case 'ArrowRight':
                    this.keys.rightKeyPressed = false
                    break;
                case 'ArrowUp':
                    this.keys.upKeyPressed = false
                    break;
                case 'Space':
                    this.keys.upKeyPressed = false
                    break;
            }
        })
    }

    moveLeft() {
        if (this.posX > 0) this.posX -= 20
    }

    moveRight() {
        if (this.posX < this.ctxWidth - this.width) this.posX += 20
    }

    jump() {
        if (this.canJump) {
            this.velY -= 30
            this.canJump = false
        }
    }

    shoot() {
        if (this.canShoot) {
            this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.height, this.width))
            this.canShoot = false
            this.cooldown = 0
        }
    }
}