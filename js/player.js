game.player = {
    x: 54,
    y: 0,
    height: 24,
    highestY: 0,
    direction: "left",
    isInAir: false,
    startedJump: false,
    moveInterval: null,
    jumpCount: 0,
    fallTimeout: function(startingY, time, maxHeight) { 
        console.log(time)
        setTimeout( function () {
            

            if (this.isInAir) {
                this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2) // tinh cao do
                if (this.y < this.highestY) { // cap nhap y max
                    this.highestY = this.y
                }
                if (time > 37) {  // dang rot xuong
                    this.startedJump = false
                    game.checkCollisions()
                }
                if (time < 150) {
                    time++
                            
                    if( this.jumpCount == 2) { // nếu đây là lần nhảy 2 thù reset time về 1
                        clearInterval(this.fallInterval)
                        game.sounds.jump.play()
                        this.isInAir = true
                        this.startedJump = true
                        startingY = this.y
                        time = 1
                        this.jumpCount++
                    } 
                    this.fallTimeout(startingY, time, maxHeight)  
                } else {
                    game.isOver = true 
                }
                if (this.y > 40) {
                    game.isOver = true
                }
                game.requestRedraw()
            }
        }.bind(this, startingY, time, maxHeight), 12)
    },
    animationFrameNumber: 0,
    collidesWithGround: true,
    animations: {
        // Describe coordinates of consecutive animation frames of objects in textures
        left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
        right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
    },
    jump: function (type) {
        if (!this.isInAir) { // dang o mat dat
            clearInterval(this.fallInterval)
            game.sounds.jump.play()
            this.isInAir = true
            this.startedJump = true
            var startingY = this.y
            var time = 1
            maxHeight = 121
            if (type == "fall" ) {
                time = 30
                maxHeight = 0
            }
            this.fallTimeout(startingY, time, maxHeight)
        }
        if (type != 'fall' && this.jumpCount < 3 ) {
            this.jumpCount++;
        }
    }
}
