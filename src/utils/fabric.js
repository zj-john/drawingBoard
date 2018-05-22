import {fabric} from 'fabric-webpack';
import defaultPic from './../img/default_pic.png';
import _ from "lodash";
import chatLeftSvg from './../img/comic_theme/chat_left.svg'
import chatRightSvg from './../img/comic_theme/chat_right.svg'

const FileSaver = require('file-saver');

class Fabric {
  constructor(id) {
    this.canvas = new fabric.Canvas(id, {
      backgroundColor: "white"
    });
    this.staticObjectList = [];
    this.selectedObjectList = [];
    this.canvas.on('mouse:down', function(options) {
      console.log("mouse:down");
      // if (options.target) {
        // this.selectedObjectList.push(options.target);
      // }
    });

    this.canvas.on('selection:cleared', function(options) {
      console.log("selection:cleared");
    });

    this.canvas.on('selection:created', function(options) {
      console.log("selection:created");
    });

    this.canvas.on('selection:updated', function(options) {
      console.log("selection:updated");
    });
  }

  getStaticObjectList() {
    return this.staticObjectList;
  }

  getSelectedObject() {
    return this.selectedObject;
  }

  // 初始化漫画框
  initComic() {
    const canvas = this.canvas;
    let width = canvas.width,
        padding = 20,
        top = 40,
        height = (width-padding*3)/2,
        fill = 'white',
        stroke = 'black',
        strokeWidth = 3;
    let index1_props = {
      left: padding,
      top: top,
      height: height,
      padding: padding,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      width: height,
      selectable: false
    };
    let index2_props = {
      left: padding + height + padding,
      top: top,
      height: height,
      padding: padding,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      width: height,
      selectable: false
    };
    let index3_props = {
      left: padding,
      top: top + height + padding,
      height: height,
      padding: padding,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      width: height,
      selectable: false
    };
    let index4_props = {
      left: padding + height + padding,
      top: top + height + padding,
      height: height,
      padding: padding,
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
      width: height,
      selectable: false
    };

    let rect1 = new fabric.Rect(index1_props);
    let rect2 = new fabric.Rect(index2_props);
    let rect3 = new fabric.Rect(index3_props);
    let rect4 = new fabric.Rect(index4_props);
    canvas.add(rect1);
    canvas.add(rect2);
    canvas.add(rect3);
    canvas.add(rect4);
  }

  addImg() {
    const global = this;
    fabric.Image.fromURL(defaultPic, function(oImg) {
      let canvas = global.canvas,
          height = canvas.height,
          width = canvas.width;
      const options = {
        'left': 0.5*width-50,
        'top': 0.5*height-50,
        'width':100,
        'height':100
      }
      oImg.set(options);
      // 长按
      oImg.on('touch:longpress', function() {
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
      canvas.add(oImg);
    });
  }

  addRect(color) {
    console.log(color);
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
    const options = {
      'left': 0.5*width-50,
      'top': 0.5*height-50,
      'width':80,
      'height':80,
      'fill': color
    }
    let rect = new fabric.Rect(options);
    canvas.add(rect);
    // canvas.setActiveObject(iText);
  }

  addIText() {
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
    const options = {
      top: 80,
      left: 150,
      fontFamily: 'Microsoft Yahei',
      fontSize: 20,
      // shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
    }
    let iText = new fabric.IText('文字（点击可编辑）', options);
    canvas.add(iText);
    // canvas.setActiveObject(iText);
  }

  addLine() {
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
    let line = new fabric.Line([0, 105, 400, 105], {
        stroke: 'black'
    });
    canvas.add(line);
  }

  addPath() {
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
    let path = new fabric.Path('M 0 0 L 105 100 L 100 110 z');
    path.set({ left: 150, top: 240 });
    canvas.add(path);
  }

  addText() {
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
    let text = new fabric.Text('FOR TEST', {
      top: 100,
      left: 150,
      fontFamily: 'Microsoft Yahei',
      fontSize: 20,
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
    });
    canvas.add(text);
  }

  addLeftBalloon() {
    const canvas = this.canvas;
    fabric.loadSVGFromURL(chatLeftSvg,function(objects, options){
      let image = fabric.util.groupSVGElements(objects, options);
      let height = 100,
          _top = 60,
          _left = 100;
      image.scaleToHeight(height);
      var currentProps = {
          top: _top,
          left: _left
      };
      image.set(currentProps);
      canvas.add(image);
    });
  }

  addRightBalloon() {
    const canvas = this.canvas;
    fabric.loadSVGFromURL(chatRightSvg,function(objects, options){
      let image = fabric.util.groupSVGElements(objects, options);
      let height = 100,
          _top = 60,
          _left = 100;
      image.scaleToHeight(height);
      var currentProps = {
          top: _top,
          left: _left
      };
      image.set(currentProps);
      canvas.add(image);
    });
  }

  download() {
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
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

  saveToImg(id, cb) {
    const canvas = this.canvas,
        height = canvas.height,
        width = canvas.width;
    canvas.deactivateAll();
    const imgDom = document.getElementById(id);
    imgDom.src = canvas.toDataURL('image/png');
    imgDom.onload = function() {
      cb();
    }
  }

  removeObject() {
    const canvas = this.canvas;
    let el = canvas.getActiveObject();
    canvas.remove(el);
  }

  enableStaticObject(flag) {
    const canvas = this.canvas;
    try {
      let el = canvas.getActiveObject();
      el.lockMovementY = flag;
      el.lockMovementX = flag;
      el.lockRotation = flag;
      if(flag) {
        this.staticObjectList.push(el);
      } else {
        _.pull(this.staticObjectList, el);
        // this.staticObjectList.remove(el);
      }
    } catch(e) {
      console.log(e);
    }
  }

  enableFreeDrawing(flag) {
    const canvas = this.canvas;
    canvas.isDrawingMode = flag;
  }
  // 清空画板和事件
  dispose() {
    const canvas = this.canvas;
    // clear && unbind event
    canvas.dispose();
  }
}

export default Fabric;
