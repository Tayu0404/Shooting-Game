(() => {
    Enemy[0].set(100)
    Enemy[1].set(100)
    Enemy[2].set(100)
})();

function secondStep() {
    let position = {
        x: canvas.width / 3 * 2,
        y: canvas.height / 2
    }
    if (!Enemy[0].enemyInfo.alive &&
        !Enemy[1].enemyInfo.alive &&
        !Enemy[2].enemyInfo.alive) {
        Boss.set(position, 500,5)
    }
}