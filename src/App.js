import React, { Component } from 'react';
import { NavBar, Button, Icon, SegmentedControl, WingBlank, NoticeBar, WhiteSpace, Popover, Modal, Toast } from 'antd-mobile';
import styles from './App.css';
import { saveIcon, shareIcon } from './svg.js';
import NormalTemplate from './NormalTemplate.js';
import FreshTemplate from './FreshTemplate.js';
import ElegantTemplate from './ElegantTemplate.js';


// const myIcon = src => <img src={`${src}`} className="am-icon am-icon-xs" alt="" />;
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
const toastWarning = () => {
  Toast.offline('暂未开放', 1);
}

class App extends Component {
  state = {
    visible: false,
    selected: '',
    tabIndex: 0
  };
  // tab change
  onChange = (e) => {
    // console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    this.setState({
      tabIndex: e.nativeEvent.selectedSegmentIndex
    })
  }
  // onValueChange = (value) => {
  //   console.log(value);
  // }

  // right button
  onSelect = (opt) => {
    if (opt.props.value==='save') {
      let tabIndex = this.state.tabIndex,
          template;
      switch(tabIndex) {
        case 0:
          template = 'normalTemplate';
          break;
        case 1:
          template = 'freshTemplate';
          break;
        case 2:
          template = 'elegantTemplate';
          break;
      }
      this.refs[template].download();
    }
    if (opt.props.value==='share') {
      // showAlert();
      toastWarning();
    }
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  isShow = (index) => {
    if (this.state.tabIndex=== index) return 'block';
    return 'hide';
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
                (<Item key="saveIcon" value="save" icon={ saveIcon() }>保存</Item>),
                (<Item key="shareIcon" value="share" icon={ shareIcon() } style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ marginRight: 5 }}>分享</span>
                </Item>)
              ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
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
        <NoticeBar mode="closable">选择模板，生成或分享行程</NoticeBar>

        {/* 空白行 */}
        <WhiteSpace size="lg" />

        {/* 导航栏 */}
        <WingBlank>
          <SegmentedControl
            values={['标准', '小清新', '高大上']}
            selectedIndex={ this.state.tabIndex }
            onChange={this.onChange}
            onValueChange={this.onValueChange}
          />
        </WingBlank>

        {/* 空白行 */}
        <WhiteSpace size="xs" />

        {/* 内容 */}


        {this.state.tabIndex===0 ?
          <NormalTemplate ref="normalTemplate" />:null
        }

        {this.state.tabIndex===1 ?
          <FreshTemplate ref="freshTemplate"/>:null
        }

        {this.state.tabIndex===2 ?
          <ElegantTemplate ref="elegantTemplate"/>:null
        }




      </div>
    );
  }
}

export default App;
