import React, { Component } from 'react';
import dfmzImg from './img/dfmz.png';
import bsxtImg from './img/bsxt.png';
import avatarImg from './img/avatar.png';

let images = {};
function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

function preLoadImg(imgNameList, cb){
    let pr = [];
    imgNameList.forEach(name => {
        let p = loadImage(name)
                .then(img => {
                  images[name] = img;
                })
                .catch(err => console.log(err))
        pr.push(p);
    })

    Promise.all(pr).then(() => {
        cb(images);
    });
}

function template() {
  const canvas = document.getElementById("freshTemplate");
  let contextList = {};

  // public function
  function download() {
    let a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = "template_fresh.png";
    a.click();
  }

  function draw() {
    let imgNameList = [dfmzImg, bsxtImg, avatarImg];
    preLoadImg(imgNameList, drawTrails);
  }

  function drawAvatar(context) {
    context.save();
    let avatar = context.createPattern(images[avatarImg], 'no-repeat');
    context.translate(20, 20);
    context.fillStyle = avatar;
    context.fillRect(0, 0, 60, 60);
    context.restore();
    contextList["avatar"] = {
      top: 20,
      left: 20,
      width: 60,
      height: 60
    };
  }

  function isInPath(x, y, element) {
    // console.log(x, y, element)
    if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
      return true;
    }
    return false;
  }

  function drawHeaderText(context) {
    let txt = "标准文案（点击可编辑）";
    context.save();
    context.translate(200, 20);
    context.font = "20px Microsoft YaHei";
    context.textAlign = 'center';
    context.fillStyle = '#996600';
    context.fillText(txt, 50, 50, 400);
    context.restore();
    contextList["headerText"] = {
      top: 70,
      left: 250,
      width: context.measureText(txt).width,
      height: 60
    };
  }

  function drawLine(context) {
    context.beginPath();
    context.moveTo(0, 85);
    context.lineTo(canvas.width, 85);
    context.lineWidth = 0.5;
    context.stroke();
    console.log(context);
    // contextList["line"] = _.cloneDeep(context);
  }

  function drawTrails(images) {
      let context = canvas.getContext('2d');

      context.save();

      context.clearRect(0, 0, canvas.width, 600);


      drawAvatar(context);



      drawHeaderText(context);
      drawLine(context)


      canvas.addEventListener("click", doClick, false);

      function doClick(event) {
        // console.log(event);
        let x = event.offsetX,
            y = event.offsetY;
        // console.log(contextList);
        if (isInPath(x,y,contextList["avatar"])) {
          console.log("avatar");
        }

        if (isInPath(x,y,contextList["headerText"])) {
          console.log("headerText");
        }
        //   console.log("headerText");
        // }

      }
  }

  return {
    "draw": draw,
    "download": download
  }
}

class FreshTemplate extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    let canvas = document.getElementById("freshTemplate");
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
        <canvas id="freshTemplate" style={{background:"white"}} height="600"></canvas>
      </div>
    );
  }
}

export default FreshTemplate;
