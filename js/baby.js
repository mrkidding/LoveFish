let babyObj = function()
{
    this.x;
    this.y;
    this.angle;

    this.babyBody = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}

babyObj.prototype.init = function()
{
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;

    this.babyBody.src = "./src/babyFade0.png";
}

babyObj.prototype.draw = function()
{
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);

    let deltaY = mom.y - this.y;
    let deltaX = mom.x - this.x;
    let beta = Math.atan2(deltaY,deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);

    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 60)
    {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 60;
    }

    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;

        if (this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }else {
            this.babyEyeInterval = 200;
        }
    }

    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 500){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 500;
        if (this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            data.gameOver = true;
        }

    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    let babyTailCount = this.babyTailCount;
    let babyTailPic = babyTail[babyTailCount];
    let babyEyePic = babyEye[this.babyEyeCount];
    let babyBodyPic = babyBody[this.babyBodyCount];

    ctx1.drawImage(babyTailPic, -babyTailPic.width * 0.5 + 25, -babyTailPic.height * 0.45);
    ctx1.drawImage(babyBodyPic, -babyBodyPic.width * 0.5, -babyBodyPic.width * 0.5);
    ctx1.drawImage(babyEyePic, -babyEyePic.width * 0.5, -babyEyePic.height * 0.25);
    ctx1.restore();
}