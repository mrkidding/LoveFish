let can1;
let can2;

let ctx1;
let ctx2;

let canWidth;
let canHeight;

let lastTime;
let deltaTime;

let bgPic = new Image();

let ane;
let fruit;
let mom;
let baby;

let mx;
let my;

let babyTail = [];
let babyEye = [];
let babyBody = [];

let momTail = [];
let momEye = [];
let momBodyOrange = [];
let momBodyBlue = [];

let data;
let wave;
let halo;

let dust;
let dustPic = [];

document.body.onload = game;
function game()
{
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init()
{
    can1 = document.getElementById("canvas1"); //fish, dust, UI, circle
    ctx1 = can1.getContext("2d");

    can2 = document.getElementById("canvas2"); //background, ane, fruits
    ctx2 = can2.getContext("2d");

    can1.addEventListener('mousemove', onMouseMove, false);
    can1.addEventListener('click', onMouseClick,false);
    bgPic.src = "./src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    for (let i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    for (let i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    for (let i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for (let i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }

    for (let i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }
    data = new dataObj();
    for (let i = 0; i < 8; i++){
        momBodyOrange[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for (let i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

}

function gameloop()
{
    window.requestAnimFrame(gameloop);
    let now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40) deltaTime = 40;
    drawBackground();
    ane.draw();

    fruitMonitor();
    fruit.draw();


    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();

    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e)
{
    if (!data.gameOver) {
        if (e.offsetX || e.layerX) {
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }
}

function onMouseClick()
{
    if (data.gameOver){
        location.reload();
    }
}