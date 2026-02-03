let canvas_cup = null;
let canvas_cake1 = null;
let canvas_cake2 = null;
let canvas_prayer = null;

let ctx_front = null;
let ctx_back = null;

let dot_width = 0;

function calcDotWidth(ctx) {
  dot_width = ctx.measureText('....').width - ctx.measureText('...').width;
}

function draw(images) {
  // 1819 x 2551 pixels to accommodate trim
  const w = 1819;
  const h = 2551;
  const canvas_front = createCanvas(w, h);
  const canvas_back = createCanvas(w, h);
  ctx_front = canvas_front.getContext("2d");
  ctx_back = canvas_back.getContext("2d");
  drawLogo(ctx_front, ctx_back, images.logo.img);
  ctx_front.drawImage(canvas_cup, 800, 600, 300, 300);
  ctx_back.drawImage(canvas_cake1, 650, 2150, 300, 300);
  ctx_back.drawImage(canvas_cake2, 950, 2250, 300, 300);

  ctx_back.drawImage(images.prayer.img, 160, 100);

  // BINF footer.
  ctx_back.fillStyle = '#ffff80'; // Yellow
  ctx_back.fillRect(0, h-340, w, 340);
  ctx_back.drawImage(images.binf.img, 1225, h-330, 600, 300);
  ctx_back.font = "36px serif";
  ctx_back.fillStyle = "black";
  ctx_back.fillText("Sponsored by Bournemouth International Neurodiverse Friends", 100, 2300);
  ctx_back.fillText("https://www.bournemouth.life", 100, 2500);
  ctx_back.font = "30px serif";
  ctx_back.fillText("Mental Health in Academia", 150, 2350);
  ctx_back.fillText("Homestay Accommodation", 150, 2380);
  ctx_back.fillText("Autism & Neurodiversity Awareness", 150, 2410);
  ctx_back.fillText("English Conversation Groups", 150, 2440);
}

function drawItem(ctx, x, y, name, price, desc) {
  ctx.textAlign = "left";
  ctx.fillText(name, x, y);
  let wn = ctx.measureText(name).width;
  let wp = ctx.measureText(price).width;
  if (desc) {
    y = y + 40;
    ctx.font = "36px serif"
    ctx.fillText(desc, x + 40, y);
    wn = ctx.measureText(desc).width + 40;
    ctx.font = "48px serif"
  }
  const width = wn + wp;
  const n = Math.floor((1500 - width - 40) / dot_width);
  let dots = "...........";
  dots = dots + dots + dots + dots + dots + dots + dots + dots + dots;
  dots = dots + dots;
  ctx.textAlign = "right";
  ctx.fillText(dots.substr(-n), x + 1500 - wp - 20, y);
  ctx.textAlign = "right";
  ctx.fillText(price, x+1500, y);
  return y + 50;
}

function drawList(ctx, list, x, y) {
  ctx.textAlign = "left";
  ctx.font = "60px serif";
  ctx.fillStyle = "yellow";
  ctx.fillText(list.title.toUpperCase(), x, y);
  ctx.textAlign = "left";
  ctx.font = "48px serif";
  ctx.fillStyle = "white";
  if (dot_width == 0) calcDotWidth(ctx);
  y = y + 62;
  for (let i=0; i<list.items.length; i++) {
    const item = list.items[i];
    y = drawItem(ctx, x, y, item.name, item.price, item.desc);
  }
}

function drawLists(lists) {
  drawList(ctx_front, lists[0], 150, 800); // Hot drinks.
  drawList(ctx_front, lists[1], 150, 1850); // Hot food.
  drawList(ctx_back, lists[2], 150, 2350); // Cold food.
  drawList(ctx_back, lists[3], 150, 100);
  drawList(ctx_back, lists[4], 150, 500);
  drawList(ctx_back, lists[5], 150, 900);
  drawList(ctx_back, lists[6], 150, 1300);
  drawList(ctx_back, lists[7], 150, 1700);
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

function fix500(img, x, y, scale) {
  const w = 500;
  const h = 500;
  const canvas = createCanvas(w,h);

  let ctx = canvas.getContext("2d");
  const sw = w / scale;
  const sh = h / scale;;
  ctx.drawImage(img, x, y, sw, sh, 0, 0, w, h);
  removeDarkBackground(canvas, 48);

  return canvas;
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

function fixCourage() {
  const x = 180;
  const y = 380;
  const h = 200;
  const w = 400;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(canvas_prayer, x, y, w, h, 0, 0, w, h);
  toBW(canvas, 220);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0,0,25,100);
  ctx.fillRect(335,18,20,20);
  ctx.fillRect(345,18,55,100);
  ctx.fillRect(300,100,100,100);

  removeDarkBackground(canvas, 128);

  return {canvas, x, y};
}

function fixCup(img) {
  canvas_cup = createCanvasFromImage(img);
  removeDarkBackground(canvas_cup, 92);
}

function fixGod() {
  const x = 200;
  const y = 0;
  const h = 290;
  const w = 550;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(canvas_prayer, x, y, w, h, 0, 0, w, h);
  toBW(canvas, 150);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(430, 36);
  ctx.bezierCurveTo(442, 24, 488, 18, 500, 30);
  ctx.stroke();

  ctx.fillStyle = '#000000';
  ctx.fillRect(325,178,225,112);

  removeDarkBackground(canvas, 128);

  return {canvas, x, y};
}

function fixImages(images) {
  const canvas = createCanvasFromImage(images.prayer.img);
  removeDarkBackground(canvas, 92);
  //clampAlpha(canvas,0,64);
  scaleBrightness(canvas, 0.25);
  images.prayer.img = canvas;
}

function fixPrayer(img) {
  const w = 1500;
  const h = 750;
  canvas_prayer = createCanvas(w,h);

  let ctx = canvas_prayer.getContext("2d");
  const scale = 2.3;
  const sw = scale * w;
  const sh = scale * h;
  ctx.drawImage(img, 400, 700, sw, sh, 0, 0, w, h);

  const god = fixGod();
  const serenity = fixSerenity();
  const courage = fixCourage();
  const wisdom = fixWisdom();

  const canvas = createCanvas(w,h);
  ctx = canvas.getContext("2d");
  ctx.drawImage(god.canvas, god.x, god.y);
  ctx.drawImage(serenity.canvas, serenity.x, serenity.y);
  ctx.drawImage(courage.canvas, courage.x, courage.y);
  ctx.drawImage(wisdom.canvas, wisdom.x, wisdom.y);

  return canvas;
}


function fixSerenity() {
  const x = 960;
  const y = 100;
  const h = 240;
  const w = 500;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(canvas_prayer, x, y, w, h, 0, 0, w, h);
  toBW(canvas, 128);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0,190,295,50);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(227, 186);
  ctx.bezierCurveTo(216, 211, 267, 246, 298, 215);
  ctx.stroke();

  removeDarkBackground(canvas, 128);

  return {canvas, x, y};
}

function fixWisdom() {
  const x = 780;
  const y = 420;
  const h = 200;
  const w = 400;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(canvas_prayer, x, y, w, h, 0, 0, w, h);
  toBW(canvas, 195);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0,0,w,50);
  ctx.fillRect(330,0,70,h);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(198, 90);
  ctx.bezierCurveTo(300, -100, 420, 90, 195, 91);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(196, 88);
  ctx.bezierCurveTo(298, -102, 418, 88, 193, 89);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(325, 140);
  ctx.bezierCurveTo(348, 130, 383, 140, 365, 155);
  ctx.stroke();

  removeDarkBackground(canvas, 128);

  return {canvas, x, y};
}

function prayerText(canvas) {
  ctx = canvas.getContext("2d");
  ctx.fillStyle = '#ffffff';
  ctx.font = '59px serif';

  function text(ctx, str, x, y) {
    ctx.fillText(str, x,     y    );
    ctx.fillText(str, x + 2, y    );
    ctx.fillText(str, x,     y - 1);
    ctx.fillText(str, x + 2, y - 1);
  }

  text(ctx, 'GRANT ME THE', 525, 220);
  text(ctx, 'TO ACCEPT THE THINGS', 15, 335);
  text(ctx, 'CANNOT CHANGE,', 747, 335);
  text(ctx, 'THE', 85, 450);
  text(ctx, 'TO CHANGE THE THINGS', 515, 450);
  text(ctx, 'CAN,', 1268, 450);
  text(ctx, 'AND THE', 520, 575);
  text(ctx, 'TO KNOW', 1122, 575);
  text(ctx, 'THE DIFFERENCE', 745, 680);

  ctx.font = '88px serif';
  text(ctx, 'I', 707, 335);
  text(ctx, 'I', 1228, 450);
}
