function createCanvas(w,h) {
  let canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas.getContext("2d");
}

function createCanvasFromImage(img) {
  let ctx = createCanvas(img.width, img.height);
  ctx.drawImage(img, 0, 0);
  return ctx;
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

function removeDarkBackground(ctx, threshold) {
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