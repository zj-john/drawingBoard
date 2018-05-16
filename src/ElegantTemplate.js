import React, { Component } from 'react';
import _ from 'lodash';
import dfmzImg from './img/dfmz.png';
import bsxtImg from './img/bsxt.png';
import airplaneImg from './img/airplane.png';
import avatarImg from './img/avatar.png';
import {fabric} from 'fabric-webpack';


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

function template(canvas) {

  function draw() {
    // let rect = new fabric.Rect({
    //   top: 20,
    //   left: 20,
    //   width: 60,
    //   height: 60,
    //   fill: 'red'
    // });
    // rect.on('selected', function() {
    //   console.log('selected a rectangle');
    // });
    // canvas.add(rect);

    // avatar
    fabric.Image.fromURL(avatarImg, function(oImg) {
      oImg.set({
        'left': 20,
        'top': 20,
        'width':80,
        'height':80
      });
      oImg.on('mouseup', function() {
        console.log("mouseup");
        let avatarInput = document.querySelector('#avatar');
        avatarInput.addEventListener("change", function(event) {
          // console.log("img change",event.currentTarget.files[0]);
          let file = event.currentTarget.files[0];
          let reader = new FileReader();
          reader.onload = function (evt) {
            let img = document.createElement("img");
            img.src = evt.target.result;
            // console.log(img);
            oImg.setElement(img);
            oImg.set({
              'left': 20,
              'top': 20,
              'width':80,
              'height':80
            });
            canvas.renderAll();
            // fabric.setCoords();
          };
          reader.readAsDataURL(file);
        }, false)
        avatarInput.click();
        // document.getElementById("avatar").click();
      })
      oImg.on('selected', function() {
        console.log('selected a img');
      });
      canvas.add(oImg);
    });


    let iText = new fabric.IText('标准文案（点击可编辑）', {
      top: 80,
      left: 150,
      fontFamily: 'Microsoft Yahei',
      fontSize: 20,
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
    });
    canvas.add(iText);


    // (0, 100) (400, 100) 线的顶点
    let line = new fabric.Line([0, 105, 400, 105], {
        stroke: 'black'
    });
    canvas.add(line);

    // from scope
    fabric.Image.fromURL(dfmzImg, function(oImg) {
      oImg.set({
        'left': 30,
        'top': 120,
        'width':120,
        'height':120
      });
      oImg.on('mouseup', function() {
        console.log("mouseup from scope");
        let avatarInput = document.querySelector('#fromScope');
        avatarInput.addEventListener("change", function(event) {
          // console.log("img change",event.currentTarget.files[0]);
          let file = event.currentTarget.files[0];
          let reader = new FileReader();
          reader.onload = function (evt) {
            let img = document.createElement("img");
            img.src = evt.target.result;
            // console.log(img);
            oImg.setElement(img);
            oImg.set({
              'left': 30,
              'top': 120,
              'width':120,
              'height':120
            });
            canvas.renderAll();
            // fabric.setCoords();
          };
          reader.readAsDataURL(file);
        }, false)
        avatarInput.click();
        // document.getElementById("avatar").click();
      })
      oImg.on('selected', function() {
        console.log('selected from scope');
      });
      canvas.add(oImg);
    });


    // to scope
    fabric.Image.fromURL(bsxtImg, function(oImg) {
      oImg.set({
        'left': 250,
        'top': 350,
        'width':120,
        'height':120
      });
      oImg.on('mouseup', function() {
        console.log("mouseup to scope");
        let avatarInput = document.querySelector('#toScope');
        avatarInput.addEventListener("change", function(event) {
          // console.log("img change",event.currentTarget.files[0]);
          let file = event.currentTarget.files[0];
          let reader = new FileReader();
          reader.onload = function (evt) {
            let img = document.createElement("img");
            img.src = evt.target.result;
            // console.log(img);
            oImg.setElement(img);
            oImg.set({
              'left': 250,
              'top': 350,
              'width':120,
              'height':120
            });
            canvas.renderAll();
            // fabric.setCoords();
          };
          reader.readAsDataURL(file);
        }, false)
        avatarInput.click();
        // document.getElementById("avatar").click();
      })
      oImg.on('selected', function() {
        console.log('selected to scope');
      });
      canvas.add(oImg);
    });


    // airplane path
    let path = new fabric.Path('M 0 0 L 105 100 L 100 110 z');
    path.set({ left: 150, top: 240 });
    canvas.add(path);

    // airplane
    fabric.Image.fromURL(airplaneImg, function(oImg) {
      oImg.set({
        'left': 220,
        'top': 270,
        'width':60,
        'height':60,
        'angle':35
      });
      canvas.add(oImg);
    });

    // let text = new fabric.Text('FOR TEST', {
    //   top: 100,
    //   left: 150,
    //   fontFamily: 'Microsoft Yahei',
    //   fontSize: 20,
    //   shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
    // });
    // canvas.add(text);
  }

  function download() {
    let a = document.createElement('a');
    a.href = canvas.toDataURL('png');
    a.download = "template_elegant.png";
    a.click();
  }

  return {
    "draw": draw,
    "download": download
  }
}

class ElegantTemplate extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const canvasNative = document.getElementById("elegantTemplate");
    if (canvasNative.width < window.innerWidth){
      canvasNative.width  = window.innerWidth;
    }
    this.canvas = new fabric.Canvas('elegantTemplate', {
      backgroundColor: "white"
    });
    template(this.canvas).draw();
  }

  download = () => {
    template(this.canvas).download();
  }

  render() {
    return (
      <div>
        <canvas id="elegantTemplate" height='600'></canvas>
        <input type="file" id="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style={{opacity:0,position:'absolute',top:0,left:0}} />
        <input type="file" id="fromScope" accept="image/gif,image/jpeg,image/jpg,image/png" style={{opacity:0,position:'absolute',top:0,left:0}} />
        <input type="file" id="toScope" accept="image/gif,image/jpeg,image/jpg,image/png" style={{opacity:0,position:'absolute',top:0,left:0}} />
      </div>
    );
  }
}

export default ElegantTemplate;
