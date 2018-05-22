import React, { Component } from 'react';
import { NavBar, Button, Icon, SegmentedControl, WingBlank, NoticeBar, WhiteSpace, Popover, Modal, Toast } from 'antd-mobile';
import styles from './App.css';
import DIYTemplate from './DIYTemplate.js';

// icon
import editIcon from './img/icon/edit.png';
import demoIcon from './img/icon/template.png';
import saveIcon from './img/icon/save.png';



const Item = Popover.Item;
const alert = Modal.alert;

const myIcon = src => <img src={`${src}`} className="am-icon am-icon-xs" alt="" />;


const toastSaveSuccess = () => {
  Toast.success('图片生成成功，请长按保存', 1);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // tabIndex: 0,
      status: 'edit', // save
      noticeBarText: '选择主题，制作图片'
    };
  }

  // right button
  onSelect = (opt) => {
    let status = '';
    if (opt.props.value==='save') {
      status = 'save';
      this.refs["DIYTemplate"].saveToImg(toastSaveSuccess);
    }
    if (opt.props.value==='edit') {
      status = 'edit';
    }
    this.setState({
      visible: false,
      status: status,
      noticeBarText: '图片已生成，请长按保存'
    });
  };

  isShow = (index) => {
    if (this.state.tabIndex=== index) return 'block';
    return 'none';
  }


  render() {
    return (
      <div>
        {/* 导航栏 */}
        <NavBar
          mode="light"
          rightContent={
            <Popover mask
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="saveIcon" value="save" icon={ myIcon(saveIcon) } disabled={this.state.status === 'save'}>生成图片</Item>),
                (<Item key="editIcon" value="edit" icon={ myIcon(editIcon) } style={{ whiteSpace: 'nowrap' }} disabled={this.state.status === 'edit'}>
                  <span style={{ marginRight: 5 }}>编辑</span>
                </Item>),
                (<Item key="demo" value="demo" icon={ myIcon(demoIcon) } disabled>Demo</Item>)
              ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
            <Icon type="ellipsis" />
            </div>
          </Popover>
        }
        >绘画板</NavBar>

        {/* 通告栏 */}
        <NoticeBar style={{textAlign:"center"}} mode="closable">{ this.state.noticeBarText }</NoticeBar>

        {/* 内容 */}
        <DIYTemplate ref="DIYTemplate" status={this.state.status} />

      </div>
    );
  }
}

export default App;
