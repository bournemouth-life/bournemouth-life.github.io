let canvas_cup = null;
let canvas_cake1 = null;
let canvas_cake2 = null;

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

function loadImages(callback) {
  let images = {logo: {fn: 'images/Logo.jpg'}, cup: {fn: 'images/cup.png'}, cakes: {fn: 'images/cakes.png'}};
  let cnt = 0;
  for (let i in images) {
    cnt++;
    let obj = images[i];
    loadImage(obj.fn, (img) => {
      obj.img = img;
      cnt--;
      if (cnt==0) callback(images);
    });
  }
}
