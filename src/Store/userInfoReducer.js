import * as actionTypes from '../Store/actions/actionType'
import {updateObject} from './utility'

const initialState = {
    loginInfo: [],
    loginAuthenticate: false,
}
const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.LOGIN:
            return (
                updateObject(
                    state,
                    {
                        loginInfo: JSON.parse(JSON.stringify(action.value)),
                        loginAuthenticate: true
                    }
                )
            )
        case actionTypes.LOG_OUT:
            return (
                updateObject(
                    state,
                    {loginAuthenticate: false}
                )
            )
    }
    return state
}
export default reducer;