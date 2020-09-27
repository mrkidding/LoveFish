let dustObj = function ()
{
    this.x = [];
    this.y = [];
    this.amp = [];
    this.No = [];

    this.alpha;
}
dustObj.prototype.num = 50;
dustObj.prototype.init = function()
{
    for (let i = 0; i < this.num; i++){
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = 20 + Math.random() * 25;
        this.No[i] = Math.floor(Math.random() * 7);
    }
    this.alpha = 0;
}
dustObj.prototype.draw = function()
{
    this.alpha += deltaTime * 0.0008;
    let l = Math.sin(this.alpha);
    for (let i = 0; i < this.num; i++){
        let no = this.No[i];
        ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
    }
}