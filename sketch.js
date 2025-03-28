let seaweeds = []; // 儲存水草的資料
let colors = [
  [211, 248, 226, 150], // #D3F8E2，加入透明度 150
  [228, 193, 249, 150], // #E4C1F9，加入透明度 150
  [246, 148, 193, 150], // #F694C1，加入透明度 150
  [237, 231, 177, 150], // #EDE7B1，加入透明度 150
  [169, 222, 249, 150]  // #A9DEF9，加入透明度 150
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeSeaweeds();

  // 建立 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.style('position', 'absolute');
  iframe.style('width', '60%');
  iframe.style('height', '60%');
  iframe.style('top', '20%'); // 垂直置中
  iframe.style('left', '20%'); // 水平置中
  iframe.style('border', 'none'); // 移除邊框
}

function draw() {
  background(220);

  // 設定混合模式
  blendMode(BLEND);

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    let x = seaweed.x;
    let seaweedLength = seaweed.length; // 每條水草的隨機長度
    let amplitude = 50; // 搖晃的最大幅度
    let frequency = seaweed.frequency; // 搖晃頻率
    let thickness = seaweed.thickness; // 水草粗細
    let color = seaweed.color; // 水草顏色 (包含透明度)

    // 設定水草的顏色和粗細
    strokeWeight(thickness);
    stroke(color[0], color[1], color[2], color[3]); // 使用 RGBA 設定顏色和透明度

    // 繪製水草
    beginShape();
    for (let y = height; y >= height - seaweedLength; y -= 10) {
      let offset = sin(frameCount * frequency + y * 0.02) * amplitude * ((y - (height - seaweedLength)) / seaweedLength);
      vertex(x + offset, y);
    }
    endShape(OPEN); // 使用 OPEN 避免自動閉合
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨著視窗大小改變
  initializeSeaweeds(); // 重新初始化水草的位置
}

function initializeSeaweeds() {
  seaweeds = []; // 清空現有的水草資料
  let spacing = width / 50; // 計算每條水草的水平間距 (50條水草)
  for (let i = 0; i < 50; i++) { // 產生 50 條水草
    let x = i * spacing + spacing / 2; // 平均分布的水平位置
    let length = random(100, 300); // 隨機高度，範圍為 100 到 300
    let color = random(colors); // 從調色盤中隨機選擇顏色
    let thickness = 35; // 固定粗細為 35
    let frequency = random(0.02, 0.08); // 隨機搖晃頻率
    seaweeds.push({ x, length, color, thickness, frequency });
  }
}
