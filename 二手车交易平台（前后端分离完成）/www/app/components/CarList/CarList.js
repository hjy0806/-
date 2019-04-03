import React from 'react';
import { connect } from "dva";
import CarFilterBox from "./CarFilterBox.js";
import CarTableBox from "./CarTableBox.js";
import PicShow from "../PicShow/PicShow.js";
import "./CarList.less";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class CarList extends React.Component {

    constructor(props) {
        super(props);
        props.dispatch({"type":"carlist/init"});

        this.state = {
            // 当前图集组件的 init的 ID
            nowID : 0,
            // 当前图集组件的 弹出层
            isShowXuanfu:false
        }
    }
    // 弹出层滚动时禁止body滚动
    componentWillUpdate(nextProps, nextState) {
      if(nextState.isShowXuanfu){
          document.documentElement.style.overflow="hidden";
          document.documentElement.style.height="100%";
          document.body.style.overflow="hidden";
          document.body.style.height="100%";
      }else{
        document.documentElement.style.overflow="auto";
        document.documentElement.style.height="auto";
        document.body.style.overflow="auto";
        document.body.style.height="auto";
      }
    }
    // 设置悬浮层的方法
    setXuanfu( nowID,isShowXuanfu){

      this.setState({
        nowID,
        isShowXuanfu
      })
    }
    render() {

        return (
            <div>
                <Layout>
                    <Header className="header">
                      <div className="logo" />
                      <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                      >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                      </Menu>
                    </Header>
                    <Layout>
                      <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          style={{ height: '100%', borderRight: 0 }}
                        >
                          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                          </SubMenu>
                          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                          </SubMenu>
                          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                          </SubMenu>
                        </Menu>
                      </Sider>
                      <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                          <Breadcrumb.Item>Home</Breadcrumb.Item>
                          <Breadcrumb.Item>List</Breadcrumb.Item>
                          <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <CarFilterBox></CarFilterBox>
                            <CarTableBox setXuanfu={this.setXuanfu.bind(this)}></CarTableBox>
                        </Content>
                      </Layout>
                    </Layout>
                  </Layout>
                  {
                    this.state.isShowXuanfu
                    ?
                    <div className="xuanfu">
                      <div className="inner">
                         <span className="closeBtn" onClick={
                            ()=>{
                              this.setState({
                                isShowXuanfu:false
                              })

                              this.props.dispatch({"type":"picshow/clearCarImages"});
                            }
                         }>X</span>
                         <PicShow id={this.state.nowID}></PicShow>
                      </div>
                    </div>
                    :
                    null
                  }
            </div>
        );
    }
}
export default connect()(CarList);