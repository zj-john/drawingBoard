import React, { Component } from 'react';
import { Button, Toast, WingBlank, Picker, List, Switch, Modal  } from 'antd-mobile';
import Fabric from './utils/fabric';
import './index.css';
const alert = Modal.alert;

class DIYTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeValue: [],
      enableFreeDrawing: false
    }
  }

  componentDidMount() {
    const canvasNative = document.getElementById("elegantTemplate");
    if (canvasNative.width < window.innerWidth){
      canvasNative.width  = window.innerWidth-2;
    }
    this.Fabric = new Fabric("elegantTemplate");
  }

  download = () => {
    this.Fabric.download();
  }

  saveToImg = (cb) => {
    this.Fabric.saveToImg("elegantImg",cb);
  }

  isShow = (status) => {
    if (status) return 'block';
    return 'none';
  }


  render() {
    const themeList = [
      {
        "label": "四格漫画",
        "value": "comic"
      },
      {
        "label": "DIY画板",
        "value": "diy"
      }
    ]
    return (
      <div>
        <List
          renderHeader={() => '主题'}
        >
          <Picker data={themeList} cols={1}
            value={this.state.themeValue}
            onOk={(v) => {
              const showAlert = () => {
                const alertInstance = alert('更换模板吗', '更换模板将会清空画板', [
                  { text: '取消', onPress: () => alertInstance.close(), style: 'default' },
                  { text: '确认', onPress: () => {
                    this.setState({ themeValue: v });
                    document.querySelectorAll(".List-item-btn .am-list-extra").forEach(function(dom) {
                      dom.style.flexBasis = "80%";
                    });
                    this.Fabric.clear();
                    if(v[0]==='comic'){
                      this.Fabric.initComic();
                    }
                  }},
                ]);
                // setTimeout(() => {
                //   // 可以调用close方法以在外部close
                //   console.log('auto close');
                //   alertInstance.close();
                // }, 500000);
              };
              if(this.state.themeValue.length===0) {
                this.setState({ themeValue: v });
                document.querySelectorAll(".List-item-btn .am-list-extra").forEach(function(dom) {
                  dom.style.flexBasis = "80%";
                });
                if(v[0]==='comic'){
                  this.Fabric.initComic();
                }
              } else {
                showAlert();
              }

            }}>
            <List.Item arrow="horizontal">画板主题</List.Item>
          </Picker>
        </List>

          <List
            renderHeader={() => '内容'}
            style={{"display":this.isShow(this.state.themeValue[0] === 'diy' && this.props.status==='edit')}}
          >
            <List.Item
              extra={<Switch
                checked = { this.state.enableFreeDrawing }
                onClick={(checked) => {
                  this.setState({ enableFreeDrawing: checked});
                  this.Fabric.enableFreeDrawing(checked);
                }}
              />}>自由画笔
            </List.Item>

             <List.Item extra={
               <div>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addImg() } disabled={this.state.enableFreeDrawing}>图片</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addRect('black') } disabled={this.state.enableFreeDrawing}>矩形</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addIText() } disabled={this.state.enableFreeDrawing}>文字</Button>
               </div>
             } className='List-item-btn'>添加</List.Item>

             <List.Item extra={
               <div>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.removeObject() } disabled={this.state.enableFreeDrawing}>删除</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.enableStaticObject(false) } disabled={this.state.enableFreeDrawing}>解锁</Button>:
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.enableStaticObject(true) } disabled={this.state.enableFreeDrawing}>锁定</Button>
               </div>
             } className='List-item-btn'>选项</List.Item>
          </List>

          <List
            renderHeader={() => '内容'}
            style={{"display":this.isShow(this.state.themeValue[0] === 'comic' && this.props.status==='edit')}}
          >
             <List.Item extra={
               <div>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addImg() }>图片</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addIText() } >文字</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addLeftBalloon() }>左气泡</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.addRightBalloon() }>右气泡</Button>
               </div>
             } className='List-item-btn'>添加</List.Item>

             <List.Item extra={
               <div>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.removeObject() }>删除</Button>
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.enableStaticObject(false) } disabled={this.state.enableFreeDrawing}>解锁</Button>:
                 <Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={ () => this.Fabric.enableStaticObject(true) } disabled={this.state.enableFreeDrawing}>锁定</Button>
               </div>
             } className='List-item-btn'>选项</List.Item>
          </List>



        <List
          renderHeader={() => '画板'}
          style={{ display: this.isShow(this.props.status==='edit') }}
        >
          <canvas id="elegantTemplate" height='450' style={{"border":"1px solid #ddd"}}/>
        </List>


        <List
          renderHeader={() => '图片'}
          style={{ display: this.isShow(this.props.status==='save') }}
        >
          <img id="elegantImg"  height="400" width="100%"  />
        </List>
      </div>
    );
  }
}

export default DIYTemplate;
