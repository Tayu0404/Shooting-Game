function Character() {
    this.position = new Point();
    this.speed = new Point();
}

function characterShot() {
    this.position = new Point();
    this.speed = 0;
    this.alive = false;
}

characterShot.prototype.set = function (p, speed, count) {
    // 座標をセット
    if (count == 0) {
        this.position.x = p.x;
        this.position.y = p.y;
    }
    if (count == 1) {
        this.position.x = p.x;
        this.position.y = p.y + 50;
    }
    if (count == 2) {
        this.position.x = p.x;
        this.position.y = p.y - 50;
    }

    // サイズ、スピードをセット
    this.speed = speed;

    // 生存フラグを立てる
    this.alive = true;
};

characterShot.prototype.move = function () {
    this.position.x += this.speed;
    if (this.position.x >= canvas.width) {
        this.alive = false;
    }
};

let charactershot = new Array(3);
let charaiMax = 3;
let charajMax = 30;
for (icount = 0; icount < charaiMax; icount++) {
    charactershot[icount] = new Array(charajMax);
    for (jcount = 0; jcount < charajMax; jcount++) {
        charactershot[icount][jcount] = new characterShot();
    }
}

let characterShotcount = 0;
let charaBulletsPosition = {
    x: 0,
    y: 0,
}

function characterShots() {
    if (0 <= characterShotcount &&
        characterShotcount < 2000 &&
        charaInfo.alive) {
        characterShotcount++;
    } else if (characterShotcount >= 2000 &&
        charaInfo.alive) {
        characterShotcount = 0;
    } else {
        characterShotcount = -1;
    }
    charaBulletsPosition.x = chara.position.x + me.width;
    charaBulletsPosition.y = chara.position.y + me.height / 2 - ammo.height / 2;
    if (characterShotcount % 20 == 0) {
        for (jcount = 0; jcount < charajMax; jcount++) {
            if (!charactershot[0][jcount].alive) {
                charactershot[0][jcount].set(charaBulletsPosition, 10, 0);
                break
            }
        }
    }
    if (characterShotcount % 30 == 0) {
        for (icount = 0; icount < charaiMax; icount++) {
            for (jcount = 0; jcount < charajMax; jcount++) {
                if (icount == 1) {
                    if (!charactershot[1][jcount].alive) {
                        charactershot[icount][jcount].set(charaBulletsPosition, 10, 1);
                        break
                    }
                }
                if (icount == 2) {
                    if (!charactershot[2][jcount].alive) {
                        charactershot[icount][jcount].set(charaBulletsPosition, 10, 2);
                        break
                    }
                }
            }
        }
    }
}

function charabullet() {
    this.position = new Point();
}

let chabullet = new Array(3);
for (icount = 0; icount < charaiMax; icount++) {
    chabullet[icount] = new Array(charajMax);
    for (jcount = 0; jcount < charajMax; jcount++) {
        chabullet[icount][jcount] = new charabullet();
    }
}
function charaammoCenter() {
    for (icount = 0; icount < charaiMax; icount++) {
        for (jcount = 0; jcount < charajMax; jcount++) {
            if (charactershot[icount][jcount].alive) {

                chabullet[icount][jcount].position.x = charactershot[icount][jcount].position.x + ammo.width / 2;
                chabullet[icount][jcount].position.y = charactershot[icount][jcount].position.y + ammo.height / 2;
            }
        }
    }
}