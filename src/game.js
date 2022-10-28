const Game = {
    name: 'カップヘッド',
    author: 'Web Dev Squad 10/2022',
    version: '1.0.0',
    license: undefined,
    description: 'Best Game in Town',

    FPS: 60,

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    interval: undefined,
    framesCounter: 0,

    player: undefined,
    boss: undefined,
    background: undefined,
    winImg: undefined,
    defeatImg: undefined,
    isDifficult: false,

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = canvas.getContext('2d')

        this.winImg = new Image()
        this.winImg.src = './assets/victory.png'

        this.defeatImg = new Image()
        this.defeatImg.src = './assets/defeat.jpg'

        this.setDimensions()
        this.start() // AQUÍ EMPIEZA LA PESCA
    },

    setDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
    },

    start() {

        this.generateAll()

        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.clearBullets()
            this.clearMeatballs()
            this.checkCollisions()
            this.framesCounter++
            if (this.framesCounter % 10 === 0) this.player.cooldown++
            if (this.framesCounter % 60 === 0) {
                this.boss.meatballs.push(new Meatball(this.ctx, this.boss.posX, this.boss.posY, this.boss.height))
            }

        }, 1000 / this.FPS)

    },

    // LIMPIAMOS LAS BALAS QUE HAN SALIDO DEL MAPA
    clearBullets() {
        // this.player.bullets = this.player.bullets.filter(bullet => bullet.posX < this.width)


        this.player.bullets.forEach((bullet, i, bullets) => {
            if (bullet.posX + bullet.width - 150 > this.boss.posX) {
                bullets.splice(i, 1)
            }
        })
    },

    clearMeatballs() {
        this.boss.meatballs = this.boss.meatballs.filter(meatball => meatball.posX > 0)
    },

    drawAll() {
        this.background.draw()
        this.boss.draw()
        this.boss.meatballs.forEach(meatball => meatball.update())
        this.player.update()
        this.player.bullets.forEach(bullet => bullet.draw())
    },

    generateAll() {
        this.player = new Player(this.ctx, this.width, this.height)
        this.isDifficult ? this.boss = new Boss(this.ctx, this.width, this.height, 50) : this.boss = new Boss(this.ctx, this.width, this.height)
        this.background = new Background(this.ctx, this.width, this.height)
    },

    clearAll() {
        // this.ctx.fillStyle = 'white'
        // this.ctx.fillRect(0, 0, this.width, this.height)
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    checkCollisions() {
        this.player.bullets.forEach(bullet => {
            if (bullet.posX + bullet.width + bullet.velX >= this.boss.posX
                && bullet.posX + bullet.width <= this.boss.posX) {
                this.boss.lives--
                console.log(this.boss.lives)
                if (this.boss.lives <= 0) this.winGame()
            }
        })

        this.boss.meatballs.forEach(meatball => {
            if (this.player.posX + this.player.width - 100 >= meatball.posX && this.player.posX <= meatball.posX + meatball.width
                && this.player.posY + this.player.height + this.player.velY >= meatball.posY) this.gameOver()
        })
    },

    winGame() {
        clearInterval(this.interval)
        this.clearAll()
        // 
        this.ctx.drawImage(this.winImg, 0, 0, this.width, this.height)
        // 
        setTimeout(() => {
            location.reload()
        }, 2000)
    },

    gameOver() {
        clearInterval(this.interval)
        this.clearAll()
        // 
        this.ctx.drawImage(this.defeatImg, 0, 0, this.width, this.height)
        // 
        setTimeout(() => {
            location.reload()
        }, 2000)
    }
}