import { types } from "../types/types";

const initialState = {
    loading : false,
    msgError : null
}
export const uiReducer = (state = initialState, action )=>{

    switch (action.type) {
        case types.uiSetError:
            return {
                ...state, // mantengo la informacion del estado inicial 
                msgError : action.payload
            }
        case types.uiRemoveError:
            return {
                ...state, // mantengo la informacion del estado inicial 
                msgError : null
            }
        case types.uiStartLoading:
            return {
                ...state, // mantengo la informacion del estado inicial 
                loading : true
            }
        case types.uiFinishLoading:
            return {
                ...state, // mantengo la informacion del estado inicial 
                loading : false
            }
        default:
            return state
    }
}