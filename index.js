const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.7;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw()
        // this.velocity.y += gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
}

const player = new Sprite({
    position: {
        x: 0, 
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});

// player.draw();

const eneemy = new Sprite({
    position: {
        x: 400, 
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// eneemy.draw();

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }, 
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    key: {
        a: 'a',
        d: 'd',
        w: 'w'
    }
}

let lastKey;


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    eneemy.update();
    console.log('go');

    player.velocity.x = 0;
    eneemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && eneemy.lastKey === 'ArrowLeft') {
        eneemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && eneemy.lastKey === 'ArrowRight') {
        eneemy.velocity.x = 5;
    }
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':   
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a': 
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w': 
            player.velocity.y = -20;
            break;

        case 'ArrowRight':   
            keys.ArrowRight.pressed = true;
            eneemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true;
            eneemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp': 
            eneemy.velocity.y = -20;
            break;
    }
    // console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case keys.key.d:   
            keys.d.pressed = false;
            break;
        case 'a':   
            keys.a.pressed = false;
            break; 
        case 'w':   
            keys.w.pressed = false;
            break; 
        
    };

    // enemy keys
    switch (event.key) {
        case 'ArrowRight':   
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':   
            keys.ArrowLeft.pressed = false;
            break; 
        case 'ArrowUp':   
            eneemy.velocity.y = -10;
            break; 
        
    }
    console.log(event)
})

console.log(player);
