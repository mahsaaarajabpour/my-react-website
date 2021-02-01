import * as actionTypes from './actionType'

export const userInfoLogin = (value) => {
    return dispatch => {
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