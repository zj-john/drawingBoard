import React, { Component } from 'react';
import { NavBar, Button, Icon, SegmentedControl, WingBlank, NoticeBar, WhiteSpace, Popover, Modal, Toast } from 'antd-mobile';
import styles from './App.css';
import { saveIcon, shareIcon } from './svg.js';
import NormalTemplate from './NormalTemplate.js';
import FreshTemplate from './FreshTemplate.js';
import ElegantTemplate from './ElegantTemplate.js';
import editIcon from './img/edit.png';


const myIcon = src => <img src={`${src}`} className="am-icon am-icon-xs" alt="" />;
const Item = Popover.Item;
const alert = Modal.alert;
const showAlert = () => {
  const alertInstance = alert('Delete', 'Are you sure???', [
    { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
    { text: 'OK', onPress: () => console.log('ok') },
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 500000);
};

const toastSaveSuccess = () => {
  Toast.success('图片生成成功，请长按保存', 1);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tabIndex: 0,
      status: 'edit', // save
      noticeBarText: '选择模板，生成或分享行程'
    };
  }

  // tab change
  onChange = (e) => {
    this.setState({
      tabIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  // right button
  onSelect = (opt) => {
    let status = '';
    console.log("onSelect");
    if (opt.props.value==='save') {
      status = 'save';
      let tabIndex = this.state.tabIndex,
          template;
      switch(tabIndex) {
        case 0:
          template = 'normalTemplate';
          this.refs["normalTemplate"].saveToImg(toastSaveSuccess);
          break;
        case 1:
          template = 'freshTemplate';
          break;
        case 2:
          template = 'elegantTemplate';
          this.refs["elegantTemplate"].saveToImg(toastSaveSuccess);
          break;
      }
      // this.refs[template].download();

    }
    if (opt.props.value==='edit') {
      status = 'edit';
      // showAlert();

    }
    this.setState({
      visible: false,
      status: status,
      noticeBarText: '不满意可重新编辑'
    });
  };

  isShow = (index) => {
    console.log("index", index);
    if (this.state.tabIndex=== index) return 'block';
    return 'none';
  }


  render() {
    return (
      <div className={styles.App}>
        {/* 导航栏 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick.Need a back function')}
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Item key="saveIcon" value="save" icon={ saveIcon() } disabled={this.state.status === 'save'}>生成图片</Item>),
                (<Item key="editIcon" value="edit" icon={ myIcon(editIcon) } style={{ whiteSpace: 'nowrap' }} disabled={this.state.status === 'edit'}>
                  <span style={{ marginRight: 5 }}>编辑</span>
                </Item>)
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
        >分享</NavBar>

        {/* 通告栏 */}
        <NoticeBar mode="closable">{ this.state.noticeBarText }</NoticeBar>

        {/* 空白行 */}
        <WhiteSpace size="lg" />

        {/* 导航栏 */}
        <WingBlank>
          <SegmentedControl
            values={['标准', '小清新', '高大上']}
            selectedIndex={ this.state.tabIndex }
            onChange={this.onChange}
            onValueChange={this.onValueChange}
            disabled = {this.state.status==='save'}
          />
        </WingBlank>

        {/* 空白行 */}
        <WhiteSpace size="xs" />

        {/* 内容 */}


        <div style={{ display: this.isShow(0) }}>
          <NormalTemplate ref="normalTemplate" status={this.state.status}  />
        </div>


        <div style={{ display: this.isShow(1) }}>
          <FreshTemplate ref="freshTemplate"  />
        </div>

        <div style={{ display: this.isShow(2) }} >
          <ElegantTemplate ref="elegantTemplate" status={this.state.status} />
        </div>



      </div>
    );
  }
}

export default App;
