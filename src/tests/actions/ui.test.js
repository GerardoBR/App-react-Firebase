import { finishLoading, remuveError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types"

describe('Pruebas en UI action ', () => {
    test('Totas las acciones deben de funcionar ', () => {
        const action = setError('Help')

        expect( action ).toEqual({
            type : types.uiSetError,
            payload : 'Help'
        });
        const remuveErrorAction= remuveError();
        const startLoadingAction= startLoading();
        const finishLoadingAction= finishLoading();

        expect ( remuveErrorAction ).toEqual({
            type: types.uiRemoveError
        });
        expect ( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });
        expect ( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });
    })
    
})
