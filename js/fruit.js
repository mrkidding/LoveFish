let fruitObj = function()
{
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNo = [];
    this.l = [];
    this.spd = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
    for(let i = 0; i < this.num; i++){
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.007 + 0.003;
        this.born(i);
        this.alive[i] = false;
        this.fruitType[i] = "";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";

}
fruitObj.prototype.draw =function()
{
    for(let i = 0; i < this.num; i++){
        if (this.alive[i]) {
            let pic;
            if (this.fruitType[i] === "blue") {
                pic = this.blue;
            }else{
                pic = this.orange;
            }
            if (this.l[i] <= 14) {
                this.x[i] = ane.headx[this.aneNo[i]];
                this.y[i] = ane.heady[this.aneNo[i]];
                this.l[i] += this.spd[i] * deltaTime;
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime;
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }
}

fruitObj.prototype.born = function(i)
{
    this.aneNo[i] = Math.floor(Math.random() * ane.num);
    this.x[i] = ane.headx[this.aneNo[i]];
    this.y[i] = ane.heady[this.aneNo[i]];
    this.l[i] = 0;
    this.alive[i] = true;
    let ran = Math.random();

    if (ran < 0.3){
        this.fruitType[i] = "blue";
    }else{
        this.fruitType[i] = "orange";
    }

}

fruitObj.prototype.dead = function(i)
{
    this.alive[i] = false;
}

function fruitMonitor()
{
    let num = 0;
    for (let i = 0; i < fruit.num; i++){
        if (fruit.alive[i]) num++;
    }
    if (num < 15){
        sendFruit();
    }
}
function sendFruit(){
    for (let i = 0; i < fruit.num; i++){
        if (!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
