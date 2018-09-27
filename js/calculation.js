(function () {
    let value = 10;
    let angle;

    //charaとマウスとの差
    let deltax = Math.abs(Enemy.position.x - chacenter.position.x);
    let deltay = Math.abs(Enemy.position.x - chacenter.position.y);

    let flag = {
        top: false,
        buttom: false,
        right: false,
        left: false
    }

    //DeltaとValueに基づいて
    if (deltax < value) {
        chacenter.position.x = deltax;
    } else {
        Enemy.speed.x = value;
    }
    if (deltay < value) {
        Enemy.speed.y = deltay;
    } else {
        Enemy.speed.y = value;
    }

    //Right Move
    if (Enemy.position.x < chacenter.position.x) {
        if (chacenter.position.x + Enemy.speed.x <= canvas.width - enemye.width / 2) {
            flag.right = true;
            chara.position.x += Enemy.speed.x;
        }
    }
    //Left Move
    if (Enemy.position.x > chacenter.position.x) {
        if (chacenter.position.x - Enemy.speed.x >= 0 + enemy.width / 2) {
            flag.left = true;
            Enemy.position.x -= Enemy.speed.x;
        }
    }
    //Top Move
    if (Enemy.position.y < chacenter.position.y) {
        if (Enemy.position.y + Enemy.speedy <= canvas.height - enemy.height) {
            flag.top = true;
            if (flag.top && flag.right) {
                angle = 45;
            }
            if (flag.top && flag.left) {
                angle = 45 + 90;
            }
            if (flag.top && flag.right || flag.left) {
                chara.speed.x = parseInt(Math.abs(Math.cos(angle * Math.PI / 180) * Enemy.speed.x))
                chara.speed.y = parseInt(Math.abs(Math.sin(angle * Math.PI / 180) * Enemy.speed.y))
            }
            chara.position.y += Enemy.speed.y;
        }
    }
    //Buttom Move
    if (Enemy.position.y > chacenter.position.y) {
        if (Enemy.position.y - Enemy.speed.y >= 0) {
            flag.buttom = true;
            if (flag.buttom && flag.right) {
                angle = 45 + 180;
            }
            if (flag.buttom && flag.left) {
                angle = 45 + 270;
            }
            if (flag.buttom && flag.right || flag.left) {
                chara.speed.x = parseInt(Math.abs(Math.cos(angle * Math.PI / 180) * Enemy.speed.x))
                chara.speed.y = parseInt(Math.abs(Math.sin(angle * Math.PI / 180) * Enemy.speed.y))
            }
            chara.position.y -= Enemy.speed.y;
        }
    }
})