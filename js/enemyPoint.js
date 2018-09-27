function enemyPoint() {
    let testPositon = {
        x: 300,
        y: 600
    }
    for (enemyCounti = 0; enemyCounti < 4; enemyCounti++) {
        switch (enemyCounti) {
            case 0:
                Enemy[enemyCounti][enemyCountj].set(testPositon, 100)
                break
            case 1:
                Enemy[enemyCounti][enemyCountj].set(testPositon, 100)
                break
            case 2:
                Enemy[enemyCounti][enemyCountj].set(testPositon, 100)
                break
            case 3:
                Enemy[enemyCounti][enemyCountj].set(testPositon, 100)
                break
            case 4:
                Enemy[enemyCounti][enemyCountj].set(testPositon, 100)
                break
        }
    }
}