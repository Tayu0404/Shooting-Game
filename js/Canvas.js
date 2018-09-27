const SCREEN_WIDTH = document.documentElement.clientWidth - 40;
const SCREEN_HEIGHT = 720;
let fps = 1000 / 60;

window.addEventListener('load', init);

let canvas;
let ctx;
let htmlhp;

// Imageオブジェクト
let me;

// 初期読み込み
let chara = new Character();
let Recovery = new recovery();
let mausePosition = new Point();
let enemyCounti, enemyCountj
let Enemy = new Array(4);
for (enemyCounti = 0; enemyCounti < 4; enemyCounti++) {
    Enemy[enemyCounti] = new enemy();
    Enemy[enemyCounti].shot();
}

//自分の弾
let shots = 0;

//初期化処理
function init() {
    htmlhp = document.getElementById("hp");
    canvas = document.getElementById('maincanvas');
    ctx = canvas.getContext('2d');
    document.body.addEventListener('mousemove', mouse, true);

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;

    // 画像の読み込み
    imageInit();
    chara.position = {
        x: 0,
        y: canvas.height / 2 + me.height / 2
    }
    Enemy.position = {
        x: canvas.width / 3 * 2,
        y: canvas.height / 2 + enemy.height / 2
    }
};

//メインループ
window.onload = function update() {
    render();
    process();
    setTimeout(update, fps)
};

//描画
function render() {
    // 全体をクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backimage, 0, 0);
    if (charaInfo.alive) {
        ctx.drawImage(me, chara.position.x, chara.position.y);
    }
    for (enemyCounti = 0; enemyCounti < 4; enemyCounti++) {
        if (Enemy[enemyCounti].enemyInfo.alive) {
            ctx.drawImage(enemy, Enemy[enemyCounti].position.x, Enemy[enemyCounti].position.y);
        }
    }
    if (Boss.alive) {
        ctx.drawImage(boss, Boss.position.x, Boss.position.y);
    }
}

// 画像の読み込み
function imageInit() {
    //自機
    me = new Image();
    me.src = './img/chara.png';
    //自機弾
    ammo = new Image();
    ammo.src = './img/bullets.png';

    enemyAmmo = new Image();
    enemyAmmo.src = './img/bullets_enemy.png'

    enemy = new Image();
    enemy.src = './img/enemy.png';

    backimage = new Image();
    backimage.src = './img/backimage.png';

    boss = new Image();
    boss.src = './img/boss.png';

    Heart = new Image();
    Heart.src = './img/Heart.png';
};

// 処理
function process() {
    //弾の処理
    alive();
    htmlhp.innerHTML = 'キャラHP' + charaInfo.hp + ' : ' + '敵HP' + enemyInfo.hp + ':' + 'BossHP' + Boss.hp;
};

function mouseMove() {
    let value = 10;
    let angle;

    //charaとマウスとの差
    let deltax = Math.abs(chacenter.position.x - mausePosition.x);
    let deltay = Math.abs(chacenter.position.y - mausePosition.y);

    let flag = {
        top: false,
        buttom: false,
        right: false,
        left: false
    }

    //DeltaとValueに基づいて
    if (deltax < value) {
        chara.speed.x = deltax;
    } else {
        chara.speed.x = value;
    }
    if (deltay < value) {
        chara.speed.y = deltay;
    } else {
        chara.speed.y = value;
    }

    //Right Move
    if (chacenter.position.x < mausePosition.x) {
        if (chacenter.position.x + chara.speed.x <= canvas.width - me.width / 2) {
            flag.right = true;
            chara.position.x += chara.speed.x;
        }
    }
    //Left Move
    if (chacenter.position.x > mausePosition.x) {
        if (chacenter.position.x - chara.speed.x >= 0 + me.width / 2) {
            flag.left = true;
            chara.position.x -= chara.speed.x;
        }
    }
    //Top Move
    if (chacenter.position.y < mausePosition.y) {
        if (chara.position.y + chara.speed.y <= canvas.height - me.height) {
            flag.top = true;
            if (flag.top && flag.right) {
                angle = 45;
            }
            if (flag.top && flag.left) {
                angle = 45 + 90;
            }
            if (flag.top && flag.right || flag.left) {
                chara.speed.x = parseInt(Math.abs(Math.cos(angle * Math.PI / 180) * chara.speed.x))
                chara.speed.y = parseInt(Math.abs(Math.sin(angle * Math.PI / 180) * chara.speed.y))
            }
            chara.position.y += chara.speed.y;
        }
    }
    //Buttom Move
    if (chacenter.position.y > mausePosition.y) {
        if (chara.position.y - chara.speed.y >= 0) {
            flag.buttom = true;
            if (flag.buttom && flag.right) {
                angle = 45 + 180;
            }
            if (flag.buttom && flag.left) {
                angle = 45 + 270;
            }
            if (flag.buttom && flag.right || flag.left) {
                chara.speed.x = parseInt(Math.abs(Math.cos(angle * Math.PI / 180) * chara.speed.x))
                chara.speed.y = parseInt(Math.abs(Math.sin(angle * Math.PI / 180) * chara.speed.y))
            }
            chara.position.y -= chara.speed.y;
        }
    }
}

function mouse(event) {
    mausePosition.x = event.clientX;
    mausePosition.y = event.clientY;
}

//中心点を求める
//キャラ
let chacenter = new characenter();

function characenter() {
    this.position = new Point();
}

function charaCenter() {
    chacenter.position.x = chara.position.x + me.width / 2;
    chacenter.position.y = chara.position.y + me.height / 2;
}

//敵
let enecenter = new Array(4);
for (let i = 0; i < 4; i++) {
    enecenter[i] = new enemycenter();
}

function enemycenter() {
    this.position = new Point();
}

function enemyCenter() {
    for (let i = 0; i < 4; i++) {
        enecenter[i].position.x = Enemy[i].position.x + enemy.width / 2;
        enecenter[i].position.y = Enemy[i].position.y + enemy.height / 2;
    }
}

let BossCenter = new bossCenter();
function bossCenter() {
    this.position = new Point();
}

bossCenter.prototype.set = function () {
    this.position.x = Boss.position.x + boss.width / 2;
    this.position.y = Boss.position.y + boss.height / 2;
}