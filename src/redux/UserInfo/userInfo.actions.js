import * as actionTypes from './userInfo.actionType'

export const userInfoLogin = (value) => {
    return dispatch => {
        console.log('44',value)
        dispatch(
            saveInfo(value)
        )
    }
}
export const saveInfo = (value) => {
    return {
        type: actionTypes.LOGIN,
        value
    }
}

export const userLogOut=()=>{
    return{
        type:actionTypes.LOG_OUT,
    }
}