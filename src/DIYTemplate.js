import React, { Component } from 'react';
import { Button, Toast, WingBlank } from 'antd-mobile';
import dfmzImg from './img/dfmz.png';
import bsxtImg from './img/bsxt.png';
import airplaneImg from './img/airplane.png';
import avatarImg from './img/avatar.png';
import gravelImg from './img/gravel.jpg';
import defaultPic from './img/default_pic.png';
import {fabric} from 'fabric-webpack';
const FileSaver = require('file-saver');

function template(canvas) {
  const width = canvas.width;
  const height = canvas.height;

  function addImg() {
    fabric.Image.fromURL(defaultPic, function(oImg) {
      const options = {
        'left': 0.5*width-50,
        'top': 0.5*height-50,
        'width':100,
        'height':100
      }
      oImg.set(options);
      oImg.on('mouseup', function() {
        let fileInput = document.createElement("input");
        fileInput.type = "file",
        fileInput.accept ="image/gif,image/jpeg,image/jpg,image/png";
        fileInput.addEventListener("change", function(event) {
          let file = event.currentTarget.files[0],
              reader = new FileReader();
          reader.onload = function (evt) {
            let img = document.createElement("img");
            img.src = evt.target.result;
            img.onload = function() {
              oImg.setElement(img);
              oImg.set(options);
              canvas.renderAll();
            }
          };
          reader.readAsDataURL(file);
        }, false)
        fileInput.click();
      })
      oImg.on('selected', function() {
        console.log('selected a img');
      });
      canvas.add(oImg);
    });
  }

  function addRect(color) {
    console.log(color);
    const options = {
      'left': 0.5*width-50,
      'top': 0.5*height-50,
      'width':80,
      'height':80,
      'fill': color
    }
    let rect = new fabric.Rect(options);
    rect.on('selected', function() {
      console.log('selected a rectangle');
    });
    canvas.add(rect);
  }

  function addIText() {
    const options = {
      top: 80,
      left: 150,
      fontFamily: 'Microsoft Yahei',
      fontSize: 20,
      // shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
    }
    let iText = new fabric.IText('文字（点击可编辑）', options);
    canvas.add(iText);
  }

  function addLine() {
    let line = new fabric.Line([0, 105, 400, 105], {
        stroke: 'black'
    });
    canvas.add(line);
  }

  function addPath() {
    let path = new fabric.Path('M 0 0 L 105 100 L 100 110 z');
    path.set({ left: 150, top: 240 });
    canvas.add(path);
  }

  function addText() {
    let text = new fabric.Text('FOR TEST', {
      top: 100,
      left: 150,
      fontFamily: 'Microsoft Yahei',
      fontSize: 20,
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
    });
    canvas.add(text);
  }

  function draw() {
    console.log("draw canvas", canvas);
  }

  function download() {
    canvas.getElement().toBlob(function(blob) {
        FileSaver.saveAs(blob, "template_elegant.png");
    });
    // let a = document.createElement('a');
    // a.href = canvas.toDataURL({
    //     format: 'png',
    //     quality: 1
    // });
    // a.download = "template_elegant.png";
    // a.click();
  }

  function saveToImg(cb) {
    const imgDom = document.getElementById("elegantImg");
    imgDom.src = canvas.toDataURL('image/png');
    imgDom.onload = function() {
      cb();
      // let a = document.createElement('a');
      // a.href = imgDom.src;  //将画布内的信息导出为png图片数据
      // a.download = "template_normal.png";  //设定下载名称
      // a.click();
    }
  }

  return {
    "draw": draw,
    "download": download,
    "saveToImg": saveToImg,
    "addImg": addImg,
    "addRect": addRect,
    "addIText": addIText
  }
}

class DIYTemplate extends Component {
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

  saveToImg = (cb) => {
    template(this.canvas).saveToImg(cb);
  }

  isShow = (status) => {
    if (this.props.status === status) return 'block';
    return 'none';
  }

  addImg = () => {
    template(this.canvas).addImg();
  }

  addRect = (color) => {
    template(this.canvas).addRect(color);
  }

  addIText = () => {
    template(this.canvas).addIText();
  }

  del = () => {
    let el = this.canvas.getActiveObject();
    this.canvas.remove(el);
  }
  render() {
    return (
      <div>
        <WingBlank>
          <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.addImg() }>图片</Button>
          <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.addRect('red') }>矩形</Button>
          <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.addIText() }>文字</Button>
          <Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>画笔</Button>
          <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.del() }>Remove</Button>
        </WingBlank>

        <div style={{ display: this.isShow('edit') }}>
          <canvas id="elegantTemplate" height='600' />
        </div>
        <input type="file" id="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style={{opacity:0,position:'absolute',top:0,left:0}} />
        <input type="file" id="fromScope" accept="image/gif,image/jpeg,image/jpg,image/png" style={{opacity:0,position:'absolute',top:0,left:0}} />
        <input type="file" id="toScope" accept="image/gif,image/jpeg,image/jpg,image/png" style={{opacity:0,position:'absolute',top:0,left:0}} />
        <img id="elegantImg" style={{ display: this.isShow('save') }} height="600" width="100%"  />
      </div>
    );
  }
}

export default DIYTemplate;
