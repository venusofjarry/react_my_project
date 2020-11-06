import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createDemo1Action} from '../../redux/action_creator/test_action'

export default class Admin extends Component{
    render(){
      return (
        <div>我是admin</div>
      )
    }
}

connect(
  state => ({peiqi: state.test}),
  {
    demo1: createDemo1Action
  }
)(Admin)