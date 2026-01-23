function Fixer(canvas) {
  this.ctx = canvas.getContext("2d");
}

Fixer.prototype.fix = function() {
  
  let rect = this.search();
  let x = rect[0] - 10;
  let y = rect[1] - 20;
  let w = rect[2] + 20;
  let h = rect[3] + 40;
  const ctx = this.ctx;
  const imgd = ctx.getImageData(x, y, w, h);
  const pix = imgd.data;

  function filter(i) {
    i=i+16; // 4 pixels to right.
    let dx = 8; // 8 pixel span.
    let leftR = pix[i-dx*4];
    let gradR = (pix[i]-leftR) / dx;
    let leftG = pix[i-dx*4+1];
    let gradG = (pix[i+1]-leftG) / dx;
    let leftB = pix[i-dx*4+2];
    let gradB = (pix[i+2]-leftB) / dx;
    let leftA = pix[i-dx*4+3];
    let gradA = (pix[i+3]-leftA) / dx;
    for (let n = 1; n <= dx; n++) {
      pix[i-(dx-n)*4] = leftR + n*gradR;
      pix[i-(dx-n)*4+1] = leftG + n*gradG;
      pix[i-(dx-n)*4+2] = leftB + n*gradB;
      pix[i-(dx-n)*4+3] = leftA + n*gradA;
    }
  }

  let greys = this.findGreys(pix);
  let y_prev = 0;
  for (let n = 0; n < greys.length; n++) {
    let i = greys[n];
    let x = (i/4) % w;
    let y = ((i/4) - x) / w;

    // Apply filter only once for each row.
    if (y > y_prev){
      if ((x > 5) && (x < (w-5))) filter(i);
      y_prev = y;
    }
  }

  ctx.putImageData(imgd, x, y);
};

Fixer.prototype.findGreys = function(pix) {
  let greys = [];
  for (let i = 0; i < pix.length; i += 4) {
    let max = pix[i];
    if (pix[i+1] > max) max = pix[i+1];
    if (pix[i+2] > max) max = pix[i+2];
    let min = pix[i];
    if (pix[i+1] < min) min = pix[i+1];
    if (pix[i+2] < min) min = pix[i+2];
    if ((min>10 || max<245) && (pix[i+3] > 128)) {
      greys.push(i);
    }
  }
  return greys;
};

Fixer.prototype.group = function(x,y) {
  // Find closest group
  let min = 100;
  let closest = 0;
  for (let n = 0; n < this.groups.length; n++) {
    let g = this.groups[n];
    let dx = x - g.x;
    let dy = y - g.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < min) {
      min = dist;
      closest = n;
    }
  }

  if (min > 5) {
    // Create new group.
    let g={x, y, points: []};
    g.points.push([x,y]);
    this.groups.push(g);
  } else {
    // Add to existing group.
    let g = this.groups[closest];
    g.x = x;
    g.y = y;
    g.points.push([x,y]);
  }
};

Fixer.prototype.histMean = function(x) {
  let min = x[0];
  let max = x[0];
  let N = Math.floor(Math.sqrt(x.length));
  let hist = [];
  for (let n = 0; n < N; n++) hist.push([]);
  for (let n = 0; n < x.length; n++) {
    let v = x[n];
    if (v > max) max = v;
    if (v < min) min = v;
  }
  const scale = N/(max-min);
  for (let n = 0; n < x.length; n++) {
    let v = x[n];
    let bin = (v-min)*scale;
    if (bin<0) bin = 0;
    else if (bin>=N) bin = N - 1;
    else bin = Math.floor(bin);
    hist[bin].push(v);
  }

  max = 0;
  for (let n = 0; n < N; n++) if (hist[n].length > max) max = hist[n].length;
  let sum = 0;
  let cnt = 0;
  const threshold = 0.5 * max;
  for (let n = 0; n < N; n++) {
    // Calculate average from bins that exceed threshold.
    if (hist[n].length > threshold) {
      for (let i = 0; i < hist[n].length; i++) sum += hist[n][i];
      cnt += hist[n].length;
    }
  }
  return sum / cnt;
}

Fixer.prototype.mean = function(pix) {
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;
  let sumA = 0;
  for (let i = 0; i < pix.length; i+=4) {
    sumR += pix[i];
    sumG += pix[i+1];
    sumB += pix[i+2];
    sumA += pix[i+3];
  }

  const l = pix.length/4;
  return [sumR/l, sumG/l, sumB/l, sumA/l];
};

Fixer.prototype.search = function() {
  this.groups = [];
  const w = this.ctx.canvas.width;
  const h = this.ctx.canvas.height;

  // Image is searched by breaking it into smaller cells and searching these.
  const cw = 100;
  const ch = 100;
  const num_x = Math.floor(w/cw);
  const num_y = Math.floor(h/ch);

  let greys = [];
  for (let cy = 0; cy<num_y; cy++){
    for (let cx = 0; cx<num_x; cx++){
      const imgd = this.ctx.getImageData(cx*cw, cy*ch, cw, ch);
      const pix = imgd.data;
      const mean = this.mean(pix)
      console.log(mean[3]);
      if(mean[3]>150) {
        let cgreys = this.findGreys(pix);
        for (let n = 0; n < cgreys.length; n++) {
          const i = cgreys[n];
          let x = (i/4) % cw;
          let y = ((i/4)-x) / cw;
          this.group(cx*cw+x, cy*ch+y);
          greys.push([cx*cw+x, cy*ch+y]);
        }
      }
    }
  }

  // Get group with most points.
  let max = 0;
  let biggest = 0;
  for (let n = 0; n < this.groups.length; n++) {
    let np = this.groups[n].points.length;
    if (np > max) {
      max = np;
      biggest = n;
    }
  }

  // Get bounding rectangle of biggest group.
  let points = this.groups[biggest].points;
  let x_min = 10000;
  let x_max = 0;
  let y_min = 10000;
  let y_max = 0;
  for (let n = 0; n < points.length; n++) {
    if (points[n][0] < x_min) x_min = points[n][0];
    if (points[n][0] > x_max) x_max = points[n][0];
    if (points[n][1] < y_min) y_min = points[n][1];
    if (points[n][1] > y_max) y_max = points[n][1];
  }

  return [x_min, y_min, x_max - x_min, y_max-y_min]
};
