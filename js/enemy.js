let enemyiMax = 3;
let enemyjMax = 30;

function enemy() {
    this.position = new Point();
    this.speed = new Point();
    this.position.x = 1000;
    this.position.y = 300;
    this.hp;
    this.enemyInfo = new Enemy_infomation();
    this.shots = new Array(3);
}


enemy.prototype.set = function (hp) {
    this.hp = hp;
    this.enemyInfo.alive = true;
}
function circleFunction(type) {
    let circleCenter = {
        x: 1000,
        y: 250
    }
    let deg = 360.0 / 3 * type + new Date().getTime() / 9;
    let rad = (deg * Math.PI / 180.0);

    let radius = 250;
    let circumferenceX = circleCenter.x + (Math.sin(rad) * radius);
    let circumferenceY = circleCenter.y + (Math.cos(rad) * radius);
    Enemy[type].position.x = circumferenceX;
    Enemy[type].position.y = circumferenceY;
}
enemy.prototype.move = function (type) {
    circleFunction(type);
}

enemy.prototype.shot = function () {
    for (let icount = 0; icount < enemyiMax; icount++) {
        this.shots[icount] = new Array(enemyjMax);
        for (let jcount = 0; jcount < enemyjMax; jcount++) {
            this.shots[icount][jcount] = new enemyShot();
        }
    }
}

function enemyShot() {
    this.position = new Point();
    this.speed = 0;
    this.alive = false;
}

enemyShot.prototype.set = function (p, speed) {
    // 座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、スピードをセット
    this.speed = speed;

    // 生存フラグを立てる
    this.alive = true;
};

enemyShot.prototype.move = function (j) {
    let diffusivity = 5
    if (j === 0) {
        this.position.x -= this.speed;
    }
    if (j === 1) {
        this.position.x -= this.speed;
        this.position.y += diffusivity
    }
    if (j === 2) {
        this.position.x -= this.speed;
        this.position.y -= diffusivity
    }
    if (this.position.x <= 0) {
        this.alive = false;
    }
};


let enemyShotcount = new Array(4);
let enemyBulletsPosition = new Array(4);
for (let i = 0; i < 4; i++) {
    enemyShotcount[i] = 0;
    enemyBulletsPosition[i] = {
        x: 0,
        y: 0,
    }
}


function enemyShots(enemyCounti) {
    if (0 <= enemyShotcount[enemyCounti] &&
        enemyShotcount[enemyCounti] < 2000 &&
        Enemy[enemyCounti].enemyInfo.alive == true) {
        enemyShotcount[enemyCounti]++;
    } else if (enemyShotcount[enemyCounti] >= 2000 &&
        Enemy[enemyCounti].enemyInfo.alive) {
        enemyShotcount[enemyCounti] = 0;
    } else {
        enemyShotcount[enemyCounti] = -1;
    }
    enemyBulletsPosition[enemyCounti].x = Enemy[enemyCounti].position.x;
    enemyBulletsPosition[enemyCounti].y = Enemy[enemyCounti].position.y + enemy.height / 2 - ammo.height / 2;
    if (enemyShotcount[enemyCounti] % 20 == 0) {
        for (icount = 0; icount < enemyiMax; icount++) {
            for (jcount = 0; jcount < enemyjMax; jcount++) {
                // 自機ショットが既に発射されているかチェック
                if (!Enemy[enemyCounti].shots[icount][jcount].alive) {
                    // 自機ショットを新規にセット 
                    Enemy[enemyCounti].shots[icount][jcount].set(enemyBulletsPosition[enemyCounti], 10);
                    Enemy[enemyCounti].shots[icount][jcount].alive = true;
                    break;
                }
            }
        }
    }
}

function enemybullet() {
    this.position = new Point();
}

let enebullet = new Array(4)

for (let i = 0; i < 4; i++) {
    enebullet[i] = new Array(3)
    for (let j = 0; j < enemyiMax; j++) {
        enebullet[i][j] = new Array(enemyjMax);
        for (let k = 0; k < enemyjMax; k++) {
            enebullet[i][j][k] = new enemybullet();
        }
    }
}

function eneammoCenter() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < enemyiMax; j++) {
            for (k = 0; k < enemyjMax; k++) {
                // 自機ショットが既に発射されているかチェック
                if (Enemy[i].shots[j][k].alive) {
                    enebullet[i][j][k].position.x = Enemy[i].shots[j][k].position.x + enemyAmmo.width / 2;
                    enebullet[i][j][k].position.y = Enemy[i].shots[j][k].position.y + enemyAmmo.height / 2;
                }
            }
        }
    }
}