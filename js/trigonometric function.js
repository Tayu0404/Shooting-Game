function charatrigonometric(i, j, k) {
    if (Enemy[k].enemyInfo.alive) {
        let xlength = enecenter[k].position.x - chabullet[i][j].position.x;
        let ylength = enecenter[k].position.y - chabullet[i][j].position.y;
        let radiusEnemy = enemy.height / 2;
        let radiusAmmo = ammo.height / 2
        let radius = radiusEnemy + radiusAmmo;

        if ((xlength) * (xlength) + (ylength) * (ylength) <= (radius) * (radius)) {
            charactershot[i][j].alive = false;
            Enemy[k].hp -= charaInfo.atack;
            if (Enemy[k].hp < 0) {
                Enemy[k].enemyInfo.alive = false;
                secondStep()
            }
        }
    }
}

function charaBosstrigonometric(i, j) {
    if (Boss.alive) {
        let xlength = BossCenter.position.x - chabullet[i][j].position.x;
        let ylength = BossCenter.position.y - chabullet[i][j].position.y;
        let radiusBoss = boss.height / 2;
        let radiusAmmo = ammo.height / 2;
        let radius = radiusBoss + radiusAmmo;
        if ((xlength) * (xlength) + (ylength) * (ylength) <= (radius) * (radius)) {
            charactershot[i][j].alive = false;
            Boss.hp -= charaInfo.atack;
            if (Boss.hp < 0) {
                Boss.alive = false;
            }
        }
    }
}


function enemytrigonometric(i, j, k) {
    if (charaInfo.alive) {
        let xlength = chacenter.position.x - enebullet[i][j][k].position.x;
        let ylength = chacenter.position.y - enebullet[i][j][k].position.y;
        let radiusChara = me.height / 4;
        let radiusAmmo = enemyAmmo.height / 2
        let radius = radiusChara + radiusAmmo;
        if ((xlength) * (xlength) + (ylength) * (ylength) <= (radius) * (radius)) {
            Enemy[i].shots[j][k].alive = false;
            charaInfo.hp -= Enemy[i].enemyInfo.atack;
            if (charaInfo.hp < 0) {
                charaInfo.alive = false;
            }
        }
    }
}

//Boss
function bossAtackTrigonometric(i, j) {
    if (charaInfo.alive) {
        let xlength = chacenter.position.x - BossBulletCenter[i][j].position.x;
        let ylength = chacenter.position.y - BossBulletCenter[i][j].position.y;
        let radiusChara = me.height / 4;
        let radiusAmmo = enemyAmmo.height / 2;
        let radius = radiusChara + radiusAmmo;
        if ((xlength) * (xlength) + (ylength) * (ylength) <= (radius) * (radius)) {
            BossShot[i][j].alive = false;
            charaInfo.hp -= Boss.atack;
            if (charaInfo.hp < 0) {
                charaInfo.alive = false;
            }
        }
    }
}

//Heart
function HeartTrigonometric() {
    let RecoveryCenter = {
        x: Recovery.position.x + Heart.width / 2,
        y: Recovery.position.y + Heart.height / 2
    }
    let xlength = chacenter.position.x - RecoveryCenter.x;
    let ylength = chacenter.position.y - RecoveryCenter.y;
    let radiusChara = me.height / 2;
    let radiusHeart = Heart.height / 2;
    let radius = radiusChara + radiusHeart;
    if ((xlength) * (xlength) + (ylength) * (ylength) <= (radius) * (radius)) {
        Recovery.alive = false;
        if (charaInfo.hp + Recovery.hp < 100) {
            charaInfo.hp += Recovery.hp;
        }
        if (charaInfo.hp + Recovery.hp >= 100) {
            charaInfo.hp += (100 - charaInfo.hp);
        }
    }
}