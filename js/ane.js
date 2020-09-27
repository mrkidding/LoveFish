let aneObj = function()
{
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
    this.endy = []
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function()
{
    for(let i = 0; i < this.num; i++){
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.endy[i] = canHeight - 250 + Math.random() * 80;
        this.heady[i] = this.endy[i];
        this.amp[i] = Math.random() * 50 + 50;
    }
}
aneObj.prototype.draw = function()
{
    this.alpha += deltaTime * 0.0008;
    let l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(let i = 0; i < this.num; i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        this.heady[i] = this.endy[i] + this.amp[i] * Math.abs(l) * 0.2;
        ctx2.quadraticCurveTo(this.rootx[i], this.heady[i] * 1.2, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
