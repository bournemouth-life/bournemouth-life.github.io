let canvas_cup = null;
let canvas_cake1 = null;

function draw(images) {
  // 1819 x 2551 pixels to accommodate trim
  const w = 1819;
  const h = 2551;
  const canvas_front = createCanvas(w, h);
  const canvas_back = createCanvas(w, h);
  const ctx_front = canvas_front.getContext("2d");
  const ctx_back = canvas_back.getContext("2d");
  drawLogo(ctx_front, ctx_back, images.logo.img);
  ctx_front.drawImage(canvas_cup, 100, 200, 100, 100);
  ctx_front.drawImage(canvas_cake1, 200, 500, 100, 100);
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
  removeDarkBackground(canvas_cake1, 128);
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
