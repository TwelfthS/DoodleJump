const ROWS = 30;
const COLUMNS = 20;
const BOX_HEIGTH = 30;
const BOX_WIDTH = 30;
const GAME = document.getElementById('Game');
let level = 1;
let doodlePos = null;
let timer = null,
    timer2 = null;
let gravity = 0;
let k = -1;
let side = 0;
let def = 0;
let count = 0;
let score = 0;
let true_level = 0;

drawGame();

while (level + 5 < ROWS) {
    let platPos = getPosition();

    // console.log("x: " + platPos.x);
    // console.log("y: " + platPos.y);

    const platform = [
        GAME.querySelector(`[posX = "${platPos.x}"][posY = "${platPos.y}"]`),
        GAME.querySelector(`[posX = "${platPos.x + 1}"][posY = "${platPos.y}"]`),
        GAME.querySelector(`[posX = "${platPos.x + 2}"][posY = "${platPos.y}"]`),
    ];
    if (level < 7) {
        doodlePos = {
            x: platPos.x + 1,
            y: platPos.y + 1,
        }
    }
    for(let i = 0; i < platform.length; i++)
    {
        platform[i].classList.add('platform');  
    }
    platform[0].classList.add('left');
    platform[1].classList.add('center');
    platform[2].classList.add('right');
}

let doodle = GAME.querySelector(`[posX = "${doodlePos.x}"][posY = "${doodlePos.y}"]`);
doodle.id = 'doodle';

timer = setInterval(jump, 75  );
//timer2 = setInterval(move, 50);





function drawGame() {
    for (let i = 0; i < ROWS*COLUMNS; i++) {
        let CELL = document.createElement('div');
        CELL.classList.add('cell');
        CELL.style.height = BOX_HEIGTH +'px';
        CELL.style.width = BOX_WIDTH +'px';
        GAME.appendChild(CELL);
    }
    let table = GAME.getElementsByClassName('cell');
    let x = 1,
        y = ROWS;
    for (let i = 0; i < table.length; i++) {
        if (x > COLUMNS) {
            x = 1;
            y--;
        }
        table[i].setAttribute('posX', x);
        table[i].setAttribute('posY', y);
        x++;
    }
}

function jump() {
    //console.log(gravity);
    //console.log(y);
    //side = 0;
    let below = GAME.querySelector(`[posX = "${doodlePos.x}"][posY = "${doodlePos.y - 1}"]`);
    if (below.classList.contains('platform') && gravity === 0) {
        k = 1;
        gravity = 5;
    }
    doodlePos.y += k;
    doodlePos.x += side;
    if (doodlePos.x > COLUMNS) {
        doodlePos.x = 1;
    }
    if (doodlePos.x < 1) {
        doodlePos.x = COLUMNS;
    }
    if (doodlePos.y === 1) {
        console.log("stop");
        clearInterval(timer);
        document.getElementById('score').innerHTML = score;
        document.querySelector('.gameOver').classList.remove('d-none');
    }
    if (doodlePos.y === 25 || doodlePos.y === 30) {
        timer2 = setInterval(frameUp, 75);
    }
    doodle.removeAttribute('id');
    //console.log(doodlePos.y);
    doodle = GAME.querySelector(`[posX = "${doodlePos.x}"][posY = "${doodlePos.y}"]`);
    doodle.id = 'doodle';
    if (gravity > 0) {
        if (gravity === 5) score = doodlePos.y + true_level;
        gravity--;
    } else {
        k = -1;
    }
}

function frameUp() {
    let x, y;
    //let all = GAME;
    // console.log(all.length);
    // for (let i = all.length - 1; i > 0; i--) {
    //     if (all[i].className === 'platform') {
    //         x = all[i].getAttribute('posX');
    //         y = all[i].getAttribute('posY') - 1;
    //         console.log(x);
    //         console.log(y);
    //         GAME.querySelector(`[posX = "${x}"][posY = "${y}"]`).className = 'platform';
    //         all[i].classList.remove('platform');
    //     }
    // }
    let all = Array.from(GAME.getElementsByClassName('platform'));
    //console.log(all.length);
    for (let i = 0; i < all.length; i++) {
        x = all[i].getAttribute('posX');
        y = all[i].getAttribute('posY');
        console.log(x);
        console.log(y);
        if (y > 1) update(x, y, i % 3);
        all[i].classList.remove('platform', 'left', 'right', 'center');
    }
    // all.classList.remove('platform');
    // all = GAME.getElementsByClassName('temp_platform');
    // for (let i = 0; i < all.length; i++) {
    //     all[i].classList.add('platform');
    // }
    // all.classList.remove('temp_platform');
    doodlePos.y--;
    doodle.removeAttribute('id');
    doodle = GAME.querySelector(`[posX = "${doodlePos.x}"][posY = "${doodlePos.y}"]`);
    doodle.id = 'doodle';
    level--;
    true_level++;
    newPlatforms();
    count++;
    //console.log(count);
    if (count === 5) {
        clearInterval(timer2);
        count = 0;
    }
}

function update(x, y, dir) {
    GAME.querySelector(`[posX = "${x}"][posY = "${y - 1}"]`).classList.add('platform');
    switch (dir) {
        case 0:
            GAME.querySelector(`[posX = "${x}"][posY = "${y - 1}"]`).classList.add('left');
            break;
        case 1:
            GAME.querySelector(`[posX = "${x}"][posY = "${y - 1}"]`).classList.add('center');
            break;
        case 2:
            GAME.querySelector(`[posX = "${x}"][posY = "${y - 1}"]`).classList.add('right');
    }
        // GAME.querySelector(`[posX = "${x + 1}"][posY = "${y}"]`),
        // GAME.querySelector(`[posX = "${x + 2}"][posY = "${y}"]`),
    //];
    //for(let i = 0; i < platform.length; i++)
    //{
        //platform[i].className = 'platform';  
    //}
}

function newPlatforms() {
    if (level + 5 < ROWS) {
        let platPos = getPosition();
        const platform = [
            GAME.querySelector(`[posX = "${platPos.x}"][posY = "${platPos.y}"]`),
            GAME.querySelector(`[posX = "${platPos.x + 1}"][posY = "${platPos.y}"]`),
            GAME.querySelector(`[posX = "${platPos.x + 2}"][posY = "${platPos.y}"]`),
        ];
        for(let i = 0; i < platform.length; i++)
        {
            platform[i].classList.add('platform');  
        }
    }
}

function getPosition(length = 3) {
    let posX = Math.round(Math.random() * (COLUMNS - length) + 1);
    let posY = Math.round(Math.random() * 2 + 3 + level);
    //if (Math.random() > 0.5 || def) {
        level = posY;
        //def = 0;  
    // } else {
    //     def = 1;
    // }
    return {x:posX, y:posY}
}

window.addEventListener('keydown', event=>{
    let key = event.key;
    if (key === "ArrowLeft") {
        side = -1;
    }
    if (key === "ArrowRight") {
        side = 1;
    }
})

// window.addEventListener('keypress', event=>{
//     let key = event.key;
//     if (key === "ArrowLeft") {
//         document.getElementById("doodle").style["transform"] = "scaleX(1)";
//     }
//     if (key === "ArrowRight") {
//         document.getElementById("doodle").style["transform"] = "scaleX(-1)";
//     }
// })

window.addEventListener('keyup', event=>{
    side = 0;
})