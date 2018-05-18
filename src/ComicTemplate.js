import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Strip, Panel, Character, Balloon } from 'react-komik';

const imgUrl = 'https://sonny.js.org/react-komik/dist/';

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
  const canvas = document.getElementById("normalTemplate");

  function download() {
    let a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');  //将画布内的信息导出为png图片数据
    a.download = "template_normal.png";  //设定下载名称
    a.click(); //点击触发下载
  }

  function saveToImg(cb) {
    const imgDom = document.getElementById("normalImg");
    imgDom.src = canvas.toDataURL('image/png');
    imgDom.onload = function() {
      cb();
      // let a = document.createElement('a');
      // a.href = imgDom.src;  //将画布内的信息导出为png图片数据
      // a.download = "template_normal.png";  //设定下载名称
      // a.click();
    }
  }


  function draw() {
    let imgNameList = [];
    preLoadImg(imgNameList, drawTrails);
  }
  function drawTrails(images) {

  }

  return {
    "draw": draw,
    "download": download,
    "saveToImg": saveToImg
  }
}

class ComicTemplate extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    // if ( this.props.status === 'edit') {
    //   let canvas = document.getElementById("normalTemplate");
    //   if (canvas.width < window.innerWidth){
    //     canvas.width  = window.innerWidth;
    //   }
    //   // template().draw();
    // }
  }

  download = () => {
    template().download();
  }

  saveToImg = (cb) => {
    template().saveToImg(cb);
  }

  isShow = (status) => {
    if (this.props.status === status) return 'block';
    return 'none';
  }

  render() {
    return (
      <div>
          <img id="normalImg" style={{ display: this.isShow('save') }} height="600" width="100%" />
          <Strip title="Comic Template" column="2" fontFamily="Patrick Hand" fontSize="12" upperCase={true} style={{display: this.isShow('edit')}}>
            <Panel>
                <Character
                    image={imgUrl + 'char1.png'}
                    left="70"
                    scale="0.5">
                    <Balloon
                        left="-80"
                        height="120"
                        image={imgUrl + 'chat_left.svg'}
                        text="Have about ReactJS? You can write HTML in JS..."/>
                </Character>
            </Panel>
            <Panel>
                <Character
                    image={imgUrl + 'char2.png'}
                    left="30"
                    scale="0.65">
                    <Balloon
                        height="160"
                        left="60"
                        bottom="-110"
                        image={imgUrl + 'chat_right.svg'}
                        text="Yeah it's pretty cool. You can use JSX syntax to write web, mobile app, even presentation"
                        />
                </Character>
            </Panel>
            <Panel>
                <Character
                    image={imgUrl + 'char1_hype.png'}
                    scale="0.9"
                    left="30">
                    <Balloon
                        height="130"
                        left="-40"
                        image={imgUrl + 'chat_left.svg'}
                        text="Hey look! It's React Komik! We can create this comic strip with ReactJS!"
                        />
                </Character>
            </Panel>
            <Panel>
                <Character
                    image={imgUrl + 'char2_magic.png'}
                    scale="0.65">
                    <Balloon
                        height="80"
                        left="80"
                        image={imgUrl + 'chat_right.svg'}
                        text="It's MAGIC"
                        />
                </Character>
            </Panel>
        </Strip>
      </div>
    );
  }
}

export default ComicTemplate;
