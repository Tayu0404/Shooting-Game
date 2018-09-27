function alive() {
    //character
    if (charaInfo.alive) {
        characterShots();
        charaCenter();
        mouseMove();
        charaammoCenter();
    }

    for (icount = 0; icount < charaiMax; icount++) {
        for (jcount = 0; jcount < charajMax; jcount++) {
            // 自機ショットが既に発射されているかチェック
            if (charactershot[icount][jcount].alive) {
                // 自機ショットを動かす
                for (let i = 0; i < 4; i++) {
                    charatrigonometric(icount, jcount, i)
                    charaBosstrigonometric(icount, jcount)
                }
                charactershot[icount][jcount].move(icount);
                ctx.drawImage(ammo, charactershot[icount][jcount].position.x, charactershot[icount][jcount].position.y);
            }
        }
    }

    //enemy
    for (enemyCounti = 0; enemyCounti < 4; enemyCounti++) {
        if (Enemy[enemyCounti].enemyInfo.alive) {
            Enemy[enemyCounti].move(enemyCounti);
            enemyShots(enemyCounti);
            eneammoCenter();
            enemyCenter();
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < enemyiMax; j++) {
            for (let k = 0; k < enemyjMax; k++) {
                if (Enemy[i].shots[j][k].alive) {
                    // 自機ショットを動かす
                    enemytrigonometric(i, j, k)
                    Enemy[i].shots[j][k].move(j);
                    ctx.drawImage(enemyAmmo, Enemy[i].shots[j][k].position.x, Enemy[i].shots[j][k].position.y);
                }
            }
        }
    }

    //Boss
    if (Boss.alive) {
        Boss.move();
        bossShotSet();
        BossCenter.set();
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 30; j++) {
                if (BossShot[i][j].alive) {
                    bossAtackTrigonometric(i, j);
                    BossShot[i][j].move(i);
                    BossBulletCenter[i][j].set(i, j);
                    ctx.drawImage(enemyAmmo, BossShot[i][j].position.x, BossShot[i][j].position.y)
                }
            }
        }
    }

    if (Recovery.alive) {
        HeartTrigonometric()
        ctx.drawImage(Heart, Recovery.position.x, Recovery.position.y)
    }
    if (!Recovery.alive) {
        Recovery.count++;
        if (Recovery.count / 60 > 10) {
            recoverySet()
            Recovery.count = 0
        }
    }
}