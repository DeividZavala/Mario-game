var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var enemies = [];
var interval;
//probamos que todo funcione:
//ctx.fillRect(0,0,50,50);

// var imagen = new Image();
// imagen.src = 'https://vignette.wikia.nocookie.net/moj-wlasny-swiat/images/7/75/Mario.png/revision/latest?cb=20141208165919&path-prefix=pl';
// imagen.onload = function(){
//     ctx.drawImage(imagen, 0,0,50,100);
// }


// Clases

class Mario{
    constructor(){
        this.x = 10;
        this.y = 295;
        this.width = 20;
        this.height = 40;
        this.image1 = new Image();
        this.image1.src = "https://bit.ly/2L7yH3f";
        this.image2 = new Image();
        this.image2.src = 'https://bit.ly/2L3ikoe';
        this.image = this.image1;
    }


    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }

    draw(){

        if(this.y < 295) this.y += 4;

        if(frames % 10 === 0){
            this.image = this.image == this.image1 ? this.image2 : this.image1;
        }
        ctx.drawImage(this.image, this.x, this.y, 30,40);
    }

}

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = 'https://bit.ly/2m9qY9Q';
    }


    gameOver(){
        clearInterval(interval);
        ctx.font = "80px Avenir";
        ctx.fillText("Game Over", 250, 190);
        ctx.fillStyle = "red";
    }


    draw(){
        this.x --;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

}



class Enemy{
    constructor(){
        //de principio el enemigo aparece fuera del canvas
        this.x = canvas.width;
        this.y = 295;
        this.width = 20;
        this.height = 40;
        this.image = new Image();
        this.image.src = "https://bit.ly/2upxkWp";
    }

    draw(){
        if(frames % 10) this.x -= 5;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


// Instancias

var mario = new Mario();
var background = new Background;
var enemy = new Enemy;


// setinterval
var frames = 0;

var interval = setInterval(function(){
    frames++
    ctx.clearRect(0,0,256,256);
    background.draw();
    mario.draw();
    generateEnemies();
    drawingEnemies();
}, 1000/60)


addEventListener('keydown', function(event){
    if(event.keyCode === 32){
        mario.y -= 80;
    }
})


// funciones auxiliares

function generateEnemies() {
    if(frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0){
        var enemy = new Enemy
        enemies.push(enemy);
    }
}

function drawingEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw()
        if(mario.collision(enemy)){
            background.gameOver();
        }
    })
}
