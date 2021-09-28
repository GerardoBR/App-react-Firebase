import { types } from "../types/types";
import Swal from 'sweetalert2'
export const setError =(err)=>{
    // console.log(err);
    Swal.fire('Error',err,'error');
    return({
        type : types.uiSetError,
        payload: err
    });
}

export const remuveError =()=>({
    type : types.uiRemoveError,
})


export const startLoading  =()=>({
    type : types.uiStartLoading,
});

export const finishLoading  =()=>({
    type : types.uiFinishLoading,
});