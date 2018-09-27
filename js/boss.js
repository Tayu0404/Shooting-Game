let Boss = new boss();

function boss() {
    this.position = new Point();
    this.speed = new Point();
    this.hp;
    this.alive = false;
    this.count = 0;
    this.atack;
}

boss.prototype.set = function (position, hp, atack) {
    this.position.x = position.x;
    this.position.y = position.y;
    this.hp = hp;
    this.atack = atack;
    this.alive = true;
}

boss.prototype.move = function () {
    if (this.alive) {
        let value = 5;
        let angle;

        //charaとマウスとの差
        let deltax = Math.abs(Boss.position.x - chara.position.x);
        let deltay = Math.abs(Boss.position.x - chara.position.y);

        let flag = {
            top: false,
            buttom: false,
            right: false,
            left: false
        }

        //DeltaとValueに基づいて
        if (deltax < value) {
            Boss.speed.x = deltax;
        } else {
            Boss.speed.x = value;
        }
        if (deltay < value) {
            Boss.speed.y = deltay;
        } else {
            Boss.speed.y = value;
        }

        //
        if (Boss.position.x < chara.position.x) {

            if (
                Boss.position.x + Boss.speed.x <= canvas.width - boss.width / 2 && 
                Boss.position.x + Boss.speed.x <= chara.position.x + me.width
            ) {
                flag.right = true;
                Boss.position.x += Boss.speed.x;
            }
        }

        if (Boss.position.x > chara.position.x) {
            if (
                Boss.position.x - Boss.speed.x >= chara.position.x + me.width &&
                Boss.position.x - Boss.speed.x >= canvas.width / 2
            ) {
                flag.left = true;
                Boss.position.x -= Boss.speed.x;
            }
        }
        //Top Move
        if (Boss.position.y > chara.position.y) {
            if (Boss.position.y - Boss.speed.y >= 0) {
                flag.buttom = true;
                if (flag.buttom && flag.right) {
                    angle = 45 + 180;
                }
                if (flag.buttom && flag.left) {
                    angle = 45 + 270;
                }
                if (flag.buttom && flag.right || flag.left) {
                    Boss.speed.x = parseInt(Math.abs(Math.cos(angle * Math.PI / 180) * Boss.speed.x))
                    Boss.speed.y = parseInt(Math.abs(Math.sin(angle * Math.PI / 180) * Boss.speed.y))
                }
                Boss.position.y -= Boss.speed.y;
            }
        }
        //Buttom Move
        if (Boss.position.y < chara.position.y) {
            if (Boss.position.y + Boss.speed.y <= canvas.height - boss.height) {
                flag.top = true;
                if (flag.top && flag.right) {
                    angle = 45;
                }
                if (flag.top && flag.left) {
                    angle = 45 + 90;
                }
                if (flag.top && flag.right || flag.left) {
                    Boss.speed.x = parseInt(Math.abs(Math.cos(angle * Math.PI / 180) * Boss.speed.x))
                    Boss.speed.y = parseInt(Math.abs(Math.sin(angle * Math.PI / 180) * Boss.speed.y))
                }
                Boss.position.y += Boss.speed.y;
            }
        }
    }
}

let BossShot = new Array(5);
for (let i = 0; i < 5; i++) {
    BossShot[i] = new Array(30);
    for (let j = 0; j < 30; j++) {
        BossShot[i][j] = new bossShot();
    }
}
function bossShot() {
    this.position = new Point();
    this.alive = false;
    this.speed;
}

bossShot.prototype.set = function (p, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.speed = speed;
    this.alive = true;
}
bossShot.prototype.move = function (i) {
    let diffusivity = 5
    if (i === 0) {
        this.position.x -= this.speed;
    }
    if (i === 1) {
        this.position.x -= this.speed;
        this.position.y += 5
    }
    if (i === 2) {
        this.position.x -= this.speed;
        this.position.y -= 5
    }
    if (i === 3) {
        this.position.x -= this.speed;
    }
    if (i === 4) {
        this.position.x -= this.speed;
    }
    if (this.position.x <= 0) {
        this.alive = false;
    }
}

let BossShotCenter = new Array(5);
for (let i = 0; i < 5; i++) {
    BossShotCenter[i] = new Array(30)
    for (let j = 0; j < 30; j++) {
        BossShotCenter[i][j] = new bossShotCenter();
    }
}

function bossShotCenter() {
    this.position = new Point();
}

bossShotCenter.prototype.process = function () {
    this.position.x = BossShot.position.x + boss.width / 2;
    this.position.y = BossShot.position.y + boss.heigth / 2;
}

function bossShotSet() {
    if (0 <= Boss.count &&
        Boss.count < 2000 &&
        Boss.alive) {
        Boss.count++;
    } else if (Boss.count >= 2000 &&
        Boss.alive) {
        Boss.count = 0;
    } else {
        Boss.count = -1;
    }
    BulletsPosition = {
        x: Boss.position.x,
        y: Boss.position.y + boss.height / 2 - enemyAmmo.height
    }
    if (Boss.count % 20 == 0) {
        for (let j = 0; j < 30; j++) {
            if (!BossShot[0][j].alive) {
                BossShot[0][j].set(BulletsPosition, 10, 0);
                break
            }
        }
    }
    if (Boss.count % 30 == 0) {
        for (let j = 0; j < 30; j++) {
            if (!BossShot[1][j].alive) {
                BossShot[1][j].set(BulletsPosition, 10);
                break
            }
        }
        for (let j = 0; j < 30; j++) {
            if (!BossShot[2][j].alive) {
                BossShot[2][j].set(BulletsPosition, 10);
                break
            }
        }
    }

    if (Boss.count % 50 == 0) {
        let addition = 50
        for (let j = 0; j < 30; j++) {
            if (!BossShot[3][j].alive) {
                let shotPoint = {
                    x: BulletsPosition.x,
                    y: BulletsPosition.y + addition
                }
                BossShot[3][j].set(shotPoint, 10);
                break
            }
        }
        for (let j = 0; j < 30; j++) {
            if (!BossShot[4][j].alive) {
                let shotPoint = {
                    x: BulletsPosition.x,
                    y: BulletsPosition.y - addition
                }
                BossShot[4][j].set(shotPoint, 10);
                break
            }
        }
    }
}

let BossBulletCenter = new Array(5);

for (let i = 0; i < 5; i++) {
    BossBulletCenter[i] = new Array(30);
    for (let j = 0; j < 30; j++) {
        BossBulletCenter[i][j] = new BossBullet();
    }
}

function BossBullet() {
    this.position = {
        x: 0,
        y: 0
    }
}

BossBullet.prototype.set = function (i, j) {
    this.position.x = BossShot[i][j].position.x + enemyAmmo.width / 2;
    this.position.y = BossShot[i][j].position.y + enemyAmmo.height / 2;
}