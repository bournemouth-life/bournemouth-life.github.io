

function fixCup(img) {
  let ctx = createCanvasFromImage(img);
  removeDarkBackground(ctx, 128);
}

function loadImages(callback) {
  let images = {logo: {fn: 'images/Logo.jpg'}, cup: {fn: 'images/cup.png'}};
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
