import React,{Component} from 'react'
import { Form, Input, Button } from 'antd'
import {connect} from 'react-redux'
import {createDemo1Action, createDemo2Action} from '../../redux/action_creator/test_action'
// @ant-design/icons库中没有Icon了，可能已经弃用了，现在使用单独的组件渲染icon图标。而且这个图标可以自定义颜色，我们可以使用style指定图标颜色
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './css/login.less'
import logo from './imgs/logo.png'



 class Login extends Component{

  // onFinish和3版本的onSubmit差不多，都负责统一性验证，但是onFinish功能更强大：它已经支持自动查看各个字段的验证结果，有一个没有通过，则不会发送请求，但是，他这个函数只接收一个参数：value，也就是符合规则的字段的值
    onFinish = (values) => {
      console.log(values);
    }
    render(){
      return (
        <div className="login">
            <header>
              <img src={logo} alt="北京图片" />
              <h1>商品管理系统</h1>
            </header>
            <section>
              <h1>用户登录</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: '请输入用户名' },
                    {min:4, message: '用户名必须大于4位'},
                    {max:12, message: '用户名必须小于12位'},
                    {pattern: /^\w+$/, message: '用户名不符合规则'}

                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  /* 关于antd4版本的验证说明：
                     4版本验证中的函数和3版本验证中的函数有很大区别：3版本是普通函数，4版本是promise对象。这里的箭头函数中，有一个默认参数context，里面包含了很多方法，我们使用其中一个方法：getFieldValue，它获取对应字段名的值，因为我们可以传一个参数给它，比如让他获取username字段的值，他就可以拿到用户名，我们传入password，他就可以获取密码字段的值。
                  */
                  ({getFieldValue}) => ({
                    validator(rule, value) {
                      // 我可以在这里拿到username字段的值
                      // console.log(getFieldValue('username'));
                      if (value.length < 4) {
                        return Promise.reject('密码长度小于4');
                      }else if(value.length > 12){
                        return Promise.reject('密码长度大于12')
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </section>
        </div>

      )
    }
}

export default connect(
  state => ({demo:state.test}),
  {
    demo1: createDemo1Action,
    demo2: createDemo1Action
  }
)(Login)

// 知识扩展：react是声明式编码，jquery是命令式编码，打个比喻：react就好比聪明的人，别人和他说我好累啊，它就会帮忙做事，或者搬来东西吃，但是jquery就比较笨，踢一脚动一下

// 高阶函数：一个函数接收一个函数作为参数，或者说，一个函数，它的返回值也是一个函数，这样的函数就叫做高阶函数。
// 例子：promise/then（）/定时器/数组遍历相关方法/bind/$()/$.get（）/Form.create()  
// 高阶组件：我们一般有两种方式创建组件：工厂函数（一般函数的封装）和类（本质是构造函数），也就是说，高阶组件的本质是函数。它的参数是组件，返回值是新组件
// 例子：Form.create()(组件) / withRouter（组件）/ connect（）（组件）
// 高阶组件和高阶函数的关系：
//     高阶函数是一个特别的告诫函数
//     接受的是组件函数，同时返回新的组件函数
//     作用：
//     react中用于服用组件逻辑的一种高级技巧
      //  Form.create()(Login), 接收一个Form组件，返回一个新组件
      //  Form.create = function () {
      //     const form = 创建一个强大form对象
      //     return function (fFormComponent) {
      //       return class WrapComponent extends Component {
      //         render () {
      //           return <Login form={form} />
      //         }
      //       }
      //     }
      //   }
      //  const LoginWrap = Form.create()(Login)