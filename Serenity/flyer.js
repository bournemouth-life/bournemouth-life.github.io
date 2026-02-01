let canvas_cup = null;
let canvas_cake1 = null;
let canvas_cake2 = null;
let canvas_prayer = null;

function draw(images) {
  // 1819 x 2551 pixels to accommodate trim
  const w = 1819;
  const h = 2551;
  const canvas_front = createCanvas(w, h);
  const canvas_back = createCanvas(w, h);
  const ctx_front = canvas_front.getContext("2d");
  const ctx_back = canvas_back.getContext("2d");
  drawLogo(ctx_front, ctx_back, images.logo.img);
  ctx_front.drawImage(canvas_cup, 100, 600, 100, 100);
  ctx_front.drawImage(canvas_cake1, 300, 600, 100, 100);
  ctx_front.drawImage(canvas_cake2, 500, 600, 100, 100);
}

function drawLogo(ctx_front, ctx_back, img) {
  // Background
  const w = 1819;
  const h = 2551;
  ctx_front.drawImage(img, 100, 100, 100, 100, 0, 0, w, h);
  ctx_back.drawImage(img, 100, 100, 100, 100, 0, 0, w, h);

  // Logo
  const dx = (w-1080)/2;
  ctx_front.drawImage(img, 0, 0, 1079, 540, dx, 0, 1079, 540);
  ctx_front.drawImage(img, 163, 480, 24, 30, dx + 1027, 478, 24, 30); // Fix 'B' from 'R'
  ctx_front.drawImage(img, 163, 480, 24, 30, dx + 1029, 502, 24, 30); // Fix 'B' from 'R'
}

function fixCake1(img) {
  canvas_cake1 = createCanvasFromImage(img);

  // Make unwanted bits black.
  const ctx = canvas_cake1.getContext("2d");
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillRect(350, 50, 100, 100);
  ctx.fillRect(360, 150, 100, 100);
  ctx.fillRect(370, 200, 100, 100);
  ctx.fillRect(400, 250, 100, 100);
  ctx.fillRect(425, 275, 100, 100);
  ctx.fillRect(450, 0, 450, 600);

  removeDarkBackground(canvas_cake1, 128);
}

function fixCake2(img) {
  canvas_cake2 = createCanvasFromImage(img);

  // Make unwanted bits black.
  const ctx = canvas_cake2.getContext("2d");
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 370, 620);
  ctx.fillRect(310, 340, 100, 100);
  ctx.fillRect(335, 360, 100, 100);
  ctx.fillRect(335, 390, 400, 300);
  ctx.fillRect(650, 360, 250, 300);

  removeDarkBackground(canvas_cake2, 128);
}

function fixCup(img) {
  canvas_cup = createCanvasFromImage(img);
  removeDarkBackground(canvas_cup, 92);
}

function fixGod() {
  const h = 290;
  const w = 550;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(canvas_prayer, 200, 0, w, h, 0, 0, w, h);
  toBW(canvas, 150);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(430, 36);
  ctx.bezierCurveTo(442, 24, 488, 18, 500, 30);
  ctx.stroke();

  ctx.fillStyle = '#000000';
  ctx.fillRect(325,178,225,112);
}

function fixPrayer(img) {
  const w = 1500;
  const h = 750;
  canvas_prayer = createCanvas(w,h);

  const ctx = canvas_prayer.getContext("2d");
  const scale = 2.3;
  const sw = scale * w;
  const sh = scale * h;
  ctx.drawImage(img, 400, 700, sw, sh, 0, 0, w, h);

  //fixGod();
  fixSerenity();
}

function fixSerenity() {
  const h = 240;
  const w = 500;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(canvas_prayer, 960, 100, w, h, 0, 0, w, h);
  toBW(canvas, 128);

  ctx.strokeStyle = '#0000ff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(227, 186);
  ctx.bezierCurveTo(215, 210, 268, 245, 298, 215);
  ctx.stroke();
}
