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
// const showAlert = () => {
//   const alertInstance = alert('Delete', 'Are you sure???', [
//     { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
//     { text: 'OK', onPress: () => console.log('ok') },
//   ]);
//   setTimeout(() => {
//     // 可以调用close方法以在外部close
//     console.log('auto close');
//     alertInstance.close();
//   }, 500000);
// };

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
      // let tabIndex = this.state.tabIndex,
      //     template;
      // switch(tabIndex) {
      //   case 0:
      //     template = 'ComicTemplate';
      //     break;
      //   case 1:
      //     template = 'DIYTemplate';
      //     break;
      // }
      // console.log(this.refs, template, this.refs[template]);
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
        <NoticeBar style={{textAlign:"center"}}>{ this.state.noticeBarText }</NoticeBar>

        {/* 空白行 */}
        <WhiteSpace size="xs" />

        {/* 内容 */}

        <DIYTemplate ref="DIYTemplate" status={this.state.status} />


      </div>
    );
  }
}

export default App;
