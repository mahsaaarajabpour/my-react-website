import * as actionTypes from './userInfo.actionType'
import {updateObject} from '../utility'

const initialState = {
    info: [],
    authenticate: false,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return (
                updateObject(
                    state,
                    {
                        info: JSON.parse(JSON.stringify(action.value)),
                        authenticate: true
                    }
                )
            )
        case actionTypes.LOG_OUT:
            return (
                updateObject(
                    state,
                    {
                        info: [],
                        authenticate: false
                    }
                )
            )
        // no default
    }
    return state
}
export default reducer;