function recovery() {
    this.position = new Point();
    this.alive = false;
    this.hp = 10;
    this.count = 0;
}
recovery.prototype.set = function (x, y) {
    this.position.x = x;
    this.position.y = y;
}

function recoverySet() {
    if (!Recovery.alive) {
        let i = Math.random();
        if (i < 0.4) {
            let xmax = SCREEN_WIDTH;
            let ymax = SCREEN_HEIGHT;
            let x = Math.floor(Math.random() * (xmax + 1 ));
            let y = Math.floor(Math.random() * (ymax + 1 ));
            Recovery.set(x, y);
            Recovery.alive = true
        }
    }
}