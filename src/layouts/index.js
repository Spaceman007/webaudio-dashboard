
import { Layout, Icon, Menu } from 'antd'
import styles from './index.scss'
import React from 'react'
import Link from 'umi/link'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fold: false,
      current: 'main'
    }
  }

  handleClick (e) {
    this.setState({ current: e.key })
  }

  toggle () {
    this.setState({ fold: !this.state.fold })
  }
  render () {
    return (
      <Layout className={styles.layout}>
        <Sider collapsedWidth={0} collapsed={this.state.fold}>
          <Menu theme='dark' onClick={this.handleClick.bind(this)}
            mode='inline'
            selectedKeys={[this.state.current]}>
            <Menu.Item key='main'><Link to='/'>Web Audio Dashboard</Link></Menu.Item>
            <SubMenu title='BASIC'>
              <Menu.Item key='webcam'><Link to='/mp3'>Play Mp3</Link></Menu.Item>
              <Menu.Item key='oscillator'><Link to='/oscillator'>Play Oscillator</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header} theme='light'>
            <Icon type={this.state.fold ? 'menu-unfold' : 'menu-fold'} className={styles.icon} onClick={this.toggle.bind(this)} />
            umi2 + web audio
          </Header>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    )
  }
}

export default Container
