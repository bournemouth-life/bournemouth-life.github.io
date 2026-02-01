function createCanvas(w,h) {
  let canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas;
}

function createCanvasFromImage(img) {
  let canvas = createCanvas(img.width, img.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return canvas;
}

function loadImage(fn, callback) {
  let div = document.createElement('div');
  div.style = "display:none;";
  let img = document.createElement('img');
  img.addEventListener("load", (e) => {
    if (callback) callback(img);
  });
  img.src = fn;
  document.body.appendChild(div);
  div.appendChild(img);
}

function loadImages(images, callback) {
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

function removeDarkBackground(canvas, threshold) {
  const ctx = canvas.getContext("2d");
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const imgd = ctx.getImageData(0, 0, w, h);
  const pix = imgd.data;

  for (let i = 0; i < pix.length; i+=4) {
    let gs = (pix[i] + pix[i+1] + pix[i+2]) / 3;
    if (gs <= threshold) pix[i+3] = 0;
  }

  ctx.putImageData(imgd, 0, 0);
}

function toBW(canvas, threshold) {
  const ctx = canvas.getContext("2d");
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const imgd = ctx.getImageData(0, 0, w, h);
  const pix = imgd.data;

  for (let i = 0; i < pix.length; i+=4) {
    let gs = (pix[i] + pix[i+1] + pix[i+2]) / 3;
    if (gs <= threshold) {
      pix[i] = 0; pix[i+1] = 0; pix[i+2] = 0;
    } else {
      pix[i] = 255; pix[i+1] = 255; pix[i+2] = 255;
    }
  }

  ctx.putImageData(imgd, 0, 0);
}