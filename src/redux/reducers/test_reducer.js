import {TEST1,TEST2} from '../action_types'

let initState = 'hello'

export default function operaCount(preState=initState,action){ 

    let {type,data} = action
    let newState = 0
    switch(type){
        case TEST1: 
            newState = preState + data 
            return newState 
        case TEST2:
            newState = preState + data + '!'
            return newState
        default:  
            return preState
    }
}