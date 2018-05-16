import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import gravelImg from './gravel.jpg';

function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    })
}

function preLoadImg(imgNameList, cb){
    let pr = [];
    let images = {};
    imgNameList.forEach(name => {// 预加载图片
        let p = loadImage(name)
                .then(img => {
                  images[name] = img;
                })
                .catch(err => console.log(err))
        pr.push(p);
    })
    // 图片全部加载完
    Promise.all(pr).then(() => {
        cb(images);
    });
}


function template() {
  let canvas = document.getElementById("normalTemplate");

  function download() {
    let a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');  //将画布内的信息导出为png图片数据
    a.download = "template_normal.png";  //设定下载名称
    a.click(); //点击触发下载
  }

  function createCanopyPath(context) {
      context.beginPath();
      context.moveTo(-25, -50);
      context.lineTo(-10, -80);
      context.lineTo(-20, -80);
      context.lineTo(-5, -110);
      context.lineTo(-15, -110);

      context.lineTo(0, -140);

      context.lineTo(15, -110);
      context.lineTo(5, -110);
      context.lineTo(20, -80);
      context.lineTo(10, -80);
      context.lineTo(25, -50);
      context.closePath();
  }

  function drawTree(context) {
      context.save();
      context.transform(1, 0,
                        -0.5, 1,
                        0, 0);
      context.scale(1, 0.6);
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(-5, -50, 10, 50);
      createCanopyPath(context);
      context.fill();
      context.restore();

      let trunkGradient = context.createLinearGradient(-5, -50, 5, -50);
      trunkGradient.addColorStop(0, '#663300');
      trunkGradient.addColorStop(0.4, '#996600');
      trunkGradient.addColorStop(1, '#552200');
      context.fillStyle = trunkGradient;
      context.fillRect(-5, -50, 10, 50);

      let canopyShadow = context.createLinearGradient(0, -50, 0, 0);
      canopyShadow.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
      canopyShadow.addColorStop(0.2, 'rgba(0, 0, 0, 0.0)');
      context.fillStyle = canopyShadow;
      context.fillRect(-5, -50, 10, 50);

      createCanopyPath(context);

      context.lineWidth = 4;
      context.lineJoin = 'round';
      context.strokeStyle = '#663300';
      context.stroke();

      context.fillStyle = '#339900';
      context.fill();
  }

  function draw() {
    let imgNameList = [gravelImg];
    preLoadImg(imgNameList, drawTrails);
  }
  function drawTrails(images) {
      let context = canvas.getContext('2d');

      context.save();

      context.clearRect(0, 0, canvas.width, 600);

      context.translate(130, 250);
      drawTree(context);
      context.restore();

      context.save();
      context.translate(260, 500);

      context.scale(2, 2);
      drawTree(context);
      context.restore();

      context.save();
      context.translate(-10, 350);
      context.beginPath();
      context.moveTo(0, 0);
      context.quadraticCurveTo(170, -50, 260, -190);
      context.quadraticCurveTo(310, -250, 410,-250);
      context.strokeStyle = context.createPattern(images[gravelImg], 'repeat');
      context.lineWidth = 20;
      context.stroke();
      context.restore();

      context.save();
      context.font = "60px impact";
      context.textAlign = 'center';
      context.fillStyle = '#996600';
      context.fillText('NormalTemplate', 200, 60, 400);
      context.restore();
  }

  return {
    "draw": draw,
    "download": download
  }
}

class NormalTemplate extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    let canvas = document.getElementById("normalTemplate");
    if (canvas.width < window.innerWidth){
      canvas.width  = window.innerWidth;
    }
    template().draw();
  }

  download = () => {
    template().download();
  }

  render() {
    return (
      <div>
        <canvas id="normalTemplate" style={{background:"white"}}  height="600"></canvas>
      </div>
    );
  }
}

export default NormalTemplate;
